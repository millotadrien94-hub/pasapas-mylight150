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
    <div style={{
      background: '#FFFFFF',
      borderTop: '1px solid var(--color-border)',
      padding: 16,
      display: 'flex',
      gap: 10,
      flexShrink: 0,
    }}>
      {!isFirst && (
        <button
          onClick={onPrev}
          style={{
            height: 48,
            background: 'transparent',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-md)',
            fontSize: 16,
            fontWeight: 500,
            padding: '0 20px',
            cursor: 'pointer',
            fontFamily: 'var(--font-family)',
          }}
        >
          ← Retour
        </button>
      )}
      {!hideNext && (
        <button
          onClick={onNext}
          disabled={!canNext || !interactive}
          style={{
            height: 48,
            flex: 1,
            background: canNext ? 'var(--color-primary)' : 'var(--color-border)',
            color: canNext ? '#FFFFFF' : 'var(--color-text-disabled)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: 16,
            fontWeight: 600,
            fontFamily: 'var(--font-family)',
            cursor: canNext ? 'pointer' : 'not-allowed',
            transition: 'background 0.15s ease',
            opacity: interactive ? 1 : 0,
            transform: interactive ? 'none' : 'translateY(6px)',
          }}
        >
          {nextLabel || "Continuer"}
        </button>
      )}
    </div>
  );
}
