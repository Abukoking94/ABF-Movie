import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTVShowDetails, getTVShowVideos } from "../api/movieAPI"; // add getTVShowVideos
import { motion } from "framer-motion";
import { Star, Calendar, Layers, ListChecks, Film } from "lucide-react";

export default function TVShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getTVShowDetails(id);
        setShow(data);

        const videoData = await getTVShowVideos(id);
        const youtubeVideos =
          videoData?.results?.filter((v) => v.site === "YouTube") || [];
        setVideos(youtubeVideos);

        const trailerVideo =
          youtubeVideos.find((v) => v.type === "Trailer") ||
          youtubeVideos[0] ||
          null;
        setSelectedVideo(trailerVideo);
      } catch (error) {
        console.error("❌ Error fetching TV show details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg md:text-xl font-medium text-gray-400 animate-pulse">
          Loading TV show details...
        </p>
      </div>
    );

  if (!show)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg md:text-xl font-semibold">
          ❌ Failed to load TV show details.
        </p>
      </div>
    );

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
        {show.poster_path ? (
          <motion.img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-64 md:w-80 lg:w-96 rounded-2xl shadow-2xl hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-64 md:w-80 lg:w-96 h-96 bg-gray-200 flex items-center justify-center rounded-2xl shadow-2xl">
            <span className="text-gray-500">No Poster</span>
          </div>
        )}

        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            {show.name}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
            {show.overview || "No description available."}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl shadow">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">
                {show.first_air_date || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-xl shadow">
              <Star className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">
                {show.vote_average ? show.vote_average.toFixed(1) : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl shadow">
              <Layers className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">
                {show.number_of_seasons || "N/A"} Seasons
              </span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-xl shadow">
              <ListChecks className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">
                {show.number_of_episodes || "N/A"} Episodes
              </span>
            </div>
          </div>

          {show.genres?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {show.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gradient-to-r from-indigo-200 to-purple-200 text-purple-900 px-4 py-1 rounded-full text-sm font-semibold shadow-md"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-4">
            {selectedVideo && (
              <button
                onClick={() => setTrailerOpen(true)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300"
              >
                Play Trailer
              </button>
            )}
            <Link
              to="/tv"
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold shadow-lg transition-all duration-300"
            >
              Back to TV Shows
            </Link>
          </div>
        </motion.div>
      </div>

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

      {show.backdrop_path && (
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            alt={`${show.name} backdrop`}
            className="w-full max-h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Overlay Info */}
          <div className="absolute bottom-6 left-6 text-white space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Film className="w-6 h-6" /> {show.name}
            </h2>
            <p className="text-sm max-w-xl opacity-90">
              {show.tagline || "Explore this TV show"}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
