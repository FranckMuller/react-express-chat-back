const express = require('express');
const { createMessage, getMessages } = require('../controllers/message');

const router = express.Router();

router.post('/create-message', createMessage);
router.get('/messages', getMessages);

module.exports = router;
