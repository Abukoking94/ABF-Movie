import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const FavoritesContext = createContext({
  favorites: [],
  isFavorite: () => false,
  addFavorite: () => {},
  removeFavorite: () => {},
  toggleFavorite: () => {},
});

const STORAGE_KEY = "favorites";

function normalizeItem(item) {
  if (!item || !item.id) return null;
  const media_type = item.media_type || (item.first_air_date ? "tv" : "movie");
  return {
    id: item.id,
    media_type,
    title: item.title || item.name || "",
    name: item.name || item.title || "",
    poster_path: item.poster_path || null,
    vote_average: item.vote_average ?? null,
    overview: item.overview || "",
    release_date: item.release_date || null,
    first_air_date: item.first_air_date || null,
    _original: item,
  };
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist favorites to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Listen for storage events but **avoid updating if the data didn't change**
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newFavs = JSON.parse(e.newValue || "[]");
          setFavorites((prev) => {
            // Only update state if it’s actually different
            const prevIds = prev.map((f) => f.id).join(",");
            const newIds = newFavs.map((f) => f.id).join(",");
            return prevIds === newIds ? prev : newFavs;
          });
        } catch {
          setFavorites([]);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const addFavorite = useCallback((item) => {
    const normalized = normalizeItem(item);
    if (!normalized) return;
    setFavorites((prev) =>
      prev.some((f) => f.id === normalized.id) ? prev : [normalized, ...prev]
    );
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback((item) => {
    const normalized = normalizeItem(item);
    if (!normalized) return;
    setFavorites((prev) =>
      prev.some((f) => f.id === normalized.id)
        ? prev.filter((f) => f.id !== normalized.id)
        : [normalized, ...prev]
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
