import { useEffect } from "react";
import { privateAxiosInstance } from "../lib/axios/axios";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";

const useAxiosInstance = () => {
  const { token } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const requestInterceptor = privateAxiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = privateAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateAxiosInstance.interceptors.request.eject(requestInterceptor);
      privateAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh]);

  return privateAxiosInstance;
};

export default useAxiosInstance;
