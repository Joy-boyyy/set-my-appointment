import DatePicker from "react-datepicker";
import PrivateRoute from "../../utils";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { WiTime1 } from "react-icons/wi";
import { MdOutlineDateRange } from "react-icons/md";
import { UserContext } from "../../../ContextApi/ContextAp";
import { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, Navigate } from "react-router-dom";

import "./index.css";

const Appointmentbooking = () => {
  const [startDate, setStartDate] = useState(new Date());

  console.log(startDate);

  const cook = Cookies.get("my_jwt");
  if (cook === undefined) {
    return <Navigate to="/signup" />;
  }

  const contextVarFOrData = useContext(UserContext);
  console.log(contextVarFOrData.userDetail);

  const myDate = new Date(startDate).toLocaleDateString();

  const myTime = new Date(startDate).toLocaleTimeString();

  const navigate = useNavigate();

  const setAppointmentFun = async () => {
    try {
      const axiousVar = await axios.post("http://localhost:5000/appointment", {
        name: contextVarFOrData.userDetail,
        appointmentDate: myDate,
        appointmentTime: myTime,
      });
      console.log(axiousVar);

      toast.success("Appointment Added");
    } catch (err) {
      toast.error(err.message || "Appointment Did not Set");
    }
  };

  const appointmentHistoryFun = () => {
    navigate("/appointments");
  };

  return (
    <div className="AppoBook">
      <ToastContainer />
      <div className="menu">
        <PrivateRoute />
      </div>
      <div className="AppoBookChild">
        <div className="h1Img">
          <h1 className="Gabbug">Hi I am Gabbug!</h1>
          <p>Ready for a Qualit Software? </p>
          <p>Let's dig deep into your Thoughts !</p>

          <img
            src="https://cdn.pixabay.com/photo/2017/05/17/04/39/cartoon-2319835_1280.png"
            alt="pixabay.com/photo"
            className="imgData"
          />
        </div>
        <div className="hiHlw">
          <h1 className="dateAndTImeH1">Select a Date & Time</h1>
          <label className="dateLabel">
            <DatePicker
              className="datePic"
              selected={startDate}
              dateFormat="📅 MM/dd/yyyy :⌚ hh:mm"
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeIntervals={5}
              //   timeFormat="hh:mm"
              timeFormat="hh:mm aa"
            />
            <FaCalendarAlt size={30} />
          </label>
          <div className="dateWtime">
            <h1 className="cmnDateTIme">
              <MdOutlineDateRange /> {myDate}
              <WiTime1 className="wiT" />
              {myTime}
            </h1>
          </div>
          <div className="mainAppointDiv">
            <button
              className="setAppBTn"
              type="button"
              onClick={setAppointmentFun}
            >
              Set Appointment
            </button>

            <button
              className="setAppBTn"
              type="button"
              onClick={appointmentHistoryFun}
            >
              Show Appointments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointmentbooking;
