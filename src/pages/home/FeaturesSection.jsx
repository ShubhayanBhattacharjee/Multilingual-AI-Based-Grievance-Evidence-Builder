import { useEffect, useState, useRef } from "react";
import officialImg from "../../assets/images/official.png";
import roadImg from "../../assets/images/road.jpg";
import sanitationImg from "../../assets/images/sewage.png";
import waterImg from "../../assets/images/electric.jpg";

/* ── Proof ticker ── */
const PROOF_ITEMS = [
  { ward: "Ward 12", issue: "Broken streetlight near school", time: "2h 14m" },
  { ward: "Ward 7", issue: "Pothole on MG Road junction", time: "18h" },
  { ward: "Ward 23", issue: "Overflowing drain on colony Rd", time: "6h 40m" },
  { ward: "Ward 4", issue: "Water supply cut since 2 days", time: "1d 2h" },
  { ward: "Ward 31", issue: "Open manhole on service lane", time: "4h 55m" },
  { ward: "Ward 19", issue: "Garbage not collected this week", time: "9h 10m" },
  { ward: "Ward 8", issue: "Electricity outage in sector B", time: "3h 20m" },
  { ward: "Ward 15", issue: "Night construction noise", time: "11h" },
];

function ProofTicker() {
  const items = [...PROOF_ITEMS, ...PROOF_ITEMS];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "13px 0",
        background: "rgba(255,255,255,0.6)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "tickerScroll 32s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0 32px",
              borderRight: "1px solid rgba(0,0,0,0.06)",
              whiteSpace: "nowrap",
              fontFamily: "'Instrument Sans', sans-serif",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10B981",
                flexShrink: 0,
                animation: `liveDot 2s ease infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
            <span style={{ fontSize: 11, color: "#999", fontWeight: 500 }}>
              {item.ward}
            </span>
            <span style={{ fontSize: 11, color: "#333" }}>{item.issue}</span>
            <span
              style={{
                fontSize: 10,
                background: "rgba(16,185,129,0.08)",
                color: "#059669",
                padding: "2px 8px",
                borderRadius: 20,
                fontWeight: 600,
                border: "0.5px solid rgba(16,185,129,0.2)",
              }}
            >
              ✓ resolved in {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Animated CountUp on scroll ── */
function CountUp({ target, suffix = "", prefix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(ease * target));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Image slot ── */
function ImageSlot({ src, alt, style, badge }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 20,
        ...style,
      }}
    >
      {!src && (
        <div
          style={{
            width: "100%",
            height: "100%",
            minHeight: 200,
            background: "linear-gradient(135deg, #ede9e0 0%, #d9d3c6 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span
            style={{
              fontSize: 10,
              color: "rgba(0,0,0,0.22)",
              fontFamily: "'Instrument Sans', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Add photo here
          </span>
          <span
            style={{
              fontSize: 9,
              color: "rgba(0,0,0,0.14)",
              fontFamily: "'Instrument Sans', sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            {alt}
          </span>
        </div>
      )}
      {src && (
        <img
          src={src}
          alt={alt || ""}
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.32) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      {badge && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "rgba(0,0,0,0.52)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "4px 10px",
            borderRadius: 20,
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: 10,
            color: "#fff",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#EF4444",
              animation: "liveDot 1.4s ease infinite",
            }}
          />
          {badge}
        </div>
      )}
    </div>
  );
}

/* ── Glassmorphic feature card ── */
function FeatureCard({ icon, label, title, desc, style, accent }) {
  const [hovered, setHov] = useState(false);
  const accentColor =
    accent === "green" ? "#059669" : accent === "blue" ? "#2563EB" : "#555";
  const accentBg =
    accent === "green"
      ? "rgba(16,185,129,0.09)"
      : accent === "blue"
        ? "rgba(37,99,235,0.07)"
        : "rgba(0,0,0,0.055)";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.92)"
          : "rgba(255,255,255,0.68)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: hovered
          ? "0.5px solid rgba(0,0,0,0.1)"
          : "0.5px solid rgba(255,255,255,0.95)",
        borderRadius: 20,
        padding: "26px 24px",
        boxShadow: hovered
          ? "0 16px 44px rgba(0,0,0,0.1)"
          : "0 2px 14px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)",
        }}
      />
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: accentBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
          color: accentColor,
          transition: "transform 0.2s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}
      >
        {icon}
      </div>
      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#c0bbb4",
          marginBottom: 8,
        }}
      >
        {label}
      </p>
      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 20,
          fontWeight: 400,
          color: "#111",
          marginBottom: 10,
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontSize: 13,
          color: "#999",
          lineHeight: 1.7,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SECTION
══════════════════════════════════════════════ */
export default function FeaturesSection() {
  return (
    <section
      style={{
        background: "#FAFAF8",
        fontFamily: "'Instrument Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient blobs */}
      <div
        style={{
          position: "absolute",
          top: -240,
          right: -180,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,232,205,0.38) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,235,255,0.28) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Section header ── */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px 44px" }}
        className="features-header"
      >
        <Reveal>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c0bbb4",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Live proof · Not promises
          </p>
        </Reveal>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <Reveal delay={0.08}>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(38px, 5vw, 60px)",
                fontWeight: 400,
                color: "#111",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Real complaints.
              <br />
              <em style={{ fontStyle: "italic", color: "#c0bbb4" }}>
                Real resolutions.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p
              style={{
                fontSize: 14,
                color: "#aaa",
                maxWidth: 300,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Every number below is backed by real citizens who filed, tracked,
              and got their city to act.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Proof Ticker ── */}
      <ProofTicker />

      {/* ══════════════════════════════════
          COLLAGE — 4 uneven rows
         ══════════════════════════════════ */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "52px 48px 80px" }}
        className="features-collage"
      >
        {/* ROW 1 */}
        <Reveal>
          <div className="row-1" style={{ marginBottom: 14 }}>
            {/* Hero stat */}
            <div
              style={{
                background:
                  "linear-gradient(140deg, rgba(255,255,255,0.85) 0%, rgba(248,244,236,0.75) 100%)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "0.5px solid rgba(255,255,255,0.96)",
                borderRadius: 22,
                padding: "38px 36px 32px",
                boxShadow:
                  "0 10px 48px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.85) inset",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 76,
                  color: "#111",
                  lineHeight: 0.95,
                  fontWeight: 400,
                  marginBottom: 10,
                }}
                className="hero-stat-number"
              >
                <CountUp target={12847} duration={1900} />
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#333",
                  marginBottom: 6,
                }}
              >
                Complaints Filed
              </p>
              <p
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 13,
                  color: "#bbb",
                  lineHeight: 1.6,
                  maxWidth: 280,
                  marginBottom: 28,
                }}
              >
                Across 6 cities, 180+ wards — and every hour, more citizens are
                heard.
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {[
                  { val: 87, suffix: "%", label: "Resolution rate", color: "#059669" },
                  { val: 42, suffix: " hrs", label: "Avg. response time", color: "#111" },
                  { val: 38, suffix: "+", label: "Depts. connected", color: "#111" },
                ].map((s, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 30,
                        color: s.color,
                        lineHeight: 1,
                        fontWeight: 400,
                      }}
                    >
                      <CountUp target={s.val} suffix={s.suffix} duration={1200 + i * 200} />
                    </p>
                    <p
                      style={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: 11,
                        color: "#bbb",
                        marginTop: 4,
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ImageSlot
              src={roadImg}
              alt="Road repair work"
              badge="LIVE REPAIR"
              style={{ minHeight: 280 }}
            />

            <FeatureCard
              accent="blue"
              label="Encrypted"
              title="Your data stays private"
              desc="End-to-end encrypted. Only the relevant department sees your complaint. Never shared, never sold."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
            />
          </div>
        </Reveal>

        {/* ROW 2 */}
        <Reveal delay={0.07}>
          <div className="row-2" style={{ marginBottom: 14 }}>
            <FeatureCard
              accent="green"
              label="Live updates"
              title="Know where it stands"
              desc="Real-time status at every handoff — inbox, assigned, in-progress, resolved. No more chasing."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <ImageSlot
              src={sanitationImg}
              alt="Drain cleaning team"
              badge="SANITATION"
              style={{ minHeight: 240 }}
            />
            <FeatureCard
              accent="default"
              label="Smart routing"
              title="Right dept., first time"
              desc="Describe it in plain Hindi or English. Nivaran reads it and routes it — no need to know who handles what."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              }
            />
          </div>
        </Reveal>

        {/* ROW 3 */}
        <Reveal delay={0.12}>
          <div className="row-3" style={{ marginBottom: 14 }}>
            <ImageSlot
              src={officialImg}
              alt="Officer reviewing complaints"
              badge="CONTROL ROOM"
              style={{ minHeight: 310 }}
            />
            <FeatureCard
              accent="green"
              label="Collective power"
              title="Many voices, one signal"
              desc="Same issue filed by neighbours? It auto-escalates. Collective frustration becomes urgent priority."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
            {/* Dark quote card */}
            <div
              style={{
                background: "#111",
                borderRadius: 20,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  right: 22,
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 96,
                  color: "rgba(255,255,255,0.05)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                "
              </div>
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 19,
                  color: "#f0ead8",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  fontWeight: 400,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                "Filed at 9am. Got a call from the roads department by noon.
                Fixed in 3 days — I had been asking for months."
              </p>
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
                    Rekha Sharma
                  </p>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, color: "#555" }}>
                    Ward 12, Mumbai
                  </p>
                </div>
                <div
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    border: "0.5px solid rgba(16,185,129,0.28)",
                    padding: "5px 10px",
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600 }}>3 days</span>
                </div>
              </div>
            </div>

            <FeatureCard
              accent="blue"
              label="Transparent"
              title="Public data, public pressure"
              desc="Resolution rates and dept. scores — all public. Visibility drives accountability without needing anyone to chase."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              }
            />
          </div>
        </Reveal>

        {/* ROW 4 */}
        <Reveal delay={0.16}>
          <div className="row-4">
            <FeatureCard
              accent="default"
              label="Instant"
              title="60 seconds. That's it."
              desc="No lengthy forms, no office visits. Just describe the issue in plain language and submit."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
            />
            <ImageSlot
              src={waterImg}
              alt="Water supply maintenance"
              badge="UTILITY CREW"
              style={{ minHeight: 260 }}
            />
            {/* Glass stat mini */}
            <div
              style={{
                background: "rgba(255,255,255,0.62)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "0.5px solid rgba(255,255,255,0.95)",
                borderRadius: 20,
                padding: "28px 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,1), transparent)",
                }}
              />
              <p
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: 44,
                  color: "#2563EB",
                  lineHeight: 1,
                  fontWeight: 400,
                  marginBottom: 8,
                }}
              >
                <CountUp target={3} suffix="×" duration={900} />
              </p>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6 }}>
                Faster than traditional portals
              </p>
              <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 11, color: "#bbb", lineHeight: 1.6 }}>
                Based on avg. resolution time comparison, 2024 data across 6 cities.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes liveDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.35; transform: scale(0.65); }
        }

        /* ── Desktop grids (original layout) ── */
        .row-1 { display: grid; grid-template-columns: 1.55fr 1fr 1.05fr; gap: 14px; }
        .row-2 { display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 14px; }
        .row-3 { display: grid; grid-template-columns: 0.82fr 1fr 1.38fr 0.9fr; gap: 14px; }
        .row-4 { display: grid; grid-template-columns: 1fr 1.65fr 0.95fr; gap: 14px; }

        /* ── Mobile overrides ── */
        @media (max-width: 767px) {
          .features-header { padding: 48px 20px 32px !important; }
          .features-collage { padding: 32px 20px 60px !important; }

          .row-1,
          .row-2,
          .row-3,
          .row-4 {
            grid-template-columns: 1fr !important;
          }

          .hero-stat-number { font-size: 52px !important; }
        }

        /* ── Tablet: 2-col where possible ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .features-header { padding: 60px 32px 36px !important; }
          .features-collage { padding: 40px 32px 60px !important; }

          .row-1 { grid-template-columns: 1fr 1fr !important; }
          .row-1 > :last-child { grid-column: 1 / -1; }

          .row-2 { grid-template-columns: 1fr 1fr !important; }
          .row-2 > :nth-child(2) { grid-column: 1 / -1; order: -1; }

          .row-3 { grid-template-columns: 1fr 1fr !important; }

          .row-4 { grid-template-columns: 1fr 1fr !important; }
          .row-4 > :nth-child(2) { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}