const router = require("express").Router();
const verifyJwt = require("../middleware/verifyJwt");

const {
  loginUser,
  submitForm,
  viewHistory,
  viewProfile,
} = require("../controllers/userController");

router.route("/login").post(loginUser);

router.route("/submit_form").post(verifyJwt, submitForm);

router.route("/view_history").get(verifyJwt, viewHistory);

router.route("/view_profile").get(verifyJwt, viewProfile);

module.exports = router;
