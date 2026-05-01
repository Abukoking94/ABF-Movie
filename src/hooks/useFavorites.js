import { useContext } from "react";
import { FavoritesContext } from "../context/favorites";

export default function useFavorites() {
  return useContext(FavoritesContext);
}
