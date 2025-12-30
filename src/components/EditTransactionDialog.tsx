import Dialog from "./Dialog";
import type {Transaction,Wallet,Category} from "../types";
import {z} from "zod";
import {useForm, type SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface EditTransactionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (transaction: Transaction) => void;
    transaction: Transaction | null;
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

const editTransactionSchema = z.object({
    type: z.enum(["INCOME", "EXPENSE"]),
    amount: z.number().positive(),
    description: z.string().optional(),
    categoryId: z.string(),
    walletId: z.string(),
    date: dateCodec,

})

type EditTransaction = z.infer<typeof editTransactionSchema>


const EditTransactionDialog = ({isOpen, onClose, transaction, wallets, categories, onSave}:EditTransactionDialogProps) => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } =
        useForm<EditTransaction>({
            resolver: zodResolver(editTransactionSchema),
            defaultValues: {
                type: transaction?.type,
                amount: transaction?.amount,
                description: transaction?.description,
                categoryId: transaction?.categoryId,
                walletId: transaction?.walletId,
                date: transaction?.date ? dateCodec.encode(transaction.date) : ""
            }
        }
    );

    const onSubmit: SubmitHandler<EditTransaction> =  (data) => {
        if (!transaction){
            return;
        }
        const updatedTransaction :Transaction = {
            id: transaction.id,
            type: data.type,
            amount: data.amount,
            description: data.description,
            walletId: data.walletId,
            categoryId: data.categoryId,
            date: data.date,
            createdAt: transaction.createdAt,
            updatedAt: new Date().toISOString(),
        }

        onSave(updatedTransaction);

    }

    return (
        <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Transaction"
        closeOnBackdropClick = {false}
        >

            <Dialog.Body>
                <form  id="edit-transaction-form" className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Amount</label>
                        <input
                            {...register("amount", {valueAsNumber: true})}
                            className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {errors.amount && (
                            <p className="text-red-600 text-sm">{errors.amount.message}</p>
                        )}
                    </div>


                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Type</label>
                        <select {...register("type")}>
                            <option value="INCOME">Income</option>
                            <option value="EXPENSE">Expense</option>
                        </select>
                        {errors.type && (
                            <p className="text-red-600 text-sm">{errors.type.message}</p>
                        )}
                    </div>


                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Description</label>
                        <textarea
                            {...register("description")}
                            className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                        {errors.description && (
                            <p className="text-red-600 text-sm">{errors.description.message}</p>
                        )}
                    </div>



                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Wallet</label>
                        <select {...register("walletId")}>
                            {wallets.map(wallet => (
                                <option key={wallet.id} value={wallet.id}>
                                    {wallet.name}
                                </option>
                            ))}
                        </select>
                        {errors.walletId && (
                            <p className="text-red-600 text-sm">{errors.walletId.message}</p>
                        )}
                    </div>


                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Category</label>
                        <select {...register("categoryId")}>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.categoryId && (
                            <p className="text-red-600 text-sm">{errors.categoryId.message}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Date</label>
                        <input type="date"  {...register("date")} />
                        {errors.date && (
                            <p className="text-red-600 text-sm">{errors.date.message}</p>
                        )}
                    </div>

                </form>
            </Dialog.Body>

            <Dialog.Footer>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Save
                </button>
            </Dialog.Footer>

        </Dialog>
    );
};

export default EditTransactionDialog;