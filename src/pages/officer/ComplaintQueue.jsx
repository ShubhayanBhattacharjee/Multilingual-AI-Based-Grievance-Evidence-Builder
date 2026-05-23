export default function ComplaintQueue() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 80,
      fontFamily: "'Instrument Sans', sans-serif",
      background: "#09090b",
      color: "#fff"
    }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>ComplaintQueue</h1>
      <p style={{ color: "#71717a", fontSize: 14 }}>Service tracking queue</p>
    </div>
  );
}
