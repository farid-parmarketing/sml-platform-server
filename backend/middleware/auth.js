import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res
        .status(200)
        .json({ success: false, message: "Authentication failed" });
    } else {
      const verified = jwt.verify(token, process.env.SECRETKEY);
      req.admin = verified;
      next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const userAuth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      return res
        .status(200)
        .json({ success: false, message: "Authentication failed" });
    } else {
      const verified = jwt.verify(token, process.env.SECRETKEY);
      req.user = verified;
      next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({ success: false, message: "Token expired" });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { auth, userAuth };
