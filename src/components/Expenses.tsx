
import {useState} from "react";
import { Pencil, Trash2 } from 'lucide-react';
import type  {Transaction,Wallet} from "../types";
import{getAllItems} from "../services/localStorage/localStorageHelpers.ts";
import {STORAGE_KEYS} from "../services/localStorage/types.ts";
import EditExpenseDialog from "./EditExpenseDialog.tsx";


const transactions: Transaction[] = getAllItems<Transaction>(STORAGE_KEYS.TRANSACTIONS);
const wallets: Wallet[] = getAllItems<Wallet>(STORAGE_KEYS.WALLETS);

console.log("WALLETS",wallets);

console.log("TRANSACTIONS",transactions);

const findWalletById = (id: string): string | "" => {
   const wallet =   wallets.find(wallet => wallet.id === id)

    if(wallet){
        return wallet.name
    } else {
        return ""
    }
}


const Expenses = () => {
    const [showDialog, setShowDialog] = useState(false)

    console.log(showDialog)
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden relative">

            <EditExpenseDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
            />

            <div className="overflow-x-auto">

                <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-gray-700">Date</th>
                        <th className="px-6 py-4 text-left text-gray-700">Description</th>
                        <th className="px-6 py-4 text-left text-gray-700">Category</th>
                        <th className="px-6 py-4 text-left text-gray-700">Wallet</th>
                        <th className="px-6 py-4 text-right text-gray-700">Amount</th>
                        <th className="px-6 py-4 text-center text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">

                    {transactions.map((transaction: Transaction) => (
                        <tr key={transaction.id}>
                            <td className="px-6 py-4 text-gray-900">
                                {new Date(transaction.date).toLocaleDateString('en-US',{
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </td>
                            <td className="px-6 py-4 text-gray-900">{transaction.description}</td>
                            <td className="px-6 py-4 text-gray-900">
                                <span className={` w-25 inline-flex justify-center px-3 py-1 ${transaction.type === "INCOME" ? `bg-blue-100 text-blue-800 ` : `bg-red-100 text-red-800 `} rounded-full`}>
                                    {transaction.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{findWalletById(transaction.walletId)}</td>
                            <td className="px-6 py-4 text-right text-gray-900">
                                {transaction.amount.toFixed(2)}
                            </td>

                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        aria-label="Edit expense"
                                        onClick={() => setShowDialog(true)}
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>

                                    <button
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        aria-label="Delete expense"
                                    >
                                        <Trash2 className="w-5 h-5" />
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