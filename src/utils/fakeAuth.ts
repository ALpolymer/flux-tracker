import type {User} from "../types";

const fetcher = (key: string):User[]=>{
    const data = localStorage.getItem(key);

    if(!data){
        return [];
    }

    return JSON.parse(data);
}

export const fakeAuth = (data: User) => {
    const users = fetcher("flux-user");
    console.log("Local Storage Users:",users);
    console.log("Submitted User",data)
}