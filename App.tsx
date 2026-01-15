import React, { useState, useEffect, useRef } from 'react';
import { GameState, Choice } from './types';
import { INITIAL_INVENTORY, SCENES } from './constants';
import { Typewriter } from './components/Typewriter';
import { InventoryItem } from './components/InventoryItem';
import { CharacterCard } from './components/CharacterCard';
import { BookOpen, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentSceneId: 'start',
    health: { sam: 100, dean: 100 },
    inventory: INITIAL_INVENTORY,
    history: []
  });

  const [textCompleted, setTextCompleted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const currentScene = SCENES[gameState.currentSceneId];

  // Effect to scroll to bottom when scene changes
  useEffect(() => {
    setTextCompleted(false);
  }, [gameState.currentSceneId]);

  const handleChoice = (choice: Choice) => {
    // Check requirements
    if (choice.requiredItem && !gameState.inventory.find(i => i.id === choice.requiredItem)) {
      return; // Cannot choose this
    }

    setGameState(prev => {
      let newInventory = [...prev.inventory];
      
      // Remove item if used
      if (choice.removeItem) {
        newInventory = newInventory.filter(i => i.id !== choice.removeItem);
      }

      // Apply health impact (randomly distributed or to specific char for simplicity sake splitting)
      const newHealth = { ...prev.health };
      if (choice.healthImpact) {
        // Simplified logic: Dean takes the hits first usually in lore, let's split it
        newHealth.dean = Math.max(0, newHealth.dean + (choice.healthImpact));
        if (newHealth.dean <= 0) {
            newHealth.sam = Math.max(0, newHealth.sam + choice.healthImpact);
        }
      }

      return {
        ...prev,
        currentSceneId: choice.nextSceneId,
        inventory: newInventory,
        health: newHealth,
        history: [...prev.history, prev.currentSceneId]
      };
    });
  };

  const restartGame = () => {
    setGameState({
      currentSceneId: 'start',
      health: { sam: 100, dean: 100 },
      inventory: INITIAL_INVENTORY,
      history: []
    });
  };

  const isDead = gameState.health.sam <= 0 && gameState.health.dean <= 0;

  return (
    <div className="min-h-screen bg-grim-black p-4 md:p-8 flex items-center justify-center">
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HEADER / LOGO AREA */}
        <div className="lg:col-span-12 text-center mb-4 border-b-2 border-stone-800 pb-4">
          <h1 className="text-4xl md:text-6xl text-parchment tracking-[0.2em] font-bold drop-shadow-lg text-shadow-red">
            SUPERNATURAL
          </h1>
          <p className="text-stone-500 mt-2 tracking-widest text-sm uppercase">The Hunter's Journal • Case File #34-B</p>
        </div>

        {/* LEFT COLUMN: STATUS & INVENTORY */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-stone-950 border-4 border-double border-stone-800 p-4 shadow-xl">
            <h2 className="text-parchment-dark border-b border-stone-800 pb-2 mb-4 text-lg uppercase tracking-wider flex items-center gap-2">
              <UserSectionIcon /> État des Chasseurs
            </h2>
            <div className="space-y-4">
              <CharacterCard name="Dean" health={gameState.health.dean} />
              <CharacterCard name="Sam" health={gameState.health.sam} />
            </div>
          </div>

          <div className="bg-stone-950 border-4 border-double border-stone-800 p-4 shadow-xl min-h-[200px]">
            <h2 className="text-parchment-dark border-b border-stone-800 pb-2 mb-4 text-lg uppercase tracking-wider flex items-center gap-2">
              <BagSectionIcon /> Inventaire
            </h2>
            <div className="flex flex-col gap-2">
              {gameState.inventory.length === 0 ? (
                <span className="text-stone-600 italic text-sm">Sac vide...</span>
              ) : (
                gameState.inventory.map(item => (
                  <InventoryItem key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: NARRATIVE & CHOICES */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Story Box */}
          <div className="flex-grow bg-[#1a1a1a] border-2 border-stone-600 p-1 shadow-[0_0_15px_rgba(0,0,0,0.7)]">
            <div className="border border-stone-700 h-full p-6 md:p-8 relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-stone-500"></div>
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-stone-500"></div>
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-stone-500"></div>
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-stone-500"></div>

              {isDead ? (
                <div className="text-center py-12">
                  <h2 className="text-4xl text-blood-red mb-4">MORTS AU COMBAT</h2>
                  <p className="text-stone-400 mb-8">La chasse est finie pour ce soir.</p>
                  <button 
                    onClick={restartGame}
                    className="px-6 py-2 border border-parchment text-parchment hover:bg-parchment hover:text-black transition-colors uppercase tracking-widest"
                  >
                    Recommencer
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="text-stone-500" />
                    <h2 className="text-2xl text-parchment font-bold border-b border-stone-800 w-full pb-2">
                      {currentScene.title}
                    </h2>
                  </div>
                  
                  <div className="text-lg leading-relaxed text-gray-300 min-h-[200px]">
                    <Typewriter 
                      text={currentScene.text} 
                      speed={25} 
                      onComplete={() => setTextCompleted(true)} 
                    />
                  </div>
                </>
              )}
              <div ref={bottomRef}></div>
            </div>
          </div>

          {/* Action Area */}
          {!isDead && (
            <div className={`transition-opacity duration-700 ${textCompleted ? 'opacity-100' : 'opacity-0'}`}>
              <div className="grid grid-cols-1 gap-3">
                {currentScene.choices.length === 0 ? (
                  <button 
                    onClick={restartGame}
                    className="flex items-center justify-center gap-2 p-4 border border-stone-600 bg-stone-900 text-stone-400 hover:text-parchment hover:border-parchment transition-all"
                  >
                    <RefreshCw size={16} /> Rejouer le scénario
                  </button>
                ) : (
                  currentScene.choices.map((choice, idx) => {
                    const hasReq = !choice.requiredItem || gameState.inventory.find(i => i.id === choice.requiredItem);
                    
                    return (
                      <button
                        key={idx}
                        disabled={!hasReq}
                        onClick={() => handleChoice(choice)}
                        className={`
                          relative p-4 text-left border-2 transition-all group
                          ${hasReq 
                            ? 'border-stone-700 bg-stone-900/80 hover:bg-[#1a1a1a] hover:border-blood-red hover:pl-6' 
                            : 'border-stone-900 bg-black/50 text-stone-700 cursor-not-allowed'}
                        `}
                      >
                         <div className="flex justify-between items-center">
                            <span className={`text-lg uppercase tracking-wider ${hasReq ? 'text-parchment' : 'text-stone-700 decoration-line-through'}`}>
                              {choice.text}
                            </span>
                            {!hasReq && (
                              <span className="text-xs text-blood-red uppercase border border-blood-red px-2 py-1 rounded-sm">
                                Requis: {INITIAL_INVENTORY.find(i => i.id === choice.requiredItem)?.name}
                              </span>
                            )}
                         </div>
                         {/* Hover Effect Line */}
                         {hasReq && (
                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-blood-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Simple Icon Wrappers to keep main render clean
const UserSectionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const BagSectionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 9 4-7h12l4 7v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9Z"/><path d="M12 12V3"/></svg>
);

export default App;