import Dialog from "./Dialog";
import type {Transaction, Wallet, Category} from "../types";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {generateId} from "../utils/generateId.ts";


interface AddTransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Transaction) => void;
    wallets: Wallet[];
    categories: Category[];
}

const dateCodec = z.codec(
    z.string(),
    z.iso.datetime(),
    {
        decode: (dateInput) => new Date(dateInput).toISOString(),
        encode: (isoString) => isoString.split('T')[0]
    }
);

const addTransactionSchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.number({
        message: "Please enter a valid amount"
    }).positive("Amount must be positive"),
    description: z.string().optional(),
    categoryId: z.string().min(1, "Please select a category"),
    walletId: z.string().min(1, "Please select a wallet"),
    date: dateCodec,
})

type AddTransaction = z.infer<typeof addTransactionSchema>;

const AddTransactionDialog = ({isOpen, onClose, wallets, categories, onSave}: AddTransactionDialogProps) => {


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AddTransaction>({
        resolver: zodResolver(addTransactionSchema),
        defaultValues:{
            type: "EXPENSE",
            amount: undefined,
            date: dateCodec.encode(new Date().toISOString()),
            categoryId: "",
            walletId: "",
            description: ""
        }
    });

    const onSubmit: SubmitHandler<AddTransaction> = (data ) =>{
        const newTransaction: Transaction = {
            id: generateId(),
            type: data.type,
            amount: data.amount,
            description: data.description,
            walletId: data.walletId,
            categoryId: data.categoryId,
            date: data.date,
            createdAt: new Date().toISOString(),
        }

        onSave(newTransaction);
    }

    const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5";
    const inputStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow";
    const selectStyles = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow cursor-pointer";
    const errorStyles = "text-red-500 text-xs mt-1";


    return (
        <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Add New Transaction"
        closeOnBackdropClick={false}
        >
            <Dialog.Body>
                <form  id="add-transaction-form" className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className={labelStyles}>Transaction Type</label>
                        <div className="flex gap-2">
                            <label className="flex-1">
                                <input
                                    type="radio"
                                    value="INCOME"
                                    {...register("type")}
                                    className="sr-only peer"
                                />
                                <div className="px-4 py-2.5 text-center text-sm font-medium rounded-lg border-2 cursor-pointer transition-all peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 border-gray-200 text-gray-600 hover:bg-gray-50">
                                    Income
                                </div>
                            </label>
                            <label className="flex-1">
                                <input
                                    type="radio"
                                    value="EXPENSE"
                                    {...register("type")}
                                    className="sr-only peer"
                                />
                                <div className="px-4 py-2.5 text-center text-sm font-medium rounded-lg border-2 cursor-pointer transition-all peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 border-gray-200 text-gray-600 hover:bg-gray-50">
                                    Expense
                                </div>
                            </label>
                        </div>
                        {errors.type && <p className={errorStyles}>{errors.type.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="amount" className={labelStyles}>Amount (€)</label>
                        <input
                            id="amount"
                            type="number"
                            step="0.1"
                            placeholder="0.00"
                            {...register("amount", { valueAsNumber: true })}
                            className={inputStyles}
                        />

                        {errors.amount && <p className={errorStyles}>{errors.amount.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="walletId" className={labelStyles}>Wallet</label>
                            <select id="walletId" {...register("walletId")} className={selectStyles}>
                                <option value="">Select wallet...</option>
                                {wallets.map(wallet => (
                                    <option key={wallet.id} value={wallet.id}>
                                        {wallet.name}
                                    </option>
                                ))}
                            </select>
                            {errors.walletId && <p className={errorStyles}>{errors.walletId.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="categoryId" className={labelStyles}>Category</label>
                            <select id="categoryId" {...register("categoryId")} className={selectStyles}>
                                <option value="">Select category...</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && <p className={errorStyles}>{errors.categoryId.message}</p>}
                        </div>
                    </div>


                    <div>
                        <label htmlFor="date" className={labelStyles}>Date</label>
                        <input
                            id="date"
                            type="date"
                            {...register("date")}
                            className={inputStyles}
                        />
                        {errors.date && <p className={errorStyles}>{errors.date.message}</p>}
                    </div>


                    <div>
                        <label htmlFor="description" className={labelStyles}>
                            Description <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            placeholder="Add a note..."
                            {...register("description")}
                            className={`${inputStyles} resize-none`}
                        />
                        {errors.description && <p className={errorStyles}>{errors.description.message}</p>}
                    </div>
                </form>
            </Dialog.Body>

            <Dialog.Footer>
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Save Transaction
                </button>
            </Dialog.Footer>

        </Dialog>
    );
};

export default AddTransactionDialog;