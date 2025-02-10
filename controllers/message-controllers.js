const { messageModel } = require('../models/message');
const jwt = require('jsonwebtoken');
const { conversationModel } = require('../models/conversation');
const { trusted } = require('mongoose');
const { getRecieverSocketId, io } = require('../socket/socket');
const { Socket } = require('socket.io');



const sendMessage = async (req, res) => {

    try {
        const message = req.body.message;
    const recieverId = req.params.id;
    const senderId = req.user._id;

    let conversation = await conversationModel.findOne({
        participants: {$all: [senderId, recieverId]}
    });

    if(!conversation)
    {
        conversation = await conversationModel.create({
            participants: [senderId, recieverId],
        });
    }

    const newMessage = await messageModel.create({
        senderId,
        recieverId,
        message
    });

    if(newMessage)
    {
        conversation.messages.push(newMessage._id);
    }

    await conversation.save();

    const recieverSocketId = getRecieverSocketId(recieverId);

    if(recieverSocketId)
    {
        io.to(recieverSocketId).emit('newMessage', newMessage);
        console.log(recieverSocketId);
    }
    console.log(recieverSocketId);

    res.status(201).send(newMessage);
    
    } catch (error) {
        console.log(error.message);
        res.send({error: "internal server error"});
    }
    

}

const getMessages = async (req, res) => {
    try
    {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await conversationModel.findOne({
            participants: {$all: [senderId, userToChatId]}
        }).populate('messages');

        if(!conversation)
        {
            return res.status(200).send([]);
        }
        
        res.status(200).json(conversation.messages);
    }

    catch(error)
    {
        console.log(error.message);
    }
}

module.exports = {sendMessage, getMessages}