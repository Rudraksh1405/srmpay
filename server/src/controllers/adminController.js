import Order from '../models/Order.js';
import Vendor from '../models/Vendor.js';
export const getVendors = async (request, response) => response.json(await Vendor.find().select('-password'));
export const updateApproval = async (request, response) => {
  const vendor = await Vendor.findByIdAndUpdate(request.params.id, { approvalStatus: request.body.approvalStatus }, { new: true }).select('-password');
  if (!vendor) return response.status(404).json({ message: 'Vendor not found.' });
  response.json(vendor);
};
export const getAnalytics = async (request, response) => { const totals = await Order.aggregate([{ $group: { _id: null, orders: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } }]); response.json(totals[0] || { orders: 0, revenue: 0 }); };
