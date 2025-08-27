import React from "react";
import MovieCard from "../components/MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";

export default function Movies() {
  const {
    items: movies,
    loading,
    error,
    page,
    totalPages,
    goToPage,
  } = useFetchMovies("movies");

  if (loading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">
          Failed to load movies. Please try again.
        </p>
      </div>
    );
  }

  // 🔑 Pagination range builder
  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) rangeWithDots.push("...");
    rangeWithDots.unshift(1, ...range);
    if (page + delta < totalPages - 1) rangeWithDots.push("...");
    rangeWithDots.push(totalPages);

    return rangeWithDots;
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 space-y-8">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies
              .filter((m) => m && m.id)
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} linkPrefix="movies" />
              ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-col items-center mt-10 gap-4">
            {/* Desktop Pagination */}
            <div className="hidden md:flex flex-wrap justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md disabled:opacity-40 transition"
              >
                Prev
              </button>

              {getPaginationRange().map((p, idx) =>
                p === "..." ? (
                  <span
                    key={idx}
                    className="px-3 py-2 text-gray-400 select-none"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-4 py-2 rounded-full transition shadow-md ${
                      page === p
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg scale-105"
                        : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>

            {/* Mobile Pagination */}
            <div className="flex md:hidden items-center gap-3 w-full justify-center">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full disabled:opacity-40 transition"
              >
                Prev
              </button>

              <select
                value={page}
                onChange={(e) => goToPage(Number(e.target.value))}
                className="px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Page {i + 1}
                  </option>
                ))}
              </select>

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full disabled:opacity-40 transition"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
