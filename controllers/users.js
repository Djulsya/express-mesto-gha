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
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
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
    .then((user) => {
      if (!user) {
        return next(new Unauthorized('Ошибка авторизации'));
      }
      return bcrypt
        .compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return next(new Unauthorized('Ошибка авторизации'));
          }
          const token = jwt
            .sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          res
            .cookie('jwt', token, {
              httpOnly: true,
            })
            .send({
              name: user.name, about: user.about, avatar: user.avatar, email,
            });
        });
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
    ).orFail(() => new NotFound('Пользователь не найден'))
    .then((user) => {
      res
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
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
    ).orFail(() => new NotFound('Пользователь не найден'))
    .then((user) => {
      res
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getActualUser = (req, res, next) => {
  User
    .findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch(next);
};
