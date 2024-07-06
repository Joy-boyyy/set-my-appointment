const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Appointment extends Model {}

Appointment.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    appointmentDate: {
      type: DataTypes.STRING,
    },
    appointmentTime: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "appointment",
  }
);

module.exports = Appointment;
