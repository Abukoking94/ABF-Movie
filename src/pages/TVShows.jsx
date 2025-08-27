import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";

export default function TVShows() {
  const {
    items: shows,
    loading,
    error,
    page,
    totalPages,
    goToPage, // <-- use this instead of setPage
  } = useFetchMovies("tv");
  const [jumpPage, setJumpPage] = useState("");

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading && page === 1)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg md:text-xl font-medium text-gray-400 animate-pulse">
          Loading TV shows...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg md:text-xl font-semibold">
          ❌ Failed to fetch TV shows. Please refresh or try again later.
        </p>
      </div>
    );

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(1, page - delta);
      i <= Math.min(totalPages, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (range[0] > 2) range.unshift("...");
    if (range[0] !== 1) range.unshift(1);
    if (range[range.length - 1] < totalPages - 1) range.push("...");
    if (range[range.length - 1] !== totalPages) range.push(totalPages);
    return range;
  };

  const handleJump = () => {
    const num = parseInt(jumpPage);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      goToPage(num); // <-- use goToPage here
      setJumpPage("");
    }
  };

  return (
    <div className="space-y-10 px-4 md:px-8 lg:px-16 py-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          TV Shows
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Explore trending and popular TV shows. Click ❤️ to add to favorites.
        </p>
      </div>

      {/* Shows Grid */}
      {shows.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {shows
              .filter((s) => s && s.id)
              .map((show) => (
                <MovieCard key={show.id} movie={show} linkPrefix="tv" />
              ))}
          </div>

          {/* Modern Pagination Controls */}
          <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
            <button
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            {getPageNumbers().map((p, idx) =>
              p === "..." ? (
                <span key={`dots-${idx}`} className="px-2 py-2 text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={`page-${p}`}
                  onClick={() => goToPage(p)} // use the hook method
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    p === page
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {p}
                </button>
              )
            )}

            <button
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
            >
              Next
            </button>

            {/* Jump to Page */}
            <div className="flex items-center gap-2 ml-2 mt-2 sm:mt-0">
              <input
                type="number"
                min="1"
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                placeholder="Page #"
                className="w-20 px-2 py-1 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={handleJump}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Go
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No TV shows found.</p>
      )}
    </div>
  );
}
