const { Joi, celebrate } = require('celebrate');

const urlValid = /https?:\/\/(www\.)?[0-9a-zA-Z-]+\.[0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]{2,}#?/;

module.exports.JoiValidateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlValid),
  }),
});

module.exports.JoiValidateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports.JoiValidateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlValid),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.JoiValidateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports.JoiValidateAbout = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.JoiValidateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlValid).required(),
  }),
});

module.exports.JoiValidateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
