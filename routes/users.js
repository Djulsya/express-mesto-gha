const express = require('express');

const usersRouter = express.Router();

const {
  JoiValidateUserId, JoiValidateAbout, JoiValidateAvatar,
} = require('../middlewares/valid');

const {
  getUsers, getActualUser, getUserId, updateUserAbout, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getActualUser);
usersRouter.get('/users/:id', JoiValidateUserId, getUserId);
usersRouter.patch('/users/me', JoiValidateAbout, updateUserAbout);
usersRouter.patch('/users/me/avatar', JoiValidateAvatar, updateUserAvatar);

module.exports = usersRouter;
