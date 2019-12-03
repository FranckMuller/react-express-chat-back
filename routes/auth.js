const express = require('express');
const { signUp, signIn } = require('../controllers/auth');
const { signUpValidate, signInValidate } = require('../utils/validation/auth');

const router = express.Router();

router.post('/signup', signUpValidate, signUp);
router.post('/signin', signInValidate, signIn);

module.exports = router;
