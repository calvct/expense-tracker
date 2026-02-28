
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
        const label = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        
        months.push({ value, label });
    }
    return months;
};