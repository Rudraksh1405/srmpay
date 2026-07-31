import Order from '../models/Order.js';
import Vendor from '../models/Vendor.js';

export const createOrder = async (request, response) => {
  try {
    const { studentEmail, vendorId, items } = request.body;
    
    // Ensure the requester is actually the student placing it
    if (request.user.email !== studentEmail) {
      return response.status(403).json({ message: 'Not authorized to create order for this email.' });
    }

    if (!studentEmail || !vendorId || !items?.length) {
      return response.status(400).json({ message: 'Student, vendor, and items are required.' });
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return response.status(404).json({ message: 'Vendor not found.' });

    const student = await import('../models/Student.js').then(m => m.default.findOne({ email: studentEmail }));
    if (!student) return response.status(404).json({ message: 'Student not found.' });

    const prefix = vendor.name.charAt(0).toUpperCase();

    const start = new Date(); 
    start.setHours(0, 0, 0, 0);
    const count = await Order.countDocuments({ vendorId, createdAt: { $gte: start } });
    
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tokenNumber = `${prefix}${String(count + 1).padStart(3, '0')}`;
    
    const order = await Order.create({ 
      studentEmail, 
      studentName: student.name,
      registrationNumber: student.registrationNumber,
      vendorId, 
      items, 
      totalAmount, 
      tokenNumber 
    });
    
    response.status(201).json(order);
  } catch (error) { 
    console.error(error);
    response.status(500).json({ message: 'Unable to create order.' }); 
  }
};

export const getVendorOrders = async (request, response) => {
  // Verify JWT vendorId matches URL vendorId
  if (request.user.vendorId !== request.params.vendorId) {
    return response.status(403).json({ message: 'Not authorized to access these orders.' });
  }

  const orders = await Order.find({ vendorId: request.params.vendorId })
    .sort({ createdAt: 1 });
  
  response.json(orders);
};

export const updateOrderStatus = async (request, response) => {
  // Vendor must own this order. Find it first.
  const orderCheck = await Order.findById(request.params.orderId);
  if (!orderCheck) return response.status(404).json({ message: 'Order not found.' });
  
  if (request.user.vendorId !== orderCheck.vendorId.toString()) {
    return response.status(403).json({ message: 'Not authorized to update this order.' });
  }

  const order = await Order.findByIdAndUpdate(
    request.params.orderId, 
    { status: request.body.status }, 
    { new: true }
  );
  
  if (order) {
    const student = await import('../models/Student.js').then(m => m.default.findOne({ email: order.studentEmail }));
    if (student) {
      await import('../models/Notification.js').then(m => m.default.create({
        studentId: student._id,
        vendorId: order.vendorId,
        orderId: order._id,
        message: `Your order #${order.tokenNumber} is now ${order.status}`,
        type: order.status === 'Placed' ? 'Order Placed' : order.status === 'Preparing' ? 'Preparing' : order.status === 'Ready' ? 'Ready for Pickup' : order.status === 'Served' ? 'Completed' : 'System'
      }));
    }
  }
  
  response.json(order);
};

export const getStudentOrders = async (request, response) => {
  if (request.user.email !== request.params.email) {
    return response.status(403).json({ message: 'Not authorized to access these orders.' });
  }
  
  const orders = await Order.find({ studentEmail: request.params.email }).sort({ createdAt: -1 });
  response.json(orders);
};

export const addReview = async (request, response) => {
  const { rating, comment } = request.body;
  const order = await Order.findById(request.params.orderId);
  if (!order) return response.status(404).json({ message: 'Order not found' });
  if (order.studentEmail !== request.user.email) return response.status(403).json({ message: 'Not authorized' });
  if (order.status !== 'Served') return response.status(400).json({ message: 'Order must be completed to review' });
  
  order.review = { rating, comment };
  await order.save();
  response.json(order);
};

export const getOrderDetails = async (request, response) => {
  const order = await Order.findById(request.params.orderId).populate('vendorId', 'name imageUrl');
  if (!order) return response.status(404).json({ message: 'Order not found' });
  if (order.studentEmail !== request.user.email) return response.status(403).json({ message: 'Not authorized' });
  
  // Calculate orders ahead
  let ordersAhead = 0;
  if (order.status === 'Placed' || order.status === 'Preparing') {
    ordersAhead = await Order.countDocuments({
      vendorId: order.vendorId,
      status: { $in: ['Placed', 'Preparing'] },
      createdAt: { $lt: order.createdAt }
    });
  }
  
  // Estimate time: e.g. 5 mins per order ahead + 5 mins for current
  const estimatedPrepTime = (ordersAhead * 5) + 5;
  
  response.json({ ...order.toObject(), ordersAhead, estimatedPrepTime });
};
