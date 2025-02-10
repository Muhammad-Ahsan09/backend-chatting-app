const express = require('express');
const { protectRoute } = require('../middlewares/protectRoute');
const { getUsersForSidebar } = require('../controllers/user-controller');

const userRouter = express.Router();

userRouter.get('/', protectRoute, getUsersForSidebar);

module.exports = {userRouter};
