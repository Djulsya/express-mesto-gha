const Card = require('../models/card');

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  });
};

module.exports.deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  });
};

module.exports.getCards = (res, next) => {
  Card.find({}).then((cards) => (res.status(200).send(cards))).catch((err) => next(err));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      res.status(201).send(card);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(
    req.params.cardId,
  ).then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Переданы некорректные данные' });
      return;
    }
    res.send(card);
  });
};
