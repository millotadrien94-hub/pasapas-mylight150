export default function BottomNav({ onPrev, onNext, canNext, isFirst, nextLabel }) {
  return (
    <div className="bottom-bar">
      {!isFirst && (
        <button className="btn-ios btn-gray" onClick={onPrev} style={{ flex: 1 }}>
          ← Retour
        </button>
      )}
      <button
        className={`btn-ios btn-filled ${canNext ? "pulse" : ""}`}
        onClick={onNext}
        disabled={!canNext}
        style={{ flex: isFirst ? 1 : 1.6 }}
      >
        {nextLabel || "Continuer"}
      </button>
    </div>
  );
}
