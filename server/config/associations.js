const User = require("../model/User");
const HealthForm = require("../model/HealthForm");

/**
 * @desc: Associate user and health form.
 */
User.hasMany(HealthForm, { foreignKey: "userId", targetKey: "userId" });
HealthForm.belongsTo(User, { foreignKey: "userId", targetKey: "userId" });
