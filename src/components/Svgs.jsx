// Placeholder SVG illustrations — à remplacer par les vraies illustrations

export function SvgCoffret({ name }) {
  return (
    <svg viewBox="0 0 200 140" className="svg-placeholder" style={{ height: 100 }}>
      <rect width="200" height="140" fill="#f8fafc" />
      <rect x="60" y="25" width="80" height="90" rx="6" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="70" y="35" width="60" height="40" rx="3" fill="#cbd5e1" />
      <circle cx="100" cy="95" r="8" fill="#94a3b8" />
      <text x="100" y="130" textAnchor="middle" fontSize="10" fill="#6b7280">{name}</text>
    </svg>
  );
}

export function SvgSchemaElectrique() {
  return (
    <svg viewBox="0 0 320 180" className="svg-placeholder" style={{ height: 160 }}>
      <rect width="320" height="180" fill="#f8fafc" />
      {/* Réseau */}
      <rect x="10" y="70" width="50" height="40" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="35" y="88" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="600">Réseau</text>
      <text x="35" y="99" textAnchor="middle" fontSize="8" fill="#1d4ed8">EDF</text>
      {/* CT1 — conso */}
      <ellipse cx="100" cy="90" rx="14" ry="8" fill="none" stroke="#f59e0b" strokeWidth="2" />
      <text x="100" y="78" textAnchor="middle" fontSize="9" fill="#b45309" fontWeight="700">CT1</text>
      {/* Ligne principale */}
      <line x1="60" y1="90" x2="320" y2="90" stroke="#374151" strokeWidth="2" />
      {/* Tableau */}
      <rect x="140" y="65" width="50" height="50" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="165" y="88" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">Tableau</text>
      <text x="165" y="100" textAnchor="middle" fontSize="8" fill="#374151">général</text>
      {/* MG3 coffret */}
      <rect x="230" y="50" width="75" height="80" rx="6" fill="#dcfce7" stroke="#1a7a4a" strokeWidth="2" />
      <text x="267" y="75" textAnchor="middle" fontSize="10" fill="#1a7a4a" fontWeight="700">Coffret</text>
      <text x="267" y="90" textAnchor="middle" fontSize="9" fill="#1a7a4a">MG3</text>
      {/* CT2 — prod */}
      <ellipse cx="200" cy="90" rx="14" ry="8" fill="none" stroke="#8b5cf6" strokeWidth="2" />
      <text x="200" y="78" textAnchor="middle" fontSize="9" fill="#6d28d9" fontWeight="700">CT2</text>
      {/* Solaire */}
      <rect x="255" y="10" width="55" height="30" rx="4" fill="#fef9c3" stroke="#eab308" strokeWidth="1.5" />
      <text x="282" y="24" textAnchor="middle" fontSize="9" fill="#854d0e" fontWeight="600">Panneaux</text>
      <text x="282" y="35" textAnchor="middle" fontSize="8" fill="#854d0e">solaires</text>
      <line x1="282" y1="40" x2="267" y2="50" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3,2" />
      {/* SDM */}
      <rect x="255" y="140" width="55" height="30" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="282" y="155" textAnchor="middle" fontSize="9" fill="#be185d" fontWeight="600">SDM120</text>
      <line x1="282" y1="140" x2="267" y2="130" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,2" />
    </svg>
  );
}

export function SvgPince({ label = "CT2" }) {
  return (
    <svg viewBox="0 0 280 160" className="svg-placeholder" style={{ height: 140 }}>
      <rect width="280" height="160" fill="#f8fafc" />
      {/* Câble */}
      <rect x="20" y="68" width="240" height="24" rx="12" fill="#374151" />
      <text x="140" y="84" textAnchor="middle" fontSize="10" fill="white" fontWeight="600">Phase → Réseau</text>
      {/* Pince */}
      <ellipse cx="140" cy="80" rx="28" ry="16" fill="none" stroke="#f59e0b" strokeWidth="3" />
      <ellipse cx="140" cy="80" rx="20" ry="10" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,3" />
      {/* Label */}
      <rect x="108" y="38" width="64" height="22" rx="4" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="140" y="53" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="700">{label}</text>
      <line x1="140" y1="60" x2="140" y2="64" stroke="#f59e0b" strokeWidth="1.5" />
      {/* Flèche direction */}
      <text x="240" y="55" textAnchor="middle" fontSize="11" fill="#1a7a4a" fontWeight="700">↑ Réseau</text>
      <line x1="220" y1="58" x2="200" y2="72" stroke="#1a7a4a" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="40" y="140" textAnchor="start" fontSize="10" fill="#6b7280">Installation</text>
      <text x="220" y="140" textAnchor="end" fontSize="10" fill="#6b7280">Réseau EDF</text>
    </svg>
  );
}

export function SvgSDM120() {
  return (
    <svg viewBox="0 0 280 160" className="svg-placeholder" style={{ height: 140 }}>
      <rect width="280" height="160" fill="#f8fafc" />
      {/* Câbles */}
      <rect x="20" y="58" width="240" height="12" rx="6" fill="#dc2626" />
      <rect x="20" y="78" width="240" height="12" rx="6" fill="#374151" />
      <rect x="20" y="98" width="240" height="12" rx="6" fill="#1d4ed8" />
      <text x="15" y="67" textAnchor="end" fontSize="9" fill="#dc2626">L1</text>
      <text x="15" y="87" textAnchor="end" fontSize="9" fill="#374151">N</text>
      <text x="15" y="107" textAnchor="end" fontSize="9" fill="#1d4ed8">L2</text>
      {/* SDM boîtier */}
      <rect x="100" y="40" width="80" height="88" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
      <text x="140" y="80" textAnchor="middle" fontSize="11" fill="#be185d" fontWeight="700">SDM</text>
      <text x="140" y="95" textAnchor="middle" fontSize="10" fill="#be185d">120</text>
      <rect x="115" y="112" width="50" height="10" rx="2" fill="#ec4899" opacity="0.4" />
      {/* Label */}
      <text x="140" y="148" textAnchor="middle" fontSize="10" fill="#6b7280">Capteur de production</text>
    </svg>
  );
}

