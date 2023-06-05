const router = require("express").Router();

const {
  loginAdmin,
  viewForms,
  updateFormStatus,
} = require("../controllers/adminController");

const verifyJwt = require("../middleware/verifyJwt");

router.route("/login").post(loginAdmin);
router.route("/view_forms").get(verifyJwt, viewForms);
router.route("/view_forms/:formId").patch(verifyJwt, updateFormStatus);

module.exports = router;
