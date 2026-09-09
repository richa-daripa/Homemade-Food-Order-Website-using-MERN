import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Custom Hook
export function useAuth() {
  return useContext(AuthContext)
}