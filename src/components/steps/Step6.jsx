import Checklist from "../Checklist";
import robinCoreImg from "../../assets/Robin Core.png";

const LED_STATES = [
  {
    id: "nominal",
    label: "Nominal ✅",
    ledClass: "led led-green led-blink-slow",
    desc: "Verte — 1 clignotement / 3 s",
    action: "Vous pouvez continuer",
    actionClass: "ok",
    highlight: true,
  },
  {
    id: "off",
    label: "Éteint",
    ledClass: "led led-off",
    desc: "Aucune LED allumée",
    action: "Hors tension",
    actionClass: "error",
  },
  {
    id: "starting",
    label: "Démarrage",
    ledClass: "led led-green led-blink-fast",
    desc: "Verte clignotante rapide (300 ms)",
    action: "Attendez…",
    actionClass: "warn",
  },
  {
    id: "noServer",
    label: "Serveurs non atteints",
    ledClass: "led led-blink-green-red",
    desc: "Verte + rouge alternance 3 s",
    action: "Contacter notre support",
    actionClass: "warn",
  },
  {
    id: "noConnection",
    label: "Pas de connexion",
    ledClass: "led led-red led-blink-off-red",
    desc: "Rouge clignotante 3 s",
    action: "Vérifiez internet + câble LAN",
    actionClass: "error",
  },
];

const ITEMS = ["La LED est bien sur l'état nominal"];

export default function Step6({ state, setState }) {
  const checked = state.etapesCochees?.step6 || Array(ITEMS.length).fill(false);
  const setChecked = (arr) => setState(prev => ({
    ...prev,
    etapesCochees: { ...prev.etapesCochees, step6: arr }
  }));

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Mise sous tension</h1>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-yellow">
          <span className="notice-icon">⏱️</span>
          <div className="notice-body">
            <p className="notice-title">Démarrage et connexion internet jusqu'à 10 minutes</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">États LED Power — MG3</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {LED_STATES.map(s => (
            <div
              key={s.id}
              className="led-row"
              style={s.highlight ? {
                background: "rgba(75, 151, 124, 0.07)",
                borderLeft: "3px solid rgba(75, 151, 124, 0.35)",
              } : {}}
            >
              <div className={s.ledClass} style={s.highlight ? { width: 20, height: 20 } : {}} />
              <div className="led-info">
                <p className="led-label" style={s.highlight ? { fontSize: 17 } : {}}>{s.label}</p>
                <p className="led-desc">{s.desc}</p>
                <p className={`led-action ${s.actionClass}`} style={s.highlight ? { fontWeight: 600 } : {}}>→ {s.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "50%", borderRadius: 12, overflow: "hidden", border: "1px solid var(--color-border)" }}>
            <img src={robinCoreImg} alt="Robin Core" style={{ width: "100%", display: "block" }} />
            {/* LED nominale animée — remplace le point gris à droite sous le bouton power */}
            <div style={{
              position: "absolute",
              left: "calc(19% + 22px)",
              top: "36.5%",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#34C759",
              boxShadow: "0 0 8px rgba(52,199,89,0.8)",
              transform: "translate(-50%, -50%)",
            }} className="led-blink-slow robin-core-led" />
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
        <button className="link-btn" onClick={() => window.open("https://intercom-help.eu/mylight150com/fr/articles/520974-signification-des-led-de-la-mg3", "_blank")}>Ma LED n'est pas verte ?</button>
      </div>

      <Checklist
        items={ITEMS}
        checked={checked}
        onChange={(i, val) => { const next = [...checked]; next[i] = val; setChecked(next); }}
        title="Vérifications"
      />
    </div>
  );
}
