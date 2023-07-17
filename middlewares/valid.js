/* eslint-disable import/no-extraneous-dependencies */
const { celebrate } = require('celebrate');
const Joi = require('joi');

const validateURL = /(https?:\/\/(www\.)?)[-._~:/?#@!&'()*+,;=]*#*/m;

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validateURL).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(validateURL).required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validateCards = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(validateURL).required(),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports.validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(validateURL),
  }),
});

module.exports.validateUserAbout = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
