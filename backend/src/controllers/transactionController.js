const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, description, type } = req.body;
    
    // Convert amount to number
    const numericAmount = parseFloat(amount);
    
    // Validate required fields
    if (!numericAmount || isNaN(numericAmount)) {
      return res.status(400).json({ error: 'Amount must be a valid number' });
    }
    
    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either income or expense' });
    }
    
    const transaction = new Transaction({ 
      amount: numericAmount, 
      date: date || new Date(), 
      description: description || '', 
      type 
    });
    
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error('Transaction creation error:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, description, type } = req.body;
    
    // Convert amount to number
    const numericAmount = parseFloat(amount);
    
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { 
        amount: numericAmount, 
        date: date || new Date(), 
        description: description || '', 
        type 
      },
      { new: true }
    );
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 