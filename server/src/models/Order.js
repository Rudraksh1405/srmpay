import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  studentName: { type: String },
  registrationNumber: { type: String },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  items: [{ menuItemId: String, name: String, price: Number, qty: Number }],
  totalAmount: { type: Number, required: true },
  tokenNumber: { type: String, required: true },
  status: { type: String, enum: ['Placed', 'Preparing', 'Ready', 'Served'], default: 'Placed' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Paid' },
  estimatedPrepTime: { type: Number },
  review: {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String }
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
