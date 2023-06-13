const Admin = require("../model/Admin");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/hashPassword");
const generateToken = require("../utils/generateToken");

/**
 * @desc: Logout.
 * @method: POST
 * @api: /api/auth/logout
 * @access: Private
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(203).json({ message: "Already logged out!" });
  }

  res.clearCookie("refreshToken");

  return res.status(200).json({ message: "Logged out successfully!" });
};

/**
 * @desc: Refresh token.
 * @method: POST
 * @api: /api/auth/refresh_token
 * @access: Public
 * @type: Controller
 * @param: req, res
 * @returns: { accessToken  , refreshToken  in cookie }
 */
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req?.cookies;

  if (!refreshToken) {
    return res.status(203).json({ message: "Please login!" });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const { id, role } = decoded;

  let personalDetails;

  if (role === "user") {
    personalDetails = await User.findOne({ where: { userId: id } });
  } else if (role === "admin" || role === "super") {
    personalDetails = await Admin.findOne({ where: { adminId: id } });
  }

  if (!personalDetails) {
    return res.status(203).json({ message: "Please login!" });
  }

  const { accessToken, refreshToken: newRefreshToken } = await generateToken({
    id,
    role,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({ accessToken });
};

/**
 * @desc: Register user.
 * @method: POST
 * @api: /api/auth/register_user
 * @access: Public
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, age } = req.body;

  if (!firstName || !lastName || !email || !password || !phoneNumber || !age) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const foundUser = await User.findOne({ where: { email } });

  if (foundUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    age,
  });

  const { accessToken, refreshToken } = await generateToken({
    id: newUser.userId,
    role: "user",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(201)
    .json({ message: "User created successfully", accessToken });
};

/**
 * @desc: Register admin.
 * @method: POST
 * @api: /api/auth/register_admin
 * @access: Public
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.registerAdmin = async (req, res) => {
  // const { role } = req;

  // if (role !== "super") {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  const { adminName, adminEmail, adminPassword, adminRole } = req.body;

  if (!adminName || !adminEmail || !adminPassword || !adminRole) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const foundAdmin = await Admin.findOne({ where: { adminEmail } });

  if (foundAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await hashPassword(adminPassword);

  const newAdmin = await Admin.create({
    adminName,
    adminEmail,
    adminPassword: hashedPassword,
    adminRole,
  });

  const { accessToken, refreshToken } = await generateToken({
    id: newAdmin.adminId,
    role: adminRole,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(201)
    .json({ message: "Admin created successfully", accessToken });
};
