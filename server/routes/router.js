const express = require('express');
const route = express.Router();
const slots = require('../controller/slots');
const appointment = require('../controller/appointment');





/**
 * Routes Handling
 */

route.get('/',(req,res)=>{
    res.send("API's are ready");

});

// API slots
route.post('/api/addSlot', slots.create);
route.get('/api/getSlot', slots.find);

route.post('/api/addAppointment', appointment.create);
route.get('/api/getAppointments', appointment.getAppointments)




module.exports = route