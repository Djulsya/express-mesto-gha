const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const EvilMail = require('../errors/EvilMail');
const Unauthorized = require('../errors/Unauthorized');

module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then(
      (users) => (
        res
          .status(200)
          .send(users)),
    ).catch(next);
};

module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;
  return User
    .findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      about,
      avatar,
      password: hash,
    }))
    .then((users) => res.status(201).send({
      name: users.name,
      about: users.about,
      avatar: users.avatar,
      _id: users._id,
      email: users.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else if (err.code === 11000) {
        next(new EvilMail('Пользователь с такими данными уже зарегестрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findOne({ email })
    .select('+password')
    .then((users) => {
      if (!users) {
        return next(new Unauthorized('Ошибка авторизации'));
      }
      return bcrypt.compare(password, users.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return next(new Unauthorized('Ошибка авторизации'));
          }
          const token = jwt
            .sign({ _id: users._id }, 'some-secret-key', { expiresIn: '7d' });
          res.cookie('jwt', token, {
            httpOnly: true,
          });
        })
        .then(() => res
          .send({ message: 'Всё прошло успешно' }));
    })
    .catch(next);
};

module.exports.updateUserAbout = (req, res, next) => {
  const { name, about } = req.body;
  return User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { runValidators: true, new: true },
    ).orFail(() => new NotFound('NotFoundError'))
    .then((users) => {
      res
        .send(users);
    }).catch((err) => {
      if (err.message === 'NotFoundError') {
        res
          .status(404)
          .send({ message: 'Пользователь не найден' });
      } else if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные данные' });
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { runValidators: true, new: true },
    ).orFail(() => new NotFound('NotFoundError'))
    .then((users) => {
      if (!users) {
        res
          .status(404)
          .send({ message: 'Пользователь не найден' });
      }
      res
        .send(users);
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFoundError') {
        res
          .status(404)
          .send({ message: 'Пользователь не найден' });
      } else {
        next(err);
      }
    });
};

module.exports.getActualUser = (req, res, next) => { // updateUser
  User
    .findById(req.user._id)
    .then((users) => {
      if (!users) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
