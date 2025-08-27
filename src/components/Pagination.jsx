import React from "react";
import MovieCard from "../components/MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";

export default function Movies() {
  const { items: movies, loading, error, page, setPage } = useFetchMovies("movies");

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
          <div className="flex justify-center mt-8 gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-white font-bold">Page {page}</span>

            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
