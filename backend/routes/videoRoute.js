// route for video

const express = require('express');
const { videoController } = require('../controllers/videoController');
const videoRouter = express.Router();

// route for video
videoRouter.post('/video', videoController)

module.exports = videoRouter;