const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const CryptoJS = require('crypto-js');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },

  lastName: {
    type: String,
    required: true,
    trim: true
  },

  login: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },

  hashed_password: {
    type: String,
    required: true
  },

  salt: String,

  created: {
    type: Date,
    default: Date.now
  },

  updated: Date
});

userSchema.virtual('password').set(function(password) {
  this.salt = uuidv1();
  this.hashed_password = this.encryptPassword(password);
});

userSchema.methods = {
  encryptPassword: function(password) {
    if (!password) return '';
    return CryptoJS.HmacSHA512(password, this.salt).toString();
  },

  comparePasswords: function(authPassword) {
    return this.hashed_password === this.encryptPassword(authPassword);
  }
};

module.exports = mongoose.model('User', userSchema);
