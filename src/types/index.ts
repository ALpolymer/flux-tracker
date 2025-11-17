export interface User{
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Category {
    id: string;
    userId: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface Wallet {
    id: string;
    userId: string;
    name: string;
    description?: string;
    balance: number;
    createdAt: string;
    updatedAt?: string;
}

export type TransactionType = "INCOME" | "EXPENSE"

export interface Transaction {
    id: string;
    walletId: string;
    categoryId: string;
    type: TransactionType;
    amount: number;
    description?: string;
    date: string;
    createdAt: string;
    updatedAt?: string;

}