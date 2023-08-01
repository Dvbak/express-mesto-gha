const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator({ length }) {
        return (length >= 2 && length <= 30);
      },
      message: 'Имя должно быть длиной от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator({ length }) {
        return (length >= 2 && length <= 30);
      },
      message: 'Информация о пользователе должна быть длиной от 2 до 30 символов',
    },
  },
  avatar: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(url) {
        return (url === /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);
      },
      message: 'Ссылка на аватар должна начинаться с http:// или с https://',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
