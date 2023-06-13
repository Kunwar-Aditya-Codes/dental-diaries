const router = require("express").Router();
const {
  logout,
  refreshToken,
  registerUser,
  registerAdmin,
} = require("../controllers/authController");

const verifyJwt = require("../middleware/verifyJwt");

router.route("/register_admin").post(registerAdmin);

router.route("/logout").post(logout);

router.route("/register_user").post(registerUser);

router.route("/refresh_token").post(refreshToken);

module.exports = router;
