import React, { useState, useEffect } from 'react';
import { BookOpen, RefreshCw, Scroll } from 'lucide-react';
import { GameState, Choice } from './types';
import {
  INITIAL_INVENTORY,
  ITEM_DB,
  SCENES,
  getHunterRank,
} from './constants';
import { Typewriter } from './components/Typewriter';
import { InventoryItem } from './components/InventoryItem';
import { CharacterCard } from './components/CharacterCard';
import SceneIllustration from './components/SceneIllustration';

const STORAGE_KEY = 'spn_game_state';

const INITIAL_STATE: GameState = {
  currentSceneId: 'start',
  health: { sam: 100, dean: 100 },
  inventory: INITIAL_INVENTORY,
  history: [],
  xp: 0,
  knowledge: [],
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as GameState;
    } catch {
      // ignore corrupt saves
    }
    return INITIAL_STATE;
  });

  const [textCompleted, setTextCompleted] = useState(false);
  const [skipTypewriter, setSkipTypewriter] = useState(false);

  // Persist state to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // storage quota or private mode
    }
  }, [gameState]);

  // Reset typewriter state whenever the scene changes
  useEffect(() => {
    setTextCompleted(false);
    setSkipTypewriter(false);
  }, [gameState.currentSceneId]);

  const currentScene = SCENES[gameState.currentSceneId];

  const handleChoice = (choice: Choice) => {
    // 1. Check required item
    if (
      choice.requiredItem &&
      !gameState.inventory.find((i) => i.id === choice.requiredItem)
    ) {
      return;
    }

    setGameState((prev) => {
      // 2. Calculate new health
      const newHealth = { ...prev.health };

      if (choice.deanDamage) {
        newHealth.dean = Math.max(0, Math.min(100, newHealth.dean - choice.deanDamage));
      }
      if (choice.samDamage) {
        newHealth.sam = Math.max(0, Math.min(100, newHealth.sam - choice.samDamage));
      }
      // Legacy healthImpact: applied to Dean (negative = damage, positive = heal)
      if (choice.healthImpact) {
        newHealth.dean = Math.max(0, Math.min(100, newHealth.dean + choice.healthImpact));
      }

      // 3. Remove item
      let newInventory = [...prev.inventory];
      if (choice.removeItem) {
        newInventory = newInventory.filter((i) => i.id !== choice.removeItem);
      }

      // 4. Add item (look up in ITEM_DB)
      if (choice.addItem) {
        const itemToAdd = ITEM_DB?.[choice.addItem];
        if (itemToAdd && !newInventory.find((i) => i.id === choice.addItem)) {
          newInventory = [...newInventory, itemToAdd];
        }
      }

      // 5. XP gain
      const newXp = (prev.xp ?? 0) + (choice.xpGain ?? 0);

      // 6. Knowledge (no duplicates)
      const newKnowledge = [...(prev.knowledge ?? [])];
      if (choice.addKnowledge && !newKnowledge.includes(choice.addKnowledge)) {
        newKnowledge.push(choice.addKnowledge);
      }

      // 7. Game over if both dead
      const bothDead = newHealth.dean <= 0 && newHealth.sam <= 0;
      const nextSceneId = bothDead ? 'game_over' : choice.nextSceneId;

      // 8. Update history
      const newHistory = [...prev.history, prev.currentSceneId];

      return {
        ...prev,
        currentSceneId: nextSceneId,
        health: newHealth,
        inventory: newInventory,
        history: newHistory,
        xp: newXp,
        knowledge: newKnowledge,
      };
    });
  };

  const restartGame = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setGameState(INITIAL_STATE);
  };

  const xp = gameState.xp ?? 0;
  const knowledge = gameState.knowledge ?? [];
  const rank = getHunterRank ? getHunterRank(xp) : 'Chasseur';

  const isGameOver =
    gameState.currentSceneId === 'game_over' ||
    (gameState.health.dean <= 0 && gameState.health.sam <= 0);

  const hasNoChoices = currentScene?.choices?.length === 0;

  return (
    <div className="min-h-screen bg-grim-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="lg:col-span-12 text-center border-b-2 border-stone-800 pb-5 mb-2">
          <h1
            className="text-5xl md:text-7xl text-parchment tracking-[0.25em] font-bold uppercase text-shadow-red"
          >
            SUPERNATURAL
          </h1>
          <p className="text-stone-500 mt-2 tracking-widest text-xs uppercase">
            The Hunter's Journal
            {' • '}
            Dossier #34-B
            {' • '}
            <span className="text-parchment-dark">{rank}</span>
            {' • '}
            <span className="text-parchment-dark">{xp} XP</span>
          </p>
        </header>

        {/* ── LEFT SIDEBAR ───────────────────────────────────────── */}
        <aside className="lg:col-span-4 space-y-5">

          {/* Hunter status cards */}
          <section
            className="bg-stone-950 p-4 shadow-xl"
            style={{ border: '4px double #3f3833' }}
          >
            <h2 className="text-parchment-dark border-b border-stone-800 pb-2 mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              État des Chasseurs
            </h2>
            <div className="space-y-4">
              <CharacterCard name="Dean" health={gameState.health.dean} />
              <CharacterCard name="Sam" health={gameState.health.sam} />
            </div>
          </section>

          {/* Inventory panel */}
          <section
            className="bg-stone-950 p-4 shadow-xl min-h-[180px]"
            style={{ border: '4px double #3f3833' }}
          >
            <h2 className="text-parchment-dark border-b border-stone-800 pb-2 mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2 9 4-7h12l4 7v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9Z" /><path d="M12 12V3" />
              </svg>
              Inventaire
            </h2>
            <div className="flex flex-col gap-2">
              {gameState.inventory.length === 0 ? (
                <span className="text-stone-600 italic text-sm">Sac vide...</span>
              ) : (
                gameState.inventory.map((item) => (
                  <InventoryItem key={item.id} item={item} />
                ))
              )}
            </div>
          </section>

          {/* Knowledge / clues panel */}
          <section
            className="bg-stone-950 p-4 shadow-xl"
            style={{ border: '4px double #3f3833' }}
          >
            <h2 className="text-parchment-dark border-b border-stone-800 pb-2 mb-3 text-sm uppercase tracking-widest flex items-center gap-2">
              <BookOpen size={14} />
              Dossier de Chasse
            </h2>
            <div
              className="overflow-y-auto text-xs text-parchment-dark space-y-1 pr-1"
              style={{ maxHeight: '200px' }}
            >
              {knowledge.length === 0 ? (
                <p className="text-stone-600 italic">Aucune info collectée...</p>
              ) : (
                knowledge.map((entry, i) => (
                  <p key={i} className="leading-relaxed">
                    <span className="text-blood-red mr-1">•</span>
                    {entry}
                  </p>
                ))
              )}
            </div>
          </section>

        </aside>

        {/* ── MAIN CONTENT ───────────────────────────────────────── */}
        <main className="lg:col-span-8 flex flex-col gap-5">

          {/* Story box */}
          <div
            className="flex-grow bg-[#111111] p-1 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
            style={{ border: '2px solid #3a3633' }}
          >
            <div
              className="relative h-full p-6 md:p-8 bg-dark-pattern"
              style={{ border: '1px solid #2a2724' }}
            >
              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-8 h-8 pointer-events-none"
                style={{ borderTop: '2px solid #5a504a', borderLeft: '2px solid #5a504a' }} />
              <div className="absolute top-2 right-2 w-8 h-8 pointer-events-none"
                style={{ borderTop: '2px solid #5a504a', borderRight: '2px solid #5a504a' }} />
              <div className="absolute bottom-2 left-2 w-8 h-8 pointer-events-none"
                style={{ borderBottom: '2px solid #5a504a', borderLeft: '2px solid #5a504a' }} />
              <div className="absolute bottom-2 right-2 w-8 h-8 pointer-events-none"
                style={{ borderBottom: '2px solid #5a504a', borderRight: '2px solid #5a504a' }} />

              {/* Scene illustration */}
              {currentScene?.sceneArt && (
                <div className="scene-illustration mb-4">
                  <SceneIllustration art={currentScene.sceneArt} />
                </div>
              )}

              {isGameOver && !currentScene ? (
                /* Fallback game-over when scene not defined */
                <div className="text-center py-12">
                  <RefreshCw size={48} className="mx-auto mb-4 text-blood-red animate-pulse" />
                  <h2 className="text-4xl text-blood-red mb-4 uppercase tracking-widest">
                    Morts au Combat
                  </h2>
                  <p className="text-stone-400 mb-8">La chasse est finie pour ce soir.</p>
                  <button
                    onClick={restartGame}
                    className="flex items-center gap-2 mx-auto px-6 py-3 border border-parchment text-parchment hover:bg-parchment hover:text-black transition-colors uppercase tracking-widest"
                  >
                    <RefreshCw size={16} />
                    Recommencer
                  </button>
                </div>
              ) : currentScene ? (
                <>
                  {/* Scene title */}
                  <div className="flex items-center gap-3 mb-5">
                    <BookOpen size={18} className="text-stone-500 flex-shrink-0" />
                    <h2 className="text-2xl text-parchment font-bold border-b border-stone-800 w-full pb-2 uppercase tracking-wider">
                      {currentScene.title}
                    </h2>
                  </div>

                  {/* Typewriter text — click anywhere to skip */}
                  <div
                    className="text-base md:text-lg leading-relaxed text-gray-300 min-h-[160px] cursor-pointer select-none"
                    onClick={() => {
                      if (!textCompleted) {
                        setSkipTypewriter(true);
                        setTextCompleted(true);
                      }
                    }}
                    title="Cliquer pour afficher immédiatement"
                  >
                    <Typewriter
                      key={gameState.currentSceneId}
                      text={currentScene.text}
                      speed={25}
                      skip={skipTypewriter}
                      onComplete={() => setTextCompleted(true)}
                    />
                  </div>

                  {!textCompleted && (
                    <p className="text-xs text-stone-600 mt-3 italic">
                      Cliquer pour passer...
                    </p>
                  )}
                </>
              ) : (
                <p className="text-stone-500 italic">Chargement de la scène...</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          {currentScene && (
            <div
              className={`transition-opacity duration-700 ${
                textCompleted ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {hasNoChoices || isGameOver ? (
                <button
                  onClick={restartGame}
                  className="flex items-center justify-center gap-2 w-full p-4 border border-stone-600 bg-stone-900 text-stone-400 hover:text-parchment hover:border-parchment transition-all uppercase tracking-widest text-sm"
                >
                  <RefreshCw size={16} />
                  Recommencer le scénario
                </button>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {currentScene.choices.map((choice, idx) => {
                    const hasReq =
                      !choice.requiredItem ||
                      !!gameState.inventory.find((i) => i.id === choice.requiredItem);

                    const totalDamage =
                      (choice.deanDamage ?? 0) +
                      (choice.samDamage ?? 0) +
                      (choice.healthImpact && choice.healthImpact < 0
                        ? Math.abs(choice.healthImpact)
                        : 0);

                    const requiredItemName = choice.requiredItem
                      ? (ITEM_DB?.[choice.requiredItem]?.name ??
                          gameState.inventory.find((i) => i.id === choice.requiredItem)?.name ??
                          INITIAL_INVENTORY.find((i) => i.id === choice.requiredItem)?.name ??
                          choice.requiredItem)
                      : null;

                    return (
                      <button
                        key={idx}
                        disabled={!hasReq}
                        onClick={() => hasReq && handleChoice(choice)}
                        className={`choice-btn relative p-4 text-left transition-all group ${
                          hasReq
                            ? 'border-stone-700 bg-stone-900 hover:border-blood-red hover:bg-[#141414]'
                            : 'border-stone-900 bg-black/40 cursor-not-allowed opacity-40'
                        }`}
                        style={{ border: hasReq ? undefined : '2px solid #1c1c1c' ,
                                 borderWidth: '2px',
                                 borderStyle: 'solid' }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`text-sm md:text-base uppercase tracking-wider font-semibold ${
                              hasReq ? 'text-parchment' : 'text-stone-700 line-through'
                            }`}
                          >
                            {choice.text}
                          </span>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {/* Damage warning */}
                            {hasReq && totalDamage > 0 && (
                              <span className="text-xs text-red-400 font-bold">
                                ⚠ -{totalDamage} HP
                              </span>
                            )}
                            {/* XP gain indicator */}
                            {hasReq && (choice.xpGain ?? 0) > 0 && (
                              <span className="text-xs text-emf-green font-bold">
                                +{choice.xpGain} XP
                              </span>
                            )}
                            {/* Missing item badge */}
                            {!hasReq && requiredItemName && (
                              <span
                                className="text-xs uppercase border px-2 py-0.5 font-bold tracking-wider"
                                style={{ color: '#8a0b0b', borderColor: '#8a0b0b' }}
                              >
                                REQUIS: {requiredItemName}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
