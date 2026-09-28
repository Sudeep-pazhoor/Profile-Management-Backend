const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
//create/reset admin account
const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    //del existing admin if any, then recreate fresh
    await User.deleteOne({ email: "admin@gmail.com" });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account ready!");
    console.log("   Email    : admin@gmail.com");
    console.log("   Password : admin123");
    console.log("   Role     : admin");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
//node seedAdmin.js