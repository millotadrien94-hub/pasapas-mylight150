const OPTIONS = [
  {
    id: "mono",
    label: "Monophasé",
    desc: "1 phase — installation résidentielle standard",
    icon: "〜",
  },
  {
    id: "tri",
    label: "Triphasé",
    desc: "3 phases — installation industrielle ou grande puissance",
    icon: "≋",
  },
];

export default function StepInstallationType({ state, setState }) {
  const selected = state.typeInstallation;
  const setSelected = (v) => setState(prev => ({ ...prev, typeInstallation: v }));

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Type d'installation</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Quel est le type de réseau électrique ?
        </p>
      </div>

      <div className="step-page-section">
        <p className="list-header" style={{ paddingBottom: 6 }}>
          Vérifiez sur votre compteur Linky
        </p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {OPTIONS.map(opt => (
            <div
              key={opt.id}
              className="list-row"
              style={{ minHeight: 60 }}
              onClick={() => setSelected(opt.id)}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: selected === opt.id ? "var(--color-primary)" : "var(--color-bg-subtle)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0,
                transition: "background 0.2s",
              }}>
                <span style={{ color: selected === opt.id ? "white" : "var(--color-text-secondary)" }}>{opt.icon}</span>
              </div>
              <div className="list-row-content">
                <p className="list-row-title" style={{ fontWeight: 500 }}>{opt.label}</p>
              </div>
              <div className="list-row-trailing">
                {selected === opt.id && (
                  <span style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: 18 }}>✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
