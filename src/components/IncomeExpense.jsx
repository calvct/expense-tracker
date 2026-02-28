import '../style/IncomeExpense.css'
import foodIcon from '../assets/Food.svg'
import etcIcon from '../assets/Etc.svg'
import shoppingIcon from '../assets/Shopping.svg'
import transportationIcon from '../assets/Transportation.svg'
import entertainmentIcon from '../assets/Entertainment.svg'

function IncomeExpense({selectedMonth, transactions}){
   const categoryTotal = transactions.reduce((acc, tx) => {
        const txMonth = tx.date.slice(0, 7); // Ambil format YYYY-MM
        if (txMonth === selectedMonth) {
            if (!acc[tx.category]) {
                acc[tx.category] = 0;
            }
            acc[tx.category] += Math.abs(tx.amount);
        }
        return acc;
    }, {});
      const categoryData = [
        { id: 1, name: 'Food', amount: categoryTotal['food'] || 0, icon: foodIcon },
        { id: 2, name: 'Shopping', amount: categoryTotal['shopping'] || 0, icon: shoppingIcon },
        { id: 3, name: 'Transportation', amount: categoryTotal['transportation'] || 0, icon: transportationIcon },
        { id: 4, name: 'Entertainment', amount: categoryTotal['entertainment'] || 0, icon: entertainmentIcon },
        { id: 5, name: 'Etc', amount: categoryTotal['etc'] || 0, icon: etcIcon },
    ].map(item => ({ ...item, amount: Math.abs(item.amount) })); // Pastikan semua amount positif untuk summary
   const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    }
    const totalAmount = categoryData.reduce((acc, curr) => acc + curr.amount, 0);
   return(
 <div className='summary-container'>
    <h1>Category Summary</h1>
    {categoryData.map((item) => (
      <div key={item.id} className='lists'>
      <div className='list-container'>
         <div className='list-header'>
             <svg className='image-icon' width="54" height="55">
               <image 
               href={item.icon} 
               />
            </svg>
     
            <p>{item.name}</p>
         </div>
      
         <p className="list-amount">{formatRupiah(item.amount)}</p>
      </div>
         <hr />
   </div>
    ))
    }
    <div className='total-amount'>
     <h3>Total Amount</h3>
   <p>{formatRupiah(totalAmount)}</p>
    </div>
  
 </div>
 );
}
export default IncomeExpense;