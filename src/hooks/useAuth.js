import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
export function useAuthNav() {
  const navigate          = useNavigate();
  const { isAuthenticated } = useAuth();

  return function authNav(authedPath, guestPath = "/login") {
    navigate(isAuthenticated ? authedPath : guestPath);
  };
}

export function useRoleRedirect(allowedRole) {
  const navigate                     = useNavigate();
  const { user, isAuthenticated }    = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    if (user.role !== allowedRole) {
      const fallback =
        user.role === "officer" ? "/officer/dashboard" : "/citizen/dashboard";
      navigate(fallback, { replace: true });
    }
  }, [isAuthenticated, user, allowedRole, navigate]);
}
