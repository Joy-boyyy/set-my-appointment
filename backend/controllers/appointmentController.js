const Appointment = require("../models/Appointment");

// booking an appointment

const appointment = async (req, res) => {
  const { name, appointmentDate, appointmentTime } = req.body;

  try {
    const appointmentRes = await Appointment.create({
      name: name,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
    });

    console.log("appointment is successful", appointmentRes);
    res.send(appointmentRes);
  } catch (err) {
    return res
      .status(5000)
      .json({ message: "Appointment details are not added" });
  }
};

// getting previous appointment details

const allAppointments = async (req, res) => {
  const { name } = req.body;

  try {
    const appointmentRes = await Appointment.findAll({ where: { name } });

    console.log("All Appointment", appointmentRes);

    res.json(appointmentRes);
  } catch (err) {
    return res.status(5000).json({
      message:
        "Don't have previous Appointment/ Did not get previous Appointment",
    });
  }
};

module.exports = { appointment, allAppointments };

//
