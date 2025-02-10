const { userModel } = require("../models/user");

const getUsersForSidebar = async (req, res) => {
    try 
    {
        const loggedInUserId = req.user._id;

        const filteredUsers = await userModel.find({_id: {$ne: loggedInUserId}});

        res.status(200).json(filteredUsers);
    } 
    catch (error) {
        console.log(error);
        console.log(error.message);
    }
}

module.exports = {getUsersForSidebar}