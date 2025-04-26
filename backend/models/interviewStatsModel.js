const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const interviewStatsSchema = new Schema({
    interview_id : {
        type: ObjectId,
        ref: 'interviews',
        required:[true , "interview id is required"]
    },

    created_at:{
        type: Date,
        default: Date.now
    }
})

const interviewStatsModel = mongoose.model('interviewstats' , interviewStatsSchema);
module.exports = {interviewStatsModel};