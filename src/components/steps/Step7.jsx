const COFFRET_NAMES = { X: "Robin Plus", H: "Robin Max", MG3: "MG3 seule" };

export default function Step7({ state }) {
  const modeInstallation = state.typeInstallation === "tri" ? "Triphasé" : "Monophasé";
  const sensorLabel = state.sensorType === "sdm" ? "SDM120" : "Pince CT";
  const hasCE = !!state.ceType;
  const hasBdR = state.etapesCochees?.step5?.some(Boolean);

  return (
    <div className="step-page" style={{ alignItems: "center", paddingTop: 40 }}>
      <div className="success-badge">✅</div>

      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <h1 className="t-title2" style={{ marginBottom: 8 }}>Installation physique terminée</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", lineHeight: 1.5 }}>
          Finalisez la mise en service dans mylight150 Pro.
        </p>
      </div>

      <div className="step-page-section" style={{ width: "100%", padding: "0 16px" }}>
        <p className="list-header">Récapitulatif</p>
        <div className="summary-grid">
          <div className="summary-cell">
            <p className="summary-cell-label">Coffret</p>
            <p className="summary-cell-value">{COFFRET_NAMES[state.coffretSelectionne] || "—"}</p>
          </div>
          <div className="summary-cell">
            <p className="summary-cell-label">Installation</p>
            <p className="summary-cell-value">{modeInstallation}</p>
          </div>
          <div className="summary-cell">
            <p className="summary-cell-label">Prod.</p>
            <p className="summary-cell-value">{sensorLabel}</p>
          </div>
          <div className="summary-cell">
            <p className="summary-cell-label">Équipements</p>
            <p className="summary-cell-value" style={{ fontSize: 13 }}>
              {[hasCE && "CE", hasBdR && "BdR"].filter(Boolean).join(", ") || "—"}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px", width: "100%" }}>
        <button
          className="btn-ios btn-filled btn-full"
          onClick={() => window.open("https://pro.mylight150.com", "_blank")}
        >
          Revenir sur mylight150 Pro →
        </button>
      </div>
    </div>
  );
}
