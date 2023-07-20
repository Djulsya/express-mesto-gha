const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Ошибка авторизации'));
    return;
  }
  let payload;
  try {
    payload = jwt
      .verify(token, 'some-secret-key');
  } catch (err) {
    next(new Unauthorized('Ошибка авторизации'));
    return;
  }
  req.user = payload;
  next();
};
