import { useNavigate } from "react-router-dom"

/**
 * Returns a navigate function that checks auth before routing.
 * If user is logged in  → go to `authedPath`
 * If user is logged out → go to `guestPath` (default: /login)
 *
 * Usage:
 *   const go = useAuthNav()
 *   go("/file-complaint", "/login")
 */
export function useAuthNav() {
  const navigate = useNavigate()

  return function authNav(authedPath, guestPath = "/login") {
    try {
      const user = JSON.parse(localStorage.getItem("nivaran_user"))
      navigate(user ? authedPath : guestPath)
    } catch {
      navigate(guestPath)
    }
  }
}