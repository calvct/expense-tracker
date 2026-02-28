import '../style/Header.css'

// Terima props onAddClick
function Header({ onAddClick }) {
  return (
    <div className='header'>
        <header className="app-header">
          <h1><b>Expense Tracker</b></h1>
          
          {/* Pasang onClick di sini */}
          <button className='btn-add' onClick={onAddClick}>
              Add Expense
          </button>
        </header>
        <hr />
    </div>
  );
}

export default Header;