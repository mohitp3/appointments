var Appointment = require("../modal/appointment");
const slots = require("./slots");

exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  var numSlots = Math.ceil(req.body.duration/30);
  reqSlot = [];
  for(i=0;i<numSlots;i++){
    reqSlot.push(req.body.slot + i)
  }
  const appointment = new Appointment({
    email: req.body.email,
    appointmentDate: req.body.appointmentDate,
    name: req.body.name,
    duration: req.body.duration,
    slot: reqSlot,
  });

  let fetchParam = { date: req.body.appointmentDate, timezone: "ist" };
  try {
    //check slot
    let slotexist = await slots.getSlots(fetchParam);
    console.log(slotexist)
    console.log(reqSlot)
    reqSlot.forEach(element => { 
        if (!slotexist.includes(element)) {
        return res.status(442).send({ message: "Slot Not Available" });
        }
    });
    
    //add slot
    let addslots = await slots.addSlot({
      slot: req.body.slot,
      date: req.body.appointmentDate,
    });
    //add appointment
    let saveappointment = await appointment.save();
    if (saveappointment) res.send(saveappointment);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong",
    });
  }
};

exports.getAppointments = async (req, res) => {
  let params = {};
  if (req.query.fromDate) {
    params["appointmentDate"] = {};
    params.appointmentDate["$gte"] = req.query.fromDate
      ? new Date(req.query.fromDate)
      : new Date(new Date().setDate(new Date().getDate() - 30));
  }
  if (req.query.toDate) {
    params.appointmentDate["$lt"] = req.query.toDate
      ? new Date(req.query.toDate)
      : new Date();
  }
  try {
    var appointments = await Appointment.find(params);
    if (appointments){
        let data = appointments.map( (item) => {
            return {
                name:item.name,
                appointmentDate: new Date(new Date(item.appointmentDate).getTime()),
                email:item.email,
                slot:item.slot,
                duration: item.duration
            }
        })
        res.send(data);
    } 
  } catch (error) {
    return error;
  }
};
