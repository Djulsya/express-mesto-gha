/* eslint-disable import/no-extraneous-dependencies */
const { celebrate } = require('celebrate');
const { Joi } = require('joi');

// const validateURL = /(https?:\/\/(www\.)?)[-._~:/?#@!&'()*+,;=]*#*/m;

module.exports.joiValidateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().required(), // pattern(validateURL)
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.joiValidateGetUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(), // pattern(validateURL)
  }),
});

module.exports.joiValidateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.joiValidateCards = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(), // pattern(validateURL)
  }),
});

module.exports.joiValidateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports.joiValidateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(), // pattern(validateURL)
  }),
});

module.exports.joiValidateUserAbout = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});
