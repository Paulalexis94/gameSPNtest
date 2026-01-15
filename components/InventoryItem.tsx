import React from 'react';
import { Item } from '../types';
import { Sparkles, FlaskConical, Flashlight } from 'lucide-react';

interface InventoryItemProps {
  item: Item;
}

export const InventoryItem: React.FC<InventoryItemProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.id) {
      case 'salt': return <Sparkles size={18} />;
      case 'holy_water': return <FlaskConical size={18} />;
      case 'flashlight': return <Flashlight size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div className="group relative flex items-center gap-3 p-3 border border-stone-600 bg-stone-900/50 hover:bg-stone-800 transition-colors cursor-help rounded-sm">
      <div className="text-parchment-dark">
        {getIcon()}
      </div>
      <span className="text-sm font-bold tracking-widest uppercase">{item.name}</span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-black border border-blood-red text-xs text-parchment opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {item.description}
      </div>
    </div>
  );
};