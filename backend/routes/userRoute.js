const express = require("express");
const router = express.Router();

// here is all user routes
const {login} = require('../controllers/userController')
router.post('/login' , login );


module.exports = router;