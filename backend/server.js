const sequelize = require("./config/db");
const express = require("express");
const { signUp, signin } = require("./controllers/userController");
const {
  appointment,
  allAppointments,
} = require("./controllers/appointmentController");

// importing modules
const Appointment = require("./models/Appointment");
const User = require("./models/User");

// imported cors to conect with ne server to another
const cors = require("cors");

//imported dotenv file to store secure data
require("dotenv").config();

// connecting with our data base which we created using sequelize
sequelize
  .sync()
  .then(() => {
    console.log("db is ready");
  })
  .catch((err) => {
    `error message while connecting with db ${err.message}`;
  });

const app = express();
app.use(express.json());
app.use(cors());

const portNum = process.env.PORT || 8000;

app.post("/signup", signUp);

app.post("/signin", signin);

app.post("/appointment", appointment);

app.post("/appointments", allAppointments);

app.listen(portNum, () => {
  console.log(`yes is am in server with port number ${portNum}`);
});
