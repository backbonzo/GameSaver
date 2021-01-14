const { Router } = require('express');
const passport = require('passport');
const JWT = require('jsonwebtoken');

const userRouter = Router();
const passportConfig = require('../passport');
const User = require('../models/User');
const CameraEntry = require('../models/CameraEntry');
// const devices = require('../api/devices');

const signToken = (userID) => {
  const jwt = JWT.sign({
    iss: 'Backbonzo',
    sub: userID,
  }, 'GarbageManagement', { expiresIn: '1h' });
  return jwt;
};

userRouter.post('/register', (req, res, next) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500);
      // res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
      next(err);
    }
    if (user) {
      // if this user exist we cant create it using that username
      res.status(400).json({ message: { msgBody: 'Username already exist', msgError: true } });
    } else {
      const newUser = new User({ username, password, role });
      newUser.save((error) => {
        if (error) {
          res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
        }
        res.status(201).json({ message: { msgBody: 'Account successfully created', msgError: false } });
      });
    }
  });
});

// use passport local strategy created in passport.js
userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    // req.user is coming from the passport.js in cb user
    const { _id, username, role } = req.user;
    const token = signToken(_id);
    // Login uses HTTPonly to prevent cross-site-sctipting attacks
    // and sameSite to prevent cross-site-forgery attacks
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
});

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.clearCookie('access_token');
  res.json({ user: { username: '', role: '' }, success: true });
});

// userRouter.get('/api/devices', devices);

userRouter.post('/device', passport.authenticate('jwt', { session: false }), (req, res) => {
  const cameraEntry = new CameraEntry(req.body);
  cameraEntry.save(async (err) => {
    if (err) {
      console.log('Error when saving');
      console.log(err);
      res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
    } else {
      req.user.devices.push(cameraEntry);
      req.user.save((error) => {
        if (error) {
          res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
        }
        res.status(200).json({ message: { msgBody: 'Successfully created device', msgError: false } });
      });
    }
  });
});

userRouter.get('/devices', passport.authenticate('jwt', { session: false }), (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  CameraEntry.findById({ _id: req.user._id }).populate('devices').exec((err, document) => {
    if (err) {
      res.status(500).json({ message: { msgBody: 'Error has occured', msgError: true } });
    }
    res.status(200).json({ devices: document.devices, authenticated: true });
  });
});

module.exports = userRouter;
