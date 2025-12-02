import type {User} from "../types";
import type {LoginFormFields} from "../types";

const fetcher = (key: string):User[]=>{
    const data = localStorage.getItem(key);

    if(!data){
        return [];
    }

    return JSON.parse(data);
}

export const fakeAuth = (submittedUser: LoginFormFields): Promise<string> => {
    const savedUsers = fetcher("flux-tracker-users");
    console.log("Local Storage Users:",savedUsers);
    console.log("Submitted User",submittedUser)

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
            setTimeout(() => resolve("2342f2f1d131rf12"), 1000);
        });
    } else {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Invalid credentials")), 1000);
        });
    }

}