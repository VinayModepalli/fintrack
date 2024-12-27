import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({element, path}) => {
    const {user} = useAuthContext();
    if (!user){
        return <Navigate to="/login" replace/>
    }
    return <Outlet />
}

export default PrivateRoute;