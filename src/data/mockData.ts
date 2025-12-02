import type {User, Category, Wallet, Transaction} from "../types";
import {generateId} from "../utils/generateId.ts";
import {getRandomDate} from "../utils/getRandomDate.ts";
import {generateMockTransactions} from "../utils/generateMockTransactions.ts";


export const mockUsers:User[] = [
    {
        id: generateId(),
        username: "user1",
        createdAt: new Date().toISOString(),
        email: "user1@example.com",
        password: "Password1!",

    },
    {
        id: generateId(),
        username: "user2",
        createdAt: new Date().toISOString(),
        email: "user2@example.com",
        password: "Password2!",
    }

]

export const mockCategories:Category[] = [
    {
        id: generateId(),
        userId: mockUsers[1].id,
        name:"Food",
        description: "Restaurants, groceries, etc",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUsers[0].id,
        name:"Gas",
        createdAt: getRandomDate(30),
    },
    {   id: generateId(),
        userId: mockUsers[1].id,
        name:"Electricity",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUsers[0].id,
        name:"Entertainment",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUsers[0].id,
        name:"Clothing",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUsers[1].id,
        name:"Loan",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUsers[0].id,
        name:"Health",
        createdAt: getRandomDate(30),
    }
]


export const mockWallets:Wallet[] = [
    {
        id: generateId(),
        userId: mockUsers[1].id,
        name: "Alpha Bank",
        balance: 1000,
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        userId: mockUsers[0].id,
        name: "Piraeus Bank",
        balance: 2000,
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        userId: mockUsers[1].id,
        name: "Binance",
        balance: 2000,
        createdAt: new Date().toISOString(),
    }]

    export const mockTransactions:Transaction[] = generateMockTransactions(50, mockWallets, mockCategories)