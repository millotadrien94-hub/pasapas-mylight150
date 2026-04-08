import schemaImg from "../../assets/Documentation nouvelle gamme - Schéma Coffre Plus mono.jpg";
import Checklist from "../Checklist";

const ITEMS = [
  "Etre à proximité du compteur général / 500mA",
];

export default function Step1({ state, setState }) {
  const checked = state.etapesCochees?.step1 || Array(ITEMS.length).fill(false);
  const setChecked = (arr) => setState(prev => ({
    ...prev,
    etapesCochees: { ...prev.etapesCochees, step1: arr }
  }));

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Schéma de principe</h1>
      </div>

      <div className="step-page-section">
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img
              src={schemaImg}
              alt="Schéma de principe"
              onClick={() => window.open(schemaImg, "_blank")}
              style={{ width: "100%", borderRadius: 8, cursor: "zoom-in" }}
            />
          </div>
        </div>
      </div>

      <Checklist
        items={ITEMS}
        checked={checked}
        onChange={(i, val) => {
          const next = [...checked]; next[i] = val; setChecked(next);
        }}
        title="Recommandations"
      />
    </div>
  );
}
