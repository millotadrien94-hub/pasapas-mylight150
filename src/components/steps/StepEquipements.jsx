import iconBdr from "../../assets/icon-bdr.svg";
import iconWaterHeater from "../../assets/icon-water-heater.svg";

const EQUIPEMENTS = [
  {
    id: "CE",
    label: "Chauffe-eau",
    desc: "Électrique ou thermodynamique",
    icon: iconWaterHeater,
  },
  {
    id: "BdR",
    label: "Borne de recharge",
    desc: "Véhicule électrique — monophasé",
    icon: iconBdr,
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
  const isTri = state.typeInstallation === "tri";

  const toggle = (id) => {
    if (id === "BdR" && isTri) return;
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
          {EQUIPEMENTS.map(eq => {
            const isDisabled = eq.id === "BdR" && isTri;
            const isSelected = !isDisabled && selected.includes(eq.id);
            return (
              <div
                key={eq.id}
                className="list-row"
                style={{ minHeight: 64, opacity: isDisabled ? 0.4 : 1, cursor: isDisabled ? "not-allowed" : "pointer" }}
                onClick={() => toggle(eq.id)}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: isSelected ? "#111827" : "var(--fill-3)",
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
                    <p className="list-row-subtitle">{isDisabled ? "Non compatible avec le triphasé" : eq.desc}</p>
                  )}
                </div>
                <div className="list-row-trailing">
                  <div className={`check-circle ${isSelected ? "checked" : ""}`}>
                    <span className="check-circle-icon">✓</span>
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
