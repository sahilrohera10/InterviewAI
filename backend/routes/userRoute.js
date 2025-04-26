const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");

// here is all user routes
const {login} = require('../controllers/userController');
const {interviewData} = require('../controllers/interviewController')

router.post('/login' , login );

// auth middleware
router.use(auth);

router.post('/interview' , interviewData);

module.exports = router;