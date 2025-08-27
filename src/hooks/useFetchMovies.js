import { useState, useEffect } from "react";
import * as movieAPI from "../api/movieAPI";

export default function useFetchMovies(type = "movies", endpoint = "popular") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const MAX_PAGE = 500; // TMDb limit

  const fetchData = async (pageToFetch = 1) => {
    const safePage = Math.min(Math.max(1, pageToFetch), MAX_PAGE);
    setLoading(true);
    setError(null);

    try {
      let data;
      if (type === "movies") {
        data =
          endpoint === "top"
            ? await movieAPI.getTopRatedMovies(safePage)
            : await movieAPI.getPopularMovies(safePage);
      } else {
        data = await movieAPI.getPopularTVShows(safePage);
      }

      if (!data) throw new Error("No data received");

      setItems(data.results || []);
      setPage(data.page || safePage);
      setTotalPages(Math.min(data.total_pages || MAX_PAGE, MAX_PAGE));
    } catch (err) {
      console.error("API fetch error:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [type, endpoint, page]);

  const goToPage = (pageNumber) => {
    const safePage = Math.min(Math.max(1, pageNumber), MAX_PAGE);
    setPage(safePage);
  };

  return { items, loading, error, page, totalPages, goToPage };
}
