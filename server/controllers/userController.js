const User = require("../model/User");
const HealthForm = require("../model/HealthForm");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

/**
 * @desc: Login user.
 * @method: POST
 * @api: /api/user/login
 * @access: Public
 * @type: Controller
 * @param: req, res
 * @returns: { message, accessToken  , refreshToken  in cookie }
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const foundUser = await User.findOne({ where: { email } });

  if (!foundUser) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = await generateToken({
    id: foundUser.userId,
    role: "user",
  });

  res.cookie("refreshToken", refreshToken, {
    // httpOnly: true,
    // path: "/api/auth/refresh_token",
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({ accessToken });
};

/**
 * @desc: Submit health form.
 * @method: POST
 * @api: /api/user/submit_form
 * @access: Private
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.submitForm = async (req, res) => {
  const { id, role } = req;

  if (!id && role !== "user") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { description, city, state, country, zipCode } = req.body;

  if (!description || !city || !state || !country || !zipCode) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  await HealthForm.create({
    description,
    city,
    state,
    country,
    zipCode,
    userId: id,
  });

  return res.status(200).json({ message: "Form submitted successfully" });
};

/**
 * @desc: View history.
 * @method: GET
 * @api: /api/user/view_history
 * @access: Private
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.viewHistory = async (req, res) => {
  const { id, role } = req;

  if (!id && role !== "user") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const foundForms = await HealthForm.findAll({
    where: { userId: id },
    order: [["formDate", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "email", "age"],
      },
    ],
  });

  return res.status(200).json({ forms: foundForms });
};

/**
 * @desc: View profile.
 * @method: GET
 * @api: /api/user/view_profile
 * @access: Private
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.viewProfile = async (req, res) => {
  const { id, role } = req;

  if (!id && role !== "user") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const foundUser = await User.findOne({
    where: { userId: id },
    attributes: ["firstName", "lastName", "email", "age"],
  });

  return res.status(200).json({ user: foundUser });
};
