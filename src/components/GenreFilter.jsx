import React from "react";
import { motion } from "framer-motion";

export default function GenreFilter({ genres, selectedGenre, onSelect }) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {genres.map((genre) => (
        <motion.button
          key={genre.id}
          onClick={() => onSelect(selectedGenre === genre.id ? null : genre.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold shadow-md transition-all duration-300 ${
            selectedGenre === genre.id
              ? "bg-red-500 text-white scale-105 shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
          }`}
        >
          {genre.name}
        </motion.button>
      ))}
    </motion.div>
  );
}
