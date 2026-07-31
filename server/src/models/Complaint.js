import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Resolved', 'Closed'], default: 'Open' },
  response: { type: String }
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);
