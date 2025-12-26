import Dialog from "./Dialog";
import type {Transaction,Wallet,Category} from "../types";
import {z} from "zod";
import {useForm, type SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

interface EditExpenseDialogProps {
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


const EditExpenseDialog = ({isOpen, onClose, transaction, wallets, categories}:EditExpenseDialogProps) => {


    const {
        register,
        handleSubmit,
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
    return (
        <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Edit Transaction"
        closeOnBackdropClick = {false}
        >

            <Dialog.Body>
                <form className="mt-8 space-y-6">

                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Amount</label>
                        <input
                            {...register("amount")}
                            className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Type</label>
                        <input
                            {...register("type")}
                            className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="type" className="sr-only">Description</label>
                        <textarea
                            {...register("description")}
                            className="appearance-none relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
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
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Save
                </button>
            </Dialog.Footer>

        </Dialog>
    );
};

export default EditExpenseDialog;