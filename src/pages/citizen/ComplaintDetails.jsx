import { useParams, useNavigate } from "react-router-dom";

// ─── Mock Data (same shape as dashboard) ─────────────────────────────────────
const MOCK_COMPLAINTS = {
  "NVR-25-104821": {
    id: "NVR-25-104821",
    title: "Broken road near main market",
    category: "Roads & Infrastructure",
    dept: "PWD",
    severity: "Severe",
    status: "In Progress",
    createdAt: "2025-05-10",
    updatedAt: "2025-05-18",
    location: "Main Market, Ward 12",
    updates: 3,
    evidenceScore: 85,
    description:
      "The road surface near the main market entry has developed deep potholes following the recent rainfall. Several two-wheelers have already been damaged and the situation poses a significant safety risk, especially at night when the potholes are not visible.",
  },
  "NVR-25-098312": {
    id: "NVR-25-098312",
    title: "No water supply for 3 days",
    category: "Water Supply",
    dept: "Jal Board",
    severity: "Critical",
    status: "Resolved",
    createdAt: "2025-04-22",
    updatedAt: "2025-05-02",
    location: "Sector B, Ward 12",
    updates: 5,
    evidenceScore: 90,
    description:
      "Complete absence of piped water supply in Sector B for 3 consecutive days. Over 200 households are affected. Residents are forced to buy water at high prices from private tankers. The main supply valve near the overhead tank appears to be the source of the blockage.",
  },
  "NVR-25-091047": {
    id: "NVR-25-091047",
    title: "Streetlight not working",
    category: "Street Lighting",
    dept: "PWD / DISCOM",
    severity: "Minor",
    status: "Assigned",
    createdAt: "2025-04-15",
    updatedAt: "2025-04-16",
    location: "Colony Road, Ward 12",
    updates: 1,
    evidenceScore: 45,
    description:
      "The streetlight at the junction of Colony Road and the park entrance has been non-functional for over two weeks. The area becomes very dark after 8pm creating safety concerns for pedestrians and residents.",
  },
  "NVR-25-085509": {
    id: "NVR-25-085509",
    title: "Garbage not collected",
    category: "Sanitation & Waste",
    dept: "Municipal Corp.",
    severity: "Moderate",
    status: "Resolved",
    createdAt: "2025-03-30",
    updatedAt: "2025-04-08",
    location: "Near School, Ward 12",
    updates: 4,
    evidenceScore: 70,
    description:
      "Municipal garbage collection has been irregular for the past 10 days near the primary school area. Waste is accumulating at the designated collection point causing foul odour and attracting stray animals near the school premises.",
  },
  "NVR-25-079144": {
    id: "NVR-25-079144",
    title: "Open manhole on service lane",
    category: "Drainage & Sewage",
    dept: "Jal Board",
    severity: "Critical",
    status: "Resolved",
    createdAt: "2025-03-10",
    updatedAt: "2025-03-22",
    location: "Service Lane 4, Ward 12",
    updates: 6,
    evidenceScore: 95,
    description:
      "A manhole cover on Service Lane 4 has been missing for over a week. The open manhole is approximately 5 feet deep and located in the middle of a frequently used pedestrian path. This is an extreme safety hazard, particularly for children and elderly residents.",
  },
  "NVR-25-072033": {
    id: "NVR-25-072033",
    title: "Noise from construction at night",
    category: "Noise Pollution",
    dept: "CPCB",
    severity: "Moderate",
    status: "Pending",
    createdAt: "2025-02-28",
    updatedAt: "2025-03-01",
    location: "Block C, Ward 12",
    updates: 0,
    evidenceScore: 40,
    description:
      "A construction site near Block C has been running heavy machinery and drilling operations past 10pm on multiple nights, in clear violation of CPCB noise regulations. Residents including elderly individuals and young children are being severely disturbed.",
  },
  "NVR-25-063891": {
    id: "NVR-25-063891",
    title: "Illegal encroachment on footpath",
    category: "Encroachment",
    dept: "Town Planning",
    severity: "Moderate",
    status: "Assigned",
    createdAt: "2025-02-14",
    updatedAt: "2025-02-15",
    location: "Ward 12 Footpath",
    updates: 2,
    evidenceScore: 60,
    description:
      "A vendor has permanently encroached upon the municipal footpath near Ward 12 main road, placing a large illegal structure that blocks the entire pavement width. Pedestrians including disabled individuals are forced onto the road creating a dangerous situation.",
  },
  "NVR-25-055210": {
    id: "NVR-25-055210",
    title: "Electricity outage in sector B",
    category: "Electricity",
    dept: "DISCOM",
    severity: "Severe",
    status: "Resolved",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-25",
    location: "Sector B",
    updates: 4,
    evidenceScore: 80,
    description:
      "Complete power failure in Sector B affecting approximately 150 households. The outage has persisted for over 18 hours. Residents are unable to use medical equipment, perishable food is being spoiled, and students are unable to study. The transformer near Block B-4 appears to be faulty.",
  },
};

