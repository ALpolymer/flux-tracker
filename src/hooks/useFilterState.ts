import type {Transaction, FilterState} from "../types";
import { useState} from "react";

export function useFilterState(transactions: Transaction[]) {
    const [filters, setFilters] = useState<FilterState>({
        type: "ALL",
        categoryId: null,
        walletId: null,
        dateFrom: null,
        dateTo:null
    });

    const resetFilters = () =>{
        setFilters({
            type: "ALL",
            categoryId: null,
            walletId: null,
            dateFrom: null,
            dateTo:null
        })
    }
    const filteredTransactions = transactions.filter((t) => {

        const matchesType = filters.type === "ALL" || t.type === filters.type;

        const matchesCategory = filters.categoryId === null || t.categoryId === filters.categoryId;

        const matchesWallet = filters.walletId === null || t.walletId === filters.walletId;

        const matchesDateFrom = filters.dateFrom === null || t.date >= filters.dateFrom

        const matchesDateTo = filters.dateTo === null || t.date <= filters.dateTo

        return matchesType && matchesCategory && matchesWallet && matchesDateFrom && matchesDateTo;

    })

    return {
        filteredTransactions,setFilters,filters,resetFilters
    }
}

