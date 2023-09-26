const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: 'unauthenticated' });
    }
    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'unauthenticated' });
    }
    // Bearer
    const token = authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'very_secret');
    next();
  } catch (err) {
    next(err);
  }
};
