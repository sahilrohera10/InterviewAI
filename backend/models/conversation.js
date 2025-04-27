const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

const conversationSchema = new Schema({
    interviewId : {
        type: String,
        required:[true , "interview id is required"]
    },
    
   conversationHistory : {
    type: Array,
    default: []
   },

    created_at:{
        type: Date,
        default: Date.now
    }
})

const conversationModel = mongoose.model('conversation' , conversationSchema);
module.exports = {conversationModel};