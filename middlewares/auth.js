const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { token } = req.headers;
  let payload;
  if (!token) {
    next(new Unauthorized('Требуется 123 авторизация'));
  }
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Требуется авторизация'));
  }
  req.user = payload;
  next();
};
// req.user = payload;
// next();
