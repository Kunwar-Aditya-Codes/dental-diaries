const Admin = require("../model/Admin");
const User = require("../model/User");
const HealthForm = require("../model/HealthForm");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

/**
 * @desc: Login admin.
 * @method: POST
 * @api: /api/admin/login
 * @access: Public - Admin
 * @type: Controller
 * @param: req, res, next
 * @returns: { message, accessToken  , refreshToken  in cookie }
 */
exports.loginAdmin = async (req, res) => {
  const { adminEmail, adminPassword } = req.body;

  if (!adminEmail || !adminPassword) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const foundAdmin = await Admin.findOne({ where: { adminEmail } });

  if (!foundAdmin) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  const isMatch = await bcrypt.compare(adminPassword, foundAdmin.adminPassword);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  const { accessToken, refreshToken } = generateToken({
    id: foundAdmin.adminId,
    role: foundAdmin.adminRole,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Admin logged in successfully!",
    accessToken,
  });
};

/**
 * @desc: View all forms.
 * @method: GET
 * @api: /api/admin/view_forms
 * @access: Private - Admin
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.viewForms = async (req, res) => {
  const { id, role } = req;

  if (!id || (role !== "admin" && role !== "super")) {
    console.log(role);
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const forms = await HealthForm.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "email", "age"],
      },
    ],
  });

  res.status(200).json({ message: "Forms fetched successfully!", forms });
};

/**
 * @desc: Update form status.
 * @method: PATCH
 * @api: /api/admin/view_forms/:formId
 * @access: Private - Admin
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 */
exports.updateFormStatus = async (req, res) => {
  const { id, role } = req;

  if (!id || (role !== "admin" && role !== "super")) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const { formId } = req.params;
  const { formStatus } = req.body;

  if (!formId || !formStatus) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const form = await HealthForm.findOne({ where: { formId } });

  if (!form) {
    console.log("Form not found!");
    return res.status(404).json({ message: "Form not found!" });
  }

  form.formStatus = formStatus;
  await form.save();

  res.status(200).json({
    message: "Form updated successfully!",
  });
};

/**
 * @desc: Delete admin.
 * @method: DELETE
 * @api: /api/admin/delete_admin/:adminId
 * @access: Private - Super Admin
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 * @summary: Only super admin can delete admin.
 */
exports.deleteAdmin = async (req, res) => {
  const { id, role } = req;

  if (!id || role !== "super") {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const { adminId } = req.params;

  if (!adminId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const admin = await Admin.findOne({ where: { adminId } });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found!" });
  }

  await admin.destroy();

  res.status(200).json({ message: "Admin deleted successfully!" });
};

/**
 * @desc: View all admins.
 * @method: GET
 * @api: /api/admin/view_admins
 * @access: Private - Super Admin
 * @type: Controller
 * @param: req, res
 * @returns: { message }
 * @summary: Only super admin can view all admins.
 */
exports.viewAdmins = async (req, res) => {
  const { id, role } = req;

  if (!id || role !== "super") {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const admins = await Admin.findAll({
    where: { adminRole: "admin" },
  });

  res.status(200).json({ admins });
};
