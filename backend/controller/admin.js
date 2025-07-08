import Admin from "../model/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findAdmin = await Admin.findOne({ username });
    if (findAdmin) {
      return res
        .status(200)
        .json({ success: false, message: "Account already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newAdmin.password = hash;
        newAdmin.save();
        return res
          .status(200)
          .json({ success: true, message: "Account created" });
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findAdmin = await Admin.findOne({ username });
    if (!findAdmin) {
      return res
        .status(200)
        .json({ success: false, message: "Account does not exist" });
    } else {
      bcrypt.compare(password, findAdmin.password).then((isMatch) => {
        if (!isMatch) {
          return res
            .status(200)
            .json({ success: false, message: "Wrong credentials" });
        } else {
          const token = jwt.sign(
            {
              id: findAdmin._id,
            },
            process.env.SECRETKEY,
            {
              expiresIn: 86400,
            }
          );
          return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const findAdmin = await Admin.findOne({ _id: req.admin.id });
    if (!findAdmin) {
      return res
        .status(200)
        .json({ success: false, message: "Authentication failed" });
    } else {
      const { password, ...adminWithoutPassword } = findAdmin.toObject();
      return res
        .status(200)
        .json({ success: true, result: adminWithoutPassword });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export { signup, login, getAdmin };
