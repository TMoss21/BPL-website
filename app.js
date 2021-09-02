const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const ejs = require('ejs');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs');

app.use(express.static("public"))

//Route

app.use('/', require('./routes/index'))

app.use('/', require('./routes/live'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server is running"));