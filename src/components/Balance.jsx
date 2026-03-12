import '../style/Balance.css'
import { getPastMonths, formatRupiah } from '../context/AppReducer.js'; // Pastikan kamu buat fungsi ini di utils/dateUtils.js
// 1. Fungsi penolong untuk membuat daftar 12 bulan terakhir secara otomatis


function Balance({ selectedMonth, handleMonthChange, transactions }) {
    // 2. Siapkan daftarnya
    const monthOptions = getPastMonths();
    const totalExpense = transactions.reduce((total, tx) => {
        const txMonth = tx.date.slice(0, 7); // Ambil format YYYY-MM
        if (txMonth === selectedMonth && tx.amount > 0) {
            return total + Math.abs(tx.amount);
        }
        return total;
    }, 0);
    
    
    const daysInMonth = new Date(parseInt(selectedMonth.slice(0, 4)), parseInt(selectedMonth.slice(5)) , 0).getDate();
    const dailyAverage = totalExpense / daysInMonth;

    const formattedExpense = formatRupiah(totalExpense);
    const formattedDailyAverage = formatRupiah(dailyAverage);  
    const lastMonthExpense = transactions.reduce((total, tx) => {
        const txMonth = tx.date.slice(0, 7); // Ambil format YYYY-MM
        const [year, month] = selectedMonth.split('-');
        const lastMonth = `${year}-${String(parseInt(month) - 1).padStart(2, '0')}`;
        if (txMonth === lastMonth && tx.amount > 0) {
            return total + Math.abs(tx.amount);
        }
        return total;
    }, 0);
    const percentageChange = lastMonthExpense === 0 ? 0 : ((totalExpense - lastMonthExpense) / lastMonthExpense) * 100;
    let noteText = "";
    let noteColor = "";

    if (percentageChange > 0) {
        noteColor = '#E06B6BA7'; // Merah (Naik/Boros)
        noteText = `↑ ${percentageChange.toFixed(2)}% from last month`;
    } else if (percentageChange < 0) {
        noteColor = '#1a745cA7'; // Hijau (Turun/Hemat)
        noteText = `↓ ${Math.abs(percentageChange).toFixed(2)}% from last month`;
    } else {
        noteColor = '#1c1c1e';   // Hitam (Sama/Default)
        noteText = `No change from last month`;
    }
    return (
        <div className='balance-container'>
            <div className='balance-header'>
                <h2>Expenses</h2>
                
                {/* 4. Select otomatis dengan data dinamis */}
                <select 
                    name="months" 
                    id="select-month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                >
                    {monthOptions.map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </select>
                
            </div>
            
            <h1 id="balance-amount">{formattedExpense}</h1>
            
            
            
            <h3 className='daily-avg'>Daily Average: {formattedDailyAverage}</h3>
            <hr />
            <p className='note' style={{ color: noteColor }}>
                {noteText}
            </p>
        </div>
    );
}

export default Balance;