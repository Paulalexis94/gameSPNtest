import React from 'react';
import { User, Skull } from 'lucide-react';

interface CharacterCardProps {
  name: string;
  health: number;
  maxHealth?: number;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ name, health, maxHealth = 100 }) => {
  const healthPercent = Math.max(0, Math.min(100, (health / maxHealth) * 100));
  const isCritical = healthPercent < 30;

  return (
    <div className="border-2 border-stone-700 bg-zinc-900 p-4 relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-parchment"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-parchment"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-parchment"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-parchment"></div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <User className="text-parchment-dark" />
          <h3 className="text-xl uppercase tracking-widest font-bold">{name}</h3>
        </div>
        <span className={`${isCritical ? 'text-blood-red animate-pulse' : 'text-parchment-dark'}`}>
          {health}%
        </span>
      </div>

      {/* Health Bar Container */}
      <div className="w-full h-4 bg-stone-900 border border-stone-600 relative">
        {/* Blood Bar */}
        <div 
          className={`h-full transition-all duration-500 ease-out ${isCritical ? 'bg-blood-red' : 'bg-red-900'}`}
          style={{ width: `${healthPercent}%` }}
        ></div>
        
        {/* Grid lines for style */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border-r border-stone-800/50 h-full"></div>
          ))}
        </div>
      </div>
      
      {isCritical && (
        <div className="flex items-center gap-2 mt-2 text-blood-red text-xs uppercase animate-pulse">
          <Skull size={12} />
          <span>Danger Critique</span>
        </div>
      )}
    </div>
  );
};