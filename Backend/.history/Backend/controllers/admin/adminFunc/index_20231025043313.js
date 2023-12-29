const SuperAdmin = require("../../../models/superAdmin/index");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../../../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
const superAdminRegister = async (data) => {
  const { username, password } = data;

  const adminExists = await SuperAdmin.findOne({ username });
  if (adminExists) throw new Error("not authorized as superAdmin");
  else {
    try {
      const salt = bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userRole = await User.findOne({ username });

      if (userRole.role === "superAdmin") throw new Error("action not allowed");

      const updateRole = await userRole.updateOne({ role: "superAdmin" });
      const token = JWT.sign({ id: userRole._id }, JWT_SECRET);
      const admin = new SuperAdmin({
        username,
        password: hashedPassword,
      });
      await admin.save();
      return {
        message: "Admin created successfully",
        username,
        // updateRole,
        token:token
      };
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = superAdminRegister;
