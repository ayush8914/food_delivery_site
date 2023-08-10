const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/user');
const {protect} = require('../middleware/authmiddleware');

//registeration
router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.get('/me',protect, getUserProfile);

module.exports = router;