const CAT_ICON = {
  "Roads & Infrastructure": "🛣️",
  "Water Supply": "💧",
  Electricity: "⚡",
  "Sanitation & Waste": "🗑️",
  "Street Lighting": "💡",
  "Drainage & Sewage": "🌊",
  Encroachment: "🚧",
  "Noise Pollution": "🔊",
  Other: "📋",
};

const STATUS_CONFIG = {
  Pending: {
    color: "#8892A4",
    bg: "#F0F3FA",
    dot: "#C4C9D4",
    label: "Awaiting Review",
  },
  Assigned: {
    color: "#000000",
    bg: "#EEF0F8",
    dot: "#000000",
    label: "Dept. Assigned",
  },
  "In Progress": {
    color: "#2B6CB0",
    bg: "#EEF4FF",
    dot: "#4A90D9",
    label: "Work Underway",
  },
  Resolved: {
    color: "#1A7F5A",
    bg: "#E6F7F1",
    dot: "#10B981",
    label: "Closed",
  },
};

const SEVERITY_CONFIG = {
  Minor: { color: "#6B7280", bg: "#F3F4F6" },
  Moderate: { color: "#6B7280", bg: "#F3F4F6" },
  Severe: { color: "#B45309", bg: "#FEF3C7" },
  Critical: { color: "#B91C1C", bg: "#FEE2E2" },
};

