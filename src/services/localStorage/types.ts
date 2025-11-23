export interface HasId{
    id: string;
}

// as const makes fields readonly
export const STORAGE_KEYS = {
    TRANSACTIONS: "expense-tracker-transactions",
    CATEGORIES: "expense-tracker-categories",
    WALLETS: "expense-tracker-wallets",
    USER: "expense-tracker-user"
} as const;
