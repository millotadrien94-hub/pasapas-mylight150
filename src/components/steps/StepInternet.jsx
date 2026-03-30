import schemaModem from "../../assets/Connexion_modem.png";
import schemaWifi from "../../assets/Connexion_Wifi.png";
import schemaCPL from "../../assets/Connexion_CPL.png";

const TYPES = [
  { id: "modem",  label: "Modem 3G/4G",          schema: schemaModem },
  { id: "rj45",   label: "RJ45 à la box internet", schema: schemaWifi  },
  { id: "cpl",    label: "CPL",                    schema: schemaCPL   },
];

export default function StepInternet({ state, setState }) {
  const connexionType = state.connexionType || "modem";
  const setConnexionType = (v) => setState(prev => ({ ...prev, connexionType: v }));

  const current = TYPES.find(t => t.id === connexionType);

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Connecter la MG3 à internet</h1>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="segmented">
          {TYPES.map(t => (
            <button
              key={t.id}
              className={`segmented-item ${connexionType === t.id ? "active" : ""}`}
              onClick={() => setConnexionType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Schéma de connexion</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img src={current.schema} alt={current.label} style={{ width: "100%", borderRadius: 8 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
