const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errors/unauthorizedError');
const { regexUrl } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Необходимо ввести 2 или более символов, вы ввели {VALUE}'],
    maxlength: [30, 'Необходимо ввести 30 или менее символов, вы ввели {VALUE}'],
  },
  about: {
    default: 'Исследователь',
    type: String,
    minlength: [2, 'Необходимо ввести 2 или более символов, вы ввели {VALUE}'],
    maxlength: [30, 'Необходимо ввести 30 или менее символов, вы ввели {VALUE}'],
  },
  avatar: {
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
    validate: {
      validator: (url) => regexUrl.test(url),
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'неверный формат email',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
