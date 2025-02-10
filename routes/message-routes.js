const express = require('express');
const { sendMessage, getMessages } = require('../controllers/message-controllers');
const messageRouter = express.Router();
const {protectRoute} = require('../middlewares/protectRoute');


messageRouter.get('/:id', protectRoute, getMessages);
messageRouter.post('/send/:id', protectRoute, sendMessage);


module.exports = {messageRouter};