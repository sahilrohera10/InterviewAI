const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRouter = require('./routes/userRoute');
const videoRouter = require('./routes/videoRoute');

app.use('/api/v1/user', userRouter);
app.use('/api', videoRouter); // New video routes

// db connect here
const dbConnect = require('./Database/dbConnect');
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 