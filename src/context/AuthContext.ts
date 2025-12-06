import{createContext} from 'react'
import type {LoginFormFields} from "../types";
import type {AuthResponse} from "../types";

interface AuthContextType{
    authResponse: AuthResponse| null
    onLogin: (submittedUser: LoginFormFields) => Promise<void>;
    onLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);