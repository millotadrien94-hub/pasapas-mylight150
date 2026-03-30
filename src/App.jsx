import { useState, useRef } from "react";
import "./index.css";
import ProgressBar from "./components/ProgressBar";
import BottomNav from "./components/BottomNav";
import Step0 from "./components/steps/Step0";
import StepInstallationType from "./components/steps/StepInstallationType";
import StepEquipements from "./components/steps/StepEquipements";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import Step5 from "./components/steps/Step5";
import StepInternet from "./components/steps/StepInternet";
import Step6 from "./components/steps/Step6";
import Step7 from "./components/steps/Step7";

// Index constants pour lisibilité
const IDX = {
  COFFRET:    0,
  TYPE_INST:  1,
  EQUIPEMENTS:2,
  FIXATION:   3,
  CT1:        4,
  CT2:        5,
  CE:         6,   // optionnel
  BDR:        7,   // optionnel
  INTERNET:   8,
  TENSION:    9,
  FIN:        10,
};

const STEPS = [
  Step0,
  StepInstallationType,
  StepEquipements,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  StepInternet,
  Step6,
  Step7,
];

// Retourne les indices d'étapes visibles selon l'état
function getVisibleSteps(state) {
  const hasCE  = (state.equipements || []).includes("CE");
  const hasBdR = (state.equipements || []).includes("BdR");
  return STEPS.map((_, i) => {
    if (i === IDX.CE  && !hasCE)  return false;
    if (i === IDX.BDR && !hasBdR) return false;
    return true;
  });
}

function isStepComplete(stepIdx, state) {
  const allChecked = (key, n) => {
    const c = state.etapesCochees?.[key] || [];
    return c.length >= n && c.slice(0, n).every(Boolean);
  };
  switch (stepIdx) {
    case IDX.COFFRET:     return !!state.coffretSelectionne;
    case IDX.TYPE_INST:   return !!state.typeInstallation;
    case IDX.EQUIPEMENTS: return true; // toujours passable
    case IDX.FIXATION:    return allChecked("step1", 2);
    case IDX.CT1:         return allChecked("step2", 2);
    case IDX.CT2:         return allChecked("step3", 2);
    case IDX.CE:          return allChecked("step4", 2);
    case IDX.BDR:         return allChecked("step5", 3);
    case IDX.INTERNET:    return true;
    case IDX.TENSION:     return allChecked("step6", 1);
    case IDX.FIN:         return true;
    default:              return false;
  }
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [appState, setAppState] = useState({
    coffretSelectionne: null,
    coffretNom: null,
    typeInstallation: null,
    sensorType: "ct",
    ceType: "electrique",
    connexionType: "modem",
    equipements: [],
    etapesCochees: {},
  });

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection]  = useState(1);

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  };

  const StepComponent = STEPS[currentStep];

  const isLast = getNext(currentStep, appState) === currentStep;
  const nextLabel = currentStep === IDX.COFFRET
    ? "Commencer →"
    : isLast ? "Terminer" : undefined;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "rgba(242,242,247,0.92)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "0.5px solid rgba(60,60,67,0.18)",
        padding: "14px 20px 12px",
        display: "flex",
        alignItems: "center",
        flexShrink: 0,
        gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: "#111827", display: "flex",
          alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="12" cy="12" r="5" fill="white" />
            <g stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="2"    x2="12" y2="4" />
              <line x1="12" y1="20"   x2="12" y2="22" />
              <line x1="2"  y1="12"   x2="4"  y2="12" />
              <line x1="20" y1="12"   x2="22" y2="12" />
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

      <ProgressBar currentStep={currentStep} appState={appState} />

      {/* Step content */}
      <div style={{
        flex: 1,
        opacity: animating ? 0 : 1,
        transform: animating ? `translateX(${direction * -16}px)` : "translateX(0)",
        transition: "opacity 0.18s ease, transform 0.18s ease",
      }}>
        <StepComponent state={appState} setState={setAppState} />
      </div>

      {currentStep < STEPS.length - 1 && (
        <BottomNav
          onPrev={() => navigate(getPrev(currentStep, appState))}
          onNext={() => navigate(getNext(currentStep, appState))}
          canNext={canNext}
          isFirst={isFirst}
          nextLabel={nextLabel}
        />
      )}
    </div>
  );
}
