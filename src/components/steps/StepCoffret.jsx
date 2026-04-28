import { useState } from "react";
import coffretImg from "../../assets/coffret.png";
import mg3Img from "../../assets/smart-master-mg3.jpg";

const COFFRETS = [
  {
    id: "X",
    name: "Robin Plus",
    tags: ["CT général", "CT solaire"],
    equipementsInclus: ["CT_GENERAL", "CT_SOLAIRE"],
    img: coffretImg,
  },
  {
    id: "H",
    name: "Robin Max",
    tags: ["CT général", "CT solaire"],
    equipementsInclus: ["CT_GENERAL", "CT_SOLAIRE"],
    img: coffretImg,
  },
  {
    id: "MG3",
    name: "MG3 seule",
    tags: ["Mono & Tri"],
    equipementsInclus: [],
    img: mg3Img,
  },
];

function getRecommended(equipements) {
  if (equipements.includes("CE"))  return "X";
  if (equipements.includes("PAC")) return "H";
  return "MG3";
}

export default function StepCoffret({ state, setState }) {
  const selected = state.coffretSelectionne;
  const recommended = getRecommended(state.equipements || []);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (coffret) => {
    setState(prev => ({
      ...prev,
      coffretSelectionne: coffret.id,
      equipementsInclus: coffret.equipementsInclus,
    }));
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Quel coffret avez-vous ?</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Sélectionnez le coffret que vous avez reçu ou acheté
        </p>
      </div>

      <div className="step-page-section">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 16px" }}>
          {COFFRETS.map(c => (
            <CoffretCard
              key={c.id}
              coffret={c}
              selected={selected === c.id}
              recommended={recommended === c.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "block",
            margin: "20px auto 4px",
            background: "none",
            border: "none",
            color: "var(--accent)",
            fontSize: 15,
            cursor: "pointer",
            padding: "4px 0",
          }}
        >
          Je ne sais pas quel coffret j'ai →
        </button>
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: "20px 20px 0 0",
              width: "100%", maxWidth: 618,
              padding: "24px 20px 40px",
              display: "flex", flexDirection: "column", gap: 16,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>
                Identifier mon coffret
              </p>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "var(--fill-3)", border: "none", borderRadius: "50%",
                  width: 30, height: 30, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: "var(--label-2)",
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              background: "var(--fill-1)", borderRadius: 12,
              padding: "32px 16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              minHeight: 180,
            }}>
              <p style={{ color: "var(--label-3)", fontSize: 15, textAlign: "center" }}>
                Visuel comparatif des coffrets — coming soon
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CoffretCard({ coffret, selected, recommended, onSelect }) {
  return (
    <div
      className={`sel-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(coffret)}
    >
        <div className="sel-card-thumb">
          <img
            src={coffret.img}
            alt={coffret.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="sel-card-body">
          <p className="sel-card-name">{coffret.name}</p>
          <div className="sel-card-tags">
            {recommended && (
              <span style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: 99,
                background: "#dcfce7",
                color: "#16a34a",
                fontSize: 12,
                fontWeight: 600,
              }}>Recommandé</span>
            )}
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
            fontSize: 14, fontWeight: 700, flexShrink: 0,
          }}>✓</div>
        )}
    </div>
  );
}
