import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Pages/Home";
import Signin from "./components/Pages/Signin";
import Signup from "./components/Pages/Signup";
import Appointmentbooking from "./components/Pages/Appointmentbooking";
import HistoryAppointment from "./components/Pages/Appointmenthistory";
import NotFound from "./components/Pages/Notfound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/appointment" element={<Appointmentbooking />} />
        <Route path="/appointments" element={<HistoryAppointment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
