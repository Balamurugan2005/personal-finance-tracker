const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String,
    default: ''
  },
  type: { 
    type: String, 
    enum: ['income', 'expense'], 
    required: true 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema); 