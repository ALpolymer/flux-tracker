
import {generateId} from "./generateId.ts";
import {getRandomDate} from "./getRandomDate.ts";
import type {Transaction} from "../types";
import type {Category} from "../types";
import type {Wallet} from "../types";

export const generateMockTransactions = (count: number, wallets: Wallet[], categories: Category[]): Transaction[] => {
    const transactions: Transaction[] = [];

    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    const randomizeTransactionTypeAmount = (): ["INCOME"|"EXPENSE", number] => {

        const randomNumber = Math.random()
        let transactionType:"INCOME" | "EXPENSE";
        let transactionAmount:number
        if(randomNumber < 0.3){
            transactionType = "INCOME";
        } else{
            transactionType = "EXPENSE";
        }


        if(transactionType === "EXPENSE"){
            transactionAmount = getRandomInt(10, 200)
        } else {
            transactionAmount = getRandomInt(1000, 3000)
        }

        return [transactionType, transactionAmount]

    }



    for (let i = 0; i < count; i++) {
        const [transactionType, transactionAmount] = randomizeTransactionTypeAmount();

        const transaction: Transaction = {
            id: generateId(),
            walletId: wallets[Math.floor(Math.random() * wallets.length)].id,
            categoryId: categories[Math.floor(Math.random() * categories.length)].id,
            type: transactionType,
            amount: transactionAmount,
            description: Math.random() < 0.3 ? "Some description" : undefined,
            date: getRandomDate(120),
            createdAt: getRandomDate(120)

        }

        transactions.push(transaction);
    }

    return transactions;
}