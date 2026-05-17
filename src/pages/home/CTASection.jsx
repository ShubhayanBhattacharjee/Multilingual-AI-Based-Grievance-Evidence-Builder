import { useEffect, useRef } from "react"
import { useAuthNav } from "../../hooks/useAuth" // adjust path as needed

const TICKER_ITEMS = [
  { ward: "Ward 12", issue: "Pothole on MG Road",       time: "2h 14m" },
  { ward: "Ward 7",  issue: "Broken streetlight",       time: "18h"    },
  { ward: "Ward 23", issue: "Overflowing drain",        time: "6h 40m" },
  { ward: "Ward 4",  issue: "Water supply outage",      time: "1d 2h"  },
  { ward: "Ward 31", issue: "Open manhole",             time: "4h 55m" },
  { ward: "Ward 19", issue: "Garbage not collected",    time: "9h 10m" },
  { ward: "Ward 8",  issue: "Power outage, Sector B",   time: "3h 20m" },
  { ward: "Ward 15", issue: "Night construction noise", time: "11h"    },
]

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div style={{ marginTop: 56, borderTop: "0.5px solid rgba(0,0,0,0.08)", paddingTop: 20, display: "flex", alignItems: "center", gap: 24, overflow: "hidden" }}>
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ccc", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "'Instrument Sans', sans-serif" }}>
        Live resolved
      </span>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div style={{ display: "flex", gap: 0, animation: "ctaTickerScroll 28s linear infinite", width: "max-content" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 28px", borderRight: "0.5px solid rgba(0,0,0,0.06)", whiteSpace: "nowrap", fontFamily: "'Instrument Sans', sans-serif" }}>
              <span style={{ fontSize: 10, color: "#ccc", fontWeight: 600 }}>{item.ward}</span>
              <span style={{ fontSize: 11, color: "#555" }}>{item.issue}</span>
              <span style={{ fontSize: 10, color: "#aaa", background: "rgba(0,0,0,0.05)", padding: "2px 8px", borderRadius: 20 }}>✓ {item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CTASection() {
  const go = useAuthNav()

  return (
    <section
      style={{ background: "#F5F3EF", padding: "80px 48px 64px", fontFamily: "'Instrument Sans', sans-serif", overflow: "hidden" }}
      className="cta-section"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top rule */}
        <div style={{ width: "100%", height: "0.5px", background: "rgba(0,0,0,0.12)", marginBottom: 52 }} />

        {/* Eyebrow */}
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#aaa", marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
          Nivaran — Civic Complaints Platform
        </p>

        {/* Big headline */}
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 700, color: "#1a1a18", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
          Your city.<br />
          <em style={{ fontWeight: 400, fontStyle: "italic", color: "#bbb" }}>Your voice.</em><br />
          File now.
        </h2>

        {/* Bottom row */}
        <div className="cta-bottom">
          <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, maxWidth: 340 }}>
            Two lakh citizens have already filed. Complaints are routed, tracked,
            and resolved — without a single office visit.
          </p>

          {/* ── CTAs — auth-aware ── */}
          <div className="cta-actions">
            <button
              onClick={() => go("/file-complaint", "/login")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#1a1a18", color: "#F5F3EF",
                fontSize: 13, fontWeight: 600,
                padding: "14px 28px", borderRadius: 100,
                border: "none", cursor: "pointer", letterSpacing: "0.01em",
              }}
            >
              File a complaint free
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => go("/track", "/login")}
              style={{
                fontSize: 12, color: "#bbb",
                background: "none", border: "none", cursor: "pointer", padding: 0,
                textDecoration: "underline", textUnderlineOffset: 3,
                textAlign: "right",
              }}
            >
              Already filed? Track your complaint →
            </button>
          </div>
        </div>

        <Ticker />

        <style>{`
          @keyframes ctaTickerScroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .cta-bottom {
            margin-top: 52px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 32px;
          }
          .cta-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: flex-end;
          }
          @media (max-width: 640px) {
            .cta-section {
              padding: 60px 20px 48px !important;
            }
            .cta-bottom {
              flex-direction: column;
              align-items: flex-start;
            }
            .cta-actions {
              align-items: flex-start;
              width: 100%;
            }
          }
        `}</style>
      </div>
    </section>
  )
}