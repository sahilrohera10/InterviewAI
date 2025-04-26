const {interviewStatsModel} = require('../models/interviewStatsModel')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const interviewStats = async(req , res) => {
    try{
        const userID = req.userID;
    const objectId = new ObjectId(userID);

    const stats = await interviewStatsModel.create({interview_id: objectId});
    if(stats){
        res.status(201).send({
            status:"success",
            message:"stats created successfully"
        })
    }
    }catch(err){
        res.status(501).send({
            status: "fail",
            message: "Error in interview stats",
            error: err.message
        })
    }
}

module.exports = {interviewStats};