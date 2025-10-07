const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   const { name, username, email, password } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     user = new User({ name, username, email, password });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);
//     await user.save();

//     const payload = { user: { id: user.id } };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   // ❗ Bo‘sh qiymatlarni tekshirish
//   if (!email || !password) {
//     return res.status(400).json({ msg: "Email va password kerak!" });
//   }

//   try {
//     let user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

//     user.isOnline = true;
//     user.lastLogin = new Date();
//     await user.save();

//     const payload = { user: { id: user.id } };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: "12h" },
//       (err, token) => {
//         if (err) throw err;
//         res.json({
//           token,
//           user: {
//             username: user.name,
//             email: user.email,
//           },
//         });
//       }
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// };

// exports.logout = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     user.isOnline = false;
//     await user.save();

//     res.json({ msg: "Logged out successfully" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// };

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.register = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, username, email, password: hashedPassword });
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// ✅ Login (Access + Refresh token)
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email va parol kerak!" });

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    user.isOnline = true;
    user.lastLogin = new Date();
    await user.save();

    // Access va Refresh token yaratish
    const payload = { user: { id: user.id } };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// ✅ Tokenni yangilash (Refresh)
exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ msg: "Refresh token kerak!" });

  try {
    const user = await User.findOne({ refreshToken });
    if (!user) return res.status(403).json({ msg: "Noto‘g‘ri refresh token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Refresh token eskirgan" });

      const payload = { user: { id: user.id } };
      const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });

      res.json({ accessToken: newAccessToken });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// ✅ Logout
exports.logout = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.isOnline = false;
    user.refreshToken = null;
    await user.save();

    res.json({ msg: "Logged out successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
