import PrivateRoute from "../../utils";
import "./index.css";

const Home = () => {
  return (
    <div className="HomeMainDiv">
      <PrivateRoute />
      <iframe
        src="https://www.thoughtframeworks.com/"
        className="iFram"
        title="Website"
      ></iframe>
    </div>
  );
};

export default Home;
