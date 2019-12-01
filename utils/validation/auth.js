const validator = require('validator');
const User = require('../../models/user');
const { check } = require('express-validator');

exports.signUpValidate = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Заполните поле email')
    .custom(value => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject('Такой email уже используется');
        }
      });
    })
    .isEmail()
    .withMessage('Неверный формат email'),

  check('firstName')
    .not()
    .isEmpty()
    .withMessage('Введите ваше имя'),

  check('lastName')
    .not()
    .isEmpty()
    .withMessage('Введите вашу фамилию'),

  check('login')
    .not()
    .isEmpty()
    .withMessage('Введите ваш логин')
    .isLength({ min: 5 })
    .withMessage('Логин должен содержать более 5 символов')
    .custom(value => {
      return User.findOne({ login: value }).then(user => {
        if (user) {
          return Promise.reject('Такой логин уже используется');
        }
      });
    }),

  check('password', 'Пароль должен состоять более чем из 7 латинских строчных и заглавных букв и чисел')
    .not()
    .isEmpty()
    .withMessage('Введите ваш пароль')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
];
