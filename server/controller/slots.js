var Slots = require("../modal/slots");

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};


const addSlot = (exports.addSlot = async (params, start = 10) => {
  const slot = new Slots({
    slot: new Date(params.slot),
    date: new Date(params.date),
  });
  try {
    let saveSlot = await slot.save();
    if (saveSlot) return saveSlot;
  } catch (error) {
    return error;
  }
});

const getSlots = (exports.getSlots = async (
  data,
  startTime = 10,
  appHours = 7
) => {
  let params = {};
  if (data.date) {
    params["date"] = {};
    params.date["$gte"] = data.date ? new Date(data.date) : new Date();
  }
  if (data.date) {
    params.date["$lt"] = data.date
      ? new Date(new Date(data.date).setDate(new Date(data.date).getDate() + 1))
      : new Date(new Date().setDate(new Date().getDate() + 1));
  }
  let start = (new Date(data.date).setHours(startTime));
  let slotavail = appHours * 2;
  var availableSlots = [];
  for (i = 0; i <= slotavail; i++) {
    availableSlots.push(new Date(start).addHours(i / 2));
  }
  try {
    var avSlots = await Slots.find(params);
    if (avSlots) {
      avSlots.forEach((item) => {
        availableSlots.forEach((slt, ind) => {
          if (new Date(slt).getTime() === new Date(item.slot).getTime()) {
            availableSlots.splice(ind, 1);
          }
        });
      });
      return availableSlots;
    }
  } catch (error) {
    return error;
  }
});

exports.create = async (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }
  try {
    let data = await addSlot(req.body);
    if (data) res.send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Something went wrong",
    });
  }
};

exports.find = async (req, res) => {
  if (req.query.date && req.query.timezone) {
    try {
      let data = await getSlots(req.query);
      if (data) res.send(data);
    } catch (error) {
      res.status(500).send({ message: "Erro retrieving  " });
    }
  } else {
    res.status(400).send({ message: "Please provide Date and timezone" });
  }
};
