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

function ConnGroup({ rows }) {
  return (
    <div style={{
      background: "var(--color-bg-card)", borderRadius: "var(--radius-lg)",
      border: "1px solid var(--color-border)", overflow: "hidden", marginBottom: 16,
    }}>
      {rows.map(([from, to], i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", padding: "14px 16px",
          borderBottom: i < rows.length - 1 ? "1px solid var(--color-border)" : "none",
        }}>
          <span style={{ flex: 1, fontSize: 14, color: "var(--color-text-secondary)" }}>{from}</span>
          <span style={{ fontSize: 16, color: "var(--color-text-disabled)", margin: "0 12px" }}>→</span>
          <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", textAlign: "right" }}>{to}</span>
        </div>
      ))}
    </div>
  );
}

function SubLabel({ label }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
      color: "var(--label-3)", textTransform: "uppercase", marginBottom: 8,
    }}>{label}</p>
  );
}

function CheckRow({ checked, onToggle, label }) {
  return (
    <div className="list-row" style={{ minHeight: 56, cursor: "pointer" }} onClick={onToggle}>
      <div className="list-row-content">
        <p className="list-row-title" style={{ fontWeight: 500 }}>{label}</p>
      </div>
      <div className="list-row-trailing">
        <div className={`check-circle ${checked ? "checked" : ""}`}>
          <span className="check-circle-icon">✓</span>
        </div>
      </div>
    </div>
  );
}

