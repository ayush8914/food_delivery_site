const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getAllUsers,updateUser } = require('../controllers/user');
const {protect} = require('../middleware/authmiddleware');

//registeration
//all users
router.route('/').get( getAllUsers );


//update user
router.put('/update',protect,updateUser);

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.get('/me',protect, getUserProfile);

module.exports = router;


