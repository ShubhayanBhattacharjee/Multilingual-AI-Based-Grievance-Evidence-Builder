import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nf-root {
          min-height: 100vh;
          background: #F7F6F2;
          font-family: 'Instrument Sans', sans-serif;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* ── Hero-matching grid ── */
        .nf-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.042) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.042) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .nf-grid-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, #F7F6F2 100%);
        }

        /* ── Top bar ── */
        .nf-topbar {
          position: relative;
          z-index: 1;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 12px 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(247,246,242,0.9);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }
        .nf-topbar-label {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a3a3a3;
          font-weight: 500;
          text-decoration: none;
        }
        .nf-topbar-right {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a3a3a3;
          font-weight: 500;
        }

        /* ── Body ── */
        .nf-body {
          flex: 1;
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 16px;
        }

        /* ── Card ── */
        .nf-card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border: 0.5px solid rgba(0,0,0,0.09);
          border-radius: 20px;
          padding: 40px 36px 32px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
          animation: cardIn 0.35s ease forwards;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .nf-eyebrow {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a3a3a3;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .nf-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 999px;
          padding: 5px 12px;
          margin-bottom: 20px;
        }
        .nf-pill-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #EF4444;
          flex-shrink: 0;
        }
        .nf-pill-text {
          font-size: 11px; font-weight: 600;
          color: #EF4444; letter-spacing: 0.04em;
        }

        .nf-heading {
          font-family: 'DM Serif Display', serif;
          font-weight: 400;
          font-size: 64px;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: #000;
          margin-bottom: 10px;
        }
        .nf-heading span {
          color: #a3a3a3;
          font-size: 34px;
        }

        .nf-body-text {
          font-size: 13px;
          color: #737373;
          line-height: 1.65;
          margin-bottom: 28px;
        }

        .nf-divider {
          border: none;
          border-top: 1px solid rgba(0,0,0,0.07);
          margin-bottom: 20px;
        }

        .nf-path {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #F7F6F2;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 20px;
        }
        .nf-path-icon { flex-shrink: 0; color: #a3a3a3; }
        .nf-path-text {
          font-size: 12px;
          color: #a3a3a3;
          font-family: 'Instrument Sans', monospace;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nf-path-text em { color: #EF4444; font-style: normal; }

        .nf-btn-primary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 20px;
          margin-bottom: 10px;
          background: #000;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Instrument Sans', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .nf-btn-primary:hover { background: #262626; }

        .nf-btn-ghost {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 13px 20px;
          background: transparent;
          color: #000;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Instrument Sans', sans-serif;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.15s ease;
        }
        .nf-btn-ghost:hover { border-color: rgba(0,0,0,0.3); }

        /* ── Bottom bar ── */
        .nf-bottombar {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(0,0,0,0.07);
          padding: 0 48px;
          height: 44px;
          display: flex;
          align-items: center;
          gap: 24px;
          background: rgba(247,246,242,0.9);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }
        .nf-bottombar-item { display: flex; align-items: center; gap: 6px; }
        .nf-bottombar-item span {
          font-size: 11px; color: #737373;
          font-weight: 500; letter-spacing: 0.04em;
        }

        @media (max-width: 640px) {
          .nf-topbar { padding: 12px 20px; }
          .nf-topbar-right { display: none; }
          .nf-body { align-items: flex-start; padding: 32px 16px 48px; }
          .nf-card { padding: 28px 22px 24px; border-radius: 16px; }
          .nf-heading { font-size: 52px; }
          .nf-heading span { font-size: 28px; }
          .nf-bottombar { padding: 0 20px; gap: 16px; overflow-x: auto; }
          .nf-bottombar-item span { white-space: nowrap; }
        }
      `}</style>

      <div className="nf-root">
        {/* Grid layers */}
        <div className="nf-grid" />
        <div className="nf-grid-vignette" />

        {/* Top bar */}
        <div className="nf-topbar">
          <Link to="/" className="nf-topbar-label">
            India's Civic Complaint Platform
          </Link>
          <span className="nf-topbar-right">
            Government Verified · Free to Use
          </span>
        </div>

        {/* Body */}
        <div className="nf-body">
          <div className="nf-card">
            <p className="nf-eyebrow">Nivaran · 404</p>

            <div className="nf-pill">
              <div className="nf-pill-dot" />
              <span className="nf-pill-text">Page not found</span>
            </div>

            <h1 className="nf-heading">
              404
              <br />
              <span>lost in transit.</span>
            </h1>

            <p className="nf-body-text">
              This page doesn't exist, was moved, or the link is broken. Your
              complaint still matters — let's get you back on track.
            </p>

            <hr className="nf-divider" />

            <div className="nf-path">
              <svg
                className="nf-path-icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="nf-path-text">
                nivaran.in<em>{window.location.pathname}</em> → not found
              </span>
            </div>

            <Link to="/" className="nf-btn-primary">
              Back to home
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <button onClick={() => navigate(-1)} className="nf-btn-ghost">
              Go back
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="nf-bottombar">
          {["100% Free", "No account to track", "Transparent process"].map(
            (t) => (
              <div key={t} className="nf-bottombar-item">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{t}</span>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}
