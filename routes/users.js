const express = require('express');

const usersRouter = express.Router();

const {
  getUsers, getUserId, updateUserAbout, updateUserAvatar,
} = require('../controllers/users');

const {
  joiValidateGetUserId, joiValidateAvatar, joiValidateUserAbout,
} = require('../middlewares/valid');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserId, joiValidateGetUserId);
// usersRouter.get('/users/me', updateUser);
// usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', updateUserAbout, joiValidateUserAbout);
usersRouter.patch('/users/me/avatar', updateUserAvatar, joiValidateAvatar);

module.exports = usersRouter;
