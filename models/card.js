const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Имя" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "Имя" - 2'],
    maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
  },

  link: {
    type: String,
    required: true,
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
