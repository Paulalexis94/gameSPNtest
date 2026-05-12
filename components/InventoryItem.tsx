import React from 'react';
import { Item } from '../types';
import { Sparkles, FlaskConical, Flashlight, Radio, Wrench, BookMarked, FileText, Package } from 'lucide-react';

const ITEM_META: Record<string, { icon: React.ReactNode; dot: string }> = {
  emf_meter:    { icon: <Radio size={16}/>,        dot: 'bg-green-500' },
  iron_rod:     { icon: <Wrench size={16}/>,       dot: 'bg-stone-400' },
  salt:         { icon: <Sparkles size={16}/>,     dot: 'bg-white' },
  holy_water:   { icon: <FlaskConical size={16}/>, dot: 'bg-blue-400' },
  john_journal: { icon: <BookMarked size={16}/>,   dot: 'bg-amber-500' },
  flashlight:   { icon: <Flashlight size={16}/>,  dot: 'bg-yellow-400' },
  harrow_file:  { icon: <FileText size={16}/>,     dot: 'bg-blood-red' },
};

export const InventoryItem: React.FC<{ item: Item }> = ({ item }) => {
  const meta = ITEM_META[item.id] ?? { icon: <Package size={16}/>, dot: 'bg-stone-500' };
  return (
    <div className="group relative flex items-center gap-3 p-3 border border-stone-700 bg-stone-900/60 hover:bg-stone-800 transition-colors cursor-help">
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`}/>
      <span className="text-parchment-dark">{meta.icon}</span>
      <span className="text-xs font-bold tracking-widest uppercase text-parchment flex-1">{item.name}</span>
      <div className="absolute bottom-full left-0 mb-2 w-52 p-2 bg-black border border-blood-red text-xs text-parchment opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
        <p className="mb-1">{item.description}</p>
        {item.lore && <p className="text-parchment-dark italic">{item.lore}</p>}
      </div>
    </div>
  );
};
