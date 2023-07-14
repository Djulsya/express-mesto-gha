const express = require('express');

const usersRouter = express.Router();

const {
  getUsers, getUserId, updateUserAbout, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserId);
// usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUserAbout);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
