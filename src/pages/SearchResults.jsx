import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../api/movieAPI";

export default function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const data = await searchMovies(query);
        setResults(data);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search results for "{query}"</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
