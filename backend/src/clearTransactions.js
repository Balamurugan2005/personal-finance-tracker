const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('./models/Transaction');

dotenv.config();

async function clearTransactions() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const result = await Transaction.deleteMany({});
    console.log(`Deleted ${result.deletedCount} transactions from the database.`);
    
    await mongoose.disconnect();
    console.log('Transaction clearing complete.');
  } catch (error) {
    console.error('Error clearing transactions:', error);
    process.exit(1);
  }
}

clearTransactions(); 