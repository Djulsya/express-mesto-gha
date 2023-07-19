const Card = require('../models/card');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.addLike = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((cards) => res
      .status(200)
      .send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  const { id } = req.params;
  return Card
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
    .orFail(() => {
      throw new NotFound('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card
          .findById(id)
          .then(() => res
            .status(200)
            .send(card));
      } else {
        throw new Forbidden('Недостаточно прав');
      }
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .then(
      (cards) => (
        res
          .status(200)
          .send(cards)),
    ).catch(next);
};

module.exports.createCard = (req, res, next) => {
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
            message: 'Переданы некорректные данные',
          });
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  return Card
    .findByIdAndSearch(id)
    .then((cards) => {
      if (!cards) {
        next(new NotFound('Карточка не найдена'));
      }
      if (!cards.owner.equals(req.user._id)) {
        next(new Forbidden('Недостаточно прав'));
      }
    })
    .then(() => res.status(200)
      .send({ message: 'Удалено' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
