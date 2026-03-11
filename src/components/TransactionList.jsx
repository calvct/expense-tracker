import '../style/TransactionList.css';
import TransactionItem from './TransactionItem.jsx'; // 👈 Import komponen anaknya
import {useContext} from 'react';
import { TransactionContext } from '../context/GlobalContext.jsx'; // Pastikan path ini benar sesuai struktur foldermu

function TransactionList({ selectedMonth, onEditClick }) {
    
    const { transactions, deleteTransaction } = useContext(TransactionContext);
    // Logika sorting dan filtering tetap di sini
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.id) - new Date(b.id));
    
    const filteredTransactions = sortedTransactions.filter(tx => {
        const txMonth = tx.date.slice(0, 7); // Ambil format YYYY-MM
        return txMonth === selectedMonth;
    });

    return (
        <div className='transaction-list'>
            <h1>Transaction History</h1>
            <div className='scrollAble'>
                
                {/* HEADER TABEL */}
                <div className="table-header grid-layout">
                    <div className="col">Date</div>
                    <div className="col">Category</div>
                    <div className="col">Amount</div>
                    <div className="col">Notes</div>
                    <div className="col" style={{textAlign: 'center'}}>Action</div>
                </div>

                {/* BODY TABEL */}
                <div className='tables'>
                    {filteredTransactions.length === 0 ? (
                        <p style={{textAlign: 'center', marginTop: '20px'}}>No transactions yet.</p>
                    ) : (
                        filteredTransactions.map((tx) => (
                            // 👇 Panggil komponen anak, lempar datanya (props)
                            <TransactionItem 
                                key={tx.id} 
                                tx={tx} 
                                onEditClick={onEditClick} 
                                onDelete={deleteTransaction} 
                            />
                        ))
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default TransactionList;