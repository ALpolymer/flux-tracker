import {Outlet,Navigate} from "react-router";
import type {AuthResponse} from "../types";
import * as React from "react";


type ProtectedRouteProps = {
    user: AuthResponse | null;
    redirectPath?: string;
    children?: React.ReactNode;
};

export const ProtectedRoute = ({
                            user,
                            redirectPath = "/",
                            children,
                        }: ProtectedRouteProps) => {
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet/>
};