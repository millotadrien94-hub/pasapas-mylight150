const MATERIEL = [
  { name: "Coffret Robin Heat (UPG H)",             desc: "Monophasé ou Triphasé" },
  { name: "Câble d'alimentation coffret",           desc: "Dimensionné sur le TGBT du client" },
  { name: "Câble de pilotage PAC",                  desc: "0,75mm² min contacts secs / SG-Ready ou 1,5mm² min 230V (CGWV)" },
  { name: "Câble communication Modbus RS485",       desc: "Section 0,34 à 0,75mm², souple" },
  { name: "Schéma d'installation unité intérieure", desc: "Pour identifier les bornes SG-Ready / contacts secs" },
  { name: "Manuel d'installation unité intérieure", desc: "Pour trouver le numéro de fils requis" },
];

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

export default function StepUPGMateriel({ state, setState }) {
  const checks = state.etapesCochees?.upgMateriel || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upgMateriel || [])];
      arr[idx] = !arr[idx];
      return { ...prev, etapesCochees: { ...prev.etapesCochees, upgMateriel: arr } };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Matériel nécessaire</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          3 raccordements côté terrain
        </p>
      </div>

      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>Matériel requis</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {MATERIEL.map((item, i) => (
            <div key={i} className="list-row" style={{ minHeight: 56 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--fill-2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 18,
              }}>📦</div>
              <div className="list-row-content">
                <p className="list-row-title" style={{ fontWeight: 500 }}>{item.name}</p>
                <p className="list-row-subtitle">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>Avant de commencer</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          <CheckRow
            checked={!!checks[0]}
            onToggle={() => toggle(0)}
            label="J'ai le schéma d'installation de la PAC"
          />
          <CheckRow
            checked={!!checks[1]}
            onToggle={() => toggle(1)}
            label="J'ai le câble de pilotage PAC adapté"
          />
        </div>
      </div>
    </div>
  );
}
