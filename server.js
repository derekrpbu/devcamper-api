const express = require('express');
const dotenv = require('dotenv');

//Load ENV vars
dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(
   PORT,
   console.log(`Server in ${process.env.NODE_ENV} mode on port ${PORT}`)
);