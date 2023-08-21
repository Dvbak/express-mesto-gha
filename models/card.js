const mongoose = require('mongoose');
const { urlRegAvatar } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
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
  link: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(url) {
        return (urlRegAvatar.test(url));
      },
      message: 'Ссылка на карточку должна начинаться с http:// или с https://',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
