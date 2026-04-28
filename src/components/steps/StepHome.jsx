const AJOUTS = [
  { id: "PAC",  label: "PAC" },
  { id: "CE",   label: "Chauffe-eau" },
  { id: "BdR",  label: "Borne de recharge" },
  { id: "UPM",  label: "UPM" },
  { id: "UPG",  label: "UPG" },
];

export default function StepHome({ setState, onNext, onAjout }) {
  const handleNouvelleInstallation = () => {
    setState(prev => ({ ...prev, mode: "nouvelle" }));
    onNext();
  };

  const handleAjout = (eq) => {
    setState(prev => ({ ...prev, mode: "ajout", equipementAjoute: eq.id }));
    onAjout();
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Guide de mise en service</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Suivez les étapes pour installer votre coffret mylight150
        </p>
      </div>

      {/* Nouvelle installation */}
      <div className="step-page-section">
        <div
          className="sel-card"
          style={{ margin: "0 16px" }}
          onClick={handleNouvelleInstallation}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "#111827",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div className="sel-card-body">
            <p className="sel-card-name">Nouvelle installation</p>
            <div className="sel-card-tags">
              <span className="tag-pill">Coffret Robin ou MG3 seule</span>
            </div>
          </div>
          <div style={{ color: "var(--label-3)", fontSize: 22, flexShrink: 0 }}>›</div>
        </div>
      </div>

      {/* Ajout sur installation existante */}
      <div className="step-page-section">
        <p className="list-header">Ajouter sur une installation existante</p>
        <div style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          padding: "2px 16px 12px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
          {AJOUTS.map(eq => (
            <button
              key={eq.id}
              onClick={() => handleAjout(eq)}
              style={{
                flexShrink: 0,
                padding: "10px 18px",
                borderRadius: 99,
                border: "1.5px solid var(--separator)",
                background: "var(--bg-secondary)",
                color: "#111827",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {eq.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
