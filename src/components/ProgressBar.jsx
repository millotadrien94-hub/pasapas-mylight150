// Étapes affichées dans la barre de progression (step index → label)
// L'index 0 (coffret) n'a pas de barre — on commence à 1
const STEP_LABELS = [
  null,                    // 0  — coffret, pas de barre
  "Type d'installation",   // 1
  "Équipements",           // 2
  "Schéma de principe",    // 3
  "CT1 — Consommation",    // 4
  "CT2 — Chauffe-eau",     // 5
  "CT3 — Production",      // 6  optionnel
  "Compteur Modbus RS485", // 7  optionnel
  "Borne de recharge",     // 8  optionnel
  "Connexion internet",    // 9
  "Mise sous tension",     // 10
  "Terminé",               // 11
];

const OPTIONAL_STEPS = new Set([6, 7, 8]);

// Calcule les étapes visibles selon les équipements sélectionnés
function getVisible(appState) {
  const eq = appState?.equipements || [];
  return STEP_LABELS.map((_, i) => {
    if (i === 6 && !eq.includes("CE"))    return false;
    if (i === 7 && !appState?.hasModbus)  return false;
    if (i === 8 && !eq.includes("BdR"))   return false;
    return true;
  });
}

export default function ProgressBar({ currentStep, appState }) {
  if (currentStep === 0) return null;

  const visible   = getVisible(appState);
  const visibles  = visible.map((v, i) => v ? i : null).filter(i => i !== null && i > 0);
  const position  = visibles.indexOf(currentStep); // 0-based parmi les visibles
  const total     = visibles.length;
  const displayNum= position + 1;
  const percent   = total > 1 ? Math.round((position / (total - 1)) * 100) : 100;

  const label    = STEP_LABELS[currentStep] || "";
  const optional = OPTIONAL_STEPS.has(currentStep);

  return (
    <div className="nav-bar">
      <div className="nav-bar-inner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span className="progress-step-name">{label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {optional && <span className="badge-optional">Optionnel</span>}
            <span className="progress-label">{displayNum} / {total}</span>
          </div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}
