import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Register User
export const register = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions
        });
        const savedUser = await newUser.save();
        
        // Generate a token
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY);

        // Remove password from the response
        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;
        
        res.status(201).json({ user: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        !user && res.status(400).json("Invalid Email or Passowrd!");

        const isMatch = await bcrypt.compare(password, user.password);
        !isMatch && res.status(400).json("Invalid Email or Passowrd!");

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY );
        
        // Remove password from the response
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({ user:userWithoutPassword, token });
    }  catch (error) {
        res.status(500).json({ error: error.message });
    }
};