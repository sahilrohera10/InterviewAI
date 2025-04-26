const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// here is all user routes
const {login} = require('../controllers/userController');
const {interviewData} = require('../controllers/interviewController')
const {conversation} = require('../controllers/conversationController')
const {interviewStats} = require('../controllers/interviewStats')

router.post('/login' , login );

// auth middleware
router.use(auth);

router.post('/interview' , interviewData);
router.post('/interview/conversation' , conversation);
router.post('/interview/conversation/stats' , interviewStats);

module.exports = router;