import { useEffect, useState, useRef, useCallback } from "react";

/* ─── Step data ─────────────────────────────── */
const STEPS = [
  {
    num: "01",
    emoji: "📍",
    tag: "You spot an issue",
    title: "Describe what's wrong",
    desc: "Tap the issue type, write two lines in plain language — Hindi or English — and pin your location. That's it.",
    detail: "No forms. No codes. No knowing which department to call.",
    accent: "#E8E0D0",
    phone: {
      header: "File a Complaint",
      body: [
        { type: "label", text: "What's the issue?" },
        { type: "chip-row", chips: ["🛣️ Roads", "💧 Water", "💡 Lights", "🗑️ Waste"], active: 0 },
        { type: "label", text: "Describe it briefly" },
        { type: "input", text: "Large pothole near bus stand, Ward 12. Causing accidents at night.", typing: true },
        { type: "label", text: "📍 Location pinned — Dadar West, Mumbai" },
        { type: "btn", text: "Submit Complaint →", color: "#E8E0D0" },
      ],
    },
  },
  {
    num: "02",
    emoji: "⚡",
    tag: "Nivaran takes over",
    title: "Routed in seconds",
    desc: "Our system reads your complaint, identifies the responsible body — municipal, state, or central — and forwards it with a unique ticket ID.",
    detail: "Smart routing. Zero chance of being sent to the wrong office.",
    accent: "#E8E0D0",
    phone: {
      header: "Complaint Submitted",
      body: [
        { type: "success", text: "NIV-00847 created" },
        { type: "label", text: "Routed to:" },
        { type: "dept", name: "Mumbai Municipal Corporation", sub: "Roads & Infrastructure Dept.", icon: "🏛️" },
        { type: "label", text: "Expected acknowledgement" },
        { type: "timer", text: "Within 24 hours" },
        { type: "note", text: "You'll be notified the moment they respond." },
      ],
    },
  },
  {
    num: "03",
    emoji: "🔔",
    tag: "They must respond",
    title: "Official acknowledgement",
    desc: "The department receives a legal notification and must acknowledge within 24 hours. You get a push notification the instant they do.",
    detail: "Departments are bound under RTI guidelines. Silence isn't an option.",
    accent: "#E8E0D0",
    phone: {
      header: "Update — NIV-00847",
      body: [
        { type: "notif", icon: "🔔", text: "Dept. acknowledged your complaint", time: "6h ago" },
        { type: "timeline", items: [
          { label: "Filed", done: true },
          { label: "Routed", done: true },
          { label: "Acknowledged ✓", done: true, active: true },
          { label: "In Progress", done: false },
          { label: "Resolved", done: false },
        ]},
        { type: "note", text: "\"Team dispatched to inspect Ward 12 pothole.\"" },
      ],
    },
  },
  {
    num: "04",
    emoji: "✅",
    tag: "Resolved — or escalated",
    title: "Track. Escalate. Close.",
    desc: "Watch live status updates. If it stalls beyond the deadline, one tap escalates to the supervisory body. System applies pressure automatically.",
    detail: "You never have to chase anyone. We do it for you.",
    accent: "#E8E0D0",
    phone: {
      header: "NIV-00847 — Resolved",
      body: [
        { type: "resolved", text: "Issue marked resolved" },
        { type: "timeline", items: [
          { label: "Filed", done: true },
          { label: "Routed", done: true },
          { label: "Acknowledged", done: true },
          { label: "In Progress", done: true },
          { label: "Resolved ✓", done: true, active: true },
        ]},
        { type: "label", text: "Resolution time" },
        { type: "stat", value: "2 days, 14 hours", color: "#E8E0D0" },
        { type: "btn", text: "Confirm & Close ✓", color: "#E8E0D0" },
      ],
    },
  },
];

const ACCENT = "#E8E0D0";

