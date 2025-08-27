import React from "react";
import MovieCard from "../components/MovieCard";
import useFavorites from "../hooks/useFavorites";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <Heart className="w-12 h-12 text-red-500 animate-pulse" />
        <p className="text-gray-400 text-lg md:text-xl font-medium">
          You have no favorite movies or TV shows yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-4"
      >
        <Heart className="w-10 h-10 text-red-500" />
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-pink-400 bg-clip-text text-transparent">
          Your Favorites
        </h1>
      </motion.div>

      {/* Favorites Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {favorites.map((item) => {
          // Determine correct route prefix
          const linkPrefix =
            item.media_type === "tv" || item.first_air_date ? "tv" : "movies";

          return (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <MovieCard movie={item} linkPrefix={linkPrefix} />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
