import { useState, useEffect, useRef } from 'react';

export default function BottomNav({ onPrev, onNext, canNext, isFirst, nextLabel, hideNext }) {
  // interactive starts false only if the button begins hidden (e.g. EQUIPEMENTS step)
  const [interactive, setInteractive] = useState(!hideNext);
  const prevHideNext = useRef(hideNext);

  useEffect(() => {
    const prev = prevHideNext.current;
    prevHideNext.current = hideNext;

    if (prev === true && hideNext === false) {
      // Button just appeared: block interaction briefly to prevent tap-through on touch devices
      setInteractive(false);
      const t = setTimeout(() => setInteractive(true), 350);
      return () => clearTimeout(t);
    }
  }, [hideNext]);

  return (
    <div className="bottom-bar">
      {!isFirst && (
        <button className="btn-ios btn-gray" onClick={onPrev} style={{ flex: 1 }}>
          ← Retour
        </button>
      )}
      {!hideNext && (
        <button
          className={`btn-ios btn-filled ${canNext && interactive ? "pulse" : ""}`}
          onClick={onNext}
          disabled={!canNext || !interactive}
          style={{
            flex: isFirst ? 1 : 1.6,
            opacity: interactive ? 1 : 0,
            transform: interactive ? 'none' : 'translateY(6px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          {nextLabel || "Continuer"}
        </button>
      )}
    </div>
  );
}
