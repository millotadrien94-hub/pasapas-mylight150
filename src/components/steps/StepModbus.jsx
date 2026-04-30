import sdm120Img from "../../assets/SDM120.png";

export default function StepModbus() {
  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Compteur supplémentaire SDM120</h1>
      </div>

      <div className="step-page-section">
        <p className="list-header">Compteur SDM120</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14, display: "flex", justifyContent: "center" }}>
            <img
              src={sdm120Img}
              alt="Compteur SDM120"
              onClick={() => window.open(sdm120Img, "_blank")}
              style={{ width: "15%", borderRadius: 8, cursor: "zoom-in", display: "block" }}
            />
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

      <div style={{ padding: "0 16px", marginTop: 12 }}>
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
