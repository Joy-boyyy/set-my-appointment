import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../../../ContextApi/ContextAp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { SiNamecheap } from "react-icons/si";

import "./index.css";

const Signup = () => {
  const [newUserName, userNameAddFun] = useState("");
  const [newUserPass, userPassAddFun] = useState("");
  const [signUpErr, signUpErrFun] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isTrue, isTrueChangeFun] = useState(false);

  const navigate = useNavigate();

  const contextVari = useContext(UserContext);

  //-------------------- password and name validation FUnction

  const validateUsername = (name) => {
    const usernameRegex = /^[a-zA-Z0-9\s]+$/;
    return usernameRegex.test(name);
  };

  const validatePassword = (pass) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordRegex.test(pass);
  };

  // ------------------------form submission FUnction starts

  const signUpFun = async (e) => {
    e.preventDefault();

    signUpErrFun("");

    //-------------------- password and name validation check

    const newErrors = { username: "", password: "" };

    if (!validateUsername(newUserName)) {
      newErrors.username = "Username must contain only letters and numbers.";
    }

    if (!validatePassword(newUserPass)) {
      newErrors.password =
        "Password must be at least 5 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    setErrors(newErrors);

    //-------------- Condition used when both username and password are valid then form submittion will run

    if (!newErrors.username && !newErrors.password) {
      try {
        const res = await axios.post("http://localhost:5000/signup", {
          name: newUserName,
          password: newUserPass,
        });

        // setting user name
        contextVari.setUserFun(newUserName);

        userNameAddFun("");
        userPassAddFun("");
        console.log("Signup response");
        console.log(res);
        Cookies.set("my_jwt", res.data.jwt_token, { expires: 2 });
        navigate("/appointment");
      } catch (err) {
        console.error(err.response.message);
        signUpErrFun(err.response.message || "Already a user");
      }
    }
  };

  return (
    <div className="SignMain">
      <div className="SignForm">
        <h1 className="SignH1">Sign-up</h1>

        <form onSubmit={signUpFun}>
          <label className="labelCL">
            <input
              type="text"
              value={newUserName}
              placeholder="User name"
              className="SignInput passCl"
              onChange={(e) => {
                userNameAddFun(e.target.value);
              }}
              required
            />
            <SiNamecheap />
          </label>
          {/*----------------- printing USername error related message */}
          {errors.username && (
            <p style={{ color: "red", marginBottom: 20 }}>{errors.username}</p>
          )}
          <label className="labelCL">
            <input
              required
              type={isTrue ? "text" : "password"}
              value={newUserPass}
              placeholder="Create Password"
              className="SignInput passCl"
              onChange={(e) => {
                userPassAddFun(e.target.value);
              }}
            />
            {isTrue ? (
              <FaRegEye
                onClick={() => {
                  isTrueChangeFun(!isTrue);
                }}
                className="btnHoverCl"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => {
                  isTrueChangeFun(!isTrue);
                }}
                className="btnHoverCl"
              />
            )}
          </label>
          {/*----------------- printing Password error related message */}

          {errors.password && (
            <p style={{ color: "red", marginBottom: 20 }}>{errors.password}</p>
          )}

          <button type="submit" className="SignGoogle SignLogin">
            Signup
          </button>

          {signUpErr && <p className="alreadyUser">{signUpErr}</p>}

          <div className="SignOrMainDiv">
            <div className="SignOr"></div>
            <span className="orSpan">Or</span>
            <div className="SignOr"></div>
          </div>

          <p className="SignPara">
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
