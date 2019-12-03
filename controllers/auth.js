const dotenv = require('dotenv');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

dotenv.config();

// SIGN UP
exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  const user = await new User(req.body);
  await user.save();

  return res.json({
    message: 'Аккаунт был успешно создан'
  });
};

// SIGN IN
exports.signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const nestedErrors = errors.array()[0].nestedErrors;
    return res.status(401).json({ message: nestedErrors[nestedErrors.length - 1].msg.message });
  }

  const byFindValue = req.body.email || req.body.login;
  const type = Object.keys(req.body).find(key => req.body[key] === byFindValue);

  const user = await User.findOne({ [type]: byFindValue });
  if (user) {
    const authToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    const authUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login,
      email: user.email,
      authToken
    };

    res.json({
      user: authUser
    });
  }
};
