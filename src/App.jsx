import { useState } from "react";
import "./index.css";
import ProgressBar from "./components/ProgressBar";
import BottomNav from "./components/BottomNav";
import StepHome from "./components/steps/StepHome";
import StepAddPlaceholder from "./components/steps/StepAddPlaceholder";
import StepEquipements from "./components/steps/StepEquipements";
import StepCoffret from "./components/steps/StepCoffret";
import StepInstallationType from "./components/steps/StepInstallationType";
import StepCompteurs from "./components/steps/StepCompteurs";
import StepUPMCompatibilite from "./components/steps/StepUPMCompatibilite";
import StepUPMBranchement from "./components/steps/StepUPMBranchement";
import StepUPMVerification from "./components/steps/StepUPMVerification";
import StepUPGCompatibilite from "./components/steps/StepUPGCompatibilite";
import StepUPGMateriel from "./components/steps/StepUPGMateriel";
import StepUPGBranchement from "./components/steps/StepUPGBranchement";
import StepUPGVerification from "./components/steps/StepUPGVerification";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import StepSDM120 from "./components/steps/StepSDM120";
import StepMC1D01RM from "./components/steps/StepMC1D01RM";
import StepMC3D01RM from "./components/steps/StepMC3D01RM";
import StepMG3C01RM from "./components/steps/StepMG3C01RM";
import Step5 from "./components/steps/Step5";
import StepInternet from "./components/steps/StepInternet";
import Step6 from "./components/steps/Step6";
import Step7 from "./components/steps/Step7";

// Index constants pour lisibilité
const IDX = {
  HOME:         0,
  EQUIPEMENTS:  1,
  COFFRET:      2,
  TYPE_INST:    3,
  COMPTEURS:    4,
  FIXATION:     5,
  CT1:          6,
  CT2:          7,
  CE:           8,  // optionnel (CT3 Production)
  UPM_COMPAT:   9,  // optionnel
  UPM_BRANCH:   10, // optionnel
  UPM_VERIF:    11, // optionnel
  UPG_COMPAT:   12, // optionnel
  UPG_MATERIEL: 13, // optionnel
  UPG_BRANCH:   14, // optionnel
  UPG_VERIF:    15, // optionnel
  SDM120:       16, // optionnel: mono + SDM120
  MC1D01RM:     17, // optionnel: mono + MC1D01RM
  MC3D01RM:     18, // optionnel: tri + MC3D01RM
  MG3C01RM:     19, // optionnel: tri + MG3C01RM
  BDR:          20, // optionnel
  INTERNET:     21,
  TENSION:      22,
  FIN:          23,
  ADD_PLACEHOLDER: 24,
};

const STEPS = [
  StepHome,           // 0
  StepEquipements,    // 1
  StepCoffret,        // 2
  StepInstallationType, // 3
  StepCompteurs,      // 4
  Step1,              // 5 FIXATION
  Step2,              // 6 CT1
  Step3,              // 7 CT2
  Step4,              // 8 CE (CT3 Production)
  StepUPMCompatibilite, // 9
  StepUPMBranchement, // 10
  StepUPMVerification, // 11
  StepUPGCompatibilite, // 12
  StepUPGMateriel,    // 13
  StepUPGBranchement, // 14
  StepUPGVerification, // 15
  StepSDM120,         // 16
  StepMC1D01RM,       // 17
  StepMC3D01RM,       // 18
  StepMG3C01RM,       // 19
  Step5,              // 20 BDR
  StepInternet,       // 21
  Step6,              // 22 TENSION
  Step7,              // 23 FIN
  StepAddPlaceholder, // 24
];

