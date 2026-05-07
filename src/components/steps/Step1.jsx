import schemaImg from "../../assets/Schéma de principe.jpg";

export default function Step1() {
  return (
    <div className="step-page">
      <div className="step-page-header">
        <h1 className="t-title2">Schéma de principe</h1>
        <p style={{ fontSize: 17, color: "var(--label-2)", marginTop: 6 }}>
          Consultez le schéma avant de commencer le câblage.
        </p>
      </div>

      <div className="step-page-section">
        <div style={{ padding: "0 16px" }}>
          <div className="list-group" style={{ padding: 14 }}>
            <img
              src={schemaImg}
              alt="Schéma de principe"
              onClick={() => window.open(schemaImg, "_blank")}
              style={{ width: "100%", borderRadius: 8, cursor: "zoom-in" }}
            />
          </div>
        </div>
      </div>

      <div className="step-page-section">
        <p className="list-header">Instructions</p>
        <div style={{ padding: "0 16px" }}>
          <div className="list-group">
            <div className="numbered-steps">
              <div className="numbered-step">
                <span className="step-num">1</span>
                <span className="step-text">Être à proximité du compteur général / 500 mA.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
