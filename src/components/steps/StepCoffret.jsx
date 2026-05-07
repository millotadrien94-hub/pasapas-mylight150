import coffretImg from "../../assets/coffret.png";
import mg3Img from "../../assets/smart-master-mg3.jpg";
import CheckMark from "../CheckMark";

const COFFRETS = [
  {
    id: "X",
    name: "Robin Plus (Ex : Gamme X)",
    tags: ["Chauffe-eau", "Borne de recharge"],
    equipementsInclus: ["CT_GENERAL", "CT_SOLAIRE"],
    img: coffretImg,
  },
  {
    id: "H",
    name: "Robin Max (Ex : Gamme H)",
    tags: ["Chauffe-eau", "Borne de recharge", "Borne de recharge"],
    equipementsInclus: ["CT_GENERAL", "CT_SOLAIRE"],
    img: coffretImg,
  },
  {
    id: "MG3",
    name: "Robin Core (Ex : MG3)",
    tags: [],
    equipementsInclus: [],
    img: mg3Img,
  },
];

export default function StepCoffret({ state, setState }) {
  const selected = state.coffretSelectionne;

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
          Sélectionnez votre modèle de coffret
        </p>
      </div>

      <div className="step-page-section">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 16px" }}>
          {COFFRETS.map(c => (
            <CoffretCard
              key={c.id}
              coffret={c}
              selected={selected === c.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        <button
          onClick={() => window.open("https://intercom-help.eu/mylight150com/fr/articles/497488-les-differentes-gammes-de-coffrets", "_blank")}
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
    </div>
  );
}

function CoffretCard({ coffret, selected, onSelect }) {
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
          {(() => {
            const match = coffret.name.match(/^([^(]+)\s*(\(.+\))?$/);
            return (
              <>
                <p className="sel-card-name">{match?.[1]?.trim() ?? coffret.name}</p>
                {match?.[2] && (
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", marginTop: 0 }}>
                    {match[2].replace(/^\(|\)$/g, "")}
                  </p>
                )}
              </>
            );
          })()}
          <div className="sel-card-tags">
            {coffret.tags.map((t, i) => (
              <span key={i} className="tag-pill accent">{t}</span>
            ))}
          </div>
        </div>
        <div className={`check-circle ${selected ? "checked" : ""}`}>
          {selected && <CheckMark />}
        </div>
    </div>
  );
}
