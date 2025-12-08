import * as React from "react";
import {AuthContext} from "./AuthContext.ts";
import {useState} from "react";
import type {LoginFormFields, AuthResponse} from "../types";
import {STORAGE_KEYS} from "../services/localStorage/types.ts";
import {fakeSignIn} from "../utils/fakeAuth.ts";


type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({children}:AuthProviderProps) => {

    const [authResponse, setAuthResponse] = useState<AuthResponse| null>(()=>{
        const stored = localStorage.getItem(STORAGE_KEYS.USER);
        if(stored){
            return JSON.parse(stored);
        }
        return null;
    });

    const handleLogin = async (submittedUser: LoginFormFields) => {
        const validatedUser = await fakeSignIn(submittedUser);
        setAuthResponse(validatedUser)
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(validatedUser));
    }

    const handleLogout = () => {
        setAuthResponse(null);
        localStorage.removeItem(STORAGE_KEYS.USER);
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

