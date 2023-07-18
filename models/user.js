const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Имя" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "Имя" - 2'],
    maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
  },

  about: {
    type: String,
    required: [true, 'Поле "О себе" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "О себе" - 2'],
    maxlength: [30, 'Максимальная длина поля "О себе" - 30'],
  },

  avatar: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('user', userSchema);
