export default function StepHome({ setState, onNext }) {
  const handleNouvelleInstallation = () => {
    setState(prev => ({ ...prev, mode: "nouvelle" }));
    onNext();
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
            background: "var(--color-primary)",
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
      <div style={{ margin: "-20px 16px 0" }}>
        <div
          className="sel-card"
          style={{ opacity: 0.45, cursor: "not-allowed" }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: "var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <div className="sel-card-body">
            <p className="sel-card-name">Ajouter un équipement sur une installation existante</p>
            <div className="sel-card-tags">
              <span className="tag-pill">Coming soon</span>
              <span className="tag-pill">PAC</span>
              <span className="tag-pill">Chauffe-eau</span>
              <span className="tag-pill">Borne de recharge</span>
            </div>
          </div>
          <div style={{ color: "var(--label-3)", fontSize: 22, flexShrink: 0 }}>›</div>
        </div>
      </div>
    </div>
  );
}
