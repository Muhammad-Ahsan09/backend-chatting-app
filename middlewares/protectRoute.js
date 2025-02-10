const { userModel } = require("../models/user");
const jwt = require('jsonwebtoken');


const protectRoute = async (req, res, next) => {
    try
    {
        const secretKey = 'ThisIsTheSecretKey';
        const token = req.cookies.jwt;

        if(!token)
        {
            console.log('inside error1');
            return res.status(400).json({error: 'Unauthorized - No Token Provided'});
        }

        const decoded = jwt.verify(token, secretKey);

        if(!decoded)
        {
            
            return res.status(400).json({error: 'Unauthorized - Invalid Token'})
        }

        const user = await userModel.findById(decoded.userId).select('-password');

        if(!user)
        {
            return res.json({error: 'No User Found'});
        }

        req.user = user;
        next();
    }

    catch (error)
    {
        console.log(error.message);
        res.status(500).json({error: 'Internall server error'});
    }
}

module.exports = { protectRoute };