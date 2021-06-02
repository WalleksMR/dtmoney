import { createContext, FormEvent, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type Transaction = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionContextProps = {
  children: ReactNode
}

type TransactionContextData = {
  transactions: Array<Transaction>;
  title: string;
  category: string;
  type: string;
  amount: number;
  handleNewTranslation: (event: FormEvent) => Promise<void>;
  setTitle: (title: string) => void;
  setAmount: (amount: number) => void;
  setCategory: (category: string) => void;
  setType: (type: string) => void;
  
}

const TransactionsContext = createContext({} as TransactionContextData);

export function useTransaction() {
  return useContext(TransactionsContext)
}

export function TransactionContext({children}: TransactionContextProps){

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  function handleClean(){
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
  }

  async function handleNewTranslation(event: FormEvent){
    event.preventDefault();

    const data = {
      title,
      category,
      type,
      amount,
      createdAt: new Date()
    }   

    const response = await api.post('/transactions', data)
    const {transaction} = response.data
   
 
    setTransactions(
      [
      ...transactions,
      transaction
      ]
      )

    handleClean()
  }

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      handleNewTranslation,
      title,
      category,
      amount,
      type,
      setCategory,
      setAmount,
      setTitle,
      setType
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}