import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

export function AuthRedirect({ children }) {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export function ProtectedRoute({ children }) {
  const { user } = useAuthStore();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
