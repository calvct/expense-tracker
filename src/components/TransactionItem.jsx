import { BsPen, BsFillTrash3Fill } from "react-icons/bs";

// Komponen ini hanya menerima data 1 transaksi (tx) dan fungsi dari induknya
function TransactionItem({ tx, onEditClick, onDelete }) {
    
    // Logika konfirmasi dipindah ke sini agar lebih rapi
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            onDelete(tx.id);
        }
    };

    return (
        <section className='transaction-list-section grid-layout'>
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
                {/* Tombol Edit */}
                <button className='btn-icon' onClick={() => onEditClick(tx)}>
                    <BsPen className='btn-edit'/>
                </button>
                
                {/* Tombol Delete */}
                <button className='btn-icon' onClick={handleDelete}>
                    <BsFillTrash3Fill className='btn-delete'  />
                </button>
            </div>
        </section>
    );
}

export default TransactionItem;