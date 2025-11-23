import type {Transaction} from "../../types";
import {STORAGE_KEYS} from "./types.ts";
import {getAllItems, getOneItem, removeItem, updateItem, addItem} from "./localStorageHelpers.ts";

export function getAllTransactions(): Transaction[] {
    return getAllItems<Transaction>(STORAGE_KEYS.TRANSACTIONS);
}

export function getTransactionById(id: string): Transaction | undefined {
    return getOneItem<Transaction>(STORAGE_KEYS.TRANSACTIONS, id);
}

export function addTransaction(transaction: Transaction): void {
    addItem<Transaction>(STORAGE_KEYS.TRANSACTIONS, transaction);
}

export function updateTransaction(id: string, updates: Partial<Transaction>): void {
    updateItem<Transaction>(STORAGE_KEYS.TRANSACTIONS, id, updates);
}

export function removeTransaction(id: string): void {
    removeItem<Transaction>(STORAGE_KEYS.TRANSACTIONS, id);
}