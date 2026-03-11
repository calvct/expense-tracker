import Header from './components/Header'
import './App.css'
import Balance from './components/Balance'
import ExpenseChart from './components/ExpenseChart'
import IncomeExpenseChart from './components/IncomeExpenseChart'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'
import { useState, useContext } from 'react'
import { getPastMonths } from './context/AppReducer.js'; // Pastikan kamu buat fungsi ini di utils/dateUtils.js
import { TransactionContext } from './context/GlobalContext.jsx'; // Pastikan path ini benar sesuai struktur foldermu

function App() {
  const [showModal, setShowModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  // const { tx, saveTransaction, deleteTransaction } = useTransactions();
  const { transactions, saveTransaction, deleteTransaction } = useContext(TransactionContext);

  const handleOpenAdd = () => {
    setTransactionToEdit(null); // Kosongkan state (Mode Tambah)
    setShowModal(true);
};
  const handleOpenEdit = (transaction) => {
    setTransactionToEdit(transaction); // Set transaction yang akan diedit
    setShowModal(true);
  };
  
    const monthOptions = getPastMonths();
    
    const [selectedMonth, setSelectedMonth] = useState(monthOptions[0].value);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };
  return (
    <>
      <Header onAddClick={handleOpenAdd} />
      <section className='card-section'>
        {showModal && (
    <AddTransaction 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={saveTransaction}
        dataToEdit={transactionToEdit}
    />
        )}
        <Balance 
        selectedMonth={selectedMonth} 
        handleMonthChange={handleMonthChange} 
        transactions={transactions} />
        <ExpenseChart selectedMonth={selectedMonth} />
        <IncomeExpenseChart selectedMonth={selectedMonth} />
      </section>
      <section className='data-section'>
        <IncomeExpense selectedMonth={selectedMonth} transactions={transactions} />
        <TransactionList
          onDelete={deleteTransaction}
          transactions={transactions} 
          selectedMonth={selectedMonth}
          onEditClick={handleOpenEdit}
          />
      </section>
      
      
    </>
  )
}

export default App
