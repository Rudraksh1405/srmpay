import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Vendor from './models/Vendor.js';
import MenuItem from './models/MenuItem.js';
dotenv.config();
await connectDB();
await MenuItem.deleteMany({});
await Vendor.deleteMany({ username: { $in: ['zinger', 'evergreen', 'butty'] } });
const vendors = await Vendor.create([
  { name: 'Zinger', category: 'Burgers', location: 'Food Court', username: 'zinger', password: 'zinger123', approvalStatus: 'Approved', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80' },
  { name: 'Evergreen', category: 'Healthy food', location: 'Block B', username: 'evergreen', password: 'evergreen123', approvalStatus: 'Approved', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80' },
  { name: 'Butty', category: 'Sandwiches', location: 'Library Plaza', username: 'butty', password: 'butty123', approvalStatus: 'Approved', imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80' },
]);
await MenuItem.create([{ vendorId: vendors[0]._id, name: 'Chicken Burger', price: 90, isAvailable: true }, { vendorId: vendors[0]._id, name: 'French Fries', price: 60, isAvailable: true }, { vendorId: vendors[1]._id, name: 'Veggie Bowl', price: 110, isAvailable: true }, { vendorId: vendors[2]._id, name: 'Grilled Sandwich', price: 75, isAvailable: true }]);
console.log('Seed complete. Vendors: zinger/zinger123, evergreen/evergreen123, butty/butty123');
process.exit(0);
