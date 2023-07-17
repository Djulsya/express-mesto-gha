/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then(
      (users) => (
        res
          .status(200)
          .send(users)),
    ).catch(() => res
      .status(500)
      .send({ message: 'Ошибка ТИГР-ТИГР сервера' }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  return User
    .findById(userId)
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь ЖГУЧИЙ СТРАХ не найден' });
      } else {
        res
          .send(users);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные ТЫ ГОРИШЬ данные' });
      }
      res
        .status(500).send({ message: 'Ошибка В НОЧНЫХ ЛЕСАХ сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User
      .create(
        {
          name, about, avatar, email, password: hash,
        },
      ).then((users) => {
        res
          .status(201)
          .send({
            name: users.name, about: users.about, avatar: users.avatar, email: users.email,
          });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные ЧЕЙ БЕССМЕРТНЫЙ ВЗОР данные' });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка ЛЮБЯ сервера' });
      }
    });
};

module.exports.updateUserAbout = (req, res) => {
  const { name, about } = req.body;
  return User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { runValidators: true, new: true },
    ).orFail(() => new Error('NotFoundError'))
    .then((users) => {
      res
        .send(users);
    }).catch((err) => {
      if (err.message === 'NotFoundError') {
        res
          .status(404)
          .send({ message: 'Пользователь СОЗДАЛ СТРАШНОГО ТЕБЯ не найден' });
      } else if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные В НЕБЕСАХ данные' });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка ИЛЬ СРЕДЬ ЗЫБЕЙ сервера' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  return User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { runValidators: true, new: true },
    ).orFail(() => new Error('NotFoundError'))
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь ВСПЫХНУЛ БЛЕСК не найден' });
      }
      res
        .send(users);
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные ТВОИХ ОЧЕЙ данные' });
      } else if (err.message === 'NotFoundError') {
        res
          .status(404)
          .send({ message: 'Пользователь КАК ДЕРЗАЛ ОН ТАК ПАРИТЬ не найден' });
      } else {
        res
          .status(500)
          .send({ message: 'Ошибка КТО ПОСМЕЛ ОГОНЬ СХВАТИТЬ сервера' });
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findOne({ email, password })
    .select('+password')
    .then((users) => {
      const token = jwt
        .sign({ _id: users._id }, 'some-secret-key', { expiresIn: '7d' });
      res
        .send({ token });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  User
    .indByIdAndUpdate(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь 33333333333333 не найден');
    })
    .then((users) => res
      .status(200)
      .send({ users }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные 8888888888888888 данные'));
      } else {
        next(err);
      }
    });
};
