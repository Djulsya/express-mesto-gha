const User = require('../models/user');

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
      .send({ message: 'Ошибка сервера' }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  return User
    .findById(userId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Пользователь не найден' });
      } else {
        res
          .send(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .send({ message: 'Ошибка сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User
    .create(
      { name, about, avatar },
    ).then((user) => {
      res
        .status(201)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
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

module.exports.updateUserAbout = (req, res) => {
  const { name, about } = req.body;
  return User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { runValidators: true, new: true },
    ).orFail(() => new Error('NotFoundError'))
    .then((user) => {
      res
        .send(user);
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
        res
          .status(500)
          .send({ message: 'Ошибка сервера' });
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
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: 'Пользователь не найден' });
      }
      res
        .send(user);
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
        res
          .status(500)
          .send({ message: 'Ошибка сервера' });
      }
    });
};
