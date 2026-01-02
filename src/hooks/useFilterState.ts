import type {Transaction, FilterState} from "../types";
import { useState} from "react";

export function useFilterState(transactions: Transaction[]) {
    const [filters, setFilters] = useState<FilterState>({
        type: "ALL",
        categoryId: null,
        walletId: null,
        dateFrom: null,
        dateTo:null,
        sortBy: ""
    });

    const resetFilters = () =>{
        setFilters({
            type: "ALL",
            categoryId: null,
            walletId: null,
            dateFrom: null,
            dateTo:null,
            sortBy: "",
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


    const sortFilteredTransactions = (transactions: Transaction[], sortBy: FilterState["sortBy"] ) :Transaction[] => {
        const sortedTransactions = [...transactions];

        switch(sortBy) {
            case "AMOUNT_ASC":
                sortedTransactions.sort((a,b) =>  a.amount - b.amount);
                break;
            case "AMOUNT_DESC":
                sortedTransactions.sort((a,b) =>  b.amount - a.amount);
                break;
            case "DATE_ASC":
                sortedTransactions.sort((a,b) => {
                    const dateA = new Date(a.date.split("T")[0]).getTime()
                    const dateB = new Date(b.date.split("T")[0]).getTime()

                    return dateA - dateB;
                });
                break;
            case "DATE_DESC":
                sortedTransactions.sort((a,b) => {
                    const dateA = new Date(a.date.split("T")[0]).getTime()
                    const dateB = new Date(b.date.split("T")[0]).getTime()

                    return dateB - dateA;
                });
                break;
            default: return sortedTransactions;
        }

        return sortedTransactions;
    }

    const sortedAndFilteredTransactions = sortFilteredTransactions(filteredTransactions, filters.sortBy)

    console.log(sortedAndFilteredTransactions);

    return {
        sortedAndFilteredTransactions, setFilters, filters, resetFilters
    }
}

