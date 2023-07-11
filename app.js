const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

app.use(express.json());
app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) => {
  res.status(404)
    .send({ message: 'Данные не найдены' });
});

app.listen(PORT);
