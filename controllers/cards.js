const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/BadRequest');

module.exports.addLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(() => {
      throw new NotFound('Карточка 666666666 не найдена');
    })
    .then((card) => res
      .status(200)
      .send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные 8888888 данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    ).orFail(() => {
      throw new NotFound('Карточка 000000 не найдена');
    })
    .then((card) => res
      .status(200)
      .send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные09876 данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then((cards) => res
      .status(200)
      .send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res
      .status(201)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные DGHFDSDG данные'));
      } else {
        next(err);
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
