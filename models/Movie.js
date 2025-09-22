// // const mongoose = require("mongoose");

// // const MovieSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   description: { type: String },
// //   year: { type: Number, required: true },
// //   country: { type: String, required: true },
// //   genres: { type: String, required: true },

// //   videoUrl: { type: String, required: true },
// //   posterUrl: { type: String, required: true },
// //   likes: { type: Number, default: 0 },
// //   dislikes: { type: Number, default: 0 },
// //   views: { type: Number, default: 0 },
// //   createdAt: { type: Date, default: Date.now },
// // });

// // module.exports = mongoose.model("Movie", MovieSchema);

// const mongoose = require("mongoose");

// const MovieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   year: { type: Number, required: true },
//   country: { type: String, required: true },
//   genres: { type: String, required: true },

//   videoUrl: { type: String, required: true },
//   posterUrl: { type: String, required: true },
//   likes: { type: Number, default: 0 },
//   dislikes: { type: Number, default: 0 },
//   views: { type: Number, default: 0 },
//   isPremiere: { type: Boolean, default: false }, // 🆕 yangi maydon
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Movie", MovieSchema);

const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  year: { type: Number, required: true },
  country: { type: String, required: true },
  genres: { type: String, required: true },

  videoUrl: { type: String, required: true },
  posterUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  isPremiere: { type: Boolean, default: false }, // 🎬 Premyera maydon
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", MovieSchema);
