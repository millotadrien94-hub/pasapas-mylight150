import { useState } from "react";
import CheckMark from "../CheckMark";

function StepperDots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", paddingTop: 10 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 8, height: 8, borderRadius: 9999,
          background: i === current ? "var(--color-secondary)" : (i < current ? "var(--color-secondary)" : "var(--color-border-strong)"),
          transition: "width 0.2s ease, background 0.2s ease",
        }} />
      ))}
    </div>
  );
}

function CheckRow({ checked, onToggle, label, note }) {
  return (
    <div className="list-row" style={{ minHeight: 56, cursor: "pointer", alignItems: "flex-start", paddingTop: 14, paddingBottom: 14 }} onClick={onToggle}>
      <div className="list-row-content">
        <p className="list-row-title" style={{ fontWeight: 500 }}>{label}</p>
        {note && <p style={{ fontSize: 13, color: "var(--label-3)", marginTop: 2, fontStyle: "italic" }}>{note}</p>}
      </div>
      <div className="list-row-trailing" style={{ marginTop: 2 }}>
        <div className={`check-circle ${checked ? "checked" : ""}`}>
          {checked && <CheckMark />}
        </div>
      </div>
    </div>
  );
}

function Collapsible({ icon, label, color, bgColor, borderColor, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", textAlign: "left", border: "none", borderRadius: open ? "8px 8px 0 0" : 8,
          background: bgColor, padding: "10px 14px", cursor: "pointer",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderLeft: `3px solid ${borderColor}`,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color }}>{icon} {label}</span>
        <span style={{ color, fontSize: 14 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{
          background: bgColor, borderLeft: `3px solid ${borderColor}`,
          borderRadius: "0 0 8px 8px", padding: "0 14px 12px",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function StepUPGVerification({ state, setState }) {
  const checks = state.etapesCochees?.upgVerif || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upgVerif || [])];
      arr[idx] = !arr[idx];
      return {
        ...prev,
        etapesCochees: { ...prev.etapesCochees, upgVerif: arr },
        upGVerifSubStepDone: [!!arr[0] && !!arr[1] && !!arr[2]],
      };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Vérification et mise sous tension</h1>
      </div>

      <div className="step-page-section">
        <div className="list-group" style={{ margin: "0 16px" }}>
          <CheckRow
            checked={!!checks[0]}
            onToggle={() => toggle(0)}
            label="Vérifier le câblage — tous les fils sont correctement serrés et raccordés"
          />
          <CheckRow
            checked={!!checks[1]}
            onToggle={() => toggle(1)}
            label="Remettre le courant — mettre sous tension le coffret Robin Heat"
          />
          <CheckRow
            checked={!!checks[2]}
            onToggle={() => toggle(2)}
            label="Paramétrer la PAC — activer la fonction SG-Ready sur la PAC elle-même"
            note="Guide disponible dans l'outil de compatibilité"
          />
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <Collapsible
          icon="💡"
          label="En cas de doute sur le branchement"
          color="#854D0E"
          bgColor="#FEFCE8"
          borderColor="#EAB308"
        >
          <p style={{ fontSize: 14, color: "#854D0E", lineHeight: 1.5 }}>
            Contactez le support technique mylight150 avant la mise sous tension.
          </p>
        </Collapsible>
      </div>
    </div>
  );
}
