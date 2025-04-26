const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config({path : "../.env"});
const secret_key = process.env.SECRET_KEY;

// auth middlerware
const auth = (req , res , next) => {
    try{
        //  const {token} = req.headers
         const {token} = req.headers
         if(!token){
            res.send({
                message: "Token missing"
            })
         }

         // verify token 
         const decorded = jwt.verify(token , secret_key);
         if(!decorded){
            res.send({
                status: "fail",
                message: "Invalid Token"
            })
         } else{
            req.userID = decorded.userID
            next();
         }
    } catch(err){
        res.status(500).send({
            status:"fail",
            error: err.message
        })
    }
}

module.exports = {auth};