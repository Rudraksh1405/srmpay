import Notification from '../models/Notification.js';

export const getNotifications = async (request, response) => {
  try {
    const student = await import('../models/Student.js').then(m => m.default.findOne({ email: request.user.email }));
    if (!student) return response.status(404).json({ message: 'Student not found' });
    
    const notifications = await Notification.find({ studentId: student._id })
      .populate('vendorId', 'name')
      .sort({ createdAt: -1 })
      .limit(20);
      
    response.json(notifications);
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
};

export const markAsRead = async (request, response) => {
  try {
    const { notificationId } = request.params;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    response.json({ message: 'Marked as read' });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
};
