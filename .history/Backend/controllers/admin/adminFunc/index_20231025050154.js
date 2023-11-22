const SuperAdmin = require("../../../models/admin/adminModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../../../models/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
const superAdminRegister = async (data) => {
  const { username, password } = data;

  const adminExists = await SuperAdmin.findOne({ name : username });
  if (adminExists) throw new Error("not authorized as superAdmin");
  else {
   console.log('hello world')
  }
};

module.exports = superAdminRegister;
