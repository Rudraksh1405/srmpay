import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String },
    isActive: { type: Boolean, default: true },
    imageUrl: { type: String },
    username: { type: String, unique: true, sparse: true },
    password: { type: String },
    approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  },
  { timestamps: true }
);

vendorSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password') || !this.password) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
