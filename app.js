/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('express').Router();
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
// eslint-disable-next-line import/order
const helmet = require('helmet');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

const {
  validateCreateUser,
} = require('./middlewares/valid');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5d8b8592978f8bd833ca8133',
//   };
//   next();
// });

app.use(express.json());
app.use(usersRouter);
app.use(cardsRouter);
app.use(helmet());
app.post('/signin', login);
app.post('/signup', createUser, validateCreateUser);
app.use(auth);
app.use(router);

router.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
router.use(express.json());

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Ошибка сервера'
        : message,
    });
  next();
});

app.listen(PORT);
