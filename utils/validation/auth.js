const validator = require('validator');
const User = require('../../models/user');
const { check, bail, body, oneOf, optional, checkSchema } = require('express-validator');

exports.signUpValidate = [
  check('firstName', 'Введите ваше имя')
    .exists()
    .bail()
    .not()
    .isEmpty(),

  check('lastName', 'Введите вашу фамилию')
    .exists()
    .bail()
    .not()
    .isEmpty(),

  check('login', 'Введите ваш логин')
    .not()
    .isEmpty()
    .bail()
    .isLength({ min: 5 })
    .withMessage('Логин должен содержать более 5 символов')
    .bail()
    .custom(value => {
      return User.findOne({ login: value }).then(user => {
        if (user) {
          return Promise.reject('Такой логин уже используется');
        }
      });
    }),

  check('email', 'Заполните поле email')
    .exists()
    .bail()
    .not()
    .isEmpty()
    .bail()
    .isEmail()
    .withMessage('Неверный формат email')
    .bail()
    .custom(value => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject('Такой email уже используется');
        }
      });
    }),

  check('password', 'Введите ваш пароль')
    .exists()
    .bail()
    .not()
    .isEmpty()
    .bail()
    .isLength({ min: 8 })
    .bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/)
    .withMessage('Пароль должен состоять более чем из 7 латинских строчных и заглавных букв и чисел'),

  check('confirmPassword', 'Повторите пароль')
    .exists()
    .bail()
    .not()
    .isEmpty()
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject('Пароли не совпадают');
      }
      return true;
    })
];

exports.signInValidate = [
  oneOf([
    check('email').custom((value, { req }) => {
      if (value) {
        return User.findOne({ email: value }).then(user => {
          if (!user) {
            return Promise.reject({
              message: 'Пользователь не найден'
            });
          }

          if (!user.comparePasswords(req.body.password)) {
            return Promise.reject({
              message: 'Неверный email или пароль'
            });
          }
        });
      }
    }),

    check('login').custom((value, { req }) => {
      if (value) {
        return User.findOne({ login: value }).then(user => {
          if (!user) {
            return Promise.reject({
              message: 'Пользователь не найден'
            });
          }

          if (!user.comparePasswords(req.body.password)) {
            return Promise.reject({
              message: 'Неверный логин или пароль'
            });
          }
        });
      }
    })
  ])
];
