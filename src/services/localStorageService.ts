import type {Transaction, Wallet, Category} from "../types";

interface HasId{
    id: string;
}

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

export function getOneItem<T extends HasId>(key: string, id: string): T | undefined
{
    const items = getAllItems<T>(key);

    return items.find((i)=> i.id === id)
}

export function addItem<T>(key: string, item: T){
    const items = getAllItems<T>(key)

    const updated = [...items , item ];

    localStorage.setItem(key, JSON.stringify(updated));

}

export function removeItem<T extends HasId>(key: string, id: string){
    const items = getAllItems<T>(key)

    const updated = items.filter(item => id !== item.id);

    localStorage.setItem(key, JSON.stringify(updated));
}

export function updateItem<T extends HasId>(key: string, id: string, fieldToUpdate: Partial<T>){
    const items = getAllItems<T>(key)

    const updated = items.map((i)=>{
        if(i.id === id){
            return {...i, ...fieldToUpdate};
        }
        return i;
    })

    localStorage.setItem(key, JSON.stringify(updated));
}




export function getAllTransactions(): Transaction[]  {
    return getAllItems<Transaction>("expense-tracker-transactions")
}

export function getAllWallets(): Wallet[] {
    return getAllItems<Wallet>("expense-tracker-wallets")
}

export function getAllCategories(): Category[]{
    return getAllItems<Category>("expense-tracker-categories")
}

export function addTransaction(transaction: Transaction) {
  addItem<Transaction>("expense-tracker-transactions", transaction);
}

export function removeTransaction(id: string) {

    removeItem<Transaction>("expense-tracker-transactions", id);
}

export function updateTransaction(id: string, fieldToUpdate: Partial<Transaction>) {
    updateItem<Transaction>("expense-tracker-transactions", id, fieldToUpdate);
}

