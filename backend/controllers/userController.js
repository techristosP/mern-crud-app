import asyncHandler from 'express-async-handler'; 
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const authUser = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Auth User' });
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Register User' });
    
    console.log(req.body);
    
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        // res.status(400).json({ message: 'User already exists' });
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        // res.status(400).json({ message: 'Invalid user data' });
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Logout User' });

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out' });
});

const getUserProfile = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'User Profile' });

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Update User Profile' });

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});



export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile };