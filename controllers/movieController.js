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
