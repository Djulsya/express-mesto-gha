const express = require('express');

const usersRouter = express.Router();

const {
  getUsers, getUserId, updateUserAbout, updateUserAvatar, updateUser,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserId);
usersRouter.get('/users/me', updateUser);
// usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUserAbout);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
