const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const { requestLogger, errorLogger } = require('./middlewares/logger'); // 15ПР
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// app.use(requestLogger); // 15ПР
app.use(cookieParser());
app.use(express.json());

const handleError = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.use(routes);
// app.use(errorLogger); // 15ПР
app.use(errors());
app.use(handleError);

app.listen(PORT);
