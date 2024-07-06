const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// signup code--------------------------------------

const signUp = async (req, res) => {
  const { name, password } = req.body;

  try {
    const checkedUser = await User.findOne({ where: { name } });
    if (checkedUser) {
      return res.status(500).json({ error: "User already exists" });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.status(5000).json({ error: err.message });
        }

        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            return res.status(5000).json({ error: err.message });
          }
          try {
            const userRes = await User.create({
              name: name,
              password: hash,
            });

            console.log("user created", userRes);

            var token = jwt.sign({ name }, process.env.JWT_SECRET);

            return res.status(200).json({ jwt_token: token });
          } catch (err) {
            console.log(err.message);
            return res.status(5000).json({ error: err.message });
          }
        });
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// signin code---------------------------------------------

const signin = async (req, res) => {
  const { name, password } = req.body;

  try {
    const resFromDB = await User.findOne({ where: { name } });
    if (resFromDB) {
      try {
        const validPassword = await bcrypt.compare(
          password,
          resFromDB.password
        );
        if (validPassword) {
          const token = jwt.sign({ name }, process.env.JWT_SECRET);
          return res.status(200).json({ jwt_token: token });
        } else {
          return res.status(400).json({ message: "Wrong Password" });
        }
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("error while finding user for login");
    res.status(400).json({ message: err.message });
  }
};

module.exports = { signUp, signin };
