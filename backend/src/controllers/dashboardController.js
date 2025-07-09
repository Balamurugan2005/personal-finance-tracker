const Transaction = require('../models/Transaction');

exports.getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    const recentTransactions = transactions.slice(-5).reverse();
    res.json({ totalIncome, totalExpense, balance, recentTransactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 