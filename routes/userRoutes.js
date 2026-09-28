const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getProfile,
  updateProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get("/", protect, adminOnly, getAllUsers);

router.delete("/:id", protect, deleteUser);

module.exports = router;
