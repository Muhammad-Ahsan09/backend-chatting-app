const { userModel } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateTokenAndSetCookie } = require('../utils/generateTokens');

const signup = async (req, res) => {

    const { fullName, userName, password, confirmPassword, gender, profilePic } = req.body;

    try {
        if (password !== confirmPassword) {
            return res.send({ error: "Passwords don't match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            return res.status(201).send(newUser);
        }


    }

    catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

const login = async (req, res) => {

    try {
        
        console.log('inside login');

        const { userName, password } = req.body;
        const user = await userModel.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user.password || '');

        console.log(user);

        if (!user || !isPasswordCorrect) {
            return res.json({ error: "invalid credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePic: user.profilePic
        })
    }

    catch (error) {
        console.log(error.message);
        res.send({ error: 'internal server error' });
    }
}

const logout = (req, res) => {
    try {
        res.cookie(jwt, '', { maxAge: 0 });
        res.status(200).send({ message: 'Logged out successfully' });
    }

    catch (error) {
        console.log(error.message);
        res.send({ error: 'internal server error' });
    }
}

module.exports = { signup, login, logout };