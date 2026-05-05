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
  "Compteur SDM120",       // 16 optionnel
  "Compteur MC1D01RM",     // 17 optionnel
  "Compteur MC3D01RM",     // 18 optionnel
  "Compteur MG3C01RM",     // 19 optionnel
  "Borne de recharge",     // 20 optionnel
  "Connexion internet",    // 21
  "Mise sous tension",     // 22
  "Terminé",               // 23
];

const OPTIONAL_STEPS = new Set([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

function getVisible(appState) {
  const eq      = appState?.equipements || [];
  const compteurs = appState?.compteursSupplementaires || [];
  const hasUPM  = compteurs.includes("UPM");
  const hasUPG  = compteurs.includes("UPG");
  const isMono  = appState?.typeInstallation === "mono";
  const isTri   = appState?.typeInstallation === "tri";
  return STEP_LABELS.map((_, i) => {
    if (i === 8  && !eq.includes("CE"))                              return false;
    if (i === 9  && !hasUPM)                                         return false;
    if (i === 10 && !hasUPM)                                         return false;
    if (i === 11 && !hasUPM)                                         return false;
    if (i === 12 && !hasUPG)                                         return false;
    if (i === 13 && !hasUPG)                                         return false;
    if (i === 14 && !hasUPG)                                         return false;
    if (i === 15 && !hasUPG)                                         return false;
    if (i === 16 && !(compteurs.includes("SDM120")   && isMono))    return false;
    if (i === 17 && !(compteurs.includes("MC1D01RM") && isMono))    return false;
    if (i === 18 && !(compteurs.includes("MC3D01RM") && isTri))     return false;
    if (i === 19 && !(compteurs.includes("MG3C01RM") && isTri))     return false;
    if (i === 20 && !eq.includes("BdR"))                             return false;
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
