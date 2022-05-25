const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger'); //example custom middleware
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Load ENV vars
dotenv.config({path: './config/config.env'});

// Connect to DB
connectDB();

//Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body Parser (to use req.body)
app.use(express.json());

//invoque custom middleware
app.use(logger);

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

//err handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
   PORT,
   console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
         .bold
   )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
   console.log(`Unhandled Promise Rejection, Error: ${err.message}`).red;
   // Close server and exit process
   server.close(() => process.exit(1));
});
