import { useState } from "react";
import CheckMark from "../CheckMark";

// ─── Primitives ────────────────────────────────────────────────────────────

function StepperDots({ current, total }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", paddingTop: 10 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 8,
          height: 8,
          borderRadius: 9999,
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
      background: "var(--color-bg-card)",
      borderRadius: "var(--radius-lg)",
      border: "1px solid var(--color-border)",
      overflow: "hidden",
      marginBottom: 16,
    }}>
      {rows.map(([from, to], i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          padding: "14px 16px",
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
      color: "var(--label-3)", textTransform: "uppercase",
      marginBottom: 8,
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
          {checked && <CheckMark />}
        </div>
      </div>
    </div>
  );
}

// ─── Composant principal ───────────────────────────────────────────────────

export default function StepUPMBranchement({ state, setState }) {
  const isTri = state.typeInstallation === "tri";
  const subStep = state.upmBranchementSubStep ?? 0;
  const [avecRS485, setAvecRS485] = useState(false);

  const checks = state.etapesCochees?.upmBranch || [];

  const toggle = (idx) => {
    setState(prev => {
      const arr = [...(prev.etapesCochees?.upmBranch || [])];
      arr[idx] = !arr[idx];

      const done = [...(prev.upmBranchSubStepDone || [false, false, false])];
      done[0] = !!arr[0];
      done[1] = !!arr[1];
      done[2] = !!arr[2] && !!arr[3];

      return {
        ...prev,
        etapesCochees: { ...prev.etapesCochees, upmBranch: arr },
        upmBranchSubStepDone: done,
      };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Raccordement du coffret Robin Link</h1>
        <StepperDots current={subStep} total={3} />
      </div>

      {/* ── Sous-écran 0 : Câblage transformateur ── */}
      {subStep === 0 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px" }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 4 }}>
                Câblage du transformateur
              </p>
              <p style={{ fontSize: 15, color: "var(--label-2)", marginBottom: 20 }}>
                Connectez le transformateur à l'UCG et au W-Modbus
              </p>

              <SubLabel label="Transformateur 230V/12V → UCG" />
              <ConnGroup rows={[
                ["Neutre (XEN)", "Borne N"],
                ["Phase (XEN)",  "Borne L"],
              ]} />

              <SubLabel label="Transformateur → W-Modbus" />
              <ConnGroup rows={[
                ["V+", "VCC"],
                ["V−", "GND"],
              ]} />
            </div>
          </div>

          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow
                checked={!!checks[0]}
                onToggle={() => toggle(0)}
                label="Transformateur câblé (UCG + W-Modbus)"
              />
            </div>
          </div>
        </>
      )}

      {/* ── Sous-écran 1 : Liaison RS485 ── */}
      {subStep === 1 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px" }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 16 }}>
                Liaison RS485
              </p>

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
                  ? "Reliez directement le W-Modbus au bornier RS485 de la MG3"
                  : "Raccordez au dernier compteur RS485 de la chaîne"}
              </p>

              <ConnGroup rows={!avecRS485
                ? [["RS485-A", "A"], ["RS485-B", "B"]]
                : [["A", "A"], ["B", "B"]]
              } />
            </div>
          </div>

          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow
                checked={!!checks[1]}
                onToggle={() => toggle(1)}
                label="Liaison RS485 raccordée"
              />
            </div>
          </div>
        </>
      )}

      {/* ── Sous-écran 2 : Pinces + antennes ── */}
      {subStep === 2 && (
        <>
          <div className="step-page-section">
            <div style={{ padding: "0 16px" }}>
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 12 }}>
                Pinces et antennes
              </p>

              <div style={{
                background: "var(--color-warning-light)", borderLeft: "3px solid var(--color-warning)",
                borderRadius: 8, padding: "12px 14px", marginBottom: 20,
                color: "var(--color-warning-dark)",
              }}>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>
                  ⚠️ La flèche sur chaque pince doit pointer vers la source d'énergie.
                </p>
              </div>

              {!isTri ? (
                <>
                  <SubLabel label="SDM-120CT — 1 pince" />
                  <ConnGroup rows={[
                    ["Fil blanc", "Borne 1"],
                    ["Fil noir",  "Borne 2"],
                  ]} />
                </>
              ) : (
                <>
                  <SubLabel label="MG3C01RM — 3 pinces" />
                  <ConnGroup rows={[
                    ["Pince 1  S1 (blanc)", "Borne 1"],
                    ["Pince 1  S2 (noir)",  "S2"],
                    ["Pince 2  S1 (blanc)", "Borne 2"],
                    ["Pince 2  S2 (noir)",  "S2"],
                    ["Pince 3  S1 (blanc)", "Borne 3"],
                    ["Pince 3  S2 (noir)",  "S2"],
                  ]} />
                </>
              )}

              <div style={{
                background: "var(--fill-1)", borderRadius: 12,
                padding: "14px 16px",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>📡</span>
                <p style={{ fontSize: 14, color: "var(--label-2)", lineHeight: 1.6 }}>
                  Les deux antennes doivent être installées à l'extérieur avec visibilité directe.
                  Portée max. 400m — rallonges de 5m possibles, 15m max par antenne.
                </p>
              </div>
            </div>
          </div>

          <div className="step-page-section">
            <div className="list-group" style={{ margin: "0 16px" }}>
              <CheckRow
                checked={!!checks[2]}
                onToggle={() => toggle(2)}
                label="Pinces raccordées et orientées flèche vers la source"
              />
              <CheckRow
                checked={!!checks[3]}
                onToggle={() => toggle(3)}
                label="Antennes installées à l'extérieur"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