// Retourne les indices d'étapes visibles selon l'état
function getVisibleSteps(state) {
  const eq       = state.equipements || [];
  const compteurs = state.compteursSupplementaires || [];
  const hasCE    = eq.includes("CE");
  const hasBdR   = eq.includes("BdR");
  const hasUPM   = compteurs.includes("UPM");
  const hasUPG   = compteurs.includes("UPG");
  const isMono   = state.typeInstallation === "mono";
  const isTri    = state.typeInstallation === "tri";
  const hasSDM120   = compteurs.includes("SDM120");
  const hasMC1D01RM = compteurs.includes("MC1D01RM");
  const hasMC3D01RM = compteurs.includes("MC3D01RM") && isTri;
  const hasMG3C01RM = compteurs.includes("MG3C01RM") && isTri;
  return STEPS.map((_, i) => {
    if (i === IDX.UPM_COMPAT   && !hasUPM)      return false;
    if (i === IDX.UPM_BRANCH   && !hasUPM)      return false;
    if (i === IDX.UPM_VERIF    && !hasUPM)      return false;
    if (i === IDX.UPG_COMPAT   && !hasUPG)      return false;
    if (i === IDX.UPG_MATERIEL && !hasUPG)      return false;
    if (i === IDX.UPG_BRANCH   && !hasUPG)      return false;
    if (i === IDX.UPG_VERIF    && !hasUPG)      return false;
    if (i === IDX.CE           && !hasCE)       return false;
    if (i === IDX.SDM120       && !hasSDM120)   return false;
    if (i === IDX.MC1D01RM     && !hasMC1D01RM) return false;
    if (i === IDX.MC3D01RM     && !hasMC3D01RM) return false;
    if (i === IDX.MG3C01RM     && !hasMG3C01RM) return false;
    if (i === IDX.BDR          && !hasBdR)      return false;
    if (i === IDX.ADD_PLACEHOLDER)              return false;
    return true;
  });
}

