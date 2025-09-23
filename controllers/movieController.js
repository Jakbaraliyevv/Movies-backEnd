// // const Movie = require("../models/Movie");

// // // Get all movies
// // exports.getMovies = async (req, res) => {
// //   try {
// //     const movies = await Movie.find();
// //     res.json(movies);
// //   } catch (err) {
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Add movie
// // exports.addMovie = async (req, res) => {
// //   const { title, description, videoUrl } = req.body;
// //   try {
// //     const newMovie = new Movie({ title, description, videoUrl });
// //     const movie = await newMovie.save();
// //     res.json(movie);
// //   } catch (err) {
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Update movie
// // exports.updateMovie = async (req, res) => {
// //   const { title, description, videoUrl } = req.body;
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     if (!movie) return res.status(404).json({ msg: "Movie not found" });

// //     movie.title = title || movie.title;
// //     movie.description = description || movie.description;
// //     movie.videoUrl = videoUrl || movie.videoUrl;

// //     await movie.save();
// //     res.json(movie);
// //   } catch (err) {
// //     res.status(500).send("Server error");
// //   }
// // };

// // // Delete movie
// // exports.deleteMovie = async (req, res) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     if (!movie) return res.status(404).json({ msg: "Movie not found" });

// //     await movie.remove();
// //     res.json({ msg: "Movie removed" });
// //   } catch (err) {
// //     res.status(500).send("Server error");
// //   }
// // };

// const Movie = require("../models/Movie");

// // ✅ Get all movies
// exports.getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find().sort({ createdAt: -1 });
//     res.json(movies);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ✅ Get single movie by ID
// exports.getMovieById = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) return res.status(404).json({ msg: "Movie not found" });
//     res.json(movie);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // // Add movie
// // exports.addMovie = async (req, res) => {
// //   console.log("Keldi:", req.body); // 👈 shu joyni tekshirib ko‘ring
// //   const { title, description, year, country, genres, videoUrl, posterUrl } =
// //     req.body;

// //   try {
// //     const newMovie = new Movie({
// //       title,
// //       description,
// //       year,
// //       country,
// //       genres,
// //       videoUrl,
// //       posterUrl,
// //     });

// //     const movie = await newMovie.save();
// //     res.json(movie);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Server error");
// //   }
// // };

// // // ✅ Update movie
// // exports.updateMovie = async (req, res) => {
// //   try {
// //     const movie = await Movie.findById(req.params.id);
// //     if (!movie) return res.status(404).json({ msg: "Movie not found" });

// //     Object.assign(movie, req.body); // hamma fieldlarni yangilash uchun
// //     await movie.save();

// //     res.json(movie);
// //   } catch (err) {
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // };

// // Add movie
// exports.addMovie = async (req, res) => {
//   console.log("Keldi:", req.body);
//   const {
//     title,
//     description,
//     year,
//     country,
//     genres,
//     videoUrl,
//     posterUrl,
//     isPremiere,
//   } = req.body;

//   try {
//     const newMovie = new Movie({
//       title,
//       description,
//       year,
//       country,
//       genres,
//       videoUrl,
//       posterUrl,
//       isPremiere, // 🆕 qo‘shildi
//     });

//     const movie = await newMovie.save();
//     res.json(movie);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// };

// // ✅ Update movie
// exports.updateMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) return res.status(404).json({ msg: "Movie not found" });

//     Object.assign(movie, req.body); // isPremiere ham shu yerda yangilanadi
//     await movie.save();

//     res.json(movie);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ✅ Delete movie
// exports.deleteMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) return res.status(404).json({ msg: "Movie not found" });

//     await movie.deleteOne();
//     res.json({ msg: "Movie deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

const Movie = require("../models/Movie");

