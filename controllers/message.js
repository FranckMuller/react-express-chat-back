const Message = require('../models/message');

exports.createMessage = async (req, res) => {
  const message = new Message({
    text: req.body.text,
    user: req.body.userId
  });

  const result = await message.save();
  console.log(result);
  res.json({
    message: result
  });
};

exports.getMessages = async (req, res) => {
  const result = await Message.find().populate('user');

  if (result.error) {
    res.json({
      message: result
    });
  }

  res.json({
    result
  });
};
