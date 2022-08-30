const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { regexUrl } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { handleError } = require('./middlewares/handleError');
const { NotFoundError } = require('./utils/errors/notFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const {
  PORT = 3000,
} = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(requestLogger); // подключаем логгер запросов
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(auth);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.use((req, res, next) => {
  next(new NotFoundError('Cтраницы не существует'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
