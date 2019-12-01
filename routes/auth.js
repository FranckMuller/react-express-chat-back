const express = require('express');
const { signUp } = require('../controllers/auth');
const { signUpValidate } = require('../utils/validation/auth');

const router = express.Router();

router.post('/signup', signUpValidate, signUp);

module.exports = router;
