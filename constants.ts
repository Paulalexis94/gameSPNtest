import { Item, Scene } from './types';

export const INITIAL_INVENTORY: Item[] = [
  { id: 'salt', name: 'Sel de Cuisine', description: 'Repousse les fantômes et les démons.' },
  { id: 'holy_water', name: 'Eau Bénite', description: 'Brûle les démons.' },
  { id: 'flashlight', name: 'Lampe Torche', description: 'Pour voir dans les ténèbres.' }
];

export const SCENES: Record<string, Scene> = {
  'start': {
    id: 'start',
    title: "L'Asile de Blackwater",
    text: "L'Impala s'arrête dans un crissement de pneus sur le gravier humide. Devant vous se dresse l'Asile de Blackwater, une bâtisse victorienne en ruine qui pue la mort et le soufre. Le vent hurle à travers les fenêtres brisées. Dean vérifie son chargeur de sel gemme. Sam consulte le journal de John. Deux entrées s'offrent à vous : la lourde porte principale en chêne, entrouverte, ou une grille rouillée menant à la cave sur le côté.",
    choices: [
      {
        text: "Enfoncer la porte principale (Bourrin)",
        nextSceneId: 'main_hall',
        healthImpact: 0
      },
      {
        text: "Passer par la cave (Discret)",
        nextSceneId: 'basement_entry',
        healthImpact: 0
      }
    ]
  },
  'main_hall': {
    id: 'main_hall',
    title: "Le Grand Hall",
    text: "Vous poussez la porte. Elle grince horriblement, résonnant dans tout le bâtiment. Mauvaise idée. À peine entrés, la température chute drastiquement. Vous voyez votre souffle. Un cri strident déchire l'air et une ombre fonce droit sur Dean !",
    choices: [
      {
        text: "Tirer au sel gemme !",
        nextSceneId: 'main_hall_combat_win',
        requiredItem: 'salt',
        removeItem: 'salt', // Consumes a bit of salt logic conceptually, though simplistic here
        healthImpact: -10
      },
      {
        text: "Esquiver !",
        nextSceneId: 'main_hall_combat_dodge',
        healthImpact: -25
      }
    ]
  },
  'basement_entry': {
    id: 'basement_entry',
    title: "La Cave Humide",
    text: "Vous forcez la grille et descendez dans l'obscurité. C'est calme... trop calme. L'air est lourd et sent la moisissure. Sam éclaire un vieux dossier médical posé sur un brancard. Soudain, la porte derrière vous se claque violemment.",
    choices: [
      {
        text: "Inspecter le dossier",
        nextSceneId: 'basement_clue',
        healthImpact: 0
      },
      {
        text: "Monter l'escalier vers le rez-de-chaussée",
        nextSceneId: 'main_hall_safe',
        healthImpact: 0
      }
    ]
  },
  'main_hall_combat_win': {
    id: 'main_hall_combat_win',
    title: "Esprit Repoussé",
    text: "Le coup de feu retentit. L'esprit se dissipe dans un hurlement de douleur éthérée. Dean se frotte l'épaule. 'J'ai horreur de cet endroit.' Vous êtes temporairement en sécurité dans le hall.",
    choices: [
      {
        text: "Chercher l'origine du froid",
        nextSceneId: 'cold_spot',
        healthImpact: 0
      }
    ]
  },
  'main_hall_combat_dodge': {
    id: 'main_hall_combat_dodge',
    title: "Coup Dur",
    text: "L'esprit traverse Dean, le projetant contre le mur. Il se relève en grimaçant, une marque de brûlure glaciale sur sa veste. Vous n'avez pas eu le temps de riposter.",
    choices: [
      {
        text: "Fuir vers l'étage",
        nextSceneId: 'upper_floor',
        healthImpact: 0
      }
    ]
  },
  'basement_clue': {
    id: 'basement_clue',
    title: "Le Dossier du Patient 0",
    text: "Le dossier parle d'un patient lobotomisé qui jurait entendre le Diable dans les murs. Il y a un plan des conduits d'aération griffonné au dos.",
    choices: [
      {
        text: "Suivre le plan",
        nextSceneId: 'vents',
        healthImpact: 0
      }
    ]
  },
  'main_hall_safe': {
    id: 'main_hall_safe',
    title: "Arrivée Discrète",
    text: "Vous émergez de la cave dans le hall principal sans faire de bruit. Vous apercevez une silhouette fantomatique qui patrouille près de l'escalier central. Elle ne vous a pas vus.",
    choices: [
      {
        text: "L'attaquer par surprise (Eau Bénite)",
        nextSceneId: 'banish_spirit',
        requiredItem: 'holy_water',
        healthImpact: 0
      },
      {
        text: "Se faufiler",
        nextSceneId: 'upper_floor',
        healthImpact: 0
      }
    ]
  },
  // Placeholder endpoints for demo
  'cold_spot': { id: 'cold_spot', title: "Fin de la Démo", text: "Vous avez survécu à l'introduction. À suivre...", choices: [] },
  'upper_floor': { id: 'upper_floor', title: "Fin de la Démo", text: "Vous atteignez l'étage. L'aventure continue...", choices: [] },
  'vents': { id: 'vents', title: "Fin de la Démo", text: "Vous rampez dans les conduits. L'aventure continue...", choices: [] },
  'banish_spirit': { id: 'banish_spirit', title: "Fin de la Démo", text: "L'eau bénite brûle l'esprit qui disparait. L'aventure continue...", choices: [] },
};