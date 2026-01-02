import { useState } from "react";
import {useFilterState} from "../hooks/useFilterState.ts";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Transaction, Wallet, Category } from "../types";
import { getAllTransactions, updateTransaction, removeTransaction , addTransaction} from "../services/localStorage/localStorageTransactions.ts";
import { getAllWallets } from "../services/localStorage/localStorageWallets.ts";
import { getAllCategories } from "../services/localStorage/localStorageCategories.ts";
import EditTransactionDialog from "./EditTransactionDialog.tsx";
import DeleteTransactionDialog from "./DeleteTransactionDialog.tsx";
import AddTransactionDialog from "./AddTransactionDialog.tsx";
import FilterBar from "./FilterBar.tsx";

const Expenses = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => getAllTransactions());
    const {sortedAndFilteredTransactions, filters, setFilters, resetFilters} = useFilterState(transactions);
    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
    const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [addDialogKey, setAddDialogKey] = useState(0);
    const [wallets] = useState<Wallet[]>(() => getAllWallets());
    const [categories] = useState<Category[]>(() => getAllCategories());


    const isEditDialogOpen = transactionToEdit !== null;
    const isDeleteDialogOpen = transactionToDelete !== null;

    const findWalletById = (id: string): string => {
        const wallet = wallets.find((wallet) => wallet.id === id);
        return wallet ? wallet.name : "";
    };

    const findCategoryById = (id: string): string => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : "";
    };

    const handleSaveTransaction = (updatedTransaction: Transaction) => {
        updateTransaction(updatedTransaction?.id, updatedTransaction);
        setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
        setTransactionToEdit(null);
    };

    const handleDeleteTransaction = () => {
        if (!transactionToDelete) return;
        removeTransaction(transactionToDelete.id);
        const newTransactions = transactions.filter((transaction: Transaction) => transaction.id !== transactionToDelete.id);
        setTransactions(newTransactions);
        setTransactionToDelete(null);
    };


    const handleAddTransaction = (newTransaction: Transaction) => {
        addTransaction(newTransaction);
        setTransactions([newTransaction, ...transactions]);
        setIsAddDialogOpen(false);

    };

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {sortedAndFilteredTransactions.length} of {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setAddDialogKey(prev => prev + 1);
                        setIsAddDialogOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    Add Transaction
                </button>
            </div>

            {/* FILTER BAR - Full width on its own row */}
            <FilterBar
                filters={filters}
                setNewFilters={setFilters}
                wallets={wallets}
                categories={categories}
                onReset={resetFilters}
            />

            {/* Dialogs */}
            <EditTransactionDialog
                key={transactionToEdit?.id}
                isOpen={isEditDialogOpen}
                onClose={() => setTransactionToEdit(null)}
                onSave={handleSaveTransaction}
                transaction={transactionToEdit}
                wallets={wallets}
                categories={categories}
            />

            <DeleteTransactionDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setTransactionToDelete(null)}
                onDelete={handleDeleteTransaction}
            />

            <AddTransactionDialog
                key = { addDialogKey }
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onSave={handleAddTransaction}
                wallets={wallets}
                categories={categories}
            />

            {/* Table Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* HEADER */}
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {["Date", "Description", "Type", "Category", "Wallet", "Amount", "Actions"].map((header) => (
                                <th
                                    key={header}
                                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 ${
                                        header === "Amount" ? "text-right" : ""
                                    } ${header === "Actions" ? "text-center" : "text-left"}`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="divide-y divide-gray-100">
                        {sortedAndFilteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                    No transactions found...
                                </td>
                            </tr>
                        ) : (
                            sortedAndFilteredTransactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {/* DATE */}
                                    <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                        {new Date(transaction.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>

                                    {/* DESCRIPTION */}
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-[220px] truncate">
                                        {transaction.description || "—"}
                                    </td>

                                    {/* TYPE */}
                                    <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                                                    transaction.type === "INCOME"
                                                        ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                                                        : "bg-red-50 text-red-700 ring-1 ring-red-200"
                                                }`}
                                            >
                                                {transaction.type}
                                            </span>
                                    </td>

                                    {/* CATEGORY */}
                                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                                        {findCategoryById(transaction.categoryId)}
                                    </td>

                                    {/* WALLET */}
                                    <td className="px-6 py-4 text-sm">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700">
                                                {findWalletById(transaction.walletId)}
                                            </span>
                                    </td>

                                    {/* AMOUNT */}
                                    <td
                                        className={`px-6 py-4 text-right font-semibold ${
                                            transaction.type === "INCOME"
                                                ? "text-green-600"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {transaction.type === "INCOME" ? "+" : "-"}€{transaction.amount.toFixed(2)}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-1">
                                            <button
                                                className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                aria-label="Edit"
                                                onClick={() => setTransactionToEdit(transaction)}
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>

                                            <button
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                aria-label="Delete"
                                                onClick={() => setTransactionToDelete(transaction)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Expenses;