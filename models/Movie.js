// const mongoose = require("mongoose");

// const MovieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   year: { type: Number, required: true },
//   country: { type: String, required: true },
//   genres: { type: String, required: true },
//   videoUrl: { type: String, required: true },
//   posterUrl: { type: String, required: true },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   isPremiere: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// // 🔥 Tez qidiruv uchun text index
// MovieSchema.index({ title: "text", description: "text" });

// module.exports = mongoose.model("Movie", MovieSchema);

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: Number, required: true },
  country: { type: String, required: true },
  genres: { type: String, required: true },

  // 🔥 Category qo‘shildi (K-Drama, Multfilim, Rus Kino...)
  category: { type: String, default: "Boshqa" },

  // 🔥 Ikki xil video manba
  videoEmbedUrl: { type: String, default: "" }, // iframe uchun
  videoFileUrl: { type: String, default: "" }, // mp4 yoki hls uchun

  posterUrl: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isPremiere: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// 🔍 Qidiruv uchun text index
MovieSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Movie", MovieSchema);
