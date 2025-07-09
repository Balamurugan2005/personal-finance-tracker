const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

async function clearCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const result = await Category.deleteMany({});
    console.log(`Deleted ${result.deletedCount} categories from the database.`);
    
    await mongoose.disconnect();
    console.log('Category clearing complete.');
  } catch (error) {
    console.error('Error clearing categories:', error);
    process.exit(1);
  }
}

clearCategories(); 