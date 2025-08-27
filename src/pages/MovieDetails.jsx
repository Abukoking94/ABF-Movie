import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../api/movieAPI";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [fullMovieOpen, setFullMovieOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [fullMovieUrl, setFullMovieUrl] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const data = await getMovieDetails(id);
        setMovie(data);

        const videoData = await getMovieVideos(id);
        const youtubeVideos =
          videoData?.results?.filter((v) => v.site === "YouTube") || [];
        setVideos(youtubeVideos);

        const trailerVideo =
          youtubeVideos.find((v) => v.type === "Trailer") ||
          youtubeVideos[0] ||
          null;
        setSelectedVideo(trailerVideo);

        // Simulate fetching full movie URL (replace with real API)
        setFullMovieUrl(`https://www.example.com/fullmovie/${id}.mp4`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg md:text-xl font-medium text-gray-400 animate-pulse">
          Loading movie details...
        </p>
      </div>
    );

  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-lg md:text-xl font-semibold">
          ❌ Movie not found.
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8">
      {/* Movie Banner */}
      <motion.div
        className="relative w-full h-96 md:h-[36rem] rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </motion.div>

      {/* Movie Info Card */}
      <motion.div
        className="bg-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row gap-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 md:w-80 rounded-2xl shadow-lg object-cover"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            {movie.title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base line-clamp-5">
            {movie.overview || "No overview available."}
          </p>

          <div className="flex flex-wrap gap-4 mt-2 text-gray-400 text-sm md:text-base">
            <span>Release: {movie.release_date || "N/A"}</span>
            <span>Rating: ⭐ {movie.vote_average || "N/A"}</span>
            <span>
              Runtime: {movie.runtime ? `${movie.runtime} min` : "N/A"}
            </span>
            <span>
              Language: {movie.original_language?.toUpperCase() || "N/A"}
            </span>
          </div>

          <div className="mt-4 flex gap-4 flex-wrap">
            {selectedVideo && (
              <button
                onClick={() => setTrailerOpen(true)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300"
              >
                Play Trailer
              </button>
            )}

            {fullMovieUrl && (
              <button
                onClick={() => setFullMovieOpen(true)}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300"
              >
                ▶ Watch Full Movie
              </button>
            )}

            <Link
              to="/movies"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300"
            >
              Back to Movies
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Trailer Modal */}
      {trailerOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={() => setTrailerOpen(false)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${selectedVideo.key}`}
              title={selectedVideo.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Full Movie Modal */}
      {fullMovieOpen && fullMovieUrl && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold z-10"
              onClick={() => setFullMovieOpen(false)}
            >
              ×
            </button>
            <ReactPlayer
              url={fullMovieUrl}
              playing
              controls
              width="100%"
              height="100%"
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
