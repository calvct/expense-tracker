import Header from './components/Header'
import './App.css'
import Balance from './components/Balance'
import ExpenseChart from './components/ExpenseChart'
import IncomeExpenseChart from './components/IncomeExpenseChart'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'
import AddTransaction from './components/AddTransaction'
import { useState, useEffect } from 'react'
import { getPastMonths } from './context/AppReducer.js'; // Pastikan kamu buat fungsi ini di utils/dateUtils.js

function App() {
  const [showModal, setShowModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('expense-data');
    return savedData ? JSON.parse(savedData) : [];
  });
  useEffect(() => {
    localStorage.setItem('expense-data', JSON.stringify(transactions));
  }, [transactions]);
  const handleOpenAdd = () => {
    setTransactionToEdit(null); // Kosongkan state (Mode Tambah)
    setShowModal(true);
};
  const handleOpenEdit = (transaction) => {
    setTransactionToEdit(transaction); // Set transaction yang akan diedit
    setShowModal(true);
  };
  const handleSaveTransaction = (savedTx) => {
    if (transactionToEdit) {
        // MODE EDIT: Cari ID yang sama, lalu timpa datanya
        setTransactions(prev => 
            prev.map(tx => tx.id === savedTx.id ? savedTx : tx)
        );
    } else {
        // MODE TAMBAH: Masukkan ke paling depan seperti biasa
        setTransactions(prev => [savedTx, ...prev]);
    }
};
  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(tx => tx.id !== id);
    setTransactions(updatedTransactions);
  }
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
        onSave={handleSaveTransaction}
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
          onDelete={handleDeleteTransaction}
          transactions={transactions} 
          selectedMonth={selectedMonth}
          onEditClick={handleOpenEdit}
          />
      </section>
      
      
    </>
  )
}

export default App
