import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({element, path}) => {
    const {user} = useAuthContext();
    if (user){
        return <Navigate to="/" replace/>
    }
    return <Outlet />
}

export default PublicRoute;