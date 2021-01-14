/* eslint-disable no-console */
/* eslint-disable curly */
/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable no-lonely-if */
/* eslint-disable keyword-spacing */
/* eslint-disable no-else-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const connection = mongoose.createConnection(process.env.DATABASE_URL_USER);
mongoose.createConnection(process.env.DATABASE_URL_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the user database');
}).catch((err) => {
  console.error(`Error connecting to the database. \n${err}`);
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 12,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CameraEntry' }],
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err)
      return next(err);
    this.password = passwordHash;
    next();
  });
});

// A method to the Schema, accepting the password and a Callback (domne func)
UserSchema.methods.comparePassword = function (password, cb) {
  // We are comparing a password from the client to a HASHED password in DB
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      // if theres an error return error as callback
      return cb(err);
    } else {
      // if its not a match return isMatch as null
      if (!isMatch) {
        return cb(null, isMatch);
      } else {
        // Else we return the userObject back - This = the user
        return cb(null, this);
      }
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
