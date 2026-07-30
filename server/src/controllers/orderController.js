import Order from '../models/Order.js';

export const createOrder = async (request, response) => {
  try {
    const { studentEmail, vendorId, items } = request.body;
    if (!studentEmail || !vendorId || !items?.length) return response.status(400).json({ message: 'Student, vendor, and items are required.' });
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const count = await Order.countDocuments({ vendorId, createdAt: { $gte: start } });
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const order = await Order.create({ studentEmail, vendorId, items, totalAmount, tokenNumber: `Z${String(count + 1).padStart(3, '0')}` });
    response.status(201).json(order);
  } catch { response.status(500).json({ message: 'Unable to create order.' }); }
};
export const getVendorOrders = async (request, response) => response.json(await Order.find({ vendorId: request.params.vendorId, status: { $ne: 'Served' } }).sort({ createdAt: 1 }));
export const updateOrderStatus = async (request, response) => {
  const order = await Order.findByIdAndUpdate(request.params.orderId, { status: request.body.status }, { new: true });
  if (!order) return response.status(404).json({ message: 'Order not found.' });
  response.json(order);
};
export const getStudentOrders = async (request, response) => response.json(await Order.find({ studentEmail: request.params.email }).sort({ createdAt: -1 }));
