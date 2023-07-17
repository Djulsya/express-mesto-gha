const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const OK = require('../errors/OK');

module.exports = (req, res, next) => {
  const { token } = req.cookies.jwt;
  // let payload;
  if (!token) {
    throw new OK('Запрос прошёл успешно');
  }
  try {
    req.user = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Требуется авторизация'));
  }
  next();
};
// req.user = payload;
// next();
