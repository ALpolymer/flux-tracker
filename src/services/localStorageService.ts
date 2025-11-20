import type {Transaction} from "../types";


function getAllItems<T>(key: string): T[] {
    const items = localStorage.getItem(key)

    try{
        if(items === null) {
            return [];
        }
        return JSON.parse(items);
    }
    catch(e){
        console.error("Failed to parse JSON", e);
        return [];
    }
}


export function getAllTransactions(): Transaction[]  {
    return getAllItems<Transaction>("expense-tracker-categories")
}

