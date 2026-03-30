export default function Checklist({ items, checked, onChange, title }) {
  return (
    <div className="step-page-section">
      {title && <p className="list-header" style={{ paddingLeft: 4 }}>{title}</p>}
      <div className="list-group" style={{ position: "relative" }}>
        {items.map((item, i) => {
          const done = !!checked[i];
          return (
            <div
              key={i}
              className="check-row"
              style={{ position: "relative" }}
              onClick={() => onChange(i, !done)}
            >
              <div className={`check-circle ${done ? "checked" : ""}`}>
                <span className="check-circle-icon">✓</span>
              </div>
              <span className={`check-label ${done ? "done" : ""}`}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
