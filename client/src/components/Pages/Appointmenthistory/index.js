import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../../ContextApi/ContextAp";
import { useContext } from "react";

const HistoryAppointment = () => {
  const [appointmentsData, appointmentsFill] = useState([]);

  const navigate = useNavigate();

  const { userDetail } = useContext(UserContext); // Ensure context value is correct

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/appointments",
          { name: userDetail }
        );
        console.log(response.data);
        appointmentsFill(response.data); // Directly set the response data
      } catch (err) {
        console.log("could not fetch all data=> ", err.message);
      }
    };

    dataFetch();
  }, [userDetail]); // Ensure userDetail is passed as a dependency

  const cook = Cookies.get("my_jwt");
  if (cook === undefined) {
    return <Navigate to="/signup" />;
  }

  const toAppointmentFun = () => {
    navigate("/appointment");
  };

  console.log("state variable", appointmentsData);

  const logoutFun = () => {
    Cookies.remove("my_jwt");
    navigate("/login");
  };

  return (
    <div className="HistoryParent">
      <div className="historyH1Div">
        <button type="button" onClick={toAppointmentFun} className="btn">
          To Appointment
        </button>
        <h1>Your Past Appointments</h1>
        <button type="button" onClick={logoutFun} className="btn">
          Logout
        </button>
      </div>
      <div className="HistoryChild">
        {appointmentsData.map((mapProp) => (
          <div className="mainCard" key={mapProp.id}>
            <div>
              <p className="paraCl">Name: {mapProp.name}</p>
              <p className="paraCl">Date: {mapProp.appointmentDate}</p>
              <p className="paraCl">Time: {mapProp.appointmentTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryAppointment;
