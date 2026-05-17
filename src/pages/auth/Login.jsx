import { useState } from "react";
import { Link } from "react-router-dom";

/* ── Data ── */
const DATA = [
  {
    ward: "Ward 12",
    text: "Massive pothole on main road causing accidents daily",
    status: "resolved",
  },
  {
    ward: "Ward 7",
    text: "Street lights out for 3 weeks near school",
    status: "pending",
  },
  {
    ward: "Ward 23",
    text: "Drain overflowing into homes during rain",
    status: "escalated",
  },
  {
    ward: "Ward 4",
    text: "No water supply for 2 days in entire block",
    status: "pending",
  },
  {
    ward: "Ward 31",
    text: "Open manhole on busy service lane",
    status: "resolved",
  },
  {
    ward: "Ward 19",
    text: "Garbage not collected in 10 days",
    status: "escalated",
  },
  {
    ward: "Ward 8",
    text: "Electricity outage affecting 400 homes",
    status: "resolved",
  },
  {
    ward: "Ward 15",
    text: "Illegal construction blocking public road",
    status: "pending",
  },
  {
    ward: "Ward 3",
    text: "Sewage leak near children's park",
    status: "escalated",
  },
  {
    ward: "Ward 9",
    text: "Bus stop shelter collapsed, no repairs",
    status: "pending",
  },
  {
    ward: "Ward 17",
    text: "Public toilet locked and inaccessible",
    status: "resolved",
  },
  {
    ward: "Ward 28",
    text: "Tree fallen on road since morning",
    status: "resolved",
  },
  {
    ward: "Ward 6",
    text: "Footpath dug up, not repaired for months",
    status: "pending",
  },
  {
    ward: "Ward 11",
    text: "Stray dogs attacking residents near market",
    status: "escalated",
  },
  {
    ward: "Ward 22",
    text: "Water pump broken, colony without supply",
    status: "pending",
  },
  {
    ward: "Ward 5",
    text: "Noise pollution from factory at night",
    status: "resolved",
  },
  { ward: "Ward 14", text: "Road cave-in near junction", status: "escalated" },
  {
    ward: "Ward 33",
    text: "Electricity bill errors affecting 50 homes",
    status: "pending",
  },
  {
    ward: "Ward 2",
    text: "Park benches stolen, no replacement",
    status: "resolved",
  },
  {
    ward: "Ward 18",
    text: "Mosquito breeding in stagnant water",
    status: "pending",
  },
];

const STATUS_META = {
  resolved: { label: "✓ Resolved", color: "#10B981" },
  pending: { label: "⏳ In progress", color: "#F59E0B" },
  escalated: { label: "↑ Escalated", color: "#EF4444" },
};

const COL_SETS = [
  [0, 5, 10, 15, 3, 8, 13, 18],
  [1, 6, 11, 16, 4, 9, 14, 19],
  [2, 7, 12, 17, 0, 5, 10, 15],
  [3, 8, 13, 18, 1, 6, 11, 16],
  [4, 9, 14, 19, 2, 7, 12, 17],
];
const COL_DUR = ["34s", "26s", "40s", "30s", "36s"];
const COL_DELAY = ["0s", "-10s", "-6s", "-16s", "-4s"];

/* ── Wall card — more visible ── */
function WallCard({ item }) {
  const meta = STATUS_META[item.status];
  return (
    <div
      style={{
        padding: "10px 12px",
        marginBottom: 8,
        border: "0.5px solid rgba(0,0,0,0.1)",
        background: "rgba(255,255,255,0.82)",
        borderRadius: 8,
        flexShrink: 0,
      }}
    >
      <p
        style={{
          fontSize: 8,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#737373",
          marginBottom: 3,
          fontFamily: "'Instrument Sans',sans-serif",
          fontWeight: 600,
        }}
      >
        {item.ward}
      </p>
      <p
        style={{
          fontSize: 10.5,
          color: "#404040",
          lineHeight: 1.45,
          fontFamily: "'Instrument Sans',sans-serif",
        }}
      >
        {item.text}
      </p>
      <p
        style={{
          fontSize: 8.5,
          marginTop: 5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: meta.color,
          fontFamily: "'Instrument Sans',sans-serif",
        }}
      >
        {meta.label}
      </p>
    </div>
  );
}

/* ── Scrolling column ── */
function ScrollCol({ indices, duration, delay }) {
  const doubled = [...indices, ...indices];
  return (
    <div style={{ flex: 1, overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          animation: `scrollUp ${duration} linear infinite`,
          animationDelay: delay,
        }}
      >
        {doubled.map((idx, i) => (
          <WallCard key={i} item={DATA[idx % DATA.length]} />
        ))}
      </div>
    </div>
  );
}

