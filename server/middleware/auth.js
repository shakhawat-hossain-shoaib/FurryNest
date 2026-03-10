import jwt from 'jsonwebtoken';
import UserInfo from '../models/user_info.js';
import AdminInfo from '../models/admin_info.js';

export const authMiddleware = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id, principalType } = jwt.verify(token, process.env.JWT_SECRET);

    if (principalType === 'admin') {
      const admin = await AdminInfo.findOne({ _id }).select('_id role email name');
      req.user = admin ? { ...admin.toObject(), principalType: 'admin' } : null;
    } else {
      const user = await UserInfo.findOne({ _id }).select('_id role email name');
      req.user = user ? { ...user.toObject(), principalType: 'user' } : null;
    }

    if (!req.user) {
      return res.status(401).json({ error: 'Request is not authorized' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  return next();
};