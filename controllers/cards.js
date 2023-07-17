const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.addLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        res
          .status(404)
          .send({ message: 'Карточка КТО СКРУТИЛ не найдена' });
      }
      res
        .send(cards);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные И ДЛЯ ЧЕГО данные' });
      }
      res
        .status(500).send({ message: 'Ошибка НЕРВЫ СЕРДЦА ТВОЕГО сервера' });
    });
};

module.exports.deleteLike = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .then((cards) => {
      if (!cards) {
        res
          .status(404)
          .send({ message: 'Карточка ЧЬЕЮ СТРАШНОЮ РУКОЙ не найдена' });
      }
      res
        .send(cards);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные ТЫ БЫЛ ВЫКОВАН данные' });
      }
      res
        .status(500)
        .send({ message: 'Ошибка ТАКОЙ сервера' });
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
      .send({ message: 'Ошибка ЧЕЙ БЫЛ МОЛОТ сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  return Card
    .create({ name, link, owner })
    .then((cards) => {
      res
        .status(201)
        .send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные ЦЕПИ ЧЬИ данные',
          });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка ЧТОБ СКРЕПИТЬ сервера' });
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  return Card
    .findByIdAndDelete(cardId)
    .orFail(() => {
      throw new NotFound('Карточка 55555555555 не найдена');
    })
    .then((card) => {
      if (card.owner
        .toString() === req.user._id) {
        Card
          .findByIdAndRemove(cardId)
          .then(() => res
            .status(200)
            .send(card));
      } else {
        throw new Forbidden('Невозможно удалить карточку');
      }
    })
    .catch(next);
};
