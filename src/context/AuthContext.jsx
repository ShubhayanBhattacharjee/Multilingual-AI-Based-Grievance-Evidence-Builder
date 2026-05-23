import { createContext, useState, useCallback, useEffect } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("nivaran_user")) ?? null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("nivaran_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("nivaran_user");
    }
    window.dispatchEvent(new Event("storage"));
  }, [user]);

  const login = useCallback(async ({ email, password, role }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login({ email, password, role });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.message ?? "Login failed. Please try again.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ name, email, phone, password, role }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register({ name, email, phone, password, role });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.message ?? "Registration failed. Please try again.";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // always clear locally even if server call fails
      localStorage.removeItem("nivaran_user");
    }
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const isCitizen = user?.role === "citizen";
  const isOfficer = user?.role === "officer";

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isCitizen,
    isOfficer,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
