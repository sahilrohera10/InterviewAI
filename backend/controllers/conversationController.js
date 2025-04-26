const {conversationModel} = require('../models/conversation');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

async function conversation(req , res){
    try{
        const userID = req.userID;
        const objectId = new ObjectId(userID);
        const {question , answer} = req.body;

        const createConversation = await conversationModel.create({interview_id: objectId , question , answer});

        if(createConversation){
            res.status(200).send({
                status: "success",
                message: "conversation created"
            })
        }

    }catch(err){
        res.status(501).send({
            status: "fail",
            message: "Error in conversation",
            error: err.message
        })
    }
}

module.exports = {conversation}