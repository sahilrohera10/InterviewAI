const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock interview questions
const questions = [
  {
    id: '1',
    question: 'Tell me about a challenging project you worked on and how you overcame obstacles.',
    type: 'behavioral',
    followUp: [
      'What was the biggest challenge you faced?',
      'How did you handle team conflicts during this project?',
    ],
  },
  {
    id: '2',
    question: 'Explain the concept of RESTful APIs and their key principles.',
    type: 'technical',
    followUp: [
      'How would you handle API versioning?',
      'What security measures would you implement?',
    ],
  },
  {
    id: '3',
    question: 'How do you handle debugging complex issues in production?',
    type: 'technical',
    followUp: [
      'What tools do you use for debugging?',
      'How do you prioritize which bugs to fix first?',
    ],
  },
];

// Track current question index for each interview
const interviewProgress = new Map();

// Start interview endpoint
app.post('/api/interviews/:id/start', (req, res) => {
  const { id } = req.params;
  
  // Initialize progress for this interview
  interviewProgress.set(id, 0);
  
  // Return first question
  res.json({
    question: questions[0],
  });
});

// Continue interview endpoint
app.post('/api/interviews/:id/continue', (req, res) => {
  const { id } = req.params;
  const { questionId, answer } = req.body;
  
  // Get current progress
  const currentIndex = interviewProgress.get(id) || 0;
  
  // Validate question ID
  if (questions[currentIndex].id !== questionId) {
    return res.status(400).json({
      message: 'Invalid question ID',
    });
  }
  
  // Move to next question
  const nextIndex = currentIndex + 1;
  interviewProgress.set(id, nextIndex);
  
  if (nextIndex < questions.length) {
    // Return next question
    res.json({
      nextQuestion: questions[nextIndex],
    });
  } else {
    // Interview completed
    res.json({
      nextQuestion: null,
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
}); 