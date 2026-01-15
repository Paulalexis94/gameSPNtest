import React from 'react';

export interface Item {
  id: string;
  name: string;
  icon?: React.ReactNode;
  description: string;
}

export interface Choice {
  text: string;
  nextSceneId: string;
  requiredItem?: string; // ID of item required to choose this
  removeItem?: string; // ID of item removed upon choosing
  healthImpact?: number; // Negative for damage, positive for healing
}

export interface Scene {
  id: string;
  title: string;
  text: string;
  backgroundImage?: string;
  choices: Choice[];
}

export interface GameState {
  currentSceneId: string;
  health: {
    sam: number;
    dean: number;
  };
  inventory: Item[];
  history: string[]; // Log of previous scene IDs
}