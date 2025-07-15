'use client';

export function ArcSpinner({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      style={{ width: size, height: size, animationDuration: '0.8s'}}
      viewBox="0 0 50 50"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        d="M25 5
           a 20 20 0 0 1 0 40
           "
      />
    </svg>
  );
}