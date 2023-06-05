const jwt = require("jsonwebtoken");

const User = require("../model/User");
const Admin = require("../model/Admin");

const verifyJwt = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  //! Check if user exists
  const { id, role } = decoded;

  if (role === "user") {
    const foundUser = await User.findOne({ where: { userId: id } });

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.id = foundUser.userId;
    req.role = "user";
  } else if (role === "admin") {
    const foundAdmin = await Admin.findOne({ where: { adminId: id } });

    if (!foundAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.id = foundAdmin.adminId;
    req.role = "admin";
  }

  next();
};

module.exports = verifyJwt;
