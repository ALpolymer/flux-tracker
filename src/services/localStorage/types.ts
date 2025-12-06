export interface HasId{
    id: string;
}

// as const makes fields readonly
export const STORAGE_KEYS = {
    TRANSACTIONS: "flux-tracker-transactions",
    CATEGORIES: "flux-tracker-categories",
    WALLETS: "flux-tracker-wallets",
    USERS: "flux-tracker-users",
    USER: "flux-tracker-user"
} as const;
