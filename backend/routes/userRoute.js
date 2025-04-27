const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// here is all user routes
const {login} = require('../controllers/userController');
const {interviewData, startInterview, continueInterview, endInterview} = require('../controllers/interviewController')
const {interviewStats} = require('../controllers/interviewStats')

router.post('/login' , login );

// auth middleware
// router.use(auth);

router.post('/initiate-interview' , interviewData);
router.post('/start-interview' , startInterview);
router.post('/continue-interview' , continueInterview);
router.post('/end-interview' , endInterview);
router.post('/interview/conversation/stats' , interviewStats);

module.exports = router;