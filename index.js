const express = require('express');
const mongoose = require('mongoose');
const {router} = require('./routes/auth-routes')
const {messageRouter} = require('./routes/message-routes');
const cookieParser = require('cookie-parser');
const { userRouter } = require('./routes/user-routes');
const cors = require('cors');
const {app, server} = require('./socket/socket');

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', router);
app.use('/api/message', messageRouter);
app.use('/api/users', userRouter);


mongoose.connect('mongodb://127.0.0.1:27017/chat-app');

server.listen(8000, () => {
    console.log('Server is running on port 8000');
})