import { SvgPince, SvgSDM120 } from "../Svgs";
import Checklist from "../Checklist";
import schemaProduction from "../../assets/Documentation nouvelle gamme - Schéma Coffre Plus mono.jpg";

const INSTRUCTIONS_CT = [
  "Repérer le câble entre le coffret AC et les panneaux photovoltaïques.",
  "Passez la pince CT3 autour du câble de production.",
  "Flèche doit viser les panneaux photovoltaïques.",
  "Visser la pince au port \"CT3\" de la MG3.",
];

const INSTRUCTIONS_SDM = [
  "Montez le SDM120 sur rail DIN.",
  "Câblez L1/N côté onduleur en entrée.",
  "Câblez la sortie vers le coffret MG3.",
  "Serrez toutes les bornes.",
];

const ITEMS_CT  = ["CT3 sur le câble des panneaux", "Pince refermée et clipsée"];
const ITEMS_SDM = ["SDM120 câblé : onduleur en entrée, MG3 en sortie", "Bornes serrées"];

export default function Step4({ state, setState }) {
  const sensorType = state.sensorType || "ct";
  const setSensorType = (v) => setState(prev => ({ ...prev, sensorType: v }));

  const items = sensorType === "ct" ? ITEMS_CT : ITEMS_SDM;
  const checked = state.etapesCochees?.step4 || Array(items.length).fill(false);
  const setChecked = (arr) => setState(prev => ({
    ...prev,
    etapesCochees: { ...prev.etapesCochees, step4: arr }
  }));

  const instructions = sensorType === "ct" ? INSTRUCTIONS_CT : INSTRUCTIONS_SDM;

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">CT3 — Production</h1>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="segmented">
          <button className={`segmented-item ${sensorType === "ct" ? "active" : ""}`} onClick={() => setSensorType("ct")}>Pince CT3</button>
          <button className={`segmented-item ${sensorType === "sdm" ? "active" : ""}`} onClick={() => setSensorType("sdm")}>SDM120</button>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-yellow">
          <span className="notice-icon">⚠️</span>
          <div className="notice-body">
            <p className="notice-title">L'intégralité de la production doit être lue. Si besoin, ajouter des compteurs supplémentaires RS485.</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Positionnement</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img src={schemaProduction} alt="Schéma production" style={{ width: "100%", borderRadius: 8 }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className={`notice ${sensorType === "ct" ? "notice-orange" : "notice-blue"}`}>
          <span className="notice-icon">⚠️</span>
          <div className="notice-body">
            <p className="notice-title">La flèche doit pointer les panneaux photovoltaïques</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Instructions</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group">
            <div className="numbered-steps">
              {instructions.map((t, i) => (
                <div className="numbered-step" key={i}>
                  <span className="step-num">{i + 1}</span>
                  <span className="step-text">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Checklist
        items={items}
        checked={checked}
        onChange={(i, val) => { const next = [...checked]; next[i] = val; setChecked(next); }}
        title="Vérifications"
      />
    </div>
  );
}
