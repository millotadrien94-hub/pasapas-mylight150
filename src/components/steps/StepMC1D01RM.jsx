import mc1d01rmImg from "../../assets/MC1D01RM.jpeg";

export default function StepMC1D01RM() {
  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Compteur supplémentaire MC1D01RM</h1>
      </div>

      <div className="step-page-section">
        <p className="list-header">Compteur MC1D01RM</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <img
                src={mc1d01rmImg}
                alt="Compteur MC1D01RM"
                onClick={() => window.open(mc1d01rmImg, "_blank")}
                style={{ width: "40%", borderRadius: 8, cursor: "zoom-in", display: "block" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
              <span className="tag-pill">↔ Traversant · Monophasé · 230V</span>
              <span className="tag-pill">Certifié MID · 100 A</span>
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
