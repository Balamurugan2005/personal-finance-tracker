const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');

dotenv.config();

const categories = [
  // No categories to seed
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  for (const cat of categories) {
    const exists = await Category.findOne({ name: cat.name, type: cat.type });
    if (!exists) {
      await Category.create(cat);
      console.log(`Inserted category: ${cat.name} (${cat.type})`);
    } else {
      console.log(`Category already exists: ${cat.name} (${cat.type})`);
    }
  }
  await mongoose.disconnect();
  console.log('Seeding complete.');
}

seed(); 