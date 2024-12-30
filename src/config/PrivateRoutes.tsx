import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
const PrivateRoutes = () => {
  const { user } = useAppContext();
    
  return user.token ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
