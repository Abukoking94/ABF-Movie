import { useAuth as useAuthContext } from "../context/auth";

// Custom hook to access authentication context easily
export default function useAuth() {
  return useAuthContext();
}
