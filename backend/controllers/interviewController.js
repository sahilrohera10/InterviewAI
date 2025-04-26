const {interviewModel} = require('../models/interviewModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

async function interviewData(req , res){
    try{
            const userID = req.userID;
            const objectId = new ObjectId(userID);
            const {role , years_of_experience , tech , duration} = req.body;
            console.log(userID , typeof(userID));

            if(!objectId){
                res.send({
                    message: "Authentication fail"
                })
            }

            const interviewPayload = await interviewModel.create({
                user_id: objectId,
                role,
                years_of_experience,
                tech,
                duration
            })
            console.log(interviewPayload)

            if(interviewPayload){
                res.status(200).send({
                    status: "Success",
                    interviewID: interviewPayload._id
                })
            }

    }catch(err){
        res.status(501).send({
            status: "fail",
            message: "Error in interviewdata",
            error: err.message
        })
    }
}

module.exports = {interviewData}