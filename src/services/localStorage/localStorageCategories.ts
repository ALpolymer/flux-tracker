import type {Category} from "../../types";
import {STORAGE_KEYS} from "./types.ts";
import {getAllItems, getOneItem, removeItem, updateItem, addItem} from "./localStorageHelpers.ts";

export function getAllCategories(): Category[] {
    return getAllItems<Category>(STORAGE_KEYS.CATEGORIES);
}

export function getCategoryById(id: string): Category | undefined {
    return getOneItem<Category>(STORAGE_KEYS.CATEGORIES, id);
}

export function addCategory(transaction: Category): void {
    addItem<Category>(STORAGE_KEYS.CATEGORIES, transaction);
}

export function updateCategory(id: string, updates: Partial<Category>): void {
    updateItem<Category>(STORAGE_KEYS.CATEGORIES, id, updates);
}

export function removeCategory(id: string): void {
    removeItem<Category>(STORAGE_KEYS.CATEGORIES, id);
}