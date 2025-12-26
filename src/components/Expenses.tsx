import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Transaction, Wallet, Category } from "../types";
import {getAllTransactions, updateTransaction} from "../services/localStorage/localStorageTransactions.ts";
import {getAllWallets} from "../services/localStorage/localStorageWallets.ts";
import {getAllCategories} from "../services/localStorage/localStorageCategories.ts";
import EditExpenseDialog from "./EditExpenseDialog";




const Expenses = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(() => getAllTransactions());
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [wallets] = useState<Wallet[]>(() => getAllWallets());
    const [categories] = useState<Category[]>(() => getAllCategories());

    const isDialogOpen = selectedTransaction !== null;


    const findWalletById = (id: string): string => {
        const wallet = wallets.find((wallet) => wallet.id === id);
        return wallet ? wallet.name : "";
    };

    const findCategoryById = (id: string) :string => {
        const category = categories.find((category) => category.id === id);
        return category ? category.name : "";
    }

    const handleSaveTransaction = (updatedTransaction: Transaction) => {
        updateTransaction(updatedTransaction?.id, updatedTransaction);
        setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
        setSelectedTransaction(null);
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
            <EditExpenseDialog
                key={selectedTransaction?.id}
                isOpen={isDialogOpen}
                onClose={() => setSelectedTransaction(null)}
                onSave={handleSaveTransaction}
                transaction={selectedTransaction}
                wallets={wallets}
                categories={categories}
            />

            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* HEADER */}
                    <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                        {[
                            "Date",
                            "Description",
                            "Type",
                            "Category",
                            "Wallet",
                            "Amount",
                            "Actions",
                        ].map((header) => (
                            <th
                                key={header}
                                className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 ${
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
                    {transactions.map((transaction) => (
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
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full
                      ${
                          transaction.type === "INCOME"
                              ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                              : "bg-red-50 text-red-700 ring-1 ring-red-200"
                      }
                    `}
                  >
                    {transaction.type}
                  </span>
                            </td>

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
                                className={`px-6 py-4 text-right font-semibold
                    ${
                                    transaction.type === "INCOME"
                                        ? "text-green-600"
                                        : "text-gray-900"
                                }
                  `}
                            >
                                €{transaction.amount.toFixed(2)}
                            </td>

                            {/* ACTIONS */}
                            <td className="px-6 py-4">
                                <div className="flex justify-center gap-1">
                                    <button
                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        aria-label="Edit"
                                        onClick={() => setSelectedTransaction(transaction)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>

                                    <button
                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        aria-label="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expenses;
