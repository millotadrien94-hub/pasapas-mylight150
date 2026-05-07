import CheckMark from "../CheckMark";
import schemaElectrique from "../../assets/CE-electrique.jpg";
import schemaThermoSec from "../../assets/CE-thermodynamic_contact sec.jpg";
import schemaThermo230 from "../../assets/CE-thermodynamic_230V.jpg";
import schemaElectriqueCore from "../../assets/CE-electrique_Robin Core.jpg";
import schemaThermoSecCore from "../../assets/CE-thermodynamic_contact sec_Robin Core.jpg";
import schemaThermo230Core from "../../assets/CE-thermodynamic_230V_Robin Core.jpg";

const SCHEMAS = {
  electrique:   schemaElectrique,
  "thermo-sec": schemaThermoSec,
  "thermo-230": schemaThermo230,
};

const SCHEMAS_CORE = {
  electrique:   schemaElectriqueCore,
  "thermo-sec": schemaThermoSecCore,
  "thermo-230": schemaThermo230Core,
};

const TYPES = [
  { id: "electrique",  label: "Électrique" },
  { id: "thermo-sec",  label: "Thermodynamique — Contact sec" },
  { id: "thermo-230",  label: "Thermodynamique — 230V" },
];

const STEP_COMMUN = "La pince CT2 est déjà précâblée, vérifier qu'elle soit bien clipsée.";

const CONTENT = {
  electrique: {
    instructions: [
      STEP_COMMUN,
      "Placez le pont fourni dans le sachet d'accessoires entre les bornes XPh et XRE1.",
      "Connectez l'alimentation du chauffe-eau : le neutre sur le bornier XNe et la phase sur XRE2.",
    ],
    items: ["Pince refermée et clipsée en direction du disjoncteur 20A", "Pas de contacteur heures creuses en amont"],
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
    items: ["Alimentation permanente câblé sur XNe et XPh", "File pilote câble sur la sortie XnE et XRE2"],
  },
};

export default function Step3({ state, setState }) {
  const isMono = state.typeInstallation === "mono";
  const hasCE  = (state.equipements || []).includes("CE");

  const ceType = state.ceType || "electrique";
  const isRobinCore = state.coffretSelectionne === "MG3";
  const schemas = isRobinCore ? SCHEMAS_CORE : SCHEMAS;

  if (isMono && !hasCE) {
    return (
      <div className="step-page">
        <div className="step-page-header">
          <h1 className="t-title2">CT2 — Chauffe-eau</h1>
        </div>
        <div style={{ padding: "0 16px" }}>
          <div className="notice notice-green">
            <span className="notice-icon">✓</span>
            <div className="notice-body">
              <p className="notice-title">Aucune action requise</p>
              <p className="notice-text">
                Vous n'avez pas de chauffe-eau à raccorder. Vous pouvez continuer.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const setCeType = (v) => setState(prev => ({ ...prev, ceType: v }));
  const content = CONTENT[ceType];

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
            <p className="notice-text">Le Coffret Robin gère directement l'optimisation.</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Type</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {TYPES.map((t) => {
            const sel = ceType === t.id;
            return (
              <div
                key={t.id}
                className="list-row"
                style={{ cursor: "pointer" }}
                onClick={() => setCeType(t.id)}
              >
                <div className="list-row-content">
                  <p className="list-row-title" style={{ fontWeight: 500 }}>{t.label}</p>
                </div>
                <div className="list-row-trailing">
                  <div className={`check-circle ${sel ? "checked" : ""}`}>
                    {sel && <CheckMark />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Schéma</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img src={schemas[ceType]} alt={`Schéma ${ceType}`} style={{ width: "100%", borderRadius: 8 }} />
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

    </div>
  );
}
