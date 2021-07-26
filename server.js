const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./server/database/connection')

const app = express();
dotenv.config()
const PORT  = process.env.PORT || 6000;
// var cors = require('cors')


/** COnnect Database */
connectDB();

/**
 * Setting Headers
 */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-requested-with');
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE');
    next();
}

app.use(allowCrossDomain)
//parse request to body parser
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//load routes 
app.use('/', require('./server/routes/router'))

app.listen(PORT,()=>console.log(`server is running on 
http://localhost:${PORT}
`));