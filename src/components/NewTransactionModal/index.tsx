import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';

import closeImg from '../../assets/close.svg';
import outcomeImg from '../../assets/outcome.svg';
import incomeImg from '../../assets/income.svg';
import { useTransaction } from '../../hooks/useTransaction';

interface NewTranslationModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

export function NewTranslationModal({isOpen, onCloseModal}: NewTranslationModalProps) {
 const {
  title,
  amount,
  category,
  type,
  setTitle,
  setAmount,
  setCategory,
  setType,
  handleNewTranslation
} = useTransaction();
  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onCloseModal}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
          <button type="button" className="react-modal-close" onClick={onCloseModal} >
            <img src={closeImg} alt="Fechar modal" />
          </button>

          <Container onSubmit={handleNewTranslation}>
            <h2>Cadastrar transacao</h2>

            <input 
              placeholder="Titulo" 
              value={title}
              onChange={event => setTitle(event.target.value)}
            />

            <input 
              type="number"
              placeholder="Valor" 
              value={amount}
              onChange={event => setAmount(Number(event.target.value))}
            />
            <TransactionTypeContainer>
              <RadioBox 
                isActive={type === 'deposit'}
                isActiveColor="green"
                onClick={() => setType('deposit')}
                type="button">

                  <img src={incomeImg} alt="Entrada" />
                  <span>Entrada</span>

              </RadioBox>

              <RadioBox
                isActive={type === 'withdraw'}
                isActiveColor="red"
                onClick={() => setType('withdraw')}
                type="button">

                  <img src={outcomeImg} alt="Saida" />
                  <span>Saida</span>

              </RadioBox>
            </TransactionTypeContainer>
            
            <input 
              placeholder="Categoria" 
              value={category}
              onChange={event => setCategory(event.target.value)}
            />

            <button type="submit">
              Cadastrar
            </button>
          </Container>
    </Modal>
  )
}