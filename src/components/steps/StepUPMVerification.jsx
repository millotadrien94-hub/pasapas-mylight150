import { useState } from "react";
import CheckMark from "../CheckMark";

const BANNER_ORANGE = {
  background: "var(--color-warning-light)",
  borderLeft: "3px solid var(--color-warning)",
  borderRadius: 8,
  padding: "12px 14px",
  color: "var(--color-warning-dark)",
};

const BANNER_BLUE = {
  background: "var(--color-info-light)",
  borderLeft: "3px solid var(--color-info)",
  borderRadius: 8,
  padding: "12px 14px",
  color: "var(--color-info-dark)",
};

const BANNER_GREEN = {
  background: "var(--color-success-light)",
  borderLeft: "3px solid var(--color-success)",
  borderRadius: 8,
  padding: "12px 14px",
  color: "var(--color-success-dark)",
};

function CheckRow({ checked, onToggle, label }) {
  return (
    <div className="list-row" style={{ minHeight: 56, cursor: "pointer" }} onClick={onToggle}>
      <div className="list-row-content">
        <p className="list-row-title" style={{ fontWeight: 500 }}>{label}</p>
      </div>
      <div className="list-row-trailing">
        <div className={`check-circle ${checked ? "checked" : ""}`}>
          {checked && <CheckMark />}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
      <p style={{ fontSize: 14, color: "var(--label-1)", lineHeight: 1.5 }}>{label}</p>
    </div>
  );
}

export default function StepUPMVerification({ state, setState }) {
  const isTri = state.typeInstallation === "tri";
  const [txdOpen, setTxdOpen] = useState(false);
  const checks = state.etapesCochees?.upmVerif || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upmVerif || [])];
      arr[idx] = !arr[idx];
      return { ...prev, etapesCochees: { ...prev.etapesCochees, upmVerif: arr } };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Vérification et mise sous tension</h1>
      </div>

      {/* Section A — Mise sous tension */}
      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>A — Mise sous tension</p>
        <p style={{ fontSize: 14, color: "var(--label-2)", padding: "0 16px 12px", lineHeight: 1.5 }}>
          Contrôlez ces points après avoir alimenté le coffret.
        </p>
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <InfoRow icon="✅" label="Voyant PWR rouge fixe visible sur les deux boîtiers W-Modbus (émetteur + récepteur)" />
          <InfoRow icon="✅" label="Bouton switch rouge (1 & 2) sur ON — situé à côté de l'antenne, sur chaque boîtier" />
          <InfoRow icon="✅" label="Voyants TXD et RXD clignotent rapidement sur les deux boîtiers simultanément" />
        </div>

        <div style={{ padding: "12px 16px 0" }}>
          <button
            onClick={() => setTxdOpen(o => !o)}
            style={{
              width: "100%", textAlign: "left",
              background: "var(--color-warning-light)", border: "none", borderRadius: 8,
              padding: "10px 14px", cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              borderLeft: "3px solid var(--color-warning)",
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-warning-dark)" }}>
              ⚠️ TXD/RXD ne clignotent pas ?
            </span>
            <span style={{ color: "var(--color-warning-dark)", fontSize: 16 }}>{txdOpen ? "▲" : "▼"}</span>
          </button>
          {txdOpen && (
            <div style={{ ...BANNER_ORANGE, borderRadius: "0 0 8px 8px", marginTop: -4 }}>
              <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                Vérifiez le positionnement des antennes : elles doivent se voir sans aucun obstacle.
                Ajustez jusqu'à obtenir le clignotement rapide.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Section B — Signification des voyants */}
      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>B — Signification des voyants</p>
        <div style={{ margin: "0 16px", borderRadius: 12, overflow: "hidden", border: "1px solid var(--separator)" }}>
          {[
            ["TXD", "Transmission (envoi de données)"],
            ["RXD", "Réception"],
          ].map(([voyant, desc], i) => (
            <div key={voyant} style={{
              display: "flex", gap: 0,
              borderTop: i > 0 ? "1px solid var(--separator)" : "none",
            }}>
              <div style={{ width: 64, padding: "12px 16px", background: "var(--fill-1)", flexShrink: 0 }}>
                <p style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}>{voyant}</p>
              </div>
              <div style={{ padding: "12px 16px", borderLeft: "1px solid var(--separator)" }}>
                <p style={{ fontSize: 14, color: "var(--label-1)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--label-3)", padding: "8px 16px 0", fontStyle: "italic" }}>
          Les deux doivent clignoter ensemble
        </p>
      </div>

      {/* Section C — Déclarer dans mylight150 Pro */}
      <div className="step-page-section">
        <p className="list-header" style={{ padding: "0 16px 8px" }}>C — Déclarer dans mylight150 Pro</p>
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={BANNER_BLUE}>
            <p style={{ fontSize: 14, lineHeight: 1.5 }}>
              ℹ️ <strong>Étape indispensable</strong> — le coffret ne fonctionnera pas sans cette déclaration.
            </p>
          </div>

          {[
            {
              n: 1,
              title: "Déclarer le Robin Link dans l'application",
              body: "Sans déclaration, les voyants TXD/RXD ne clignoteront pas et la communication avec la MG3 ne sera pas établie.",
            },
            {
              n: 2,
              title: "Vérifier les mesures après mise en service",
              body: isTri
                ? "3 valeurs négatives sur le compteur = correct"
                : "Valeur négative sur le compteur = correct",
            },
          ].map(step => (
            <div key={step.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "var(--color-primary)",
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1,
              }}>{step.n}</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{step.title}</p>
                <p style={{ fontSize: 14, color: "var(--label-2)", lineHeight: 1.5 }}>{step.body}</p>
              </div>
            </div>
          ))}

          <div style={BANNER_ORANGE}>
            <p style={{ fontSize: 14, lineHeight: 1.5 }}>
              ⚠️ <strong>Valeurs incohérentes (mélange +/−) ?</strong><br />
              Inversez la position des pinces dont la polarité est erronée.
              Toutes les phases doivent afficher des valeurs négatives sur le compteur.
            </p>
          </div>
        </div>
      </div>

      {/* Bandeau succès */}
      <div className="step-page-section">
        <div style={{ padding: "0 16px" }}>
          <div style={BANNER_GREEN}>
            <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>
              ✅ Installation terminée — Le coffret Robin Link est opérationnel et communique avec la MG3.
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="step-page-section">
        <div className="list-group" style={{ margin: "0 16px" }}>
          <CheckRow
            checked={!!checks[0]}
            onToggle={() => toggle(0)}
            label="Les voyants TXD et RXD clignotent simultanément"
          />
          <CheckRow
            checked={!!checks[1]}
            onToggle={() => toggle(1)}
            label="Les mesures affichent des valeurs négatives dans mylight150 Pro"
          />
        </div>
      </div>
    </div>
  );
}
