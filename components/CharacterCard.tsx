import React from 'react';
import { User, Skull } from 'lucide-react';

interface CharacterCardProps {
  name: string;
  health: number;
  maxHealth?: number;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  health,
  maxHealth = 100,
}) => {
  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const isCritical = healthPercent < 30;

  const subtitle =
    name === 'Dean'
      ? 'Pilote • Exorciste'
      : name === 'Sam'
      ? 'Chercheur • Stratège'
      : '';

  return (
    <div
      className="relative bg-zinc-900 p-4 overflow-hidden"
      style={{
        border: '2px solid #3a3633',
        boxShadow: 'inset 0 0 0 1px #1a1816',
      }}
    >
      {/* Inner double-border line */}
      <div
        className="absolute inset-1 pointer-events-none"
        style={{ border: '1px solid #2a2724' }}
      />

      {/* Corner ornaments — L-shaped borders at each corner */}
      <div
        className="absolute top-0 left-0 w-4 h-4 pointer-events-none"
        style={{ borderTop: '2px solid #6b5e52', borderLeft: '2px solid #6b5e52' }}
      />
      <div
        className="absolute top-0 right-0 w-4 h-4 pointer-events-none"
        style={{ borderTop: '2px solid #6b5e52', borderRight: '2px solid #6b5e52' }}
      />
      <div
        className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none"
        style={{ borderBottom: '2px solid #6b5e52', borderLeft: '2px solid #6b5e52' }}
      />
      <div
        className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none"
        style={{ borderBottom: '2px solid #6b5e52', borderRight: '2px solid #6b5e52' }}
      />

      {/* Header row: name + subtitle on the left, HP value on the right */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <User size={16} className="text-parchment-dark flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base uppercase tracking-widest font-bold text-parchment leading-tight">
              {name}
            </h3>
            {subtitle && (
              <p className="text-xs text-stone-500 tracking-wider leading-tight mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <span
          className={`text-sm font-bold tabular-nums transition-colors ${
            isCritical ? 'animate-pulse' : 'text-parchment-dark'
          }`}
          style={isCritical ? { color: '#8a0b0b' } : undefined}
        >
          {health} HP
        </span>
      </div>

      {/* Health bar */}
      <div className="w-full h-4 bg-stone-950 border border-stone-700 relative overflow-hidden">
        {/* Filled portion */}
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${healthPercent}%`,
            backgroundColor: '#7f1d1d',
            animation: isCritical ? 'criticalPulse 1.2s ease-in-out infinite' : undefined,
          }}
        />

        {/* 10-division grid overlay */}
        <div className="health-grid-overlay" />
      </div>

      {/* Critical danger indicator — shown only when HP < 30 % */}
      {isCritical && (
        <div
          className="flex items-center gap-2 mt-2 text-xs uppercase tracking-widest font-bold animate-pulse"
          style={{ color: '#8a0b0b' }}
        >
          <Skull size={12} />
          <span>EN DANGER</span>
        </div>
      )}
    </div>
  );
};