/* ── Login ── */
export default function Login() {
  const [role, setRole] = useState("citizen");
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFoc] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, ...form });
  };

  return (
    <>
      {/* Lock scroll for this page only */}
      <style>{`
        body { overflow: hidden !important; }
        @keyframes scrollUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
      `}</style>

      {/*
        Outer wrapper: fixed viewport, no scroll.
        Uses flex-col so navbar sits above the body.
      */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#F7F6F2",
          fontFamily: "'Instrument Sans',sans-serif",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── Grid overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.042) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.042) 1px, transparent 1px)
          `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, #F7F6F2 100%)",
          }}
        />

        {/* ── Scrolling wall — behind everything ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            gap: 8,
            padding: "0 10px",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {COL_SETS.map((indices, i) => (
            <ScrollCol
              key={i}
              indices={indices}
              duration={COL_DUR[i]}
              delay={COL_DELAY[i]}
            />
          ))}
        </div>

        {/* ── Vignette — softens wall edges, tighter so cards show more ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 2,
            background:
              "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(247,246,242,0.45) 0%, rgba(247,246,242,0.82) 48%, rgba(247,246,242,0.97) 100%)",
          }}
        />
        {/* Top / bottom hard fades so wall doesn't show behind nav/footer */}
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 56,
            pointerEvents: "none",
            zIndex: 3,
            background:
              "linear-gradient(to bottom, #F7F6F2 60%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            height: 52,
            pointerEvents: "none",
            zIndex: 3,
            background:
              "linear-gradient(to top, #F7F6F2 60%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 50,

            borderBottom: "1px solid rgba(0,0,0,0.07)",

            padding: window.innerWidth >= 768 ? "12px 64px" : "12px 32px",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            background: "rgba(247,246,242,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",

            flexShrink: 0,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#a3a3a3",
                fontWeight: 500,
              }}
            >
              India's Civic Complaint Platform
            </span>
          </Link>

          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#a3a3a3",
              fontWeight: 500,

              display: window.innerWidth >= 768 ? "block" : "none",
            }}
          >
            Government Verified · Free to Use
          </span>
        </div>
        {/* ── Live count strip (just below navbar) ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            paddingTop: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10B981",
              animation: "blink 1.5s ease infinite",
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "#a3a3a3",
            }}
          >
            12,847 complaints live right now
          </span>
        </div>

        {/* ── Form area — fills remaining height, centres card ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 16px",
            overflow: "hidden",
          }}
        >
          {/* Card — matches hero dispatch board exactly */}
          <div
            style={{
              width: "100%",
              maxWidth: 380,
              background: "#fff",
              border: "0.5px solid rgba(0,0,0,0.09)",
              borderRadius: 16,
              padding: "26px 28px 22px",
              boxShadow:
                "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a3a3a3",
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              Nivaran · Sign in
            </p>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontWeight: 400,
                fontSize: 36,
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
                color: "#000",
                marginBottom: 10,
              }}
            >
              Every complaint
              <br />
              <span style={{ color: "#a3a3a3" }}>gets heard.</span>
            </h2>

            <p
              style={{
                fontSize: 13,
                color: "#737373",
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              Join 2 lakh citizens filing, tracking, and resolving civic issues.
            </p>

            {/* Role toggle */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                marginBottom: 20,
              }}
            >
              {[
                { key: "citizen", label: "👤 Citizen" },
                { key: "officer", label: "🏛️ Officer" },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  style={{
                    padding: "10px 0",
                    borderRadius: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    background: role === r.key ? "#000" : "transparent",
                    color: role === r.key ? "#fff" : "#737373",
                    border: `1px solid ${role === r.key ? "#000" : "rgba(0,0,0,0.12)"}`,
                    transition: "all 0.15s ease",
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.07)",
                marginBottom: 18,
              }}
            />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <label
                style={{
                  display: "block",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#a3a3a3",
                  fontWeight: 600,
                  marginBottom: 7,
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                onFocus={() => setFoc("email")}
                onBlur={() => setFoc("")}
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#F7F6F2",
                  border: `1px solid ${focused === "email" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}`,
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontSize: 13,
                  color: "#000",
                  fontFamily: "inherit",
                  outline: "none",
                  marginBottom: 14,
                  transition: "border-color 0.15s ease",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 7,
                }}
              >
                <label
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#a3a3a3",
                    fontWeight: 600,
                  }}
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: 11,
                    color: "#a3a3a3",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#000")}
                  onMouseLeave={(e) => (e.target.style.color = "#a3a3a3")}
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                onFocus={() => setFoc("pass")}
                onBlur={() => setFoc("")}
                style={{
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                  background: "#F7F6F2",
                  border: `1px solid ${focused === "pass" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}`,
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontSize: 13,
                  color: "#000",
                  fontFamily: "inherit",
                  outline: "none",
                  marginBottom: 14,
                  transition: "border-color 0.15s ease",
                }}
              />

              {/* Primary CTA — exact hero button */}
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "14px 20px",
                  marginBottom: 10,
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#262626")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#000")
                }
              >
                Sign In
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
              </button>

              {/* Secondary CTA — exact hero ghost button */}
              <Link
                to="/signup"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "13px 20px",
                  boxSizing: "border-box",
                  background: "transparent",
                  color: "#000",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "inherit",
                  textDecoration: "none",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(0,0,0,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)")
                }
              >
                Create an account
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
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </form>
            {/* s */}
          </div>
        </div>

        {/* ── Bottom bar — exact hero ── */}
        <div
          style={{
            position: "relative",
            zIndex: 50,
            flexShrink: 0,
            borderTop: "1px solid rgba(0,0,0,0.07)",
            padding: "0 48px",
            height: 44,
            display: "flex",
            alignItems: "center",
            gap: 24,
            background: "rgba(247,246,242,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {["100% Free", "No account to track", "Transparent process"].map(
            (t) => (
              <div
                key={t}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
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
                <span
                  style={{
                    fontSize: 11,
                    color: "#737373",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                  }}
                >
                  {t}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}
