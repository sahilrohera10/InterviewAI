const {interviewStatsModel} = require('../models/interviewStatsModel')
const {interviewModel} = require('../models/interviewModel');
const {conversationModel} = require('../models/conversation');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const { GoogleGenerativeAI } = require('@google/generative-ai');
// Gemini API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

// creating interview stats analytics endpoint 

const interviewAnalytics = async(req , res) => {
    try{
        console.log("inisde interviewAnalysis")
        const {interviewId} = req.body;

         // fetch interview details from interviewModel
         const interviewDetails = await interviewModel.findOne({interviewId});

         if(!interviewDetails){
             res.send({
                 message: "Interview not found"
             })
         }
 
         const {domain , role , experience , techStack , duration} = interviewDetails;

         // find user interview conversation
         const interviewConversation = await conversationModel.findOne({interviewId});


         if(!interviewConversation){
            res.send({
                message: "Interview conversation not found"
            })
         }

         const formattedConversation = interviewConversation.conversationHistory
  .map((entry) => `${entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}: ${entry.message}`)
  .join("\n\n"); // double line break between Q&A

  console.log("formattedConversation =>", formattedConversation)

         // now interact with ai for user analylitics

         const prompt = `
         You are a highly professional interview analyst.
         
         Analyze the following mock interview based on these details:
         - Role: "${role}"
         - Domain: "${domain}"
         - Candidate's Experience: ${experience} years
         - Specialization in: "${techStack}"
         - Interview Duration: ${duration} minutes
         
         Interview Conversation:
         ${formattedConversation}
         
         Instructions:
         - Summarize the candidate's overall performance in a short paragraph.
         - Provide a numerical score (out of 100) for:
           - Overall Performance (generalScore)
           - Communication Skills (communicationScore)
         - List 2-3 key strengths in an array format.
         - List 2-3 key areas for improvement in an array format.
         - Give a professional closing remark about the candidate's readiness for the role.
         
         Respond in a clear, structured JSON format like:
         {
           "overallPerformanceSummary": "short paragraph...",
           "generalScore": 85,
           "communicationScore": 78,
           "technicalAccuracy": 80,
           "strengths": ["strength1", "strength2"],
           "areasToImprove": ["area1", "area2"],
           "closingRemark": "professional remark..."
         }
         
         Important:
         - Keep the feedback formal, precise, and job-interview realistic.
         - Only output the JSON object. Do not repeat the instructions or candidate details.
         `;
         

         const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const responseText = await response.text ? await response.text() : "No response text available";
        console.log("response text =>", responseText)

// Clean the text properly
let cleanedText = responseText.trim(); // Remove any extra spaces/newlines at start or end

// Remove ```json or ``` if they exist
if (cleanedText.startsWith('```json')) {
  cleanedText = cleanedText.slice(7).trim(); // remove ```json
} else if (cleanedText.startsWith('```')) {
  cleanedText = cleanedText.slice(3).trim(); // remove ```
}

if (cleanedText.endsWith('```')) {
  cleanedText = cleanedText.slice(0, -3).trim(); // remove ending ```
}

console.log("Cleaned Text =>", cleanedText);

        const jsonRes = JSON.parse(cleanedText);  // Parse the string into JSON
        console.log(jsonRes);

        // now store info in db 

        const {overallPerformanceSummary , generalScore , communicationScore , technicalAccuracy , strengths , areasToImprove , closingRemark} = jsonRes;
        const createAnalitics = await interviewStatsModel.create({
            interviewId : interviewId,
            overall_performance : overallPerformanceSummary,
            general_score: generalScore,
            technical_accuracy: technicalAccuracy || 60, 
            communication : communicationScore,
            strengths,
            areas_to_improve: areasToImprove,
            closing_remark : closingRemark
        })

        if(!createAnalitics){
            return res.send({
                message : "fail to create analitics"
            })
        }

        return res.status(200).send({
            status: "Success",
            message: "analitics created",
            data : {
                interviewId : interviewId,
                overall_performance : overallPerformanceSummary,
                general_score: generalScore,
                technical_accuracy: technicalAccuracy || 60, 
                communication : communicationScore,
                strengths,
                areas_to_improve: areasToImprove,
                closing_remark : closingRemark
            }
        })

    }catch(err){
        res.status(501).send({
            message: "Error in showing user interview analytics",
            error : err.message
        })
    }
}

module.exports = {interviewStats , interviewAnalytics};