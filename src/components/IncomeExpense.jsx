import '../style/IncomeExpense.css'
import foodIcon from '../assets/Food.svg'
import etcIcon from '../assets/Etc.svg'
import shoppingIcon from '../assets/Shopping.svg'
import transportationIcon from '../assets/Transportation.svg'
import entertainmentIcon from '../assets/Entertainment.svg'
import { formatRupiah, CATEGORY_ENUM } from '../context/AppReducer.js'; // Pastikan kamu buat fungsi ini di utils/formatUtils.js

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
        { id: 1, name: CATEGORY_ENUM.FOOD, amount: categoryTotal[CATEGORY_ENUM.FOOD] || 0, icon: foodIcon },
        { id: 2, name: CATEGORY_ENUM.TRANSPORT, amount: categoryTotal[CATEGORY_ENUM.TRANSPORT] || 0, icon: transportationIcon },
        { id: 3, name: CATEGORY_ENUM.SHOPPING, amount: categoryTotal[CATEGORY_ENUM.SHOPPING] || 0, icon: shoppingIcon },
        { id: 4, name: CATEGORY_ENUM.ENTERTAINMENT, amount: categoryTotal[CATEGORY_ENUM.ENTERTAINMENT] || 0, icon: entertainmentIcon },
        { id: 5, name: CATEGORY_ENUM.ETC, amount: categoryTotal[CATEGORY_ENUM.ETC] || 0, icon: etcIcon },
    ].map(item => ({ ...item, amount: Math.abs(item.amount) })); // Pastikan semua amount positif untuk summary
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