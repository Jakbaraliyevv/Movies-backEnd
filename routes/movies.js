// // const express = require("express");
// // const router = express.Router();
// // const auth = require("../middleware/authMiddleware");
// // const {
// //   getMovies,
// //   addMovie,
// //   updateMovie,
// //   deleteMovie,
// // } = require("../controllers/movieController");

// // router.get("/", getMovies);
// // router.post("/", auth, addMovie);
// // router.put("/:id", auth, updateMovie);
// // router.delete("/:id", auth, deleteMovie);

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const auth = require("../middleware/authMiddleware");
// const {
//   getMovies,
//   getMovieById,
//   addMovie,
//   updateMovie,
//   deleteMovie,
// } = require("../controllers/movieController");

// // ✅ CRUD Routes
// router.get("/", getMovies); // Get all movies
// router.get("/:id", getMovieById); // Get single movie
// router.post("/", auth, addMovie); // Add movie (faqat login user)
// router.put("/:id", auth, updateMovie); // Update movie
// router.delete("/:id", auth, deleteMovie); // Delete movie

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getMovies,
  getPremiereMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

// ✅ CRUD Routes
router.get("/", getMovies); // Hamma filmlar
router.get("/premieres", getPremiereMovies); // 🎬 Faqat premyeralar
router.get("/:id", getMovieById); // Bitta kino
router.post("/", auth, addMovie); // Kino qo‘shish (faqat login user)
router.put("/:id", auth, updateMovie); // Kino yangilash
router.delete("/:id", auth, deleteMovie); // Kino o‘chirish

module.exports = router;
