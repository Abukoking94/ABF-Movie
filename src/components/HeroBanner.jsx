import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroBanner({ movie }) {
  if (!movie) return null;

  return (
    <motion.div
      className="relative w-full h-[28rem] md:h-[34rem] lg:h-[40rem] overflow-hidden shadow-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

      {/* Cinematic content */}
      <motion.div
        className="absolute bottom-12 left-6 md:left-12 max-w-2xl backdrop-blur-sm bg-black/40 p-6 rounded-2xl shadow-lg border border-white/10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
          {movie.title}
        </h1>
        {movie.overview && (
          <p className="mt-3 text-sm md:text-lg text-gray-200 line-clamp-4">
            {movie.overview}
          </p>
        )}
        <div className="mt-5 flex gap-4">
          <Link
            to={`/movies/${movie.id}`}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-semibold text-white shadow-md transition-all duration-300"
          >
            ▶ Watch Now
          </Link>
          <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white shadow-md transition-all duration-300">
            + Add to List
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
