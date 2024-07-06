import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../../ContextApi/ContextAp";
import axios from "axios";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { SiNamecheap } from "react-icons/si";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [userName, userNameFun] = useState();
  const [userPass, userPassFun] = useState();
  const [errFound, errorFun] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isTrue, isTrueChangeFun] = useState(false);
  const contextVar = useContext(UserContext);

  const navigate = useNavigate();

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

  // ---------------------login form starts

  const didLogin = async (e) => {
    e.preventDefault();

    errorFun("");

    //-------------------- password and name validation check

    const newErrors = { username: "", password: "" };

    if (!validateUsername(userName)) {
      newErrors.username = "Username must contain only letters and numbers.";
    }

    if (!validatePassword(userPass)) {
      newErrors.password =
        "Password must be at least 5 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.";
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      try {
        const res = await axios.post("http://localhost:5000/signin", {
          name: userName,
          password: userPass,
        });

        contextVar.setUserFun(userName);

        userNameFun("");
        userPassFun("");
        console.log("login response");
        console.log(res);

        Cookies.set("my_jwt", res.data.jwt_token, { expires: 2 });
        navigate("/appointment");
      } catch (err) {
        console.error(err.response.message);
        errorFun(err.response.message || "Login failed");
      }
    }
  };

  return (
    <div className="SignMain">
      <div className="SignForm">
        <h1 className="SignH1">Login</h1>

        <form onSubmit={didLogin}>
          <label className="labelCL">
            <input
              type="text"
              placeholder="User name"
              className="SignInput passCl"
              value={userName}
              onChange={(e) => {
                userNameFun(e.target.value);
              }}
            />
            <SiNamecheap />
          </label>
          {/*----------------- printing USername error related message */}
          {errors.username && (
            <p style={{ color: "red", marginBottom: 20 }}>{errors.username}</p>
          )}
          <label className="labelCL">
            <input
              type={isTrue ? "text" : "password"}
              placeholder={isTrue ? "text" : "password"}
              className="SignInput passCl"
              value={userPass}
              onChange={(e) => {
                userPassFun(e.target.value);
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

          {/*----------------------------------- login button */}

          <button type="submit" className="SignGoogle SignLogin">
            Login
          </button>

          {errFound && <p className="logResDb">{errFound}</p>}

          <div className="SignOrMainDiv">
            <div className="SignOr"></div>
            <span className="orSpan">Or</span>
            <div className="SignOr"></div>
          </div>

          <p className="SignPara">
            Don't have account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
