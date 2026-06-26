// Subtle, always-on background motion. Pure markup (no client JS).
// Sits behind all content; low opacity keeps text contrast intact.
// Motion is disabled automatically via prefers-reduced-motion in globals.css.
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div
        className="ambient-blob drift-a"
        style={{
          top: "-10%",
          left: "-6%",
          width: "46vw",
          height: "46vw",
          background:
            "radial-gradient(closest-side, rgba(104,19,33,0.30), transparent 70%)",
        }}
      />
      <div
        className="ambient-blob drift-b"
        style={{
          bottom: "-14%",
          right: "-8%",
          width: "52vw",
          height: "52vw",
          background:
            "radial-gradient(closest-side, rgba(0,39,102,0.28), transparent 70%)",
        }}
      />
      <div
        className="ambient-blob drift-c"
        style={{
          top: "28%",
          left: "52%",
          width: "38vw",
          height: "38vw",
          background:
            "radial-gradient(closest-side, rgba(194,78,18,0.24), transparent 70%)",
        }}
      />
    </div>
  );
}
