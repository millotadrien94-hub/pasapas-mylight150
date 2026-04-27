import coffretImg from "../../assets/coffret.png";
import mg3Img from "../../assets/smart-master-mg3.jpg";
import sdm120Img from "../../assets/SDM120.png";
import mg3c01rmImg from "../../assets/MG3C01RM.png";
import mc3d01rmImg from "../../assets/MC3D01RM.jpeg";
import mc1d01rmImg from "../../assets/MC1D01RM.jpeg";

const COFFRETS_PRINCIPAUX = [
  { id: "X", name: "Robin Plus", tags: ["CE", "Borne de recharge"], img: coffretImg },
  { id: "H", name: "Robin Max",  tags: ["PAC", "Borne de recharge"], img: coffretImg },
];

const AUTRES = [
  { id: "MG3",      name: "MG3 seul",                                    tags: ["En pièce détachée"],  img: mg3Img },
  { id: "MC1D01RM", name: "Compteurs traversants MC1D01RM (monophasé)",  tags: ["Monophasé"],          img: mc1d01rmImg },
  { id: "MC3D01RM", name: "Compteurs traversants MC3D01RM (triphasé)",   tags: ["Triphasé"],           img: mc3d01rmImg },
  { id: "SDM120",   name: "Compteur à pince SDM120 (monophasé)",         tags: ["Monophasé"],          img: sdm120Img },
  { id: "MG3C01RM", name: "Compteur à pince MG3C01RM (triphasé)",        tags: ["Triphasé"],           img: mg3c01rmImg },
];

const EQUIPEMENTS_ADDITIONNELS = [
  { id: "PAC",  name: "Ajouter une PAC" },
  { id: "CE",   name: "Ajouter un Chauffe-eau" },
  { id: "UPM",  name: "Ajouter un UPM" },
  { id: "UPG",  name: "Ajouter un UPG" },
];

export default function Step0({ state, setState }) {
  const selected = state.coffretSelectionne || [];

  const handleSelect = (coffret) => {
    setState(prev => {
      const current = prev.coffretSelectionne || [];
      const next = current.includes(coffret.id)
        ? current.filter(id => id !== coffret.id)
        : [...current, coffret.id];
      return { ...prev, coffretSelectionne: next };
    });
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Quels équipements ?</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Sélectionnez vos équipements pour adapter les instructions.
        </p>
      </div>

      <div className="step-page-section">
        <p className="list-header">Coffrets courants</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 16px" }}>
          {COFFRETS_PRINCIPAUX.map(c => (
            <CoffretCard key={c.id} coffret={c} selected={selected.includes(c.id)} onSelect={handleSelect} />
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "var(--separator)", margin: "8px 16px" }} />

      <div className="step-page-section">
        <p className="list-header">Autres</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 16px" }}>
          {AUTRES.map(eq => (
            <CoffretCard key={eq.id} coffret={eq} selected={selected.includes(eq.id)} onSelect={handleSelect} showPrefix={false} />
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "var(--separator)", margin: "8px 16px" }} />

      <div className="step-page-section">
        <p className="list-header">Ajouter un équipement sur une installation existante</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, padding: "0 16px" }}>
          {EQUIPEMENTS_ADDITIONNELS.map(eq => (
            <SmallButton key={eq.id} item={eq} selected={selected.includes(eq.id)} onSelect={handleSelect} />
          ))}
        </div>
      </div>

    </div>
  );
}

function SmallButton({ item, selected, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item)}
      style={{
        padding: "10px 16px",
        borderRadius: 12,
        border: selected ? "2px solid var(--accent)" : "1.5px solid var(--separator)",
        background: selected ? "var(--accent-bg)" : "var(--fill-1)",
        color: selected ? "var(--accent)" : "var(--label-1)",
        fontSize: 15,
        fontWeight: selected ? 600 : 400,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      {item.name}
    </button>
  );
}

function CoffretCard({ coffret, selected, onSelect, showPrefix = true }) {
  return (
    <div className={`sel-card ${selected ? "selected" : ""}`} onClick={() => onSelect(coffret)}>
      <div className="sel-card-thumb">
        {coffret.img
          ? <img src={coffret.img} alt={coffret.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: "var(--fill-2)", borderRadius: 8 }} />
        }
      </div>
      <div className="sel-card-body">
        <p className="sel-card-name">{showPrefix ? "Coffret " : ""}{coffret.name}</p>
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
