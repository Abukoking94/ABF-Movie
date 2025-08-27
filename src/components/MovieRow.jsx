import React from "react";
import MovieCard from "../components/MovieCard";

export default function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-6 h-fit">
      {/* Row Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
        {title}
      </h2>

      {/* Grid of Movie Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 h-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
