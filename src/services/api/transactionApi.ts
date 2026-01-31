import axiosClient from "./axiosClient.ts";
import type {Transaction} from "../../types";


export const fetchAllTransactions = async (): Promise<Transaction[]> => {
    try {
        const response = await axiosClient.get<Transaction[]>('/api/transactions');

        console.log(response.data);

        return response.data
    } catch (error) {
        return Promise.reject(error);
    }
}
