import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, getGenres } from "../api/movieAPI";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

export default function Categories() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // Fetch popular movies
  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  // Fetch genres dynamically
  useEffect(() => {
    const fetchGenres = async () => {
      const data = await getGenres(); // API call to fetch genre list
      setGenres(data);
    };
    fetchGenres();
  }, []);

  const filtered = selectedGenre
    ? movies.filter((m) => m.genre_ids.includes(selectedGenre))
    : movies;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4"
      >
        <Film className="w-12 h-12 text-red-500" />
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          Movie Categories
        </h1>
      </motion.div>

      {/* Genre Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-wrap gap-4"
      >
        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            onClick={() =>
              setSelectedGenre(selectedGenre === genre.id ? null : genre.id)
            }
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm md:text-base font-semibold shadow-md transition-all duration-300 ${
              selectedGenre === genre.id
                ? "bg-red-500 text-white scale-105 shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
            }`}
          >
            {genre.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Movies Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 text-sm md:text-base"
      >
        Showing{" "}
        <span className="font-semibold text-white">{filtered.length}</span>{" "}
        movies{" "}
        {selectedGenre && (
          <>
            in{" "}
            <span className="text-red-400">
              {genres.find((g) => g.id === selectedGenre)?.name}
            </span>
          </>
        )}
      </motion.p>

      {/* Movies Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {filtered.map((movie) => (
          <motion.div
            key={movie.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <MovieCard movie={movie} linkPrefix="movies" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
