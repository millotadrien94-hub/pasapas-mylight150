import mg3c01rmImg from "../../assets/Schema MG3C01RM.jpg";

const S1 = { background: "#DBEAFE", color: "#1D4ED8", borderRadius: 4, padding: "2px 6px", fontWeight: 600, fontSize: 12 };
const S2 = { background: "#111827", color: "white",   borderRadius: 4, padding: "2px 6px", fontWeight: 600, fontSize: 12 };

const PINCES = [
  { label: "Pince 1", borne: "1" },
  { label: "Pince 2", borne: "2" },
  { label: "Pince 3", borne: "3" },
];

export default function StepMG3C01RM() {
  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Compteur supplémentaire MG3C01RM</h1>
      </div>

      <div className="step-page-section">
        <p className="list-header">Compteur MG3C01RM</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <img
                src={mg3c01rmImg}
                alt="Compteur MG3C01RM"
                onClick={() => window.open(mg3c01rmImg, "_blank")}
                style={{ width: "40%", borderRadius: 8, cursor: "zoom-in", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
              <span className="tag-pill">À pince · Triphasé · 230/400V</span>
              <span className="tag-pill">3 pinces TC · sans MID</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-blue">
          <span className="notice-icon">ℹ️</span>
          <div className="notice-body">
            <p className="notice-title">Mesure déportée avec pinces TC</p>
            <p className="notice-text">
              Ce compteur utilise 3 transformateurs de courant (TC), idéal pour les installations où la mesure traversante n'est pas possible.
            </p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Raccordement</p>
        <div style={{ padding: "0 16px" }}>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>1. Branchement des pinces</p>
          <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            {/* Header */}
            <div style={{
              display: "grid", gridTemplateColumns: "80px 1fr 1fr",
              background: "#111827", color: "white", fontWeight: 600,
              padding: "10px 16px", fontSize: 13, gap: 8,
            }}>
              <span>Pince</span>
              <span>Fils</span>
              <span>Connexion</span>
            </div>
            {/* Rows */}
            {PINCES.map((p, idx) => (
              <div
                key={p.label}
                style={{
                  display: "grid", gridTemplateColumns: "80px 1fr 1fr",
                  background: idx % 2 === 0 ? "white" : "#F9FAFB",
                  padding: "12px 16px", fontSize: 13, gap: 8,
                  alignItems: "center",
                  borderTop: "1px solid var(--color-border)",
                }}
              >
                <span style={{ fontWeight: 500 }}>{p.label}</span>
                <div style={{ display: "flex", gap: 4 }}>
                  <span style={S1}>S1</span>
                  <span style={{ fontSize: 12, color: "var(--label-2)" }}>blanc</span>
                  <span style={S2}>S2</span>
                  <span style={{ fontSize: 12, color: "var(--label-2)" }}>noir</span>
                </div>
                <div style={{ fontSize: 12 }}>
                  <p style={{ fontWeight: 500 }}>S1 → borne {p.borne}</p>
                  <p style={{ color: "var(--label-2)" }}>S2 → borne {p.borne} (S2)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-orange">
          <span className="notice-icon">→</span>
          <div className="notice-body">
            <p className="notice-text">
              <strong>2. Orientation de la pince :</strong> La flèche sur chaque pince doit être orientée vers la source d'énergie.
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-blue">
          <span className="notice-icon">ℹ️</span>
          <div className="notice-body">
            <p className="notice-title">Installation avec 2 compteurs</p>
            <p className="notice-text">
              Si l'installation comporte 2 compteurs, veillez à renseigner 2 adresses différentes sur chaque compteur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
