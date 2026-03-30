import Checklist from "../Checklist";
import schemaElectrique from "../../assets/CE-electrique.png";
import schemaThermoSec from "../../assets/CE-thermodynamic_contact sec.png";
import schemaThermo230 from "../../assets/CE-thermodynamic_230V.png";

const SCHEMAS = {
  electrique:  schemaElectrique,
  "thermo-sec": schemaThermoSec,
  "thermo-230": schemaThermo230,
};

const TYPES = [
  { id: "electrique",  label: "Électrique" },
  { id: "thermo-sec",  label: "Thermo — Contact sec" },
  { id: "thermo-230",  label: "Thermo — 230V" },
];

const STEP_COMMUN = "La pince CT2 est déjà précâblée, vérifier qu'elle soit bien clipsée.";

const CONTENT = {
  electrique: {
    instructions: [
      STEP_COMMUN,
      "Placez le pont fourni dans le sachet d'accessoires entre les bornes XPh et XRE1.",
      "Connectez l'alimentation du chauffe-eau : le neutre sur le bornier XNe et la phase sur XRE2.",
    ],
    items: ["Phase câblée sur sortie CE (CT2), neutre direct", "Pas de contacteur heures creuses en amont"],
  },
  "thermo-sec": {
    instructions: [
      STEP_COMMUN,
      "Connectez l'alimentation du chauffe-eau sur les bornes XNe et XPh.",
      "Placez le Fil pilote entre XRE1 et XRE2.",
      "Mettre la fonction \"Heure Creuse\" sur le chauffe-eau. Sur l'écran, vérifiez l'entrée « HC/HP ». Cette information varie selon les fabricants.",
    ],
    items: ["Contact sec câblé sur bornes CS", "Polarité respectée"],
  },
  "thermo-230": {
    instructions: [
      STEP_COMMUN,
      "Placez le pont fourni dans le sachet d'accessoires entre les bornes XPh et XRE1.",
      "Alimentation permanente sur les bornes XNe et XPh.",
      "Connectez le fil pilote du chauffe-eau : Sur le bornier XNe et XRE2.",
      "Mettre la fonction \"Heure Creuse\" sur le chauffe-eau. Sur l'écran, vérifiez l'entrée « HC/HP ». Cette information varie selon les fabricants.",
    ],
    items: ["Pilotage 230V câblé sur la sortie dédiée", "Neutre de pilotage connecté"],
  },
};

export default function Step3({ state, setState }) {
  const ceType = state.ceType || "electrique";
  const setCeType = (v) => setState(prev => ({
    ...prev, ceType: v,
    etapesCochees: { ...prev.etapesCochees, step3: [] },
  }));

  const content = CONTENT[ceType];
  const checked = state.etapesCochees?.step3 || Array(content.items.length).fill(false);
  const setChecked = (arr) => setState(prev => ({
    ...prev,
    etapesCochees: { ...prev.etapesCochees, step3: arr }
  }));

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">CT2 — Chauffe-eau</h1>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-red">
          <span className="notice-icon">⚠️</span>
          <div className="notice-body">
            <p className="notice-title">Ne pas passer par le contacteur heures creuses</p>
            <p className="notice-text">Le coffret MG3 gère directement l'optimisation.</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Type</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {TYPES.map((t) => (
            <div
              key={t.id}
              className="list-row"
              onClick={() => setCeType(t.id)}
            >
              <div className="list-row-content">
                <p className="list-row-title">{t.label}</p>
              </div>
              <div className="list-row-trailing">
                {ceType === t.id && (
                  <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: 17 }}>✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Schéma</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img src={SCHEMAS[ceType]} alt={`Schéma ${ceType}`} style={{ width: "100%", borderRadius: 8 }} />
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Instructions</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group">
            <div className="numbered-steps">
              {content.instructions.map((t, i) => (
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
        items={content.items}
        checked={checked}
        onChange={(i, val) => { const next = [...checked]; next[i] = val; setChecked(next); }}
        title="Vérifications"
      />
    </div>
  );
}
