// File: src/context/TransactionContext.jsx
import { useState, useEffect } from 'react';
import { TransactionContext } from './GlobalContext.jsx';
// import { TransactionContext } from './GlobalContext';

// 1. BUAT BRANKAS KOSONG

// 2. BUAT PROVIDER (Penyedia Isi Brankas)
export function TransactionProvider({ children }) {
    // Pindahkan semua state dan logika localStorage ke sini
    const [transactions, setTransactions] = useState(() => {
        const savedData = localStorage.getItem('expense-data');
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('expense-data', JSON.stringify(transactions));
    }, [transactions]);

    const saveTransaction = (savedTx) => {
        setTransactions(prev => {
            const isEditing = prev.some(tx => tx.id === savedTx.id);
            return isEditing 
                ? prev.map(tx => tx.id === savedTx.id ? savedTx : tx)
                : [savedTx, ...prev];
        });
    };

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
    };

    // 3. MASUKKAN DATA KE DALAM BRANKAS (.Provider)
    return (
        <TransactionContext.Provider value={{ 
            transactions, 
            saveTransaction, 
            deleteTransaction 
        }}>
            {children}
        </TransactionContext.Provider>
    );
}
