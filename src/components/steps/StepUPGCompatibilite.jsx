const BANNER_RED    = { background: "#FEF2F2", borderLeft: "3px solid #EF4444", borderRadius: 8, padding: "12px 14px" };
const BANNER_ORANGE = { background: "#FFF7ED", borderLeft: "3px solid #F59E0B", borderRadius: 8, padding: "12px 14px" };
const BANNER_GREEN  = { background: "#F0FDF4", borderLeft: "3px solid #22C55E", borderRadius: 8, padding: "12px 14px" };

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

export default function StepUPGCompatibilite({ state, setState }) {
  const isTri = state.typeInstallation === "tri";
  const checks = state.etapesCochees?.upgCompat || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upgCompat || [])];
      arr[idx] = !arr[idx];
      return { ...prev, etapesCochees: { ...prev.etapesCochees, upgCompat: arr } };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Vérifier la compatibilité UPG</h1>
      </div>

      <div className="step-page-section">
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={BANNER_RED}>
            <p style={{ fontSize: 14, color: "#991B1B", lineHeight: 1.5 }}>
              🔴 <strong>Rappel</strong> — Le Robin Heat (UPG H) s'ajoute à une installation mylight150 existante disposant déjà d'une MG3.
            </p>
          </div>

          <div style={BANNER_ORANGE}>
            <p style={{ fontWeight: 600, fontSize: 14, color: "#92400E", marginBottom: 6 }}>
              ⚠️ Compatibilité PAC obligatoire
            </p>
            <p style={{ fontSize: 14, color: "#92400E", lineHeight: 1.5, marginBottom: 10 }}>
              La PAC doit être équipée d'une entrée SG-Ready ou équivalent (Délestage, HC/HP...).
              Vérifiez via l'outil de compatibilité mylight150 avant toute installation.
            </p>
            <button style={{
              background: "none", border: "none", padding: 0,
              color: "#D97706", fontSize: 14, fontWeight: 600,
              cursor: "pointer", textDecoration: "underline",
            }}>
              Vérifier la compatibilité →
            </button>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>Votre configuration</p>
        <div style={{ padding: "0 16px" }}>
          <div style={BANNER_GREEN}>
            {isTri ? (
              <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.5 }}>
                Contient les relais SG-Ready + compteur MG3C01RM avec 3 pinces ampèremétriques inclus.
              </p>
            ) : (
              <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.5 }}>
                Contient les relais SG-Ready + compteur SDM120CT avec 1 pince ampèremétrique inclus.
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
            label="J'ai vérifié la compatibilité SG-Ready de la PAC"
          />
        </div>
      </div>
    </div>
  );
}
