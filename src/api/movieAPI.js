import axios from "axios";

// TMDb API key from environment variables (Vite)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Helper for GET requests
const fetchData = async (endpoint, params = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      params: { api_key: API_KEY, ...params },
    });
    return res.data;
  } catch (error) {
    if (error.response?.status !== 404) {
      console.error(
        `❌ API Error (${endpoint}):`,
        error.response?.status,
        error.message
      );
    }
    return null; // 404 is normal for missing videos
  }
};


// Movies
export const getPopularMovies = async (page = 1) => {
  return await fetchData("/movie/popular", { page });
};

export const getTopRatedMovies = async (page = 1) => {
  return await fetchData("/movie/top_rated", { page });
};

export const getMovieDetails = async (id) => {
  if (!id) return null;
  return await fetchData(`/movie/${id}`);
};

// TV Shows
export const getPopularTVShows = async (page = 1) => {
  return await fetchData("/tv/popular", { page });
};

export const getTVShowDetails = async (id) => {
  if (!id) return null;
  return await fetchData(`/tv/${id}`);
};

// Genres
export const getGenres = async () => {
  const data = await fetchData("/genre/movie/list");
  return data?.genres || [];
};

// Search
export const searchMovies = async (query, page = 1) => {
  const data = await fetchData("/search/movie", { query, page });
  return data?.results || [];
};

export const searchTVShows = async (query, page = 1) => {
  const data = await fetchData("/search/tv", { query, page });
  return data?.results || [];
};

// Actors
export const getActorDetails = async (id) => {
  if (!id) return null;
  return await fetchData(`/person/${id}`);
};

export const getActorMovies = async (id) => {
  if (!id) return [];
  const data = await fetchData(`/person/${id}/movie_credits`);
  return data?.cast || [];
};

export const getMovieVideos = async (id) => {
  if (!id) return [];
  const data = await fetchData(`/movie/${id}/videos`);
  return data?.results || []; // return empty array if no videos
};

export const getTVShowVideos = async (id) => {
  if (!id) return [];
  const data = await fetchData(`/tv/${id}/videos`);
  return data?.results || [];
};
