const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// here is all user routes
const {login} = require('../controllers/userController');
const {interviewData, startInterview, continueInterview} = require('../controllers/interviewController')
const {interviewStats , interviewAnalytics} = require('../controllers/interviewStats')

router.post('/login' , login );

// auth middleware
// router.use(auth);

router.post('/initiate-interview' , interviewData);
router.post('/start-interview' , startInterview);
router.post('/continue-interview' , continueInterview);
router.post('/interview/conversation/stats' , interviewStats);
router.post('/interview/conversation/stats/analitics' , interviewAnalytics);
module.exports = router;