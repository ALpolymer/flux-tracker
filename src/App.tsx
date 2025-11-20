import {mockUser, mockCategories, mockWallets, mockTransactions} from "./data/mockData.ts";
import {seedData} from "./utils/seedData.ts";
import {useEffect} from "react";
import {getAllTransactions} from "./services/localStorageService.ts";

function App() {

    useEffect(() => {
        seedData(mockUser, "expense-tracker-user");
        seedData(mockCategories, "expense-tracker-categories");
        seedData(mockWallets, "expense-tracker-wallets");
        seedData(mockTransactions, "expense-tracker-transactions");
    }, []);

    const transactions = getAllTransactions()

    console.log(transactions[0]);

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