export default function StepUPGBranchement({ state, setState }) {
  const isTri = state.typeInstallation === "tri";
  const subStep = state.upGBranchementSubStep ?? 0;
  const [avecRS485, setAvecRS485] = useState(false);

  const checks = state.etapesCochees?.upgBranch || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upgBranch || [])];
      arr[idx] = !arr[idx];
      const done = [!!arr[0], !!arr[1], !!arr[2]];
      return {
        ...prev,
        etapesCochees: { ...prev.etapesCochees, upgBranch: arr },
        upGBranchSubStepDone: done,
      };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Raccordement Robin Heat</h1>
        <StepperDots current={subStep} total={3} />
      </div>

      {/* ── Sous-écran 0 : Alimentation + RS485 ── */}
      {subStep === 0 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px" }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 16 }}>
                Alimentation et communication
              </p>

              <SubLabel label="Alimentation du coffret" />
              <div style={{
                background: "var(--color-info-light)", borderLeft: "3px solid var(--color-info)",
                borderRadius: 8, padding: "12px 14px", marginBottom: 20,
                color: "var(--color-info-dark)",
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                  ℹ️ Alimenter le coffret depuis le TGBT du client.
                  Protéger par un disjoncteur différentiel 30mA.
                </p>
              </div>

              <SubLabel label="Liaison RS485" />
              <div className="segmented">
                {["Sans compteur RS485", "Avec compteur RS485"].map((label, i) => (
                  <button
                    key={i}
                    className={`segmented-item${avecRS485 === (i === 1) ? " active" : ""}`}
                    onClick={() => setAvecRS485(i === 1)}
                  >{label}</button>
                ))}
              </div>

              <p style={{ fontSize: 14, color: "var(--label-2)", marginBottom: 12 }}>
                {!avecRS485
                  ? "Relier directement le W-Modbus au bornier RS485 de la MG3 :"
                  : "Raccorder le W-Modbus au dernier compteur RS485 de la chaîne :"}
              </p>

              <ConnGroup rows={!avecRS485
                ? [["RS485-A", "A"], ["RS485-B", "B"]]
                : [["A (Robin Heat)", "A+ dernier compteur"], ["B (Robin Heat)", "B- dernier compteur"]]
              } />
            </div>
          </div>
          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow checked={!!checks[0]} onToggle={() => toggle(0)} label="Alimentation et RS485 raccordés" />
            </div>
          </div>
        </>
      )}

      {/* ── Sous-écran 1 : Signal SG-Ready ── */}
      {subStep === 1 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px" }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 16 }}>
                Signal SG-Ready vers la PAC
              </p>

              <div style={{
                background: "var(--color-info-light)", borderLeft: "3px solid var(--color-info)",
                borderRadius: 8, padding: "12px 14px", marginBottom: 20,
                color: "var(--color-info-dark)",
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 8 }}>
                  ℹ️ Identifier l'entrée SG-Ready dans le schéma de compatibilité.
                  Raccorder la PAC sur SG1-Com1 et SG2-Com2 du Robin Heat.
                  Identifier et filer le câble selon la colonne "Mode de pilotage" dans l'outil de compatibilité
                  pour connaître le nombre de fils requis.
                </p>
                <button style={{
                  background: "none", border: "none", padding: 0,
                  color: "var(--color-info)", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", textDecoration: "underline",
                }}>
                  Outil de compatibilité →
                </button>
              </div>

              <ConnGroup rows={[
                ["PAC SG1", "SG1-Com1"],
                ["PAC SG2", "SG2-Com2"],
              ]} />
            </div>
          </div>
          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow checked={!!checks[1]} onToggle={() => toggle(1)} label="Signal SG-Ready câblé vers la PAC" />
            </div>
          </div>
        </>
      )}

      {/* ── Sous-écran 2 : Pince PAC ── */}
      {subStep === 2 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px" }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 12 }}>
                Pince mesurant la PAC
              </p>

              <div style={{
                background: "var(--color-warning-light)", borderLeft: "3px solid var(--color-warning)",
                borderRadius: 8, padding: "12px 14px", marginBottom: 20,
                color: "var(--color-warning-dark)",
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                  ⚠️ La pince doit mesurer l'unité intérieure ET l'unité extérieure ensemble.
                </p>
              </div>

              {!isTri ? (
                <>
                  <SubLabel label="SDM120CT — 1 pince" />
                  {[
                    "Positionnez la pince autour du fil de phase alimentant uniquement la PAC (unité intérieure + unité extérieure)",
                    "Orientez la pince — la flèche doit pointer vers le tableau électrique",
                  ].map((txt, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", background: "var(--color-primary)",
                        color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.5 }}>{txt}</p>
                    </div>
                  ))}
                  <ConnGroup rows={[["Fil blanc", "Borne 1"], ["Fil noir", "Borne 2"]]} />
                </>
              ) : (
                <>
                  <SubLabel label="MG3C01RM — 3 pinces" />
                  {[
                    "Positionnez chaque pince autour du fil de phase alimentant uniquement la PAC",
                    "Orientez les pinces — les flèches doivent pointer vers le tableau électrique",
                  ].map((txt, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 22, height: 22, borderRadius: "50%", background: "var(--color-primary)",
                        color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
                      }}>{i + 1}</div>
                      <p style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.5 }}>{txt}</p>
                    </div>
                  ))}
                  <ConnGroup rows={[
                    ["Pince 1 S1 blanc", "Borne 1"], ["Pince 1 S2 noir", "S2"],
                    ["Pince 2 S1 blanc", "Borne 2"], ["Pince 2 S2 noir", "S2"],
                    ["Pince 3 S1 blanc", "Borne 3"], ["Pince 3 S2 noir", "S2"],
                  ]} />
                </>
              )}

              <div style={{
                background: "var(--color-error-light)", borderLeft: "3px solid var(--color-error)",
                borderRadius: 8, padding: "12px 14px",
                color: "var(--color-error-dark)",
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                  🔴 <strong>Attention</strong> — Ce compteur ne doit mesurer que la PAC.
                  Aucune autre charge sur ce circuit de mesure.
                </p>
              </div>
            </div>
          </div>
          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow
                checked={!!checks[2]}
                onToggle={() => toggle(2)}
                label="Pince positionnée uniquement sur le circuit de la PAC"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
