import iconBdr from "../../assets/icon-bdr.svg";
import iconWaterHeater from "../../assets/icon-water-heater.svg";
import iconPac from "../../assets/PAC.png";
import CheckMark from "../CheckMark";

const EQUIPEMENTS_ALL = [
  {
    id: "CE",
    label: "Chauffe-eau",
    desc: "Électrique ou thermodynamique",
    icon: iconWaterHeater,
  },
  {
    id: "BdR",
    label: "Borne de recharge",
    desc: "Véhicule électrique",
    icon: iconBdr,
  },
  {
    id: "PAC",
    label: "Pompe à chaleur",
    desc: "PAC air/air ou air/eau",
    icon: iconPac,
  },
  {
    id: "AUCUN",
    label: "Aucun équipement",
    desc: null,
    icon: null,
  },
];

export default function StepEquipements({ state, setState }) {
  const selected = state.equipements || [];
  const coffret = state.coffretSelectionne;

  // Robin Plus (X) → pas de PAC ; Robin Max (H) ou MG3 → PAC disponible
  const hasPAC = coffret === "H" || coffret === "MG3" || !coffret;
  const equipements = EQUIPEMENTS_ALL.filter(eq => eq.id !== "PAC" || hasPAC);

  const toggle = (id) => {
    if (id === "AUCUN") {
      setState(prev => ({ ...prev, equipements: selected.includes("AUCUN") ? [] : ["AUCUN"] }));
      return;
    }
    const withoutAucun = selected.filter(e => e !== "AUCUN");
    const next = withoutAucun.includes(id)
      ? withoutAucun.filter(e => e !== id)
      : [...withoutAucun, id];
    setState(prev => ({ ...prev, equipements: next }));
  };

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-large-title">Équipements à piloter</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Quels équipements seront raccordés au coffret ?
        </p>
      </div>

      <div className="step-page-section">
        <p className="list-header">Sélectionnez tout ce qui s'applique</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {equipements.map(eq => {
            const isSelected = selected.includes(eq.id);
            return (
              <div
                key={eq.id}
                className="list-row"
                style={{ minHeight: 64, cursor: "pointer" }}
                onClick={() => toggle(eq.id)}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: isSelected ? "var(--color-secondary)" : "var(--color-bg-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}>
                  {eq.icon ? (
                    <img
                      src={eq.icon}
                      alt={eq.label}
                      style={{
                        width: 24, height: 24,
                        filter: isSelected ? "brightness(0) invert(1)" : "none",
                        transition: "filter 0.2s",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: 18, color: isSelected ? "white" : "var(--label-2)" }}>—</span>
                  )}
                </div>
                <div className="list-row-content">
                  <p className="list-row-title" style={{ fontWeight: 500 }}>{eq.label}</p>
                  {eq.desc && (
                    <p className="list-row-subtitle">{eq.desc}</p>
                  )}
                </div>
                <div className="list-row-trailing">
                  <div className={`check-circle ${isSelected ? "checked" : ""}`}>
                    {isSelected && <CheckMark />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
