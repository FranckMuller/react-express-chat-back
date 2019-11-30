const User = require('../models/user');

exports.getUsers = async (req, res) => {
  const result = await User.find().populate('message');
  res.json({
    result
  });
};
