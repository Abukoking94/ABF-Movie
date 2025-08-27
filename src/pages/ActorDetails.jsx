import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorDetails, getActorMovies } from "../api/movieAPI";
import MovieCard from "../components/MovieCard";

export default function ActorDetails() {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchActor = async () => {
      const data = await getActorDetails(id);
      const credits = await getActorMovies(id);
      setActor(data);
      setMovies(credits);
    };
    fetchActor();
  }, [id]);

  if (!actor) return <p>Loading actor details...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
          alt={actor.name}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-4xl font-bold">{actor.name}</h1>
          <p>Birthday: {actor.birthday}</p>
          <p>Place of Birth: {actor.place_of_birth}</p>
          <p>{actor.biography}</p>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
