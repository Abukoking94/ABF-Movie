import React from "react";
import Carousel from "../components/Carousel";
import MovieCard from "../components/MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";
import HeroBanner from "../components/HeroBanner";

export default function Home() {
  const { items: popular, loading: popularLoading } = useFetchMovies(
    "movies",
    "popular"
  );
  const { items: topRated, loading: topLoading } = useFetchMovies(
    "movies",
    "top"
  );

  if (popularLoading || topLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-lg md:text-xl font-medium text-gray-400 animate-pulse">
          Loading movies...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white space-y-12 px-4 md:px-8 lg:px-16 py-6">
      {/* ✅ Hero Banner (first popular movie) */}
      {popular.length > 0 && <HeroBanner movie={popular[0]} />}

      {/* Hero Carousel */}
      {popular.length > 0 && <Carousel items={popular.slice(0, 5)} />}

      {/* Popular Movies Row */}
      <section className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          Popular Movies
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Discover the hottest trending movies right now.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Top Rated Movies Row */}
      <section className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
          Top Rated
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          Explore movies loved by critics and audiences alike.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topRated.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
