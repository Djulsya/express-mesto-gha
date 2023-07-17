const express = require('express');

const usersRouter = express.Router();

const {
  getUsers, getUserId, updateUserAbout, updateUserAvatar,
} = require('../controllers/users');

const {
  validateGetUserId,
} = require('../middlewares/valid');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserId, validateGetUserId);
// usersRouter.get('/users/me', updateUser);
// usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUserAbout);
usersRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = usersRouter;
