// const express = require("express");
// const router = express.Router();
// const { getUsers, register, login, logout } = require("../controllers/authController");
// const { authMiddleware } = require("../middleware/authMiddleware");

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", authMiddleware, logout);
// router.get("/users", authMiddleware, getUsers);

// module.exports = router;

const express = require("express");
const router = express.Router();

// ✅ logoutni ham import qilish shart
const {
  register,
  login,
  logout,
  getUsers,
  refresh,
} = require("../controllers/authController");
// const {} = require("../middleware/authMiddleware");
const auth = require("../middleware/authMiddleware");

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout); // ✅ endi ishlaydi
router.get("/users", auth, getUsers);
router.post("/refresh", refresh); // ✅ yangi route

module.exports = router;
