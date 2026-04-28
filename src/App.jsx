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
import StepModbus from "./components/steps/StepModbus";
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
  UPM_COMPAT:   5,  // optionnel
  UPM_BRANCH:   6,  // optionnel
  UPM_VERIF:    7,  // optionnel
  UPG_COMPAT:   8,  // optionnel
  UPG_MATERIEL: 9,  // optionnel
  UPG_BRANCH:   10, // optionnel
  UPG_VERIF:    11, // optionnel
  FIXATION:     12,
  CT1:          13,
  CT2:          14,
  CE:           15, // optionnel
  MODBUS:       16, // optionnel, si RS485
  BDR:          17, // optionnel
  INTERNET:     18,
  TENSION:      19,
  FIN:          20,
  ADD_PLACEHOLDER: 21,
};

const STEPS = [
  StepHome,
  StepEquipements,
  StepCoffret,
  StepInstallationType,
  StepCompteurs,
  StepUPMCompatibilite,
  StepUPMBranchement,
  StepUPMVerification,
  StepUPGCompatibilite,
  StepUPGMateriel,
  StepUPGBranchement,
  StepUPGVerification,
  Step1,
  Step2,
  Step3,
  Step4,
  StepModbus,
  Step5,
  StepInternet,
  Step6,
  Step7,
  StepAddPlaceholder,
];

// Retourne les indices d'étapes visibles selon l'état
function getVisibleSteps(state) {
  const eq       = state.equipements || [];
  const compteurs = state.compteursSupplementaires || [];
  const hasCE    = eq.includes("CE");
  const hasBdR   = eq.includes("BdR");
  const hasUPM   = compteurs.includes("UPM");
  const hasUPG   = compteurs.includes("UPG");
  const hasModbus = !!state.hasModbus;
  return STEPS.map((_, i) => {
    if (i === IDX.UPM_COMPAT   && !hasUPM)    return false;
    if (i === IDX.UPM_BRANCH   && !hasUPM)    return false;
    if (i === IDX.UPM_VERIF    && !hasUPM)    return false;
    if (i === IDX.UPG_COMPAT   && !hasUPG)    return false;
    if (i === IDX.UPG_MATERIEL && !hasUPG)    return false;
    if (i === IDX.UPG_BRANCH   && !hasUPG)    return false;
    if (i === IDX.UPG_VERIF    && !hasUPG)    return false;
    if (i === IDX.CE           && !hasCE)     return false;
    if (i === IDX.MODBUS       && !hasModbus) return false;
    if (i === IDX.BDR          && !hasBdR)    return false;
    if (i === IDX.ADD_PLACEHOLDER)            return false;
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
    case IDX.UPG_VERIF:    return state.upGVerifSubStepDone?.[state.upGVerifSubStep ?? 0] === true;
    case IDX.FIXATION:     return allChecked("step1", 1);
    case IDX.CT1:          return allChecked("step2", 2);
    case IDX.CT2:          return allChecked("step3", 2);
    case IDX.CE:           return allChecked("step4", 2);
    case IDX.MODBUS:       return true;
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
    hasModbus: null,
  });

  const [animating, setAnimating]             = useState(false);
  const [direction, setDirection]             = useState(1);
  const [showModbusModal, setShowModbusModal] = useState(false);

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
    if (currentStep === IDX.UPG_VERIF) {
      const sub = appState.upGVerifSubStep ?? 0;
      if (sub < 1) {
        setAppState(prev => ({ ...prev, upGVerifSubStep: sub + 1 }));
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    if (currentStep === IDX.CE) {
      setShowModbusModal(true);
      return;
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
    if (currentStep === IDX.UPG_VERIF) {
      const sub = appState.upGVerifSubStep ?? 0;
      if (sub > 0) {
        setAppState(prev => ({ ...prev, upGVerifSubStep: sub - 1 }));
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }
    }
    navigate(getPrev(currentStep, appState));
  };

  const handleModbusAnswer = (hasModbus) => {
    setShowModbusModal(false);
    const newState = { ...appState, hasModbus };
    setAppState(newState);
    const visible = getVisibleSteps(newState);
    for (let i = IDX.CE + 1; i < STEPS.length; i++) {
      if (visible[i]) { navigate(i); return; }
    }
  };

  const StepComponent = STEPS[currentStep];

  const isLast = getNext(currentStep, appState) === currentStep;
  let nextLabel = isLast ? "Terminer" : undefined;
  if (currentStep === IDX.UPM_BRANCH && (appState.upmBranchementSubStep ?? 0) < 2) nextLabel = "Suivant";
  if (currentStep === IDX.UPG_BRANCH && (appState.upGBranchementSubStep ?? 0) < 2)  nextLabel = "Suivant";
  if (currentStep === IDX.UPG_VERIF  && (appState.upGVerifSubStep ?? 0) < 1)         nextLabel = "Suivant";

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "rgba(242,242,247,0.92)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "0.5px solid rgba(60,60,67,0.18)",
        padding: "14px 20px 12px",
        display: "flex", alignItems: "center", flexShrink: 0, gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: "#111827", display: "flex",
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
          <p style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.24px", color: "#111827", lineHeight: 1 }}>
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

      {currentStep > 0 && currentStep < STEPS.length - 1 && (
        <BottomNav
          onPrev={handlePrev}
          onNext={handleNext}
          canNext={canNext}
          isFirst={isFirst}
          nextLabel={nextLabel}
        />
      )}

      {/* Modale Modbus RS485 */}
      {showModbusModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            background: "#fff", borderRadius: 16, width: "calc(100% - 32px)", maxWidth: 618,
            padding: "24px 20px 20px",
            display: "flex", flexDirection: "column", gap: 16,
            boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.15)",
          }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: 18, color: "#111827", marginBottom: 8 }}>
                Compteur Modbus RS485
              </p>
              <p style={{ fontSize: 15, color: "rgba(60,60,67,0.6)", lineHeight: 1.5 }}>
                Est-ce que l'installation comporte un compteur Modbus RS485 ?
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => handleModbusAnswer(true)}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 10,
                  border: "1.5px solid #111827", background: "transparent",
                  color: "#111827", fontSize: 16, fontWeight: 600, cursor: "pointer",
                }}
              >Oui</button>
              <button
                onClick={() => handleModbusAnswer(false)}
                style={{
                  flex: 1, padding: "12px 0", borderRadius: 10,
                  border: "none", background: "#111827",
                  color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer",
                }}
              >Non</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
