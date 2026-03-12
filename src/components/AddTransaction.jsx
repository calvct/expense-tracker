import '../style/AddTransaction.css'
import { BsX } from "react-icons/bs";
import { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import {CATEGORY_ENUM, getTodayDate} from '../context/AppReducer.js'



// Terima props isOpen dan onClose
function AddTransaction({ isOpen, onClose, onSave, dataToEdit }) {
   ; // Apa yang dilihat user (ada Rp)
    const [realValue, setRealValue] = useState(dataToEdit ? dataToEdit.amount : 0);
    const [category, setCategory] = useState(dataToEdit ? dataToEdit.category : CATEGORY_ENUM.FOOD);
    const [displayValue, setDisplayValue] = useState(dataToEdit ? new Intl.NumberFormat('id-ID').format(dataToEdit.amount) : '');
    const handleChange = (e) => {
        const input = e.target.value;
        
        // 1. Ambil hanya angkanya saja (buang huruf/titik)
        const numbersOnly = input.replace(/[^0-9]/g, '');
        
        // 2. Simpan angka murni ke state (untuk dikirim ke database nanti)
        setRealValue(numbersOnly);

        // 3. Format jadi Rupiah untuk tampilan (pakai Intl)
        if (numbersOnly === '') {
            setDisplayValue('');
        } else {
            const formatted = new Intl.NumberFormat('id-ID').format(numbersOnly);
            setDisplayValue(formatted);
        }
    };
    const [note, setNote] = useState(dataToEdit ? (dataToEdit.notes === "-" ? "" : dataToEdit.notes) : '');
    const handleAddTransaction = (e) =>{
        e.preventDefault();
        if (!realValue || realValue <= 0){
            alert("Insert the Amount")
        }
        else if (category.trim() === "etc") {
            if (note.trim() === "") {
                alert("Please provide notes for 'Etc' category");
                return;
            }
            const newTx = {
                id: Date.now(),
                date: getTodayDate(),
                amount: realValue,
                category: category,
                notes: note
            }
            onSave(newTx);
            setDisplayValue('');
            setRealValue(0);
            setCategory(CATEGORY_ENUM.FOOD);
            setNote('');
            onClose();
        }
        else{
            const newTx = {
                id: Date.now(),
                date: getTodayDate(),
                amount: realValue,
                category: category,
                notes: note
            }
            onSave(newTx);
            setDisplayValue('');
            setRealValue(0);
            setCategory(CATEGORY_ENUM.FOOD);
            setNote('');
            onClose();
        }
    }
    // Kalau isOpen false (tutup), jangan tampilkan apa-apa
    if (!isOpen) return null;

    return (
        // 1. OVERLAY (Background Gelap)
        <div className="modal-overlay" onClick={onClose}>
            
            {/* 2. KOTAK MODAL (Stop event biar gak nutup pas diklik isinya) */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
                <header className='add-header'>
                    <div className='header-left'>
                    </div>
                    
                    <div className='header-center'>
                        <h1>{dataToEdit ? 'Edit Expense' : 'Add Expense'}</h1>
                    </div>
                    
                    <div className='header-right'>
                        {/* Panggil fungsi onClose saat tombol X ditekan */}
                        <button onClick={onClose} className="btn-close-icon">
                            <BsX/>
                        </button>
                    </div>
                </header>

                {/* AREA FORM (Nanti diisi form input di sini) */}
                <div className="modal-body">
                    <div className='add-amount'>
                        <div className='input-amount'>
                        <h2>Rp</h2>
                        <input 
                            type="text" 
                            inputMode="numeric"
                            onChange={handleChange} 
                            value={displayValue} 
                            placeholder='50.000' 
                            className='amount-input' 
                        />
                    </div>
                    <h6>Enter Amount</h6>
                    </div>
                    <div className='category-list'>
                        <div className='select-wrapper'>
                            <h4>Category</h4>
                        <select name="category" id="select-category" value={category} onChange={(e)=> setCategory(e.target.value)}>
                            <option value={CATEGORY_ENUM.FOOD}>Food</option>
                            <option value={CATEGORY_ENUM.TRANSPORT}>Transportation</option>
                            <option value={CATEGORY_ENUM.SHOPPING}>Shopping</option>
                            <option value={CATEGORY_ENUM.ENTERTAINMENT}>Entertainment</option>
                            <option value={CATEGORY_ENUM.ETC}>Etc</option>
                        </select>
                        </div>
                        <div className="icon-overlay">
                            <BsChevronDown />
                        </div>
                    </div>
                    <div className='notes-section'>
                        <input type="text" placeholder='Notes' value={note} onChange={(e) => setNote(e.target.value)}/>
                    </div>
                    <div className='btn'>
                        <button className='btn-submit' type='button' onClick={handleAddTransaction} disabled={!realValue || realValue <= 0}>Done</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default AddTransaction;