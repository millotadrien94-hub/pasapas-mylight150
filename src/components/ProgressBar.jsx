const STEP_LABELS = [
  null,                    // 0  — home, pas de barre
  "Équipements",           // 1
  "Coffret",               // 2
  "Type d'installation",   // 3
  "Compteurs",             // 4
  "UPM — Compatibilité",   // 5  optionnel
  "UPM — Raccordement",    // 6  optionnel
  "UPM — Vérification",    // 7  optionnel
  "UPG — Compatibilité",   // 8  optionnel
  "UPG — Matériel",        // 9  optionnel
  "UPG — Raccordement",    // 10 optionnel
  "UPG — Vérification",    // 11 optionnel
  "Schéma de principe",    // 12
  "CT1 — Consommation",    // 13
  "CT2 — Chauffe-eau",     // 14
  "CT3 — Production",      // 15 optionnel
  "Compteur Modbus RS485", // 16 optionnel
  "Borne de recharge",     // 17 optionnel
  "Connexion internet",    // 18
  "Mise sous tension",     // 19
  "Terminé",               // 20
];

const OPTIONAL_STEPS = new Set([5, 6, 7, 8, 9, 10, 11, 15, 16, 17]);

function getVisible(appState) {
  const eq      = appState?.equipements || [];
  const compteurs = appState?.compteursSupplementaires || [];
  const hasUPM  = compteurs.includes("UPM");
  const hasUPG  = compteurs.includes("UPG");
  return STEP_LABELS.map((_, i) => {
    if (i === 5  && !hasUPM)               return false;
    if (i === 6  && !hasUPM)               return false;
    if (i === 7  && !hasUPM)               return false;
    if (i === 8  && !hasUPG)               return false;
    if (i === 9  && !hasUPG)               return false;
    if (i === 10 && !hasUPG)               return false;
    if (i === 11 && !hasUPG)               return false;
    if (i === 15 && !eq.includes("CE"))    return false;
    if (i === 16 && !appState?.hasModbus)  return false;
    if (i === 17 && !eq.includes("BdR"))   return false;
    return true;
  });
}

export default function ProgressBar({ currentStep, appState }) {
  if (currentStep === 0) return null;

  const visible   = getVisible(appState);
  const visibles  = visible.map((v, i) => v ? i : null).filter(i => i !== null && i > 0);
  const position  = visibles.indexOf(currentStep);
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
