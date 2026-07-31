import jwt from 'jsonwebtoken';

const protect = (allowedRoles) => (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'srmpay-demo-secret');
    req.user = decoded; // { role: 'student', email: '...' } OR { role: 'vendor', vendorId: '...' }
    
    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Not authorized for this route' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const protectStudent = protect(['student']);
export const protectVendor = protect(['vendor']);
export const protectAdmin = protect(['admin']);
export const protectAny = protect(['student', 'vendor', 'admin']);
