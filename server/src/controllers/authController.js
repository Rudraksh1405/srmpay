import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
import Vendor from '../models/Vendor.js';

const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET || 'srmpay-demo-secret', { expiresIn: '1d' });

export const registerStudent = async (request, response) => {
  const { name, email, password } = request.body;
  if (!/@srmist\.edu\.in$/.test(email || '')) return response.status(400).json({ message: 'Use your SRMIST email address.' });
  try {
    const student = await Student.create({ name, email, password });
    response.status(201).json({ token: signToken({ role: 'student', email: student.email }), student: { name: student.name, email: student.email } });
  } catch (error) {
    response.status(400).json({ message: error.code === 11000 ? 'An account already exists for this email.' : 'Unable to create account.' });
  }
};

export const loginStudent = async (request, response) => {
  const { email, password } = request.body;
  if (!/@srmist\.edu\.in$/.test(email || '')) return response.status(400).json({ message: 'Use your SRMIST email address.' });
  const student = await Student.findOne({ email });
  if (!student || !(await bcrypt.compare(password || '', student.password))) return response.status(401).json({ message: 'Invalid email or password.' });
  response.json({ token: signToken({ role: 'student', email }), student: { name: student.name, email } });
};

export const loginVendor = async (request, response) => {
  const vendor = await Vendor.findOne({ username: request.body.username });
  if (!vendor || !vendor.password || !(await bcrypt.compare(request.body.password || '', vendor.password))) return response.status(401).json({ message: 'Invalid username or password.' });
  if (vendor.approvalStatus !== 'Approved') return response.status(403).json({ message: 'Your vendor account is not approved yet.' });
  response.json({ token: signToken({ role: 'vendor', vendorId: vendor.id }), vendor: { id: vendor.id, name: vendor.name } });
};

export const loginAdmin = (request, response) => {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  if (request.body.username !== username || request.body.password !== password) return response.status(401).json({ message: 'Invalid admin credentials.' });
  response.json({ token: signToken({ role: 'admin' }), admin: { username } });
};
