const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const routerRegistration = require('./routes/registr');
const routerLogin = require('./routes/login');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '64c929147acb6130226796d7',
  };
  next();
});

app.use('/signup', routerRegistration);
app.use('/signin', routerLogin);

app.use('/users', routerUsers);
app.use('/cards', routerCards);
// app.use('/', require('./routes/index.js'));
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Такой страницы не существует' });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
