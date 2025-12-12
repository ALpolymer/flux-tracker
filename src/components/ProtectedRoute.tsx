import {Outlet,Navigate} from "react-router";
import {useAuth} from "../context/useAuth.ts";



export const ProtectedRoute = () => {
    const {authResponse} = useAuth();
    if (!authResponse) {
        return <Navigate to={"/"} replace />;
    }

    return  <Outlet/>
};