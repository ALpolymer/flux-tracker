import type {Wallet} from "../../types";
import {STORAGE_KEYS} from "./types.ts";
import {getAllItems, getOneItem, removeItem, updateItem, addItem} from "./localStorageHelpers.ts";

export function getAllWallets(): Wallet[] {
    return getAllItems<Wallet>(STORAGE_KEYS.WALLETS);
}

export function getWalletById(id: string): Wallet | undefined {
    return getOneItem<Wallet>(STORAGE_KEYS.WALLETS, id);
}

export function addWallet(transaction: Wallet): void {
    addItem<Wallet>(STORAGE_KEYS.WALLETS, transaction);
}

export function updateWallet(id: string, updates: Partial<Wallet>): void {
    updateItem<Wallet>(STORAGE_KEYS.WALLETS, id, updates);
}

export function removeWallet(id: string): void {
    removeItem<Wallet>(STORAGE_KEYS.WALLETS, id);
}