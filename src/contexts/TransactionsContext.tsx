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
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionProvider({ children }: TransactionProviderProps) {

    const [transactions, setTransaction] = useState<Transaction[]>([])

  async function loadTransaction() {
    const response = await fetch('http://localhost:3333/transactions');
    const data = await response.json();

    setTransaction(data);
  }
  
  useEffect(() => {
    loadTransaction();
  }, [])

  return(
    <TransactionsContext.Provider value={{ transactions }}>
      { children }
    </TransactionsContext.Provider>
  )
}