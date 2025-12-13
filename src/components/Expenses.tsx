import { Pencil, Trash2 } from 'lucide-react';


interface Expense {
    id: string;
    date: string;
    description: string;
    category: string;
    wallet: string;
    amount: number;
}

const initialExpenses: Expense[] = [
    {
        id: '1',
        date: '2025-12-10',
        description: 'Grocery shopping',
        category: 'Food & Dining',
        wallet: 'Cash',
        amount: 85.50
    },
    {
        id: '2',
        date: '2025-12-11',
        description: 'Gas station',
        category: 'Transportation',
        wallet: 'Credit Card',
        amount: 45.00
    },
    {
        id: '3',
        date: '2025-12-11',
        description: 'Netflix subscription',
        category: 'Entertainment',
        wallet: 'Debit Card',
        amount: 15.99
    },
    {
        id: '4',
        date: '2025-12-12',
        description: 'Coffee shop',
        category: 'Food & Dining',
        wallet: 'Cash',
        amount: 5.75
    },
    {
        id: '5',
        date: '2025-12-13',
        description: 'Electricity bill',
        category: 'Utilities',
        wallet: 'Bank Transfer',
        amount: 120.00
    }
];


const Expenses = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    {initialExpenses.map((expense: Expense) => (
                        <tr key={expense.id}  className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-gray-900">
                                {new Date(expense.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </td>
                            <td className="px-6 py-4 text-gray-900">{expense.description}</td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                                {expense.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-900">{expense.wallet}</td>
                            <td className="px-6 py-4 text-right text-gray-900">
                                ${expense.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button

                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        aria-label="Edit expense"
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