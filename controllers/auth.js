const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const user = await new User(req.body);
  await user.save();

  return res.json({
    message: 'Аккаунт был успешно создан'
  });
};
