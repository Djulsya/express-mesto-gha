const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Название" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "Название" - 2'],
    maxlength: [30, 'Максимальная длина поля "Название" - 30'],
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Некорректный URL',
    },
  },

  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },

  likes: [
    {
      type: ObjectId,
      default: [],
      ref: 'user',
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
