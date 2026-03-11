
export const getTodayDate = () => {
    let today = new Date()
    return today.toISOString().split('T')[0];
}

export const CATEGORY_ENUM = Object.freeze({
    FOOD: "food",
    TRANSPORT: "transportation",
    SHOPPING: "shopping",
    ENTERTAINMENT: "entertainment",
    ETC: "etc"
});
export const getPastMonths = () => {
    const months = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
        // Mundurkan bulan sebanyak 'i'
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        
        // Value untuk logika (Format: YYYY-MM -> misal "2026-02")
        const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        
        // Label untuk tampilan user (Format Indonesia -> "Februari 2026")
        const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        months.push({ value, label });
    }
    return months;
};

export const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    }

// Di dalam src/hooks/useTransactions.js

import { useState, useEffect } from 'react';

export function useTransactions() {
    const [tx, setTransactions] = useState(() => {
        const savedData = localStorage.getItem('expense-data');
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('expense-data', JSON.stringify(tx));
    }, [tx]);

    // 👇 Dari handleSaveTransaction kamu
    const saveTransaction = (savedTx) => {
        setTransactions(prev => {
            // Cek apakah ID sudah ada di database (Berarti Edit)
            const isEditing = prev.some(tx => tx.id === savedTx.id);
            
            if (isEditing) {
                // MODE EDIT
                return prev.map(tx => tx.id === savedTx.id ? savedTx : tx);
            } else {
                // MODE TAMBAH
                return [savedTx, ...prev];
            }
        });
    };

    // 👇 Dari handleDeleteTransaction kamu
    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
    };

    return { tx, saveTransaction, deleteTransaction };
}