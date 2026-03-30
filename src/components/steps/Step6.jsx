import Checklist from "../Checklist";

const LED_STATES = [
  {
    id: "off",
    label: "Éteint",
    ledClass: "led led-off",
    desc: "Aucune LED allumée",
    action: "Pas de câble branché",
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
    id: "nominal",
    label: "Nominal ✅",
    ledClass: "led led-green led-blink-slow",
    desc: "Verte — 1 clignotement / 3 s",
    action: "Vous pouvez continuer",
    actionClass: "ok",
  },
  {
    id: "noServer",
    label: "Serveurs non atteints",
    ledClass: "led led-blink-green-red",
    desc: "Verte + rouge alternance 3 s",
    action: "Vérifiez internet",
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

const ITEMS = ["LED Power verte — 1 clignotement toutes les 3 s"];

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
            <p className="notice-title">Démarrage jusqu'à 10 minutes</p>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">États LED Power — MG3</p>
        <div className="list-group" style={{ margin: "0 16px" }}>
          {LED_STATES.map(s => (
            <div key={s.id} className="led-row">
              <div className={s.ledClass} />
              <div className="led-info">
                <p className="led-label">{s.label}</p>
                <p className="led-desc">{s.desc}</p>
                <p className={`led-action ${s.actionClass}`}>→ {s.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Checklist
        items={ITEMS}
        checked={checked}
        onChange={(i, val) => { const next = [...checked]; next[i] = val; setChecked(next); }}
        title="Vérifications"
      />

      <div style={{ padding: "0 16px" }}>
        <button className="link-btn">Ma LED n'est pas verte ?</button>
      </div>
    </div>
  );
}
