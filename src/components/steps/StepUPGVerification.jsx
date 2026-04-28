import { useState } from "react";

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
          <span className="check-circle-icon">✓</span>
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
  const isTri = state.typeInstallation === "tri";
  const subStep = state.upGVerifSubStep ?? 0;
  const checks = state.etapesCochees?.upgVerif || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upgVerif || [])];
      arr[idx] = !arr[idx];
      const done = [
        !!arr[0] && !!arr[1] && !!arr[2],
        !!arr[3] && !!arr[4],
      ];
      return {
        ...prev,
        etapesCochees: { ...prev.etapesCochees, upgVerif: arr },
        upGVerifSubStepDone: done,
      };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Vérification et mise sous tension</h1>
        <StepperDots current={subStep} total={2} />
      </div>

      {/* ── Sous-écran 0 : Mise sous tension ── */}
      {subStep === 0 && (
        <>
          <div className="step-page-section">
            <p style={{ fontSize: 15, color: "var(--label-2)", padding: "0 16px 12px" }}>
              Contrôlez ces points après avoir alimenté le coffret.
            </p>
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
                label="Remettre le courant — mettre sous tension le coffret Robin Heat (UPG H)"
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
        </>
      )}

      {/* ── Sous-écran 1 : Configuration et validation ── */}
      {subStep === 1 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{
                background: "var(--color-info-light)", borderLeft: "3px solid var(--color-info)",
                borderRadius: 8, padding: "12px 14px",
                color: "var(--color-info-dark)",
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                  ℹ️ <strong>Étape indispensable</strong> — le coffret ne fonctionnera pas sans cette configuration.
                </p>
              </div>

              {[
                {
                  n: 1,
                  title: "Configuration mylight150 Pro",
                  body: "Vérifiez que le compteur PAC est reconnu et que le pilotage est associé au relais SG-Ready",
                },
                {
                  n: 2,
                  title: "Vérifier les mesures",
                  body: isTri
                    ? "Le compteur doit afficher 3 valeurs négatives correspondant à la consommation de la PAC"
                    : "Le compteur doit afficher une valeur négative correspondant à la consommation de la PAC",
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

              <Collapsible
                icon="⚠️"
                label="Valeurs incohérentes (mélange +/−) ?"
                color="var(--color-warning-dark)"
                bgColor="var(--color-warning-light)"
                borderColor="var(--color-warning)"
              >
                <p style={{ fontSize: 14, color: "var(--color-warning-dark)", lineHeight: 1.5 }}>
                  Inversez la position des pinces dont la polarité est erronée.
                  Toutes les phases doivent afficher des valeurs négatives.
                </p>
              </Collapsible>

              <div style={{
                background: "var(--color-success-light)", borderLeft: "3px solid var(--color-success)",
                borderRadius: 8, padding: "12px 14px",
                color: "var(--color-success-dark)",
              }}>
                <p style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5 }}>
                  ✅ Installation terminée — Le coffret Robin Heat (UPG H) est opérationnel — la PAC est pilotable via SG-Ready par mylight150.
                </p>
              </div>
            </div>
          </div>

          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow
                checked={!!checks[3]}
                onToggle={() => toggle(3)}
                label="Le compteur PAC est reconnu dans mylight150 Pro"
              />
              <CheckRow
                checked={!!checks[4]}
                onToggle={() => toggle(4)}
                label="Les mesures affichent des valeurs négatives"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
