import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

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
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([])

  async function fetchTransactions(query?: string) {
    const response = await axios.get("transactions", {
      params: {
        q: query,
      }
    })

    setTransaction(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  return(
    <TransactionsContext.Provider value={{ 
      transactions ,
      fetchTransactions,
    }}>
      { children }
    </TransactionsContext.Provider>
  )
}