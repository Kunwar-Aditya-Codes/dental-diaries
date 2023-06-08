import { setToken } from "../app/slices/authSlice";
import { axiosInstance } from "../lib/axios/axios";
import { useDispatch } from "react-redux";

const useRefresh = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axiosInstance.post("/auth/refresh_token");
    const { accessToken } = response.data;

    if (accessToken) {
      dispatch(setToken(accessToken));
    }

    return accessToken;
  };

  return refresh;
};

export default useRefresh;
