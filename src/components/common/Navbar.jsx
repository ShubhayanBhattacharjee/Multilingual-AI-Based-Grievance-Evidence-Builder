import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ShieldIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const GUEST_LINKS = [{ label: "Home", to: "/" }];

const CITIZEN_LINKS = [
  { label: "Home", to: "/" },
  { label: "File Complaint", to: "/file-complaint" },
  { label: "Track Complaint", to: "/citizen/dashboard" },
];

const OFFICER_LINKS = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/officer/dashboard" },
  { label: "Service Tracking", to: "/officer/queue" },
];

function Avatar({ name, onClick }) {
  const initial = name ? name.trim()[0].toUpperCase() : "?";
  return (
    <button
      onClick={onClick}
      aria-label="Profile"
      className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center
        text-[13px] font-semibold flex-shrink-0 cursor-pointer
        hover:bg-blue-500 transition-all duration-150 active:scale-95
        shadow-[0_2px_10px_rgba(59,130,246,0.3)]
        hover:shadow-[0_2px_16px_rgba(59,130,246,0.45)]"
    >
      {initial}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropRef = useRef(null);

  const { user, isAuthenticated, isCitizen, isOfficer, logout } = useAuth();

  // Pick the right link set
  const NAV_LINKS = isCitizen
    ? CITIZEN_LINKS
    : isOfficer
      ? OFFICER_LINKS
      : GUEST_LINKS;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropOpen(false);
    setMenuOpen(false);
    navigate("/");
  };

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_2px_24px_rgba(0,0,0,0.06)]"
            : "bg-white border-b border-black/[0.06]"
        }`}
      >
        <div className="max-full mx-auto h-full px-6 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 group no-underline pl-4 md:pl-6"
          >
            <span
              className="w-8 h-8 flex items-center justify-center
              bg-black rounded-lg text-white flex-shrink-0
              shadow-[0_0_12px_rgba(59,130,246,0.4)]
              transition-transform duration-150 group-hover:scale-95"
            >
              <ShieldIcon />
            </span>
            <span className="font-['DM_Serif_Display'] text-xl text-black leading-none tracking-tight">
              Nivaran<span className="text-blue-500">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-150 no-underline ${
                  isActive(link.to)
                    ? "bg-black text-white shadow-sm hover:bg-blue-500"
                    : "bg-black/[0.04] text-neutral-600 hover:bg-black/[0.08] hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth controls — desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2" ref={dropRef}>
                {/* Sign Out button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-neutral-500
                    hover:text-red-500 hover:bg-red-50 transition-all duration-150
                    cursor-pointer border-none bg-transparent"
                >
                  Sign Out
                </button>

                {/* Avatar + dropdown */}
                <div className="relative">
                  <Avatar
                    name={user?.name}
                    onClick={() => setDropOpen((p) => !p)}
                  />

                  {dropOpen && (
                    <div
                      className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden
                        border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                      style={{
                        background: "rgba(255,255,255,0.97)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-black/[0.06]">
                        <p className="text-[13px] font-semibold text-black truncate">
                          {user?.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {user?.email}
                        </p>
                        <span
                          className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-black/[0.05]
                          text-[9px] uppercase tracking-widest text-neutral-500 font-semibold"
                        >
                          {user?.role ?? "citizen"}
                        </span>
                      </div>

                      {/* Role-specific quick links */}
                      <div className="py-1.5">
                        {isCitizen && (
                          <>
                            <Link
                              to="/file-complaint"
                              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-neutral-700
                                hover:bg-black/[0.04] hover:text-black transition-colors no-underline"
                              onClick={() => setDropOpen(false)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="12" y1="18" x2="12" y2="12" />
                                <line x1="9" y1="15" x2="15" y2="15" />
                              </svg>
                              File Complaint
                            </Link>
                            <Link
                              to="/citizen/dashboard"
                              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-neutral-700
                                hover:bg-black/[0.04] hover:text-black transition-colors no-underline"
                              onClick={() => setDropOpen(false)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                              </svg>
                              Track Complaints
                            </Link>
                          </>
                        )}

                        {isOfficer && (
                          <>
                            <Link
                              to="/officer/dashboard"
                              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-neutral-700
                                hover:bg-black/[0.04] hover:text-black transition-colors no-underline"
                              onClick={() => setDropOpen(false)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                              </svg>
                              Dashboard
                            </Link>
                            <Link
                              to="/officer/queue"
                              className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-neutral-700
                                hover:bg-black/[0.04] hover:text-black transition-colors no-underline"
                              onClick={() => setDropOpen(false)}
                            >
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                              </svg>
                              Service Tracking
                            </Link>
                          </>
                        )}

                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-neutral-700
                            hover:bg-black/[0.04] hover:text-black transition-colors no-underline"
                          onClick={() => setDropOpen(false)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          My Profile
                        </Link>
                      </div>

                      {/* Sign out in dropdown */}
                      <div className="border-t border-black/[0.06] py-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-500
                            hover:bg-red-50 transition-colors cursor-pointer bg-transparent border-none text-left"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-neutral-500
                    hover:text-black hover:bg-black/[0.05] transition-all duration-150 no-underline"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full text-sm font-medium
                    bg-black hover:bg-blue-500 text-white
                    transition-all duration-150 active:scale-[0.97] no-underline
                    shadow-[0_2px_10px_rgba(59,130,246,0.3)]
                    hover:shadow-[0_2px_16px_rgba(59,130,246,0.45)]"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`md:hidden flex items-center justify-center w-9 h-9 rounded-xl
              border transition-all duration-150 flex-shrink-0 ${
                menuOpen
                  ? "bg-white border-black/[0.12] text-black"
                  : "bg-white border-black/[0.12] text-neutral-700 hover:border-black/20 hover:text-black"
              }`}
          >
            {menuOpen ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="17"
                height="13"
                viewBox="0 0 17 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="0" y1="1" x2="17" y2="1" />
                <line x1="0" y1="6.5" x2="13" y2="6.5" />
                <line x1="0" y1="12" x2="17" y2="12" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div
        className={`fixed top-16 left-0 right-0 bottom-0 z-40 md:hidden
          flex flex-col px-5 pt-5 pb-10 overflow-y-auto
          transition-transform duration-300 ease-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(28px) saturate(1.8)",
          WebkitBackdropFilter: "blur(28px) saturate(1.8)",
          borderTop: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {isAuthenticated && user && (
          <div className="flex items-center gap-3 px-4 py-3 mb-3 rounded-2xl bg-black/[0.03] border border-black/[0.06]">
            <div
              className="w-9 h-9 rounded-full bg-black text-white flex items-center
              justify-center text-[13px] font-semibold flex-shrink-0"
            >
              {user.name ? user.name.trim()[0].toUpperCase() : "?"}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-black truncate">
                {user.name}
              </p>
              <p className="text-[11px] text-neutral-400 truncate">
                {user.email}
              </p>
              <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold">
                {user.role}
              </span>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl
                text-[15px] font-medium transition-all duration-150 no-underline ${
                  isActive(link.to)
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-black/[0.05] hover:text-black"
                }`}
            >
              <span>{link.label}</span>
              {isActive(link.to) && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          ))}

          {isAuthenticated && (
            <Link
              to="/profile"
              className="flex items-center justify-between px-4 py-3.5 rounded-2xl
                text-[15px] font-medium text-neutral-700
                hover:bg-black/[0.05] hover:text-black no-underline transition-all duration-150"
              onClick={() => setMenuOpen(false)}
            >
              My Profile
            </Link>
          )}
        </nav>

        <div className="my-5 h-px bg-black/[0.07]" />

        <div className="flex flex-col gap-2.5">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center py-3 rounded-2xl
                bg-white border border-red-200 text-red-500 text-[14px] font-medium
                hover:bg-red-50 transition-all duration-150 cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center justify-center py-3 rounded-2xl
                  bg-white border border-black/[0.1] text-black text-[14px] font-medium
                  hover:bg-neutral-50 transition-all duration-150 no-underline"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="flex items-center justify-center py-3 rounded-2xl
                  bg-black text-white text-[14px] font-semibold
                  transition-all duration-150 no-underline
                  shadow-[0_4px_14px_rgba(59,130,246,0.3)]"
              >
                Get started →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/[0.06] backdrop-blur-[2px] md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
}
