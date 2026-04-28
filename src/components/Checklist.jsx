import CheckMark from "./CheckMark";

export default function Checklist({ items, checked, onChange, title }) {
  return (
    <div className="step-page-section">
      {title && <p className="list-header" style={{ paddingLeft: 4 }}>{title}</p>}
      <div className="list-group" style={{ margin: "0 16px" }}>
        {items.map((item, i) => {
          const done = !!checked[i];
          return (
            <div
              key={i}
              className="list-row"
              style={{ minHeight: 56, cursor: "pointer" }}
              onClick={() => onChange(i, !done)}
            >
              <div className="list-row-content">
                <p className="list-row-title" style={{ fontWeight: 500 }}>{item}</p>
              </div>
              <div className="list-row-trailing">
                <div className={`check-circle ${done ? "checked" : ""}`}>
                  {done && <CheckMark />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
