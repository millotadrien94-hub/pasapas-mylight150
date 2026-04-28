import { useState } from "react";
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
  const [legendOpen, setLegendOpen] = useState(false);

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
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img src={current.schema} alt={current.label} style={{ width: "100%", borderRadius: 8 }} />
          </div>

          {/* Accordéon légende — affiché uniquement pour Modem 3G/4G */}
          {connexionType === "modem" && <div className="list-group" style={{ overflow: "hidden" }}>
            <button
              onClick={() => setLegendOpen(o => !o)}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 14px", background: "none", border: "none", cursor: "pointer",
                fontSize: 15, fontWeight: 600, color: "#111827",
              }}
            >
              Légende
              <svg
                viewBox="0 0 24 24" width="18" height="18" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: "transform 0.2s", transform: legendOpen ? "rotate(180deg)" : "rotate(0deg)", color: "var(--label-2)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {legendOpen && (
              <div style={{ padding: "0 14px 14px", borderTop: "0.5px solid rgba(60,60,67,0.12)" }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 8, marginTop: 12 }}>
                  Alimentation 230V vers le bas
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    "Bornier N = Neutre",
                    "Bornier L = Phase",
                    "Fil rouge → V+",
                    "Fil noir → V−",
                  ].map((item) => (
                    <li key={item} style={{ fontSize: 14, color: "rgba(60,60,67,0.8)", lineHeight: 1.5 }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>}
        </div>
      </div>
    </div>
  );
}
