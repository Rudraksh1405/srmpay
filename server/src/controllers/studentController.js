import Student from '../models/Student.js';

export const getProfile = async (request, response) => {
  try {
    const student = await Student.findOne({ email: request.user.email }).select('-password');
    if (!student) return response.status(404).json({ message: 'Student not found' });
    response.json(student);
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
};

export const updatePassword = async (request, response) => {
  try {
    const { oldPassword, newPassword } = request.body;
    const student = await Student.findOne({ email: request.user.email });
    if (!student) return response.status(404).json({ message: 'Student not found' });
    
    import('bcryptjs').then(async (bcrypt) => {
      if (!(await bcrypt.default.compare(oldPassword, student.password))) {
        return response.status(400).json({ message: 'Incorrect old password' });
      }
      student.password = newPassword; // Will be hashed by pre-save hook
      await student.save();
      response.json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
};

export const toggleFavorite = async (request, response) => {
  try {
    const { vendorId } = request.params;
    const student = await Student.findOne({ email: request.user.email });
    if (!student) return response.status(404).json({ message: 'Student not found' });
    
    const index = student.favorites.indexOf(vendorId);
    if (index === -1) {
      student.favorites.push(vendorId);
    } else {
      student.favorites.splice(index, 1);
    }
    
    await student.save();
    response.json({ favorites: student.favorites });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
};
