const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const conversationSchema = new Schema({
    interview_id : {
        type: ObjectId,
        ref: 'interviews',
        required:[true , "interview id is required"]
    },
    
    question : {
        type: String,
        required: true,
        trim: true
    },

    answer : {
        type: String,
        required: true,
        trim: true
    },

    created_at:{
        type: Date,
        default: Date.now
    }
})

const conversationModel = mongoose.model('conversation' , conversationSchema);
module.exports = {conversationModel};