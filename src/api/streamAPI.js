import axios from "axios";

const FULL_MOVIE_API_BASE = import.meta.env.VITE_FULL_MOVIE_API_BASE;

export const getLicensedMovieStream = async (id) => {
  if (!FULL_MOVIE_API_BASE || !id) return null;

  try {
    const { data } = await axios.get(`${FULL_MOVIE_API_BASE}/movies/${id}/stream`);
    return data?.url ? data : null;
  } catch (error) {
    console.error("Unable to load licensed movie stream:", error);
    return null;
  }
};
