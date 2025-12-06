import * as React from "react";
import {AuthContext} from "./AuthContext.ts";
import {useState} from "react";
import type {LoginFormFields, AuthResponse} from "../types";
import {fakeAuth} from "../utils/fakeAuth.ts";


type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({children}:AuthProviderProps) => {

    const [authResponse, setAuthResponse] = useState<AuthResponse| null>(()=>{
        const stored = localStorage.getItem("flux-tracker-auth");
        if(stored){
            return JSON.parse(stored);
        }
        return null;
    });

    const handleLogin = async (submittedUser: LoginFormFields) => {
        const validatedUser = await fakeAuth(submittedUser);
        setAuthResponse(validatedUser)
        localStorage.setItem("flux-tracker-auth", JSON.stringify(validatedUser));
    }

    const handleLogout = () => {
        setAuthResponse(null);
        localStorage.removeItem("flux-tracker-auth");
    }

    const value = {
        authResponse,
        onLogin: handleLogin,
        onLogout: handleLogout,
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

