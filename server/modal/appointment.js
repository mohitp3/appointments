const mongoose = require("mongoose");

var schema = new mongoose.Schema({
   
    email : {
        type: String,
        required: true
    },
    appointmentDate : {
        type: Date,
        default: Date.now,
        required: true,
    },
    name :{
        type : String,
        required: true,
    },
    slot:{
        type : Array,
        required: true,
    },
    duration:{
        type : Number,
        required: true,
        min:1,
        max:120
    }

  })

const appointment = mongoose.model("appointment", schema);

module.exports = appointment;