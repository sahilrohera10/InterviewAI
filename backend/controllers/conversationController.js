const {conversationModel} = require('../models/conversation');
const mongoose = require('mongoose');

async function conversation(data){
    try{
        const {interviewId , conversationHistory, object} = data;
        console.log("interviewId", interviewId);
        console.log("conversationHistory", conversationHistory);
        console.log("object", object);

        let conversationData;

        if(object){
            // then update the conversationModela, for that interviewId and push that object in the conversationHistory array
            conversationData = await conversationModel.findOneAndUpdate({interviewId: interviewId}, {$push: {conversationHistory: object}});
        }

            conversationData = await conversationModel.create({interviewId: interviewId , conversationHistory});
    

        return conversationData;
       

    }catch(err){
        console.log("Error in conversation", err.message);
        throw new Error(err.message);
    }
}

module.exports = {conversation}