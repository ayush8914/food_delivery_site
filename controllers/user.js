const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

//@desc     Register a new user
//@route    POST /api/users
//@access   Public

const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    // console.log(req.body);
    if(!name || !email || !password){
        res.status(400).json({msg: 'Please enter all fields'});
    }
    //check if user already exists
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400).json({msg: 'User already exists'});
    }
    
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        // token: generateToken(user._id),
    });

    if(user){
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            
        })  
    }else{
        res.status(400).json({msg: 'Invalid user data'});
    }
    
};

//@desc     Authenticate a user
//@route    POST /api/users/login
//@access   Public

const loginUser =asyncHandler( async(req, res) => {
    const { email, password } = req.body;
    //check for user email
    const user = await User.findOne({ email });
    
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })  
    }else{
        res.status(400).json({msg: 'Invalid email or password'});
    }
   
});

//@desc     Get user profile
//@route    GET /api/users/me
//@access   private

const getUserProfile = asyncHandler(async (req, res) => {
    const {_id,name,email,role} = await User.findById(req.user._id);
    res.status(200).json({
        id: _id,
        name,
        email,
        role,
    });
    
});


//user update
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    // console.log(user);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.status(200).json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    }else{
        res.status(404).json( {msg:'User not found'});
    }
});

//all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({users});
});

//generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    }
    );}

const temp={}

module.exports = { registerUser, loginUser, getUserProfile,getAllUsers,updateUser };

