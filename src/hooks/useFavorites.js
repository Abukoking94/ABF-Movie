import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function useFavorites() {
  return useContext(FavoritesContext);
}
