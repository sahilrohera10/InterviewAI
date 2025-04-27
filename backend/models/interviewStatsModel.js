const mongoose = require("mongoose");
const { type } = require("os");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const interviewStatsSchema = new Schema({
    interviewId : {
        type: String,
        required:[true , "interview id is required"]
    },

    overall_performance : {
        type: String,
        required : true
    },

    general_score : {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    technical_accuracy : {
        type : Number,
        required : true,
        min: 0,
        max: 100
    },

    communication : {
        type : Number,
        required : true,
        min: 0,
        max: 100
    },

    strengths : {
        type : [String],
        required: true,
    },

    areas_to_improve : {
        type : [String],
        required : true
    },

    closing_remark : {
        type : String,
        required : true
    },

    created_at:{
        type: Date,
        default: Date.now
    }
})

const interviewStatsModel = mongoose.model('interviewstats' , interviewStatsSchema);
module.exports = {interviewStatsModel};