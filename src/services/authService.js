import api from "./api";

export const authService = {
  /**
   * @param {{ email: string, password: string, role: "citizen"|"officer" }} credentials
   * @returns {Promise<{ user: object }>}
   */
  async login({ email, password, role }) {
    const data = await api.post("/auth/login", { email, password, role });
    return data;              // { user: { id, name, email, phone, role, token } }
  },

  /**
   * @param {{ name: string, email: string, phone: string, password: string, role: "citizen"|"officer" }} payload
   * @returns {Promise<{ user: object }>}
   */
  async register({ name, email, phone, password, role }) {
    const data = await api.post("/auth/register", {
      name,
      email,
      phone,
      password,
      role,
    });
    return data;              // { user: { id, name, email, phone, role, token } }
  },

  async logout() {
    try {
      await api.post("/auth/logout", {});
    } catch {
    } finally {
      localStorage.removeItem("nivaran_user");
    }
  },
  async me() {
    return api.get("/auth/me");   // → { user: { ... } }
  },
};