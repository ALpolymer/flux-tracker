import type {Transaction, Wallet, Category} from "../types";


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

export function addItem<T>(key: string, item: T){
    const items = getAllItems<T>(key)

    const updated = [...items , item ];

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

export function addTransaction(key:string, transaction: Transaction) {
  addItem<Transaction>(key, transaction);
}

export function removeTransaction(id: string) {
    const transactions = getAllTransactions();
    const updated = transactions.filter((t)=> t.id !== id)

    localStorage.setItem("expense-tracker-transactions", JSON.stringify(updated));
}

export function updateTransaction(id: string, fieldToUpdate: Partial<Transaction>) {
    const transactions = getAllTransactions();

    const updated = transactions.map(((t)=> {
        if (t.id === id) {
            return {...t, ...fieldToUpdate};
        }
        return t;
    }))
    localStorage.setItem("expense-tracker-transactions", JSON.stringify(updated));
}

