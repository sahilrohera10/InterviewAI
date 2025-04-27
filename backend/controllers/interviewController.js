const {interviewModel} = require('../models/interviewModel');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { v4: uuidv4 } = require('uuid');

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { conversation } = require('./conversationController');
const { conversationModel } = require('../models/conversation');

// Gemini API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


async function interviewData(req , res){
    try{
            const userID = "749d6326-8cfb-4bc0-a57a-385ef43fd468";
            const {domain, role , experience , techStack , duration} = req.body;

            if(!userID){
                res.send({
                    message: "Authentication fail"
                })
            }

            const interviewPayload = await interviewModel.create({
                userId: userID,
                interviewId : uuidv4(),
                domain,
                role,
                experience,
                techStack,
                duration
            })
            console.log(interviewPayload)

            if(interviewPayload){
                res.status(200).send({
                    status: "Success",
                    interviewId: interviewPayload.interviewId
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

async function startInterview(req , res){
    try{
        const userID = "749d6326-8cfb-4bc0-a57a-385ef43fd468";
        const {interviewId} = req.body;

        console.log("interviewId", interviewId);
        if(!userID){
            res.send({
                message: "Authentication fail"
            })
        }

        // fetch interview details from interviewModel
        const interviewDetails = await interviewModel.findOne({interviewId : interviewId});

        if(!interviewDetails){
            res.send({
                message: "Interview not found"
            })
        }

        const {domain , role , experience , techStack , duration} = interviewDetails;

        const prompt = `
        You are a highly professional interviewer.
        
        Conduct a mock interview for a candidate applying for the role of "${role}" in the "${domain}" domain.
        The candidate has ${experience} years of experience and specializes in "${techStack}".
        
        The interview should last approximately ${duration} minutes.
        
        Start by asking the **first** question only, based on the "${techStack}" topic.
        - Do not provide any answers.
        - Keep the question short, clear, and relevant to the candidate's experience.
        - Ask only **one** question at a time.
        
        Ensure that the question sounds natural and professional, as if it's a real-world job interview.

        Ask only the question and nothing else.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
        console.log("AI text", text);
    
        const conversationHistory = [
          { role: 'interviewer', message: text }
        ];

        await conversation({interviewId, conversationHistory, object: null});
    
        return res.status(200).json({
          message: "Interview started successfully",
          duration,
          question: text,
          conversationHistory,
        });

    }catch(err){
        return res.status(501).send({
            status: "fail",
            message: "Error in startInterview",
            error: err.message
        })
    }
}

function generatePrompt(domain, role, experience, techStack, duration, conversationHistory) {
    const formattedHistory = conversationHistory && conversationHistory.map(msg => 
        `${msg.role === 'interviewer' ? "Interviewer" : "Candidate"}: ${msg.message}`
    ).join('\n');

    return `
You are a highly professional interviewer.

Conduct a mock interview for a candidate applying for the role of "${role}" in the "${domain}" domain.
The candidate has ${experience} years of experience and specializes in "${techStack}".

The interview should ideally last around ${duration} minutes.

Here is the conversation so far:

${formattedHistory}

Now, based on the candidate's last answer:
- Give a very short feedback (one word or phrase, like "Good", "Needs Improvement", "Excellent").
- Then ask the next interview question.

Important Instructions:
- The next question must be in the continuation of the previous conversation held so far and should be based on the "${techStack}" topic.
- Strictly avoid questions outside "${techStack}" domain.
- Maintain a professional, realistic interview tone.
- Keep each question short, clear, and job-focused.
- Ask only one question at a time.
- Ask only the question and nothing else.
`;
}

async function continueInterview(req , res){
    try{
        const {interviewId, answer} = req.body;

        const conversationData = await conversation({interviewId, object: {role: 'candidate', message: answer}});

        if(!conversationData){
            res.send({
                message: "Conversation not found"
            })
        }

        const interviewDetails = await interviewModel.findOne({interviewId : interviewId});

        if(!interviewDetails){
            res.send({
                message: "Interview not found"
            })
        }

        const {domain , role , experience , techStack , duration} = interviewDetails;

        const prompt = generatePrompt(domain, role, experience, techStack, duration, conversationData.conversationHistory);


        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();
    

        await conversation({interviewId, object: {role: 'interviewer', message: text}});
    
        return res.json({
          message: "Interview continued successfully",
          feedbackAndNextQuestion: text,
        });

    }catch(err){
        return res.status(501).send({
            status: "fail",
            message: "Error in continueInterview",
            error: err.message
        })
    }
}

async function endInterview(){
   try{

    const {interviewId , answer} = req.body;

    const conversationData = await conversation({interviewId, object: {role: 'candidate', message: answer}});
 
    if(!conversationData){
     res.send({
         message: "Conversation not found"
     })
   }
 
   res.status(200).json({
     status: "success",
     data: conversationData
   });

   }catch(err){
    res.status(500).json({
        status: "fail",
        message: error.message
      });
    }
   }

module.exports = {interviewData , startInterview , continueInterview , endInterview}
async function endInterview(req, res) {
    try {
        const { interviewId } = req.body;
        
        // Here you can add any cleanup or finalization logic
        // For example, saving final interview stats, marking interview as completed, etc.
        
        return res.status(200).json({
            message: "Interview ended successfully",
            interviewId
        });
    } catch (err) {
        return res.status(501).send({
            status: "fail",
            message: "Error in ending interview",
            error: err.message
        });
    }
}

module.exports = {interviewData , startInterview , continueInterview, endInterview}