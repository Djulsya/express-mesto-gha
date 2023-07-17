/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const { celebrate } = require('celebrate');
const { Joi } = require('joi');

const usersRouter = express.Router();
const linkValidation = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[-._~:/?#@!&'*+,;=]*#*/m; // !!!!!!!!!!!!!

const {
  getUsers, getUserId, updateUserAbout, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUserId);
// usersRouter.post('/users', createUser);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserAbout);
usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkValidation),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
