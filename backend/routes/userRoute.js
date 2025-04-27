const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// here is all user routes
const {login} = require('../controllers/userController');
const {interviewAnalytics} = require('../controllers/interviewStats')
const {interviewData, startInterview, continueInterview, endInterview} = require('../controllers/interviewController')

router.post('/login' , login );

// auth middleware
// router.use(auth);

router.post('/initiate-interview' , interviewData);
router.post('/start-interview' , startInterview);
router.post('/continue-interview' , continueInterview);
router.post('/end-interview' , endInterview);
router.post('/interview/analytics' , interviewAnalytics);
module.exports = router;