/* ─── Phone screen renderer ─────────────────── */
function PhoneScreen({ step }) {
  const { header, body } = step.phone;
  return (
    <div style={{
      width: "100%", height: "100%", background: "#0a0a0a",
      borderRadius: 36, display: "flex", flexDirection: "column",
      fontFamily: "'Instrument Sans', sans-serif", overflow: "hidden",
    }}>
      {/* Status bar */}
      <div style={{ padding: "14px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>9:41</span>
        <div style={{ width: 80, height: 20, background: "#111", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#333" }} />
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <div style={{ width: 12, height: 8, border: "1.5px solid #666", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 1, top: 1, right: 1, bottom: 1, background: "#666", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* App header */}
      <div style={{ padding: "12px 20px 10px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(232,224,208,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🏛️</div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1 }}>Nivaran</p>
            <p style={{ fontSize: 9, color: "#444", lineHeight: 1, marginTop: 2 }}>Civic Complaints</p>
          </div>
        </div>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginTop: 10 }}>{header}</p>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 10, overflowY: "hidden" }}>
        {body.map((el, i) => {
          if (el.type === "label") return (
            <p key={i} style={{ fontSize: 10, color: "#444", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{el.text}</p>
          );
          if (el.type === "chip-row") return (
            <div key={i} style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {el.chips.map((c, j) => (
                <span key={j} style={{
                  fontSize: 11, padding: "5px 10px", borderRadius: 20,
                  background: j === el.active ? ACCENT : "rgba(255,255,255,0.05)",
                  color: j === el.active ? "#000" : "#555",
                  fontWeight: j === el.active ? 700 : 400,
                  border: j === el.active ? "none" : "0.5px solid rgba(255,255,255,0.08)",
                }}>{c}</span>
              ))}
            </div>
          );
          if (el.type === "input") return (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: `0.5px solid ${el.typing ? "rgba(232,224,208,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: 10, padding: "10px 12px", transition: "all 0.3s" }}>
              <p style={{ fontSize: 11, color: "#ccc", lineHeight: 1.5 }}>{el.text}</p>
              {el.typing && <span style={{ display: "inline-block", width: 2, height: 12, background: ACCENT, marginLeft: 2, animation: "cursorBlink 1s ease infinite", verticalAlign: "middle" }} />}
            </div>
          );
          if (el.type === "btn") return (
            <div key={i} style={{ marginTop: "auto", background: ACCENT, borderRadius: 12, padding: "12px", textAlign: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#000" }}>{el.text}</span>
            </div>
          );
          if (el.type === "success") return (
            <div key={i} style={{ background: "rgba(232,224,208,0.08)", border: "0.5px solid rgba(232,224,208,0.2)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(232,224,208,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, color: ACCENT }}>✓</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT }}>Complaint Filed!</p>
                <p style={{ fontSize: 10, color: "#444", marginTop: 1, fontFamily: "monospace" }}>{el.text}</p>
              </div>
            </div>
          );
          if (el.type === "dept") return (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{el.icon}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{el.name}</p>
                <p style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{el.sub}</p>
              </div>
            </div>
          );
          if (el.type === "timer") return (
            <div key={i} style={{ background: "rgba(232,224,208,0.06)", border: "0.5px solid rgba(232,224,208,0.15)", borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11 }}>⏱</span>
              <span style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>{el.text}</span>
            </div>
          );
          if (el.type === "note") return (
            <p key={i} style={{ fontSize: 10, color: "#3a3a3a", lineHeight: 1.6, fontStyle: "italic" }}>{el.text}</p>
          );
          if (el.type === "notif") return (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 12px", display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16 }}>{el.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: "#ddd", lineHeight: 1.4 }}>{el.text}</p>
                <p style={{ fontSize: 9, color: "#333", marginTop: 3 }}>{el.time}</p>
              </div>
            </div>
          );
          if (el.type === "timeline") return (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 0, padding: "4px 0" }}>
              {el.items.map((item, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: item.done ? (item.active ? ACCENT : "rgba(232,224,208,0.3)") : "rgba(255,255,255,0.06)", border: item.done ? "none" : "0.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 8, color: "#000", fontWeight: 700 }}>
                      {item.done ? "✓" : ""}
                    </div>
                    {j < el.items.length - 1 && <div style={{ width: 1, height: 12, background: item.done ? "rgba(232,224,208,0.15)" : "rgba(255,255,255,0.04)" }} />}
                  </div>
                  <p style={{ fontSize: 10, color: item.active ? ACCENT : item.done ? "#555" : "#2a2a2a", fontWeight: item.active ? 700 : 400 }}>{item.label}</p>
                </div>
              ))}
            </div>
          );
          if (el.type === "resolved") return (
            <div key={i} style={{ background: "rgba(232,224,208,0.07)", border: "0.5px solid rgba(232,224,208,0.18)", borderRadius: 12, padding: "12px 14px", textAlign: "center" }}>
              <p style={{ fontSize: 22 }}>🎉</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, marginTop: 4 }}>{el.text}</p>
            </div>
          );
          if (el.type === "stat") return (
            <p key={i} style={{ fontSize: 20, fontFamily: "'DM Serif Display', serif", color: ACCENT, fontWeight: 400 }}>{el.value}</p>
          );
          return null;
        })}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────── */
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const DURATION = 4000;

  const goTo = useCallback((idx) => {
    setActive(idx);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setActive((a) => (a + 1) % STEPS.length);
        setProgress(0);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused]);

  const step = STEPS[active];

  return (
    <section style={{
      background: "#0c0c0b",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Instrument Sans', sans-serif",
    }}>
      {/* Subtle ambient blob */}
      <div style={{ position: "absolute", top: -200, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,224,208,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Grain overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }} />

      <div className="hiw-outer">

        {/* ── Header ── */}
        <div className="hiw-header">
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(232,224,208,0.5)", fontWeight: 600, marginBottom: 16 }}>
              How it works
            </p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 400, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.025em", margin: 0 }}>
              From problem spotted<br />
              <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.2)" }}>to problem solved.</em>
            </h2>
          </div>
          <p className="hiw-header-sub">
            Every step is transparent, trackable, and time-bound. No office visits. No queues.
          </p>
        </div>

        {/* ── Main layout ── */}
        <div className="hiw-grid">

          {/* LEFT — steps */}
          <div>
            {/* Step tabs */}
            <div style={{ display: "flex", gap: 0, marginBottom: 48, borderBottom: "0.5px solid rgba(255,255,255,0.07)", position: "relative" }}>
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); setPaused(true); }}
                  style={{
                    flex: 1, background: "none", border: "none", cursor: "pointer",
                    padding: "12px 0 14px", textAlign: "left",
                    borderBottom: i === active ? `2px solid ${ACCENT}` : "2px solid transparent",
                    transition: "border-color 0.3s ease",
                    marginBottom: -1,
                  }}
                >
                  <span style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 24, color: i === active ? "#fff" : "rgba(255,255,255,0.12)",
                    display: "block", lineHeight: 1,
                    transition: "color 0.3s ease",
                  }}>{s.num}</span>
                  <span className="hiw-tab-tag" style={{
                    fontSize: 9, color: i === active ? "rgba(232,224,208,0.7)" : "#2a2a2a",
                    fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                    marginTop: 4, display: "block",
                    transition: "color 0.3s ease",
                  }}>{s.tag}</span>
                </button>
              ))}
              {/* Progress bar */}
              <div style={{
                position: "absolute", bottom: -1, left: `${active * 25}%`,
                width: "25%", height: 2, background: "rgba(232,224,208,0.12)",
                transition: "left 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}>
                <div style={{ height: "100%", background: ACCENT, width: `${progress * 100}%`, transition: "width 0.1s linear" }} />
              </div>
            </div>

            {/* Active step content */}
            <div key={active} style={{ animation: "stepFadeIn 0.5s cubic-bezier(0.4,0,0.2,1) both" }}>
              {/* Tag pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,224,208,0.06)", border: "0.5px solid rgba(232,224,208,0.15)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>{step.emoji}</span>
                <span style={{ fontSize: 11, color: "rgba(232,224,208,0.6)", fontWeight: 600, letterSpacing: "0.08em" }}>{step.tag}</span>
              </div>

              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 400, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 20 }}>
                {step.title}
              </h3>

              <p style={{ fontSize: 15, color: "#555", lineHeight: 1.75, maxWidth: 480, marginBottom: 24 }}>
                {step.desc}
              </p>

              {/* Detail callout */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.06)", borderLeft: "2px solid rgba(232,224,208,0.3)", borderRadius: "0 12px 12px 0" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(232,224,208,0.4)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{step.detail}</p>
              </div>

              {/* Navigation */}
              <div style={{ display: "flex", gap: 10, marginTop: 36, alignItems: "center" }}>
                <button
                  onClick={() => { goTo((active - 1 + STEPS.length) % STEPS.length); setPaused(true); }}
                  style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#444", transition: "all 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </button>
                <button
                  onClick={() => { goTo((active + 1) % STEPS.length); setPaused(true); }}
                  style={{ width: 38, height: 38, borderRadius: "50%", background: ACCENT, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", transition: "opacity 0.2s ease" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <span style={{ fontSize: 12, color: "#2a2a2a", marginLeft: 6 }}>
                  {active + 1} / {STEPS.length}
                </span>
                <button
                  onClick={() => setPaused(p => !p)}
                  style={{ marginLeft: "auto", background: "none", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "6px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#333", fontSize: 11, fontFamily: "'Instrument Sans', sans-serif" }}
                >
                  {paused ? (
                    <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg> Auto-play</>
                  ) : (
                    <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Pause</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — phone mockup */}
          <div className="hiw-phone-col">
            <div
              style={{ position: "relative", width: 240, margin: "0 auto" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Phone shell */}
              <div style={{
                background: "#181818",
                borderRadius: 44,
                padding: "10px",
                boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(255,255,255,0.07)",
              }}>
                {/* Side buttons */}
                <div style={{ position: "absolute", right: -3, top: 90, width: 3, height: 28, background: "#222", borderRadius: "0 2px 2px 0" }} />
                <div style={{ position: "absolute", left: -3, top: 70, width: 3, height: 20, background: "#222", borderRadius: "2px 0 0 2px" }} />
                <div style={{ position: "absolute", left: -3, top: 98, width: 3, height: 20, background: "#222", borderRadius: "2px 0 0 2px" }} />

                {/* Screen */}
                <div style={{ height: 500, borderRadius: 36, overflow: "hidden", position: "relative" }}>
                  <div key={active} style={{ height: "100%", animation: "phoneFadeIn 0.4s ease both" }}>
                    <PhoneScreen step={step} />
                  </div>
                </div>
              </div>

              {/* Step badge */}
              <div style={{
                position: "absolute", top: -14, right: -14,
                background: ACCENT, borderRadius: "50%",
                width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#000", fontWeight: 700,
              }}>
                {active + 1}
              </div>

              {/* Floating notification — step 3 */}
              {active === 2 && (
                <div style={{
                  position: "absolute", bottom: -20, left: -28,
                  background: "rgba(24,24,24,0.95)", backdropFilter: "blur(12px)",
                  border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14,
                  padding: "10px 14px", width: 172,
                  animation: "floatUp 0.5s ease both",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: ACCENT, opacity: 0.7 }} />
                    <p style={{ fontSize: 11, color: ACCENT, fontWeight: 600 }}>Dept. responded!</p>
                  </div>
                  <p style={{ fontSize: 10, color: "#333", marginTop: 4, lineHeight: 1.4 }}>Ward 12 pothole — team dispatched</p>
                </div>
              )}

              {/* Floating resolved card — step 4 */}
              {active === 3 && (
                <div style={{
                  position: "absolute", bottom: -20, left: -28,
                  background: "rgba(24,24,24,0.95)", backdropFilter: "blur(12px)",
                  border: "0.5px solid rgba(232,224,208,0.12)", borderRadius: 14,
                  padding: "10px 14px", width: 172,
                  animation: "floatUp 0.5s ease both",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}>
                  <p style={{ fontSize: 18 }}>🎉</p>
                  <p style={{ fontSize: 11, color: ACCENT, fontWeight: 600, marginTop: 4 }}>Issue closed!</p>
                  <p style={{ fontSize: 10, color: "#333", marginTop: 2 }}>2d 14h · Ward 12 · Roads</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hiw-outer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 96px 48px;
        }
        .hiw-header {
          margin-bottom: 64px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
        }
        .hiw-header-sub {
          font-size: 14px;
          color: #3a3a3a;
          max-width: 280px;
          line-height: 1.7;
          text-align: right;
          margin: 0;
        }
        .hiw-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 64px;
          align-items: start;
        }
        .hiw-phone-col {
          position: sticky;
          top: 32px;
        }
        .hiw-strip {
          margin-top: 64px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          overflow: hidden;
        }
        .hiw-tab-tag { display: block; }

        @media (max-width: 767px) {
          .hiw-outer {
            padding: 60px 20px 52px;
          }
          .hiw-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 40px;
            gap: 16px;
          }
          .hiw-header-sub {
            text-align: left;
            max-width: 100%;
            font-size: 13px;
          }
          .hiw-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hiw-phone-col {
            position: static;
            order: -1;
          }
          .hiw-strip {
            display: none;
          }
          .hiw-tab-tag {
            display: none;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hiw-outer {
            padding: 72px 32px;
          }
          .hiw-grid {
            grid-template-columns: 1fr 260px;
            gap: 40px;
          }
        }

        @keyframes stepFadeIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes phoneFadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes liveDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
      `}</style>
    </section>
  );
}