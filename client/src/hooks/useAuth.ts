import jwtDecode from "jwt-decode";
import { selectToken } from "../app/slices/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector(selectToken);
  let id = null;
  let role = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    id = decodedToken.id;
    role = decodedToken.role;

    return { id, role };
  }

  return { id, role };
};

export default useAuth;
