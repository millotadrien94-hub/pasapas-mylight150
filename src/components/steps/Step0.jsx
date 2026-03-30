import coffretImg from "../../assets/coffret.png";

const COFFRETS_PRINCIPAUX = [
  { id: "X",   name: "Gamme X",     tags: ["CE", "Borne de recharge"] },
  { id: "H",   name: "Gamme H",     tags: ["PAC", "Borne de recharge"] },
];

export default function Step0({ state, setState }) {
  const handleSelect = (coffret) => {
    setState(prev => ({
      ...prev,
      coffretSelectionne: coffret.id,
      coffretNom: coffret.name,
      equipements: [],
    }));
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Quel coffret ?</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Sélectionnez votre gamme pour adapter les instructions.
        </p>
      </div>

      <div className="step-page-section">
        <p className="list-header">Coffrets courants</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 16px" }}>
          {COFFRETS_PRINCIPAUX.map(c => (
            <CoffretCard key={c.id} coffret={c} selected={state.coffretSelectionne === c.id} onSelect={handleSelect} />
          ))}
        </div>
      </div>

    </div>
  );
}

function CoffretCard({ coffret, selected, onSelect }) {
  return (
    <div className={`sel-card ${selected ? "selected" : ""}`} onClick={() => onSelect(coffret)}>
      <div className="sel-card-thumb">
        <img src={coffretImg} alt="Coffret mylight150" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div className="sel-card-body">
        <p className="sel-card-name">Coffret {coffret.name}</p>
        <div className="sel-card-tags">
          {coffret.tags.map(t => (
            <span key={t} className="tag-pill accent">{t}</span>
          ))}
        </div>
      </div>
      {selected && (
        <div style={{
          width: 26, height: 26, borderRadius: "50%",
          background: "var(--accent)", color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700, flexShrink: 0
        }}>✓</div>
      )}
    </div>
  );
}
