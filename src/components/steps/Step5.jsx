import schemaBdr from "../../assets/Schema_BDR.jpg";
import Checklist from "../Checklist";

const ITEMS = [
  "Circuit dédié : câble ≥10mm², disjoncteur 16/32A, différentiel type A",
  "RJ45 sur port AUX du Robin Core (pas LAN, pas d'embout industriel)",
  "Flèches visibles sur l'écran de la borne",
];

export default function Step5({ state, setState }) {
  const checked = state.etapesCochees?.step5 || Array(ITEMS.length).fill(false);
  const setChecked = (arr) => setState(prev => ({
    ...prev,
    etapesCochees: { ...prev.etapesCochees, step5: arr }
  }));

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Borne de recharge</h1>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-red">
          <span className="notice-icon">⚠️</span>
          <div className="notice-body">
            <p className="notice-title">Compatible monophasé uniquement</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Alimentation</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {[
            ["Câble", "≥ 10 mm²"],
            ["Disjoncteur", "16 A ou 32 A"],
            ["Différentiel", "Type A 30 mA"],
            ["Communication", "RJ45"],
          ].map(([label, value]) => (
            <div className="list-row" key={label}>
              <div className="list-row-content">
                <p className="list-row-title">{label}</p>
              </div>
              <span style={{ fontSize: 15, color: "var(--label-2)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Connexion Robin Core</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img src={schemaBdr} alt="Connexion borne de recharge" style={{ width: "60%", display: "block", margin: "0 auto", borderRadius: 8 }} />
          </div>
        </div>
      </div>

      <Checklist
        items={ITEMS}
        checked={checked}
        onChange={(i, val) => { const next = [...checked]; next[i] = val; setChecked(next); }}
        title="Vérifications"
      />
    </div>
  );
}
