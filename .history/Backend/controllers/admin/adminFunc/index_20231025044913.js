const SuperAdmin = require("../../../models/admin/adminModel");
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
      const user = await User.findOne({ name: username });

      if (userRole.role === "superAdmin") throw new Error("action not allowed");

      const updateRole = await user.updateOne({ role: "superAdmin" });
      const token = JWT.sign({ id: user._id }, JWT_SECRET);
      const admin = new SuperAdmin({
        // id:user._id,
        username,
        password: hashedPassword,
      });
      await admin.save();
      return ({
        message: "Admin created successfully",
        id:admin._id,
        username: admin.username,
        // updateRole,
        token:token
      });
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = superAdminRegister;
