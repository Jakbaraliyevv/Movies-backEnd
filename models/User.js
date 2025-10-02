// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true }, // ❌ required yo‘q
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  isOnline: { type: Boolean, default: false },
});

// 🔥 Shu joy muhim!
module.exports = mongoose.model("User", UserSchema);
