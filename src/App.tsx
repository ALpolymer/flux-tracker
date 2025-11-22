import {mockUser, mockCategories, mockWallets, mockTransactions} from "./data/mockData.ts";
import {seedData} from "./utils/seedData.ts";
import {generateId} from "./utils/generateId.ts";
import {useEffect} from "react";
import {getAllTransactions, getAllWallets, getAllCategories, removeTransaction} from "./services/localStorageService.ts";
import type {Transaction} from "./types";

function App() {

    useEffect(() => {
        seedData(mockUser, "expense-tracker-user");
        seedData(mockCategories, "expense-tracker-categories");
        seedData(mockWallets, "expense-tracker-wallets");
        seedData(mockTransactions, "expense-tracker-transactions");
    }, []);

     const transactions = getAllTransactions()
    const wallets = getAllWallets()
    const categories = getAllCategories()

    console.log(wallets);
    console.log(categories);
    console.log(transactions.length);

    const newTransaction :Transaction = {
        id: generateId(),
        walletId: mockWallets[0].id,
        categoryId: mockCategories[0].id,
        type: "EXPENSE",
        amount: 50,
        description: "test description",
        date: new Date().toISOString(),
        createdAt: new Date().toISOString()
    }



    return (
      <>
              <h1 className="text-3xl font-bold underline">
                  Expense Tracker
              </h1>

              <div className="mt-4">
                  <p>✅ Mock Data Loaded Successfully!</p>
                  <p>📊 Transactions: {mockTransactions.length}</p>
                  <p>🏷️ Categories: {mockCategories.length}</p>
                  <p>💰 Wallets: {mockWallets.length}</p>
              </div>

              {/* Display first 5 transactions */}
              <div className="mt-6">
                  <h2 className="text-xl font-bold">Sample Transactions:</h2>
                  <ul className="mt-2">
                      {mockTransactions.slice(0, 15).map(transaction => (
                          <li key={transaction.id} className="border-b py-2">
                              {transaction.type} - €{transaction.amount}
                              {transaction.description && ` - ${transaction.description} -`}
                              - {new Date(transaction.date).toLocaleDateString(
                              'el-GR', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit',
                                  hour12: true
                              }
                          )}
                          </li>
                      ))}
                  </ul>
              </div>

      </>
  )
}

export default App
