const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const {
  login, createUser,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const {
  JoiValidateLogin, JoiValidateCreateUser,
} = require('./middlewares/valid');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(express.json());

app.post('/signin', JoiValidateLogin, login);
app.post('/signup', JoiValidateCreateUser, createUser);

app.use(auth);

app.use(cardsRouter);
app.use(usersRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый адрес не найден.',
  });
});

const handleError = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.use(errors());
app.use(handleError);

app.listen(PORT);
