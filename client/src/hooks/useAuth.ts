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

    return { id, role, token };
  }

  return { id, role, token };
};

export default useAuth;
