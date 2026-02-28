import '../style/TransactionList.css'
import { BsPen } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

function TransactionList({transactions, onDelete, selectedMonth, onEditClick}){
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.id) - new Date(b.id));
    const filteredTransactions = sortedTransactions.filter(tx => {
        const txMonth = tx.date.slice(0, 7); // Ambil format YYYY-MM
        return txMonth === selectedMonth;
    });
    const deleteTransaction = (id) => {
        // Kirim event ke App.jsx untuk hapus data berdasarkan id
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            onDelete(id);
        }
    }
    return(
        <div className='transaction-list'>
            <h1>Transaction History</h1>
            <div className='scrollAble'>
                <div className="table-header grid-layout">
                    <div className="col">Date</div>
                    <div className="col">Category</div>
                    <div className="col">Amount</div>
                    <div className="col">Notes</div>
                    <div className="col" style={{textAlign: 'center'}}>Action</div>
                </div>
                {/* BODY (CONTOH DATA) */}
                <div className='tables'>
                    {filteredTransactions.length === 0 ? (
                        <p style={{textAlign: 'center', marginTop: '20px'}}>No transactions yet.</p>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <section key={tx.id} className='transaction-list-section grid-layout'>
                                <div className='col'>
                                    <p>{tx.date}</p>
                                </div>
                                <div className='col'>
                                    <p className='category-p'>{tx.category}</p>
                                </div>
                                <div className='col'>
                                    <p>{tx.amount ? new Intl.NumberFormat('id-ID').format(tx.amount) : '0'}</p>
                                </div>
                                <div className='col'>
                                    <p>{tx.notes || '-'}</p>
                                </div>
                                <div className='col action-buttons'>
                                    <button className='btn-icon' onClick={() => onEditClick(tx)}>
                                        <BsPen className='btn-edit'/>
                                    </button>
                                    <button className='btn-icon' onClick={() => deleteTransaction(tx.id)}>
                                        <BsFillTrash3Fill className='btn-delete'  />
                                    </button>
                                </div>
                            </section>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default TransactionList