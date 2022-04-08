// import dotenv and call config function to load environment
require('dotenv').config();
//instantiate express module
const express = require("express");

//Get routes to variable here
const router = require('./src/routes');

//use express in app variable
const app = express();

//define the server port
const port = 5000;

app.use(express.json());

// Add endpoint grouping and router
app.use('/api/v1/', router)

// add route here to serving static file
app.use('/uploads', express.static('uploads'));

//when this nodejs app executed, it will listen to defined port
app.listen(port, () => console.log(`Listening on port ${port}!`));