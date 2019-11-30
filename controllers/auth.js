const User = require('../models/user');

exports.signUp = async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email
  });

  if (existingUser) {
    return res.status(403).json({
      message: 'Этот email уже используется'
    });
  }

  const user = await new User(req.body);
  await user.save();

  return res.json({
    message: 'Аккаунт был успешно создан'
  });
};
