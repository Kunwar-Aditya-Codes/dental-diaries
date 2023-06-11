const router = require("express").Router();

const {
  loginAdmin,
  viewForms,
  updateFormStatus,
  deleteAdmin,
  viewAdmins,
} = require("../controllers/adminController");

const verifyJwt = require("../middleware/verifyJwt");

router.route("/login").post(loginAdmin);
router.route("/view_forms").get(verifyJwt, viewForms);
router.route("/view_forms/:formId").patch(verifyJwt, updateFormStatus);
router.route("/view_admins").get(verifyJwt, viewAdmins);
router.route("/delete_admin/:adminId").delete(verifyJwt, deleteAdmin);

module.exports = router;