function isStepComplete(stepIdx, state) {
  const allChecked = (key, n) => {
    const c = state.etapesCochees?.[key] || [];
    return c.length >= n && c.slice(0, n).every(Boolean);
  };
  switch (stepIdx) {
    case IDX.HOME:         return true;
    case IDX.EQUIPEMENTS:  return (state.equipements || []).length > 0;
    case IDX.COFFRET:      return !!state.coffretSelectionne;
    case IDX.TYPE_INST:    return !!state.typeInstallation;
    case IDX.COMPTEURS:    return true;
    case IDX.UPM_COMPAT:   return allChecked("upmCompat", 1);
    case IDX.UPM_BRANCH:   return state.upmBranchSubStepDone?.[state.upmBranchementSubStep ?? 0] === true;
    case IDX.UPM_VERIF:    return allChecked("upmVerif", 2);
    case IDX.UPG_COMPAT:   return allChecked("upgCompat", 1);
    case IDX.UPG_MATERIEL: return allChecked("upgMateriel", 2);
    case IDX.UPG_BRANCH:   return state.upGBranchSubStepDone?.[state.upGBranchementSubStep ?? 0] === true;
    case IDX.UPG_VERIF:    return allChecked("upgVerif", 3);
    case IDX.FIXATION:     return true;
    case IDX.CT1:          return allChecked("step2", 2);
    case IDX.CT2:          return true;
    case IDX.CE:           return allChecked("step4", 2);
    case IDX.SDM120:       return true;
    case IDX.MC1D01RM:     return true;
    case IDX.MC3D01RM:     return true;
    case IDX.MG3C01RM:     return true;
    case IDX.BDR:          return allChecked("step5", 3);
    case IDX.INTERNET:     return true;
    case IDX.TENSION:      return allChecked("step6", 1);
    case IDX.FIN:          return true;
    default:               return false;
  }
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appState, setAppState] = useState({
    mode: null,
    equipementAjoute: null,
    typeInstallation: null,
    coffretSelectionne: null,
    equipementsInclus: [],
    compteursSupplementaires: [],
    upmBranchementSubStep: 0,
    upmBranchSubStepDone: [false, false, false],
    upGBranchementSubStep: 0,
    upGBranchSubStepDone: [false, false, false],
    upGVerifSubStep: 0,
    upGVerifSubStepDone: [false, false],
    sensorType: "ct",
    ceType: "electrique",
    connexionType: "modem",
    equipements: [],
    etapesCochees: {},
  });

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);

  const canNext = isStepComplete(currentStep, appState);
  const isFirst = currentStep === 0;

  const getNext = (from, state) => {
    const visible = getVisibleSteps(state);
    for (let i = from + 1; i < STEPS.length; i++) {
      if (visible[i]) return i;
    }
    return from;
  };

  const getPrev = (from, state) => {
    const visible = getVisibleSteps(state);
    for (let i = from - 1; i >= 0; i--) {
      if (visible[i]) return i;
    }
    return from;
  };

  const navigate = (newStep) => {
    if (animating) return;
    setDirection(newStep > currentStep ? 1 : -1);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 200);
  };

  const handleNext = () => {
    if (currentStep === IDX.UPM_BRANCH) {
      const sub = appState.upmBranchementSubStep ?? 0;
      if (sub < 2) {
        setAppState(prev => ({ ...prev, upmBranchementSubStep: sub + 1 }));
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    if (currentStep === IDX.UPG_BRANCH) {
      const sub = appState.upGBranchementSubStep ?? 0;
      if (sub < 2) {
        setAppState(prev => ({ ...prev, upGBranchementSubStep: sub + 1 }));
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    navigate(getNext(currentStep, appState));
  };

  const handlePrev = () => {
    if (currentStep === IDX.UPM_BRANCH) {
      const sub = appState.upmBranchementSubStep ?? 0;
      if (sub > 0) {
        setAppState(prev => ({ ...prev, upmBranchementSubStep: sub - 1 }));
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    if (currentStep === IDX.UPG_BRANCH) {
      const sub = appState.upGBranchementSubStep ?? 0;
      if (sub > 0) {
        setAppState(prev => ({ ...prev, upGBranchementSubStep: sub - 1 }));
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    navigate(getPrev(currentStep, appState));
  };

  const StepComponent = STEPS[currentStep];

  const isLast = getNext(currentStep, appState) === currentStep;
  let nextLabel = isLast ? "Terminer" : undefined;
  if (currentStep === IDX.UPM_BRANCH && (appState.upmBranchementSubStep ?? 0) < 2) nextLabel = "Suivant";
  if (currentStep === IDX.UPG_BRANCH && (appState.upGBranchementSubStep ?? 0) < 2)  nextLabel = "Suivant";


  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: '#FFFFFF',
        borderBottom: '1px solid var(--color-border)',
        height: 56,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: "var(--color-primary)", display: "flex",
          alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="12" cy="12" r="5" fill="white" />
            <g stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="2"  x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2"  y1="12" x2="4"  y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93"   x2="6.34"  y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07"  x2="6.34"  y2="17.66" />
              <line x1="17.66" y1="6.34"  x2="19.07" y2="4.93" />
            </g>
          </svg>
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1 }}>
            mylight150
          </p>
          <p style={{ fontSize: 11, color: "var(--label-2)", marginTop: 2 }}>
            Guide de mise en service
          </p>
        </div>
      </div>

      {currentStep !== IDX.ADD_PLACEHOLDER && (
        <ProgressBar currentStep={currentStep} appState={appState} />
      )}

      {/* Step content */}
      <div style={{
        flex: 1,
        opacity: animating ? 0 : 1,
        transform: animating ? `translateX(${direction * -16}px)` : "translateX(0)",
        transition: "opacity 0.18s ease, transform 0.18s ease",
      }}>
        <StepComponent
          state={appState}
          setState={setAppState}
          onNext={() => navigate(getNext(currentStep, appState))}
          onAjout={() => navigate(IDX.ADD_PLACEHOLDER)}
          onBack={() => navigate(IDX.HOME)}
        />
      </div>

      {currentStep > 0 && currentStep < STEPS.length - 1 && currentStep !== IDX.FIN && (
        <BottomNav
          onPrev={handlePrev}
          onNext={handleNext}
          canNext={canNext}
          isFirst={isFirst}
          nextLabel={nextLabel}
        />
      )}

    </div>
  );
}
