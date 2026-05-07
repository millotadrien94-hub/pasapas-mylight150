import sdm120Img from "../../assets/Schema_SDM120.jpg";

const S1 = { background: "#DBEAFE", color: "#1D4ED8", borderRadius: 4, padding: "2px 6px", fontWeight: 600, fontSize: 12 };
const S2 = { background: "#111827", color: "white",   borderRadius: 4, padding: "2px 6px", fontWeight: 600, fontSize: 12 };

export default function StepSDM120() {
  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Compteur supplémentaire SDM120</h1>
      </div>

      <div className="step-page-section">
        <p className="list-header">Compteur SDM120</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <img
                src={sdm120Img}
                alt="Compteur SDM120"
                onClick={() => window.open(sdm120Img, "_blank")}
                style={{ width: "20%", borderRadius: 8, cursor: "zoom-in", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span className="tag-pill">Monophasé · 45A · RS485</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-orange">
          <span className="notice-icon">⚠️</span>
          <div className="notice-body">
            <p className="notice-title">Sens de câblage inversé</p>
            <p className="notice-text">
              Le compteur Modbus RS485 ne doit pas être branché comme indiqué sur le compteur, mais dans le sens inverse. Si le compteur est branché comme indiqué, les valeurs seront négatives. Il faut câbler du haut vers le bas.
            </p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Raccorder les pinces ampèremétriques</p>
        <div style={{ padding: "0 16px" }}>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>1. Branchement de la pince</p>
          <div className="list-group">
            <div className="list-row" style={{ gap: 12 }}>
              <span style={{ ...S1, background: "white", color: "#374151", border: "1px solid #D1D5DB" }}>BLANC</span>
              <p className="list-row-title" style={{ flex: 1 }}>Fil blanc → borne 1</p>
            </div>
            <div className="list-row" style={{ gap: 12 }}>
              <span style={S2}>NOIR</span>
              <p className="list-row-title" style={{ flex: 1 }}>Fil noir → borne 2</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-orange">
          <span className="notice-icon">→</span>
          <div className="notice-body">
            <p className="notice-text">
              <strong>2. Orientation de la pince :</strong> La flèche sur la pince doit pointer vers la source d'énergie.
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
