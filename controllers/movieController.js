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

// ✅ Category bo‘yicha filmlar
exports.getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const movies = await Movie.find({ category }).sort({ createdAt: -1 });
    res.json(movies);
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
  const {
    title,
    description,
    year,
    country,
    genres,
    category,
    videoEmbedUrl,
    videoFileUrl,
    posterUrl,
    isPremiere,
  } = req.body;

  try {
    // ⚠️ Validatsiya: ikkita video manba ham bo‘sh bo‘lsa error
    if (!videoEmbedUrl && !videoFileUrl) {
      return res
        .status(400)
        .json({ msg: "Video manbasi kerak (embed yoki file)" });
    }

    const newMovie = new Movie({
      title,
      description,
      year,
      country,
      genres,
      category,
      videoEmbedUrl,
      videoFileUrl,
      posterUrl,
      isPremiere,
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

    Object.assign(movie, req.body);
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

// ✅ Viewsni oshirish
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
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Like toggle
exports.toggleLike = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    const userId = req.user.id;
    if (!movie.likes) movie.likes = [];
    if (!movie.dislikes) movie.dislikes = [];

    movie.dislikes = movie.dislikes.filter((id) => id.toString() !== userId);

    if (movie.likes.includes(userId)) {
      movie.likes = movie.likes.filter((id) => id.toString() !== userId);
    } else {
      movie.likes.push(userId);
    }

    await movie.save();
    res.json({ likes: movie.likes.length, dislikes: movie.dislikes.length });
  } catch (err) {
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

    movie.likes = movie.likes.filter((id) => id.toString() !== userId);

    if (movie.dislikes.includes(userId)) {
      movie.dislikes = movie.dislikes.filter((id) => id.toString() !== userId);
    } else {
      movie.dislikes.push(userId);
    }

    await movie.save();
    res.json({ likes: movie.likes.length, dislikes: movie.dislikes.length });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Save toggle
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

// ✅ Search
exports.searchMovies = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "")
      return res.status(400).json({ msg: "Query bo'sh" });

    const searchQuery = q.trim();

    const movies = await Movie.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { genres: { $regex: searchQuery, $options: "i" } },
        { country: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
