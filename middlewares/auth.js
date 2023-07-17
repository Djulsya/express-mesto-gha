const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const OK = require('../errors/OK');

module.exports = (req, res, next) => {
  const { token } = req.cookies.jwt;
  let payload;
  if (!token) {
    next(new OK('Запрос прошёл успешно'));
  }
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Требуется авторизация'));
  }
  req.user = payload;
  return next();
};
// req.user = payload;
// next();
