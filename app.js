const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
// eslint-disable-next-line import/order
const helmet = require('helmet');
const { createUser, login } = require('./controllers/users');

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

app.use((req, res) => {
  res.status(404)
    .send({ message: 'Данные 77777 не найдены' });
});

app.listen(PORT);