// Update messages per step
const UPDATE_MESSAGES = [
  "Complaint received and logged into the system",
  "Forwarded to concerned department for review",
  "Field inspection scheduled by department",
  "Work order issued, ground team deployed",
  "Issue resolved and marked closed",
];
const UPDATE_BY = [
  "System",
  "Control Room",
  "Dept. Head",
  "Field Officer",
  "Dept. Head",
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const Ic = ({ d, s = 16, sw = 2, fill = "none", stroke = "currentColor" }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {Array.isArray(d) ? (
      d.map((p, i) => <path key={i} d={p} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);
const IChevL = () => <Ic d="M15 18l-6-6 6-6" />;
const IClock = ({ s = 16 }) => (
  <Ic
    d={[
      "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
      "M12 6v6l4 2",
    ]}
    s={s}
  />
);
const IPin = ({ s = 16 }) => (
  <Ic
    d={[
      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z",
      "M12 10m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
    ]}
    s={s}
  />
);
const ICheck = ({ s = 16, stroke = "currentColor" }) => (
  <Ic d="M20 6L9 17l-5-5" s={s} sw={2.5} stroke={stroke} />
);
const IBuilding = ({ s = 16 }) => (
  <Ic
    d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]}
    s={s}
  />
);
const ISparkle = ({ s = 16 }) => (
  <Ic
    d={[
      "M12 3l1.09 3.26L16.5 7.5l-3.41 1.24L12 12l-1.09-3.26L7.5 7.5l3.41-1.24L12 3z",
      "M19 14l.55 1.64L21 16l-1.45.36-.55 1.64-.55-1.64L17 16l1.45-.36L19 14z",
    ]}
    s={s}
  />
);
const IAlert = () => (
  <Ic
    d={[
      "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
      "M12 9v4",
      "M12 17h.01",
    ]}
  />
);
const IFile = ({ s = 16 }) => (
  <Ic
    d={[
      "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
      "M14 2v6h6",
    ]}
    s={s}
  />
);
const IShare = () => (
  <Ic
    d={[
      "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",
      "M16 6l-4-4-4 4",
      "M12 2v13",
    ]}
  />
);
const ICamera = () => (
  <Ic
    d={[
      "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
      "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    ]}
  />
);
const IUser = ({ s = 16 }) => (
  <Ic
    d={[
      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
      "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    ]}
    s={s}
  />
);
const IHash = () => (
  <Ic d={["M4 9h16", "M4 15h16", "M10 3L8 21", "M16 3l-2 18"]} />
);
const ITick = () => (
  <Ic d={["M22 11.08V12a10 10 0 1 1-5.93-9.14", "M22 4L12 14.01l-3-3"]} />
);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
function fmtDateShort(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}
function relDate(d) {
  const diff = Math.floor((Date.now() - new Date(d)) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  return `${Math.floor(diff / 30)} months ago`;
}

// ─── Timeline Step ────────────────────────────────────────────────────────────
function TimelineStep({ label, date, msg, by, done, active, last }) {
  return (
    <div className="relative flex gap-5">
      {/* Vertical line */}
      {!last && (
        <div
          className="absolute left-[15px] top-8 w-px"
          style={{ bottom: -20, background: done ? "#000" : "#E4E8F0" }}
        />
      )}
      {/* Dot */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 ${
          done ? "tl-done" : active ? "tl-active" : "tl-pend"
        }`}
      >
        {done ? (
          <ICheck s={13} stroke="white" />
        ) : (
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: active ? "#000" : "#D1D9E6" }}
          />
        )}
      </div>
      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <p
              className="text-sm font-black"
              style={{ color: done || active ? "#000" : "#C4C9D4" }}
            >
              {label}
            </p>
            {msg && (
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                {msg}
              </p>
            )}
          </div>
          {date && (
            <div className="flex-shrink-0 text-right">
              <p className="text-xs font-bold" style={{ color: "#000" }}>
                {fmtDateShort(date)}
              </p>
              {by && (
                <p className="text-[10px] mt-0.5" style={{ color: "#B0B8C9" }}>
                  {by}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Evidence Badge ───────────────────────────────────────────────────────────
function EvidenceBadge({ score }) {
  const level = score >= 80 ? "Strong" : score >= 50 ? "Moderate" : "Weak";
  const color = score >= 80 ? "#1A7F5A" : score >= 50 ? "#2B6CB0" : "#B45309";
  const bg = score >= 80 ? "#E6F7F1" : score >= 50 ? "#EEF4FF" : "#FEF3C7";
  const segments = 10;
  const filled = Math.round((score / 100) * segments);
  return (
    <div className="ev-card rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "#F0F3FA", color: "#000" }}
          >
            <ISparkle s={15} />
          </div>
          <p
            className="text-[10px] font-black uppercase tracking-wider"
            style={{ color: "#8892A4" }}
          >
            Evidence Strength
          </p>
        </div>
        <span
          className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider"
          style={{ background: bg, color }}
        >
          {level}
        </span>
      </div>
      {/* Score number */}
      <div className="flex items-end gap-1.5">
        <span
          className="text-5xl font-black"
          style={{
            color: "#000",
            fontFamily: "'DM Serif Display', serif",
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span className="text-sm mb-1" style={{ color: "#C4C9D4" }}>
          /100
        </span>
      </div>
      {/* Segmented bar */}
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2 rounded-full transition-all duration-500"
            style={{
              background: i < filled ? "#000" : "#F0F3FA",
              opacity: i < filled ? 0.3 + (i / filled) * 0.7 : 1,
            }}
          />
        ))}
      </div>
      {/* Chips */}
      <div className="flex flex-wrap gap-1.5">
        {score >= 50 && <span className="ev-chip">📍 Location tagged</span>}
        {score >= 60 && <span className="ev-chip">📷 Photo attached</span>}
        {score >= 80 && <span className="ev-chip">📝 Full description</span>}
        {score >= 90 && <span className="ev-chip">✅ Verified report</span>}
        {score < 50 && (
          <span className="ev-chip-warn">⚠️ Add more evidence</span>
        )}
      </div>
    </div>
  );
}

// ─── Complaint Detail Page ─────────────────────────────────────────────────────
export default function ComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fallback to first complaint if no id in params (for preview)
  const complaint = MOCK_COMPLAINTS[id] || Object.values(MOCK_COMPLAINTS)[0];

  const st = STATUS_CONFIG[complaint.status];
  const sv = SEVERITY_CONFIG[complaint.severity];

  // Build timeline
  const STEPS = [
    "Filed",
    "Acknowledged",
    "Assigned",
    "In Progress",
    "Resolved",
  ];
  const STEP_INDEX = { Pending: 0, Assigned: 2, "In Progress": 3, Resolved: 4 };
  const currentStep = STEP_INDEX[complaint.status] ?? 0;

  // Build activity log
  const UPDATES = Array.from({ length: complaint.updates || 0 }, (_, i) => {
    const daysBack = (complaint.updates - 1 - i) * 2;
    const date = new Date(
      new Date(complaint.updatedAt).getTime() - daysBack * 86400000,
    );
    return {
      date,
      msg: UPDATE_MESSAGES[i] || "Status updated by department",
      by: UPDATE_BY[i] || "Department",
    };
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#F7F6F2",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.032) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.032) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <style>{`
        /* Fonts */
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Sans:wght@400;500;600;700;800;900&display=swap');

        /* Cards */
        .det-card { background: white; border: 1.5px solid #E4E8F0; border-radius: 20px; }
        .ev-card  { background: white; border: 1.5px solid #E4E8F0; border-radius: 20px; }

        /* Timeline dots */
        .tl-done   { background: #000; box-shadow: 0 0 0 3px rgba(0,0,0,0.08); }
        .tl-active { background: white; border: 2.5px solid #000; box-shadow: 0 0 0 4px rgba(0,0,0,0.08); }
        .tl-pend   { background: white; border: 2px solid #E4E8F0; }

        /* Evidence chips */
        .ev-chip      { font-size: 11px; padding: 4px 10px; border-radius: 8px; font-weight: 600; background: #F0F3FA; color: #4A5568; }
        .ev-chip-warn { font-size: 11px; padding: 4px 10px; border-radius: 8px; font-weight: 600; background: #FEF3C7; color: #B45309; }

        /* Meta row */
        .meta-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid #F0F3FA; }
        .meta-row:last-child { border-bottom: none; padding-bottom: 0; }
        .meta-row:first-child { padding-top: 0; }
        .meta-icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #F0F3FA; color: #6B7280; }

        /* Section header */
        .sec-label { font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.18em; color: #8892A4; margin-bottom: 16px; }

        /* Back btn */
        .back-btn { background: white; border: 1.5px solid #E4E8F0; color: #000; border-radius: 12px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
        .back-btn:hover { background: #000; color: white; border-color: #000; }

        /* Action buttons */
        .act-btn-ghost { background: white; border: 1.5px solid #E4E8F0; color: #000; padding: 9px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap-6px; gap: 6px; font-family: inherit; transition: all 0.12s; }
        .act-btn-ghost:hover { background: #F7F9FC; border-color: #000; }
        .act-btn-solid { background: #000; color: white; padding: 9px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px; border: none; font-family: inherit; transition: all 0.15s; }
        .act-btn-solid:hover { background: #222; }

        /* Sticky topbar */
        .topbar { position: sticky; top: 0; z-index: 40; background: rgba(247,246,242,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.07); }

        /* Hero status banner */
        .status-banner { padding: 6px 14px; border-radius: 100px; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px; letter-spacing: 0.02em; }

        /* Resolved ribbon across top of hero */
        .resolved-strip { border-left: 4px solid #10B981; padding-left: 16px; }

        /* Fade-up animation */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fu  { animation: fadeUp 0.35s ease both; }
        .fu1 { animation: fadeUp 0.35s 0.07s ease both; }
        .fu2 { animation: fadeUp 0.35s 0.14s ease both; }
        .fu3 { animation: fadeUp 0.35s 0.21s ease both; }
        .fu4 { animation: fadeUp 0.35s 0.28s ease both; }

        /* ID pill */
        .id-pill { font-family: 'SFMono-Regular', 'Consolas', monospace; font-size: 11px; color: #8892A4; background: #F0F3FA; padding: 3px 10px; border-radius: 6px; display: inline-block; }

        /* Progress bar fill */
        .prog-track { height: 4px; background: #F0F3FA; border-radius: 4px; overflow: hidden; margin-top: 10px; }
        .prog-fill  { height: 100%; background: #000; border-radius: 4px; transition: width 0.8s cubic-bezier(0.22,1,0.36,1); }

        @media (max-width: 640px) {
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <div className="topbar">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <IChevL />
          </button>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-black truncate"
              style={{ color: "#000" }}
            >
              {complaint.title}
            </p>
            <span className="id-pill">{complaint.id}</span>
          </div>
          <div
            className="status-banner flex-shrink-0"
            style={{ background: st.bg, color: st.color }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: st.dot }}
            />
            {complaint.status}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 space-y-4">
        {/* ── Hero card ── */}
        <div className="det-card p-6 fu">
          {complaint.status === "Resolved" && (
            <div
              className="flex items-center gap-2 mb-4 pb-4"
              style={{ borderBottom: "1.5px solid #E6F7F1" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "#E6F7F1", color: "#1A7F5A" }}
              >
                <ITick />
              </div>
              <p className="text-xs font-black" style={{ color: "#1A7F5A" }}>
                This complaint has been resolved.
              </p>
            </div>
          )}

          {/* Category + title */}
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: "#F0F3FA" }}
            >
              {CAT_ICON[complaint.category] || "📋"}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-black uppercase tracking-wider mb-1"
                style={{ color: "#8892A4" }}
              >
                {complaint.category}
              </p>
              <h1
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(20px,4vw,28px)",
                  fontWeight: 400,
                  color: "#000",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {complaint.title}
              </h1>
            </div>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold"
              style={{ background: "#F0F3FA", color: "#4A5568" }}
            >
              <IBuilding s={12} /> {complaint.dept}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold"
              style={{ background: "#F0F3FA", color: "#4A5568" }}
            >
              <IPin s={12} /> {complaint.location}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-semibold"
              style={{ background: "#F0F3FA", color: "#4A5568" }}
            >
              <IClock s={12} /> Filed {fmtDate(complaint.createdAt)}
            </span>
            {(complaint.severity === "Severe" ||
              complaint.severity === "Critical") && (
              <span
                className="text-xs px-2.5 py-1 rounded-lg font-bold"
                style={{ background: sv.bg, color: sv.color }}
              >
                {complaint.severity}
              </span>
            )}
          </div>

          {/* Description */}
          {complaint.description && (
            <div
              className="mt-4 pt-4"
              style={{ borderTop: "1.5px solid #F0F3FA" }}
            >
              <p
                className="text-[10px] font-black uppercase tracking-wider mb-2"
                style={{ color: "#8892A4" }}
              >
                Description
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#4A5568" }}
              >
                {complaint.description}
              </p>
            </div>
          )}

          {/* Action bar */}
          <div
            className="flex items-center gap-2 mt-5 pt-4 flex-wrap"
            style={{ borderTop: "1.5px solid #F0F3FA" }}
          >
            <button className="act-btn-ghost">
              <IShare /> Share
            </button>
            <button className="act-btn-ghost">
              <ICamera /> Add Photo
            </button>
            <button className="act-btn-ghost">
              <IFile s={14} /> Download
            </button>
            {complaint.status === "Pending" && (
              <button className="act-btn-solid ml-auto">
                <IAlert /> Escalate
              </button>
            )}
          </div>
        </div>

        {/* ── Two-col: Progress + Meta ── */}
        <div
          className="grid md:grid-cols-2 gap-4 fu1"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* Progress tracker */}
          <div className="det-card p-5">
            <p className="sec-label">Progress Tracker</p>

            {/* Overall progress bar */}
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-xs font-semibold"
                style={{ color: "#8892A4" }}
              >
                Overall
              </span>
              <span className="text-xs font-black" style={{ color: "#000" }}>
                {Math.round((currentStep / (STEPS.length - 1)) * 100)}%
              </span>
            </div>
            <div className="prog-track mb-5">
              <div
                className="prog-fill"
                style={{
                  width: `${(currentStep / (STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>

            {/* Step list */}
            <div className="space-y-0">
              {STEPS.map((step, i) => {
                const done = i < currentStep;
                const active = i === currentStep;
                const pend = i > currentStep;
                return (
                  <div
                    key={step}
                    className="flex items-center gap-3 py-2.5"
                    style={{
                      borderBottom:
                        i < STEPS.length - 1 ? "1px dashed #F0F3FA" : "none",
                    }}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "tl-done" : active ? "tl-active" : "tl-pend"}`}
                    >
                      {done ? (
                        <ICheck s={12} stroke="white" />
                      ) : active ? (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "#000" }}
                        />
                      ) : (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: "#D1D9E6" }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-xs font-bold"
                        style={{ color: done || active ? "#000" : "#C4C9D4" }}
                      >
                        {step}
                      </p>
                      {active && (
                        <p
                          className="text-[10px] mt-0.5"
                          style={{ color: "#8892A4" }}
                        >
                          {st.label}
                        </p>
                      )}
                    </div>
                    {done && <ICheck s={14} stroke="#10B981" />}
                    {active && (
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: st.bg, color: st.color }}
                      >
                        Now
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meta + Evidence */}
          <div className="flex flex-col gap-4">
            {/* Meta details */}
            <div className="det-card p-5 flex-1">
              <p className="sec-label">Complaint Details</p>
              <div>
                {[
                  {
                    icon: <IHash />,
                    label: "Complaint ID",
                    val: complaint.id,
                    mono: true,
                  },
                  {
                    icon: <IBuilding s={14} />,
                    label: "Department",
                    val: complaint.dept,
                  },
                  {
                    icon: <IPin s={14} />,
                    label: "Location",
                    val: complaint.location,
                  },
                  {
                    icon: <IClock s={14} />,
                    label: "Date Filed",
                    val: fmtDate(complaint.createdAt),
                  },
                  {
                    icon: <IClock s={14} />,
                    label: "Last Updated",
                    val: `${fmtDate(complaint.updatedAt)} · ${relDate(complaint.updatedAt)}`,
                  },
                  {
                    icon: <IUser s={14} />,
                    label: "Filed By",
                    val: "Arjun Mehta",
                  },
                ].map(({ icon, label, val, mono }) => (
                  <div key={label} className="meta-row">
                    <div className="meta-icon">{icon}</div>
                    <div className="min-w-0">
                      <p
                        className="text-[9px] font-black uppercase tracking-wider"
                        style={{ color: "#B0B8C9" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-xs font-semibold mt-0.5 break-all"
                        style={{
                          color: "#000",
                          fontFamily: mono ? "monospace" : "inherit",
                          fontSize: mono ? 10 : 12,
                        }}
                      >
                        {val}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Evidence score ── */}
        <div className="fu2">
          <EvidenceBadge score={complaint.evidenceScore} />
        </div>

        {/* ── Activity timeline ── */}
        {UPDATES.length > 0 && (
          <div className="det-card p-5 fu3">
            <div className="flex items-center justify-between mb-5">
              <p className="sec-label" style={{ marginBottom: 0 }}>
                Activity Timeline
              </p>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: "#F0F3FA", color: "#6B7280" }}
              >
                {UPDATES.length} update{UPDATES.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-0">
              {UPDATES.map((u, i) => (
                <TimelineStep
                  key={i}
                  label={UPDATE_MESSAGES[i] || "Status updated"}
                  date={u.date}
                  by={u.by}
                  done={
                    i < UPDATES.length - 1 || complaint.status === "Resolved"
                  }
                  active={
                    i === UPDATES.length - 1 && complaint.status !== "Resolved"
                  }
                  last={i === UPDATES.length - 1}
                  msg={null}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── No updates placeholder ── */}
        {UPDATES.length === 0 && (
          <div className="det-card p-6 text-center fu3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: "#F0F3FA", color: "#C4C9D4" }}
            >
              <IClock s={22} />
            </div>
            <p className="text-sm font-black" style={{ color: "#000" }}>
              No updates yet
            </p>
            <p className="text-xs mt-1" style={{ color: "#8892A4" }}>
              Department activity will appear here once the complaint is
              reviewed.
            </p>
          </div>
        )}

        {/* ── Pending alert ── */}
        {complaint.status === "Pending" && (
          <div
            className="det-card p-4 flex items-start gap-3 fu4"
            style={{ background: "#FFFBEB", borderColor: "#FDE68A" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#FEF3C7", color: "#B45309" }}
            >
              <IAlert />
            </div>
            <div>
              <p className="text-sm font-black" style={{ color: "#000" }}>
                Awaiting acknowledgement
              </p>
              <p
                className="text-xs mt-0.5 leading-relaxed"
                style={{ color: "#8892A4" }}
              >
                Your complaint is in the review queue. Departments typically
                respond within 48 hours. You'll be notified when the status
                changes.
              </p>
            </div>
          </div>
        )}

        {/* ── Help footer ── */}
        <div className="det-card p-5 flex items-center gap-4 fu4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#000", color: "white" }}
          >
            <IUser s={17} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black" style={{ color: "#000" }}>
              Need help with this complaint?
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#8892A4" }}>
              Contact the grievance helpline at 1800-XXX-XXXX or visit your ward
              office.
            </p>
          </div>
          <button
            className="act-btn-solid flex-shrink-0"
            style={{ whiteSpace: "nowrap" }}
          >
            Contact
          </button>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
