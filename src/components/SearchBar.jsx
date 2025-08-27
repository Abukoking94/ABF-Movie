import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Search movies or TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-md text-black focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600"
      >
        Search
      </button>
    </form>
  );
}
