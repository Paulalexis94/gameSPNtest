export interface Item {
  id: string;
  name: string;
  description: string;
  lore?: string;
}

export interface Choice {
  text: string;
  nextSceneId: string;
  requiredItem?: string;
  removeItem?: string;
  addItem?: string;
  deanDamage?: number;
  samDamage?: number;
  healthImpact?: number; // legacy: appliqué à Dean
  xpGain?: number;
  addKnowledge?: string;
}

export type SceneArt =
  | 'impala'
  | 'research'
  | 'asylum_exterior'
  | 'dark_corridor'
  | 'basement'
  | 'ghost_encounter'
  | 'demon'
  | 'chapel'
  | 'records'
  | 'garden'
  | 'ritual'
  | 'victory'
  | 'game_over';

export interface Scene {
  id: string;
  title: string;
  text: string;
  sceneArt?: SceneArt;
  choices: Choice[];
}

export interface GameState {
  currentSceneId: string;
  health: { sam: number; dean: number };
  inventory: Item[];
  history: string[];
  xp: number;
  knowledge: string[];
}
