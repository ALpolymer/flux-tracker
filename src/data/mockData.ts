import type {User, Category, Wallet} from "../types";
import {generateId} from "../utils/generateId.ts";
import {getRandomDate} from "../utils/getRandomDate.ts";


export const mockUser:User = {
    id: generateId(),
    username: "demo user 1",
    createdAt: new Date().toISOString(),
    email: "demo@example.com",
    password: "hashed_password_123",
}

export const mockCategories:Category[] = [
    {
        id: generateId(),
        userId: mockUser.id,
        name:"Food",
        description: "Restaurants, groceries, etc",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name:"Gas",
        createdAt: getRandomDate(30),
    },
    {   id: generateId(),
        userId: mockUser.id,
        name:"Electricity",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name:"Entertainment",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name:"Clothing",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name:"Loan",
        createdAt: getRandomDate(30),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name:"Health",
        createdAt: getRandomDate(30),
    }
]


export const mockWallet:Wallet[] = [
    {
        id: generateId(),
        userId: mockUser.id,
        name: "Alpha Bank",
        balance: 1000,
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name: "Piraeus Bank",
        balance: 2000,
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        userId: mockUser.id,
        name: "Binance",
        balance: 2000,
        createdAt: new Date().toISOString(),
    },

]