const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, res) => {

    console.log('This is a cookie1');

    const secretKey = 'ThisIsTheSecretKey';

    const token = jwt.sign({userId}, secretKey , {expiresIn: '15d'});

    res.cookie('jwt', token, {maxAge: 15 * 24 * 60 * 60 * 1000,
         httpOnly: true,
        sameSite: 'strict'});

        console.log('This is a cookie2');
}

module.exports = { generateTokenAndSetCookie };