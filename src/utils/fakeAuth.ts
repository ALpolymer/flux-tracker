import type {User} from "../types";
import type {LoginFormFields, AuthResponse} from "../types";
import {STORAGE_KEYS} from "../services/localStorage/types.ts";

const fetcher = (key: string):User[]=>{
    const data = localStorage.getItem(key);

    if(!data){
        return [];
    }

    return JSON.parse(data);
}

export const fakeAuth = (submittedUser: LoginFormFields): Promise<AuthResponse> => {
    const savedUsers = fetcher(STORAGE_KEYS.USERS);


    if(!savedUsers.length){
        return new Promise((_, reject) => {
            setTimeout(()=>reject(new Error("Could not fetch users")), 1000);
        });
    }

    const foundUser = savedUsers.find((u)=> u?.email === submittedUser?.email);

    if(!foundUser){
        return new Promise((_, reject) => {
            setTimeout(()=>reject(new Error("Email does not exist")), 1000)
        })
    }

    const foundUserPassword = foundUser.password === submittedUser.password;

    if(!foundUserPassword){
        return new Promise((_, reject) => {
            setTimeout(()=>reject(new Error("Wrong password")), 1000)
        })
    }

    if (foundUser && foundUserPassword) {
        return new Promise((resolve) => {
            setTimeout(() => resolve({
                token: "2342f2f1d131rf12",
                user: {
                    username: foundUser.username,
                    email: foundUser.email,
                }
            }), 1000);
        });
    } else {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Invalid credentials")), 1000);
        });
    }

}