import { useState } from "react";
import Checklist from "../Checklist";
import schemaCT1 from "../../assets/schema-ct1.png";
import photoDeuxDepart from "../../assets/photo-deux-depart.png";
import photo1Depart from "../../assets/photo-1-depart.png";
import photoOk from "../../assets/photo ok.png";
import photoNoOk from "../../assets/photo no ok.png";

const INSTRUCTIONS = [
  "Repérer le câble de phase UNIQUE à la sortie du 500mA",
  "Clipsez la pince « CT1 » sur le câble de phase",
  "La flèche doit « viser » le 500mA",
  "Visser le connecteur de la pince au port « CT1 » de la MG3",
];

const INSTRUCTION_OPTIONAL = "Utiliser uniquement des rallonges « mylight150 »";

const ITEMS = [
  "CT1 sur le bon câble, flèche vers le 500mA",
  "Pince refermée et clipsée",
];

export default function Step2({ state, setState }) {
  const [showDepart, setShowDepart] = useState(false);

  const checked = state.etapesCochees?.step2 || Array(ITEMS.length).fill(false);
  const setChecked = (arr) => setState(prev => ({
    ...prev,
    etapesCochees: { ...prev.etapesCochees, step2: arr }
  }));

  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">MG3 — CT1 — Consommation</h1>
        <p style={{ fontSize: 15, color: "var(--label-2)", marginTop: 4 }}>
          La pince CT1 doit mesurer l'intégralité de la consommation.
        </p>
      </div>

      <div className="step-page-section">
        <p className="list-header">Schéma</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14, display: "flex", justifyContent: "center" }}>
            <img
              src={schemaCT1}
              alt="Schéma CT1 consommation"
              style={{ width: "60%", borderRadius: 8, display: "block", margin: "0 auto" }}
            />
          </div>
        </div>
      </div>

      {/* Modale double départ */}
      {showDepart && (
        <div
          onClick={() => setShowDepart(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "33vh 24px 0",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 8, width: "100%",
              padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16,
              boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <p style={{ flex: 1, fontWeight: 500, fontSize: 18, lineHeight: "28px", color: "#111827" }}>
                Exemple de double départ
              </p>
              <button
                onClick={() => setShowDepart(false)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", color: "#111827" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Images */}
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { src: photo1Depart,    alt: "1 départ — correct",   badge: photoOk,    bg: "#DFF2E9" },
                { src: photoDeuxDepart, alt: "2 départs — incorrect", badge: photoNoOk,  bg: "#FDE7E3" },
              ].map(({ src, alt, badge, bg }) => (
                <div key={alt} style={{ flex: 1, position: "relative", height: 229 }}>
                  <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8, display: "block" }} />
                  <div style={{
                    position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
                    width: 36, height: 36, borderRadius: "50%",
                    background: bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <img src={badge} alt="" style={{ width: 20, height: 20 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowDepart(false)}
                style={{
                  background: "#111827", color: "#fff", border: "none", cursor: "pointer",
                  padding: "10px 16px", borderRadius: 6, fontSize: 14, fontWeight: 500, lineHeight: "20px",
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "0 16px" }}>
        <div className="notice notice-orange" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="notice-icon">⚠️</span>
          <div className="notice-body" style={{ flex: 1 }}>
            <p className="notice-title">Vérifier qu'il n'y a pas de double départ du 500mA</p>
          </div>
          <button
            onClick={() => setShowDepart(true)}
            style={{
              border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              color: "var(--accent)", flexShrink: 0, padding: "4px 8px",
              borderRadius: 6, background: "rgba(0,0,0,0.06)",
            }}
          >
            Voir exemples
          </button>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Instructions</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group">
            <div className="numbered-steps">
              {INSTRUCTIONS.map((t, i) => (
                <div className="numbered-step" key={i}>
                  <span className="step-num">{i + 1}</span>
                  <span className="step-text">{t}</span>
                </div>
              ))}
              <div className="numbered-step" style={{ opacity: 0.6 }}>
                <span className="step-num" style={{ background: "var(--fill-3)", color: "var(--label-2)" }}>⚙</span>
                <span className="step-text" style={{ fontStyle: "italic" }}>
                  Optionnel — {INSTRUCTION_OPTIONAL}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Vidéo</p>
        <div style={{ padding: "0 16px" }}>
          <div style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "16/9" }}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Rg3YvpZ6rgE"
              title="Pose CT1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
        </div>
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
