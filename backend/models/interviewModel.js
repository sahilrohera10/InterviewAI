const mongoose = require("mongoose");
const { Schema } = mongoose;
const {ObjectId} = Schema.Types;

function arrayLimit(val) {
    return Array.isArray(val) && val.length > 0;
  }  

const interviewSchema = new Schema({
    user_id : {
        type: ObjectId,
        ref: 'users',
        required:true
    },
    role : {
        type : String,
        required: [true, "Role is required"],
        uppercase: true,
        trim:true
    },

    years_of_experience: {
        type: Number,
        required: [true, "Years of experience is required"],
        min: 0, 
        max: 100   
      },
    
    tech : {
        type : [String],
        required: true,
        validate: {
            validator: arrayLimit,
            message: "{PATH} must have at least 1 technology",
          },
    },

    duration : {
        type : Number,
        required: true,
    }
})

const interviewModel = mongoose.model('interview' , interviewSchema);
module.exports = {interviewModel};