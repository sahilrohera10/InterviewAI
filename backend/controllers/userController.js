const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({path : "../.env"});
const secret_key = process.env.SECRET_KEY

// here is requiring schema
const {UserModel} = require('../models/userModel')


// user login end login
async function login(req, res) {
    try {
      const { username, email, photo_url, average_rating, interview_count } = req.body;
  
      if (!email) {
        return res.status(400).json({ status: "fail", message: "Email is required" });
      }
  
      let user = await UserModel.findOne({ email });
  
      // If user does not exist
      if (!user) {
        try {
          const createUser = await UserModel.create({
            username,
            email,
            photo_url,
            average_rating,
            interview_count
          });
  
          if (createUser) {
            try {
              const token = jwt.sign({ userID: createUser._id }, secret_key);
  
              res.header({ "token": token });
  
              return res.status(201).send({
                status: "success",
                message: "User created successfully",
                token: token
              });
  
            } catch (e) {
              return res.status(500).send({
                status: "fail",
                message: "Error in creating token",
                error: e.message
              });
            }
          }
  
        } catch (e) {
          return res.status(500).send({
            status: "fail",
            message: "Error in creating user",
            error: e.message
          });
        }
      }
  
      // If user exists
      else {
        try {
          const token = jwt.sign({ userID: user._id }, secret_key);
  
          res.header({ "token": token });
  
          return res.status(200).send({
            status: "success",
            message: "Login successful",
            token: token
          });
  
        } catch (e) {
          return res.status(500).send({
            status: "fail",
            message: "Error in creating token",
            error: e.message
          });
        }
      }
  
    } catch (err) {
        return res.status(500).send({
          status: "fail",
          message: "Something went wrong in login",
          error: err.message
        });
      }
    }

    module.exports = {login};