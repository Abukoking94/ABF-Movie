import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Play } from "lucide-react";
import useFavorites from "../hooks/useFavorites";
import { getMovieVideos } from "../api/movieAPI";

export default function MovieCard({ movie, linkPrefix = "movies" }) {
  const { favorites, toggleFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const isFavorite = React.useMemo(
    () => favorites.some((fav) => fav.id === movie.id),
    [favorites, movie.id]
  );

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const data = await getMovieVideos(movie.id);
        const youtubeVideos =
          data?.results?.filter((v) => v.site === "YouTube") || [];
        const trailer =
          youtubeVideos.find((v) => v.type === "Trailer") || youtubeVideos[0];
        if (trailer) setVideoKey(trailer.key);
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
      }
    };
    fetchTrailer();
  }, [movie.id]);

  return (
    <motion.div
      whileHover={{ scale: 1.08, zIndex: 50 }}
      whileTap={{ scale: 0.98 }}
      className="relative cursor-pointer transition-transform duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/${linkPrefix}/${movie.id}`} className="block relative">
        <div className="relative w-full h-80 md:h-96 lg:h-[26rem] overflow-hidden rounded-2xl shadow-xl">
          {/* Poster Image */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || movie.name}
            className={`w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${
              isHovered && videoKey ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Hover Video */}
          {videoKey && isHovered && (
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}&modestbranding=1&rel=0&playsinline=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-2xl object-cover"
            />
          )}

          {/* Cinematic Overlay & Play Button */}
          {videoKey && (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="bg-black/50 p-4 rounded-full animate-pulse">
                <Play size={36} className="text-white" />
              </div>
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/70 text-yellow-400 font-bold px-3 py-1 rounded-full shadow text-sm flex items-center space-x-1">
            <span>⭐</span>
            <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie);
            }}
            className="absolute top-3 left-3 bg-gray-900/70 p-2 rounded-full transition-colors duration-300 hover:bg-red-700/80"
          >
            <Heart
              size={22}
              className={`transition-colors duration-300 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Movie Info Slide-Up */}
        <motion.div
          className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-900/90 to-transparent rounded-b-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg md:text-xl font-bold text-white truncate">
            {movie.title || movie.name}
          </h3>
          <p className="text-gray-300 text-sm md:text-base mt-1 line-clamp-3">
            {movie.overview || "No description available."}
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
}
