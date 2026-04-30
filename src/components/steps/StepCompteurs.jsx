import CheckMark from "../CheckMark";
import mc1d01rmImg from "../../assets/MC1D01RM.jpeg";
import mc3d01rmImg from "../../assets/MC3D01RM.jpeg";
import sdm120Img from "../../assets/SDM120.png";
import mg3c01rmImg from "../../assets/MG3C01RM.png";
import upmImg from "../../assets/UPM.jpg";

const TRAVERSANTS = [
  { id: "MC1D01RM", name: "MC1D01RM", desc: "Mesure un circuit supplémentaire", tag: "Monophasé", img: mc1d01rmImg },
  { id: "MC3D01RM", name: "MC3D01RM", desc: "Mesure un circuit supplémentaire", tag: "Triphasé",  img: mc3d01rmImg },
];

const PINCES = [
  { id: "SDM120",   name: "SDM120",   desc: "Mesure un circuit supplémentaire", tag: "Monophasé", img: sdm120Img,   imgFit: "contain" },
  { id: "MG3C01RM", name: "MG3C01RM", desc: "Mesure un circuit supplémentaire", tag: "Triphasé",  img: mg3c01rmImg },
];

const MODULES = [
  { id: "UPM", name: "Robin Link (UPM)",   desc: "Communication sans fil W-Modbus jusqu'à 400 mètres", img: upmImg },
  { id: "UPG", name: "Robin Heat (UPG H)", desc: "Pilotage via SG-Ready",                              img: upmImg },
];

export default function StepCompteurs({ state, setState }) {
  const selected = state.compteursSupplementaires || [];
  const isTri = state.typeInstallation === "tri";
  const eq = state.equipements || [];
  const hideMono = isTri && (eq.includes("PAC") || eq.includes("BdR"));

  const traversants = TRAVERSANTS.filter(c => {
    if (c.id === "MC3D01RM") return isTri;
    if (c.id === "MC1D01RM") return !hideMono;
    return true;
  });
  const pinces = PINCES.filter(c => {
    if (c.id === "MG3C01RM") return isTri;
    if (c.id === "SDM120")   return !hideMono;
    return true;
  });

  const toggle = (id) => {
    const next = selected.includes(id)
      ? selected.filter(c => c !== id)
      : [...selected, id];
    setState(prev => ({ ...prev, compteursSupplementaires: next }));
  };

  const selectAucun = () => {
    setState(prev => ({ ...prev, compteursSupplementaires: [] }));
  };

  const aucunSelected = selected.length === 0;

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Compteurs supplémentaires</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Avez-vous des compteurs à ajouter au coffret ?
        </p>
      </div>

      <div className="step-page-section">
        <div className="list-group" style={{ margin: "0 16px" }}>
          <div
            className="list-row"
            style={{ minHeight: 56, cursor: "pointer" }}
            onClick={selectAucun}
          >
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: aucunSelected ? "var(--color-secondary)" : "var(--color-bg-subtle)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "background 0.2s",
            }}>
              <span style={{ fontSize: 18, color: aucunSelected ? "white" : "var(--label-2)" }}>—</span>
            </div>
            <div className="list-row-content">
              <p className="list-row-title" style={{ fontWeight: 500 }}>Aucun compteur supplémentaire</p>
            </div>
            <div className="list-row-trailing">
              <div className={`check-circle ${aucunSelected ? "checked" : ""}`}>
                {aucunSelected && <CheckMark />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section
        title="Compteurs traversants"
        desc="Le câble électrique passe à l'intérieur"
        items={traversants}
        selected={selected}
        onToggle={toggle}
      />

      <Section
        title="Compteurs à pinces"
        desc="Se clippe autour du câble existant"
        items={pinces}
        selected={selected}
        onToggle={toggle}
      />

      <Section
        title="Modules complémentaires"
        desc={null}
        items={MODULES}
        selected={selected}
        onToggle={toggle}
      />
    </div>
  );
}

function Section({ title, desc, items, selected, onToggle }) {
  return (
    <div className="step-page-section">
      <div style={{ padding: "0 16px 6px" }}>
        <p className="list-header" style={{ marginBottom: 2 }}>{title}</p>
        {desc && <p style={{ fontSize: 13, color: "var(--label-3)" }}>{desc}</p>}
      </div>
      <div className="list-group" style={{ margin: "0 16px" }}>
        {items.map(item => {
          const isSelected = selected.includes(item.id);
          return (
            <div
              key={item.id}
              className="list-row"
              style={{ minHeight: 64, cursor: "pointer" }}
              onClick={() => onToggle(item.id)}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                overflow: "hidden", flexShrink: 0,
                border: isSelected ? "2px solid var(--color-secondary)" : "2px solid var(--color-border)",
                background: item.img ? "transparent" : (isSelected ? "var(--color-secondary)" : "var(--color-bg-subtle)"),
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "border-color 0.2s, background 0.2s",
              }}>
                {item.img ? (
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: item.imgFit ?? "cover" }} />
                ) : (
                  <span style={{ fontSize: 16, color: isSelected ? "white" : "var(--label-2)" }}>⋯</span>
                )}
              </div>
              <div className="list-row-content">
                <p className="list-row-title" style={{ fontWeight: 500 }}>{item.name}</p>
                <p className="list-row-subtitle">{item.desc}</p>
              </div>
              <div className="list-row-trailing" style={{ gap: 6, display: "flex", alignItems: "center" }}>
                {item.tag && <span className="tag-pill">{item.tag}</span>}
                <div className={`check-circle ${isSelected ? "checked" : ""}`}>
                  {isSelected && <CheckMark />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
