import { useAuth } from "../context/AuthContext";

// Custom hook to access authentication context easily
export default function useAuth() {
  const { user, login, logout } = useAuth();
  return { user, login, logout };
}
