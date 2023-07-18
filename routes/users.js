const express = require('express');

const usersRouter = express.Router();

const {
  JoiValidateUserId, JoiValidateAbout, JoiValidateAvatar,
} = require('../middlewares/valid');

const {
  getUsers, getActualUser, getUserId, updateUserAbout, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getActualUser);
usersRouter.get('/:id', JoiValidateUserId, getUserId);
usersRouter.patch('/me', JoiValidateAbout, updateUserAbout);
usersRouter.patch('/me/avatar', JoiValidateAvatar, updateUserAvatar);

module.exports = usersRouter;
