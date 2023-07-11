const Card = require('../models/card');

module.exports.addLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    ).orFail(() => new Error('NotFoundError'))
    .then((err) => {
      if (err.message === 'NotFoundError') {
        res
          .status(404)
          .send({ message: 'Карточка не найдена' });
      } else {
        res
          .send({ message: 'Ошибка сервера' });
      }
    }).catch(() => {
      res.status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(() => new Error('NotFoundError'))
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Карточка не найдена' });
      } else {
        res
          .send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card
    .find({})
    .then(
      (cards) => (
        res
          .status(200)
          .send(cards)),
    ).catch(() => res
      .status(500)
      .send({ message: 'Ошибка сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card
    .create({ name, link, owner })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные',
          });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  return Card
    .findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res
          .status(404)
          .send({ message: 'Карточка не найдена' });
      } else {
        res.send(card);
      }
    })
    .then(() => res.status(200).send({ message: 'Удалено' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные',
          });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка сервера' });
      }
    });
};
