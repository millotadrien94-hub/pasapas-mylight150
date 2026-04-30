const STEP_LABELS = [
  null,                    // 0  — home, pas de barre
  "Équipements",           // 1
  "Coffret",               // 2
  "Type d'installation",   // 3
  "Compteurs",             // 4
  "Schéma de principe",    // 5
  "CT1 — Consommation",    // 6
  "CT2 — Chauffe-eau",     // 7
  "CT3 — Production",      // 8  optionnel
  "UPM — Compatibilité",   // 9  optionnel
  "UPM — Raccordement",    // 10 optionnel
  "UPM — Vérification",    // 11 optionnel
  "UPG — Compatibilité",   // 12 optionnel
  "UPG — Matériel",        // 13 optionnel
  "UPG — Raccordement",    // 14 optionnel
  "UPG — Vérification",    // 15 optionnel
  "Compteur Modbus RS485", // 16 optionnel
  "Borne de recharge",     // 17 optionnel
  "Connexion internet",    // 18
  "Mise sous tension",     // 19
  "Terminé",               // 20
];

const OPTIONAL_STEPS = new Set([8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);

function getVisible(appState) {
  const eq      = appState?.equipements || [];
  const compteurs = appState?.compteursSupplementaires || [];
  const hasUPM  = compteurs.includes("UPM");
  const hasUPG  = compteurs.includes("UPG");
  return STEP_LABELS.map((_, i) => {
    if (i === 8  && !eq.includes("CE"))    return false;
    if (i === 9  && !hasUPM)               return false;
    if (i === 10 && !hasUPM)               return false;
    if (i === 11 && !hasUPM)               return false;
    if (i === 12 && !hasUPG)               return false;
    if (i === 13 && !hasUPG)               return false;
    if (i === 14 && !hasUPG)               return false;
    if (i === 15 && !hasUPG)               return false;
    if (i === 16 && !(appState?.compteursSupplementaires || []).includes("SDM120")) return false;
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
