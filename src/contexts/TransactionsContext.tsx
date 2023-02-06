import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: createTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode
}

interface createTransactionInput {
  description: string;
  category: string;
  price: number;
  type: 'income' | 'outcome';
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransaction(response.data)
  }

  async function createTransaction(data: createTransactionInput) {
    const { description, category, price, type } = data;

    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransaction(state => [response.data, ...state]);
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  return(
    <TransactionsContext.Provider value={{ 
      transactions ,
      fetchTransactions,
      createTransaction,
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}