export function SvgChauffeEau({ type = "electrique" }) {
  return (
    <svg viewBox="0 0 280 160" className="svg-placeholder" style={{ height: 140 }}>
      <rect width="280" height="160" fill="#f8fafc" />
      {/* Chauffe-eau */}
      <ellipse cx="80" cy="80" rx="45" ry="60" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="80" y="76" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="600">Chauffe-eau</text>
      <text x="80" y="89" textAnchor="middle" fontSize="8" fill="#1d4ed8">{type === "electrique" ? "électrique" : "thermodynamique"}</text>
      {/* Coffret */}
      <rect x="190" y="50" width="70" height="80" rx="6" fill="#dcfce7" stroke="#1a7a4a" strokeWidth="2" />
      <text x="225" y="88" textAnchor="middle" fontSize="9" fill="#1a7a4a" fontWeight="700">Coffret</text>
      <text x="225" y="101" textAnchor="middle" fontSize="9" fill="#1a7a4a">MG3</text>
      {/* Câblage */}
      <line x1="125" y1="80" x2="190" y2="80" stroke="#374151" strokeWidth="2" strokeDasharray="5,3" />
      <text x="157" y="73" textAnchor="middle" fontSize="9" fill="#374151">Câble 2.5mm²</text>
      {/* Type indicator */}
      <text x="140" y="148" textAnchor="middle" fontSize="10" fill="#6b7280">Schéma de câblage — {type}</text>
    </svg>
  );
}

export function SvgBorne() {
  return (
    <svg viewBox="0 0 280 160" className="svg-placeholder" style={{ height: 140 }}>
      <rect width="280" height="160" fill="#f8fafc" />
      {/* Borne */}
      <rect x="15" y="40" width="70" height="90" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <text x="50" y="83" textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="600">Borne de</text>
      <text x="50" y="96" textAnchor="middle" fontSize="9" fill="#1d4ed8">recharge</text>
      <rect x="25" y="55" width="50" height="25" rx="3" fill="#93c5fd" />
      {/* Câble RJ45 */}
      <line x1="85" y1="100" x2="145" y2="100" stroke="#6b7280" strokeWidth="2" strokeDasharray="4,3" />
      <rect x="145" y="92" width="16" height="14" rx="2" fill="#374151" />
      <text x="153" y="115" textAnchor="middle" fontSize="8" fill="#374151">AUX</text>
      {/* MG3 */}
      <rect x="195" y="50" width="70" height="80" rx="6" fill="#dcfce7" stroke="#1a7a4a" strokeWidth="2" />
      <text x="230" y="88" textAnchor="middle" fontSize="10" fill="#1a7a4a" fontWeight="700">MG3</text>
      <rect x="205" y="95" width="50" height="20" rx="3" fill="#86efac" />
      <text x="230" y="109" textAnchor="middle" fontSize="9" fill="#1a7a4a" fontWeight="600">Port AUX</text>
      <line x1="161" y1="100" x2="195" y2="105" stroke="#374151" strokeWidth="2" />
      <text x="140" y="150" textAnchor="middle" fontSize="10" fill="#6b7280">Connexion Borne ↔ MG3 via AUX</text>
    </svg>
  );
}

export function SvgLedStatus({ state }) {
  const configs = {
    starting: { color: "#22c55e", label: "LED verte — clignotement rapide" },
    nominal: { color: "#22c55e", label: "LED verte — clignotement 3s" },
    noServer: { color: "#f59e0b", label: "LED verte + rouge alternant" },
    noConnection: { color: "#ef4444", label: "LED rouge — clignotement 3s" },
  };
  const cfg = configs[state] || configs.nominal;
  return (
    <svg viewBox="0 0 100 100" style={{ width: 60, height: 60 }}>
      <rect width="100" height="100" fill="none" />
      <rect x="20" y="20" width="60" height="60" rx="8" fill="#1f2937" />
      <circle cx="50" cy="50" r="14" fill={cfg.color} opacity="0.9" />
      <circle cx="50" cy="50" r="8" fill="white" opacity="0.3" />
    </svg>
  );
}

export function SvgBorneState({ hasArrows }) {
  return (
    <svg viewBox="0 0 120 100" className="svg-placeholder" style={{ height: 90 }}>
      <rect width="120" height="100" fill="#f8fafc" />
      <rect x="30" y="20" width="60" height="60" rx="6" fill="#1f2937" />
      <rect x="40" y="30" width="40" height="20" rx="3" fill="#374151" />
      {hasArrows ? (
        <>
          <text x="60" y="63" textAnchor="middle" fontSize="14" fill="#22c55e">⇅</text>
          <text x="60" y="90" textAnchor="middle" fontSize="9" fill="#1a7a4a" fontWeight="600">✅ Flèches visibles</text>
        </>
      ) : (
        <>
          <text x="60" y="63" textAnchor="middle" fontSize="14" fill="#6b7280">—</text>
          <text x="60" y="90" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="600">❌ Pas de flèches</text>
        </>
      )}
    </svg>
  );
}
