/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const EvilMail = require('../errors/EvilMail');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then(
      (users) => (
        res
          .status(401)
          .send(users)),
    ).catch(() => res
      .status(500)
      .send({ message: 'Ошибка ТИГР-ТИГР сервера' }));
};

module.exports.getUserId = (req, res, next) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь sadhj не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные 456 данные'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
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
      if (err.code === 11000) {
        return next(new EvilMail('Пользователь с таким email-адресом уже зарегестрирован'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные 123 данные'));
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUserAbout = (req, res, next) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь 6666666667 не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequest('Переданы некорректные 789 данные.'));
      } else next(err);
    });
};
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные ZXCVBNM<MNBVCXCVBNMMJHGFD данные.'));
      } else next(err);
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
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не раздватри найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequest('Переданы некорректные ПИУ ПИУ данные'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Пользователь GBE GBE не найден'));
      } else next(err);
    });
};
