import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Vendor from './models/Vendor.js';
import MenuItem from './models/MenuItem.js';
import Student from './models/Student.js';

dotenv.config();
await connectDB();

// Seed Vendors
const definitions = [
  { name: 'Zinger', category: 'Burgers', location: 'Food Court', username: 'zinger', password: 'zinger123', approvalStatus: 'Approved', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80' },
  { name: 'Evergreen', category: 'Healthy food', location: 'Block B', username: 'evergreen', password: 'evergreen123', approvalStatus: 'Approved', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80' },
  { name: 'Butty', category: 'Sandwiches', location: 'Library Plaza', username: 'butty', password: 'butty123', approvalStatus: 'Approved', imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
];

const vendors = [];
for (const definition of definitions) {
  let vendor = await Vendor.findOne({ username: definition.username });
  if (!vendor) vendor = await Vendor.create(definition);
  else {
    // Optionally update password if needed, but not strictly necessary for demo seed
  }
  vendors.push(vendor);
}

// Seed Menu Items
const items = [
  { vendorId: vendors[0]._id, name: 'Chicken Burger', price: 90 }, 
  { vendorId: vendors[0]._id, name: 'French Fries', price: 60 }, 
  { vendorId: vendors[1]._id, name: 'Veggie Bowl', price: 110 }, 
  { vendorId: vendors[2]._id, name: 'Grilled Sandwich', price: 75 }
];

for (const item of items) {
  await MenuItem.updateOne(
    { vendorId: item.vendorId, name: item.name }, 
    { $setOnInsert: { ...item, isAvailable: true } }, 
    { upsert: true }
  );
}

// Seed Demo Student
let demoStudent = await Student.findOne({ email: 'demo@srmist.edu.in' });
if (!demoStudent) {
  await Student.create({
    name: 'Demo Student',
    email: 'demo@srmist.edu.in',
    password: 'demo1234'
  });
}

console.log('Seed complete. Vendors: zinger/zinger123, evergreen/evergreen123, butty/butty123');
console.log('Demo Student: demo@srmist.edu.in / demo1234');
process.exit(0);
