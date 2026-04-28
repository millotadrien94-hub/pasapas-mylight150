const BANNER_ORANGE = {
  background: "#FFF7ED",
  borderLeft: "3px solid #F59E0B",
  borderRadius: 8,
  padding: "12px 14px",
};

const BANNER_GREEN = {
  background: "#F0FDF4",
  borderLeft: "3px solid #22C55E",
  borderRadius: 8,
  padding: "12px 14px",
};

export default function StepUPMCompatibilite({ state, setState }) {
  const isTri = state.typeInstallation === "tri";
  const checks = state.etapesCochees?.upmCompat || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upmCompat || [])];
      arr[idx] = !arr[idx];
      return { ...prev, etapesCochees: { ...prev.etapesCochees, upmCompat: arr } };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Vérifier la compatibilité UPM</h1>
      </div>

      <div className="step-page-section">
        <div style={{ padding: "0 16px" }}>
          <div style={BANNER_ORANGE}>
            <p style={{ fontSize: 14, color: "#92400E", lineHeight: 1.5 }}>
              ⚠️ <strong>Un seul coffret Robin Link (UPM) est autorisé par installation.</strong>{" "}
              Il n'est pas possible d'en installer plusieurs sur un même site.
            </p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>Votre configuration</p>
        <div style={{ padding: "0 16px" }}>
          <div style={BANNER_GREEN}>
            {isTri ? (
              <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.5 }}>
                Compteur MG3C01RM + 3 pinces ampèremétriques inclus.
                Aucun compteur RS485 supplémentaire requis.
              </p>
            ) : (
              <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.5 }}>
                Compteur SDM120CT + 1 pince ampèremétrique inclus.
                Aucun compteur RS485 supplémentaire requis.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <div className="list-group" style={{ margin: "0 16px" }}>
          <CheckRow
            checked={!!checks[0]}
            onToggle={() => toggle(0)}
            label="Je confirme qu'il n'y a pas d'autre coffret Robin Link sur cette installation"
          />
        </div>
      </div>
    </div>
  );
}

function CheckRow({ checked, onToggle, label }) {
  return (
    <div className="list-row" style={{ minHeight: 56, cursor: "pointer" }} onClick={onToggle}>
      <div className="list-row-content">
        <p className="list-row-title" style={{ fontWeight: 500 }}>{label}</p>
      </div>
      <div className="list-row-trailing">
        <div className={`check-circle ${checked ? "checked" : ""}`}>
          <span className="check-circle-icon">✓</span>
        </div>
      </div>
    </div>
  );
}
