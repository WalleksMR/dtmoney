import React, { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTranslationModal } from './components/NewTransactionModal';
import { GlobalStyle } from "./styles/global";
import { TransactionContext } from './hooks/useTransaction';

// Config Modal
Modal.setAppElement('#root');

export function App() {

  //Modal add new transaction
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)
  function handleOpenNewTransactionModal(){
    setIsNewTransactionModalOpen(true)
  }
  function handleCloseNewTransactionModal(){
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionContext>
      <GlobalStyle/>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      
      <NewTranslationModal isOpen={isNewTransactionModalOpen} onCloseModal={handleCloseNewTransactionModal}/>
    </TransactionContext>
  );
}