// ✅ Hamma filmlar
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Faqat premyeralar
exports.getPremiereMovies = async (req, res) => {
  try {
    const premieres = await Movie.find({ isPremiere: true }).sort({
      createdAt: -1,
    });
    res.json(premieres);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ ID bo‘yicha kino olish
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Yangi kino qo‘shish
exports.addMovie = async (req, res) => {
  console.log("Keldi:", req.body);
  const {
    title,
    description,
    year,
    country,
    genres,
    videoUrl,
    posterUrl,
    isPremiere,
  } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      year,
      country,
      genres,
      videoUrl,
      posterUrl,
      isPremiere, // 🎬 Premyera belgisi
    });

    const movie = await newMovie.save();
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// ✅ Yangilash
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    Object.assign(movie, req.body); // isPremiere ham shu yerda yangilanadi
    await movie.save();

    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ O‘chirish
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    await movie.deleteOne();
    res.json({ msg: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// bu yerdan new code

// ✅ Viewsni oshirish
// exports.addView = async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndUpdate(
//       req.params.id,
//       { $inc: { views: 1 } },
//       { new: true }
//     );
//     if (!movie) return res.status(404).json({ msg: "Movie not found" });
//     res.json({ views: movie.views });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };
exports.addView = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    const userId = req.user.id; 
    if (!movie.views.includes(userId)) {
      movie.views.push(userId);
      await movie.save();
    }

    res.json({ views: movie.views.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};


// // ✅ Like toggle
// exports.toggleLike = async (req, res) => {
//   try {
//     const userId = req.user.id; // authMiddleware dan
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) return res.status(404).json({ msg: "Movie not found" });

//     // Dislike bo‘lsa olib tashlaymiz
//     movie.dislikes = movie.dislikes.filter((id) => id.toString() !== userId);

//     // Like toggle
//     if (movie.likes.includes(userId)) {
//       movie.likes = movie.likes.filter((id) => id.toString() !== userId);
//     } else {
//       movie.likes.push(userId);
//     }

//     await movie.save();
//     res.json({ likes: movie.likes.length, dislikes: movie.dislikes.length });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ✅ Dislike toggle
// exports.toggleDislike = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const movie = await Movie.findById(req.params.id);
//     if (!movie) return res.status(404).json({ msg: "Movie not found" });

//     // Like bo‘lsa olib tashlaymiz
//     movie.likes = movie.likes.filter((id) => id.toString() !== userId);

//     // Dislike toggle
//     if (movie.dislikes.includes(userId)) {
//       movie.dislikes = movie.dislikes.filter((id) => id.toString() !== userId);
//     } else {
//       movie.dislikes.push(userId);
//     }

//     await movie.save();
//     res.json({ likes: movie.likes.length, dislikes: movie.dislikes.length });
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// ✅ Like toggle
exports.toggleLike = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    const userId = req.user.id;

    // Agar schema’da likes/dislikes massiv bo‘lsa:
    if (!movie.likes) movie.likes = [];
    if (!movie.dislikes) movie.dislikes = [];

    // ❌ Agar avval dislike bosgan bo‘lsa, o‘chirib tashlaymiz
    movie.dislikes = movie.dislikes.filter((id) => id.toString() !== userId);

    // ✅ Like bosganmi?
    if (movie.likes.includes(userId)) {
      // Agar avval bosgan bo‘lsa → o‘chirib tashlaymiz (toggle)
      movie.likes = movie.likes.filter((id) => id.toString() !== userId);
    } else {
      // Agar bosmagan bo‘lsa → qo‘shamiz
      movie.likes.push(userId);
    }

    await movie.save();
    res.json({ likes: movie.likes.length, dislikes: movie.dislikes.length });
  } catch (err) {
    console.error("toggleLike error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Dislike toggle
exports.toggleDislike = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    const userId = req.user.id;

    if (!movie.likes) movie.likes = [];
    if (!movie.dislikes) movie.dislikes = [];

    // ❌ Agar avval like bosgan bo‘lsa, o‘chirib tashlaymiz
    movie.likes = movie.likes.filter((id) => id.toString() !== userId);

    // ✅ Dislike bosganmi?
    if (movie.dislikes.includes(userId)) {
      movie.dislikes = movie.dislikes.filter((id) => id.toString() !== userId);
    } else {
      movie.dislikes.push(userId);
    }

    await movie.save();
    res.json({ likes: movie.likes.length, dislikes: movie.dislikes.length });
  } catch (err) {
    console.error("toggleDislike error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Save / Unsave (Watchlist)
exports.toggleSave = async (req, res) => {
  try {
    const userId = req.user.id;
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    if (movie.saved.includes(userId)) {
      movie.saved = movie.saved.filter((id) => id.toString() !== userId);
    } else {
      movie.saved.push(userId);
    }

    await movie.save();
    res.json({ saved: movie.saved.length });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
