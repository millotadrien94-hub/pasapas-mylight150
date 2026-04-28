const LABELS = {
  PAC:  "PAC",
  CE:   "Chauffe-eau",
  BdR:  "Borne de recharge",
  UPM:  "UPM",
  UPG:  "UPG",
};

export default function StepAddPlaceholder({ state, onBack }) {
  const label = LABELS[state.equipementAjoute] || state.equipementAjoute || "équipement";

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Ajout {label}</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Coming soon
        </p>
      </div>

      <div style={{ padding: "0 16px" }}>
        <button className="btn-ios btn-gray btn-full" onClick={onBack}>
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
