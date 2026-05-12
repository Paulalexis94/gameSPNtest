import { Item, Scene } from './types';

export const INITIAL_INVENTORY: Item[] = [
  { id: 'emf_meter', name: 'Détecteur EMF', description: 'Détecte les entités surnaturelles.', lore: 'Fabriqué par Dean depuis un vieux walkman.' },
  { id: 'iron_rod', name: 'Tisonnier en Fer Forgé', description: 'Le contact disperse temporairement un esprit.', lore: 'Le fer pur est une faiblesse universelle des esprits.' },
  { id: 'salt', name: 'Sel Gemme & Cartouches', description: 'Repousse les esprits. Indispensable pour les rituels.', lore: 'Cartouches de sel et sacs de sel gemme.' },
  { id: 'holy_water', name: 'Eau Bénite', description: 'Brûle les démons. Inefficace sur les esprits.', lore: 'Ne pas confondre avec une arme anti-fantôme.' },
  { id: 'john_journal', name: 'Journal de John Winchester', description: 'Contient exorcismes et rituels de chasse.', lore: "L'exorcisme complet prend 2 minutes à lire." },
  { id: 'flashlight', name: 'Lampe Torche', description: 'Indispensable dans les endroits sombres.' },
];

export const ITEM_DB: Record<string, Item> = {
  ...Object.fromEntries(INITIAL_INVENTORY.map(i => [i.id, i])),
  harrow_file: { id: 'harrow_file', name: 'Dossier Harrow', description: 'Dossier médical 1947. Révèle où sont dispersées les cendres.', lore: 'Patient #0047-H. Harrow, Elliot J. Décédé 14 mars 1947.' },
};

export const HUNTER_RANKS = [
  { minXp: 0, title: 'Novice' },
  { minXp: 50, title: 'Chasseur' },
  { minXp: 150, title: 'Vétéran' },
  { minXp: 300, title: 'Légende' },
];

export function getHunterRank(xp: number): string {
  return [...HUNTER_RANKS].reverse().find(r => xp >= r.minXp)?.title ?? 'Novice';
}

export const SCENES: Record<string, Scene> = {
  start: {
    id: 'start', title: "Motel Pike's Creek — Millhaven, Kansas", sceneArt: 'impala',
    text: "L'Impala est garée devant un motel miteux sur la Route 9. Dean finit son burger, les pieds sur la table. Sam lève les yeux de son laptop.\n\n\"Troisième mort en deux semaines près de l'Asile de Blackwater. Yeux grands ouverts, terreur pure. Pas de blessures.\" Sam tourne l'écran. \"Bobby pense que c'est surnaturel.\"\n\nDean pose son burger. \"Un asile abandonné. Évidemment.\" Il attrape ses clés. \"On creuse le dossier ou on fonce ?\"",
    choices: [
      { text: "Fouiller les archives — Sam veut savoir à qui on a affaire", nextSceneId: 'research_phase', xpGain: 10, addKnowledge: "Cas actif : morts inexpliquées près de l'Asile de Blackwater, Millhaven KS." },
      { text: "Foncer directement à l'asile", nextSceneId: 'arrive_asylum' },
    ],
  },

  research_phase: {
    id: 'research_phase', title: 'Archives du Comté de Douglas', sceneArt: 'research',
    text: "Sam tape. Dean appelle Bobby. Une heure plus tard, le tableau est complet.\n\n\"Dr. Elliot Harrow. Chirurgien-chef de Blackwater de 1938 à 1947.\" Sam affiche une photo noir et blanc. \"Il pratiquait des lobotomies sans anesthésie sur des patients qu'il croyait possédés. Sept morts. En mars 1947, un patient lui a arraché le larynx.\"\n\n\"Incinéré après ça ?\" demande Dean.\n\n\"Oui. Ses cendres dispersées dans le jardin est de l'asile. Jamais enterrées correctement. Jamais de paix.\" Sam ferme le laptop. \"C'est pour ça qu'il est encore là.\"",
    choices: [
      { text: "Partir vers l'asile — on est prêts", nextSceneId: 'arrive_asylum', addItem: 'harrow_file', xpGain: 25, addKnowledge: "Cible : Dr. Harrow. Cendres dans le jardin est, ancien parterre de roses. Sel + feu = solution permanente." },
    ],
  },

  arrive_asylum: {
    id: 'arrive_asylum', title: "L'Asile de Blackwater — 23h14", sceneArt: 'asylum_exterior',
    text: "L'Impala coupe ses phares à cent mètres. Le bâtiment est une masse gothique découpée sur un ciel d'orage. Des fenêtres à ogives barricadées. Une grande porte en chêne entrouverte comme une bouche.\n\nL'air sent le soufre et quelque chose de vieux, de mort. Dean sort le tisonnier de fer. Sam sort l'EMF.\n\n\"Tu le sens ?\" murmure Sam. \"Le soufre ?\"\n\n\"Ouais.\" Dean regarde la porte, puis la grille rouillée menant à la cave. \"Mauvais signe. Deux entrées.\"",
    choices: [
      { text: "Scanner le périmètre avec l'EMF", nextSceneId: 'emf_scan', requiredItem: 'emf_meter', xpGain: 15, addKnowledge: "EMF confirme une présence surnaturelle puissante. Signal le plus fort côté jardin est." },
      { text: "Enfoncer la porte principale", nextSceneId: 'main_hall' },
      { text: "Passer par la grille de la cave", nextSceneId: 'basement_entry' },
    ],
  },

  emf_scan: {
    id: 'emf_scan', title: 'Scan EMF — Périmètre', sceneArt: 'asylum_exterior',
    text: "Sam allume l'EMF — le walkman modifié de Dean. L'aiguille bondit dans le rouge dès qu'il pointe vers l'asile, grésillement continu.\n\nIl pivote vers le jardin est. L'aiguille sort de la zone rouge.\n\n\"L'épicentre est dans le jardin,\" dit Sam. \"Quelque chose l'ancre ici.\"\n\nDean hoche la tête. \"Les cendres, si tu as fait tes devoirs.\" Il regarde l'asile. \"On entre par où ?\"",
    choices: [
      { text: "Par la porte principale", nextSceneId: 'main_hall' },
      { text: "Par la grille de la cave", nextSceneId: 'basement_entry' },
    ],
  },

  main_hall: {
    id: 'main_hall', title: 'Le Grand Hall — Attaque', sceneArt: 'ghost_encounter',
    text: "La porte grince horriblement. L'écho résonne dans tout le bâtiment vide. À peine deux pas franchis, la température chute de vingt degrés. L'EMF de Sam explose.\n\nUne ombre en blouse blanche — visage délavé, yeux noirs comme du charbon — jaillit du plafond en direction de Dean.\n\n\"DEAN !\"",
    choices: [
      { text: "Frapper avec le tisonnier de fer !", nextSceneId: 'iron_strike', requiredItem: 'iron_rod', deanDamage: 5, xpGain: 20, addKnowledge: "Le fer forgé disperse le fantôme temporairement. Il reviendra." },
      { text: "Tirer une cartouche de sel !", nextSceneId: 'salt_shot_hall', requiredItem: 'salt', removeItem: 'salt', deanDamage: 15, xpGain: 15 },
      { text: "Esquiver !", nextSceneId: 'dodge_hit', deanDamage: 35, samDamage: 10 },
    ],
  },

  iron_strike: {
    id: 'iron_strike', title: 'Fer Contre Esprit', sceneArt: 'dark_corridor',
    text: "Dean pivote et amène le tisonnier en arc de cercle. Le métal traverse l'apparition avec un craquement électrique et une lumière blanche. Le Dr. Harrow se disloque en fragments qui s'évaporent.\n\n\"Il reviendra,\" dit Sam. \"Le fer le disperse, ça ne le détruit pas. Dix minutes max.\"\n\nDean tient son tisonnier prêt. \"Alors on fait vite.\"",
    choices: [
      { text: "Descendre à la cave", nextSceneId: 'basement_entry', xpGain: 5 },
      { text: "Aller vers la chapelle", nextSceneId: 'chapel', xpGain: 5 },
      { text: "Sortir vers le jardin", nextSceneId: 'garden_door', xpGain: 5 },
    ],
  },

  salt_shot_hall: {
    id: 'salt_shot_hall', title: 'Tir au Sel', sceneArt: 'dark_corridor',
    text: "Sam tire. La détonation est assourdissante. Le sel traverse le fantôme en explosant en lumière blanche — Harrow hurle et se désintègre.\n\nMais pendant cette fraction de seconde, une main glaciale a traversé la veste de Dean.\n\n\"Plus de cartouches de sel,\" dit Sam en rechargeant. \"On doit trouver les cendres et les brûler.\"",
    choices: [
      { text: "Descendre à la cave", nextSceneId: 'basement_entry', xpGain: 5 },
      { text: "Aller directement au jardin", nextSceneId: 'garden_door', xpGain: 5 },
    ],
  },

  dodge_hit: {
    id: 'dodge_hit', title: 'Coup Direct', sceneArt: 'ghost_encounter',
    text: "Dean plonge sur le côté, mais pas assez vite. Le Dr. Harrow le traverse — mille aiguilles de glace. Dean s'effondre contre le mur.\n\nSam le tire par le bras. \"Dean ! Dean, regarde-moi !\"\n\nLe fantôme vire vers Sam. \"Cave ! crie Dean entre ses dents. La cave — maintenant !\"",
    choices: [
      { text: "Se replier vers la cave", nextSceneId: 'basement_entry' },
    ],
  },

  basement_entry: {
    id: 'basement_entry', title: 'La Cave', sceneArt: 'basement',
    text: "Les marches grincent sous leurs pas. La cave est immense — rangées de civières rouillées, salles de bains carrelées tachées de brun. Des tuyaux courent au plafond.\n\nLa lampe de Dean balaie l'espace. À gauche, une porte entrouverte sur ce qui ressemble à une salle d'archives. À droite, le grondement sourd d'une ancienne chaufferie.\n\nL'EMF gresille doucement. Harrow est quelque part ici.",
    choices: [
      { text: "Inspecter la salle d'archives", nextSceneId: 'records_room', xpGain: 10 },
      { text: "Vérifier la chaufferie", nextSceneId: 'furnace_room', xpGain: 10 },
    ],
  },

  records_room: {
    id: 'records_room', title: 'Salle des Archives', sceneArt: 'records',
    text: "Des classeurs renversés, des centaines de dossiers éparpillés. Sam fouille méthodiquement. Au bout de cinq minutes, il trouve un carton dans le fond — estampillé CONFIDENTIEL : ACCÈS RESTREINT.\n\nÀ l'intérieur : dossier épais. Patient #0047-H. Harrow, Elliot J. Sur la couverture, griffonné au crayon rouge : DANGEREUX.\n\n\"On a notre fantôme,\" dit Sam.",
    choices: [
      { text: "Lire le dossier", nextSceneId: 'read_harrow_file', addItem: 'harrow_file', xpGain: 20, addKnowledge: "Dossier de Harrow récupéré." },
    ],
  },

  read_harrow_file: {
    id: 'read_harrow_file', title: 'Dossier #0047-H', sceneArt: 'records',
    text: "Sam lit à voix haute pendant que Dean éclaire les pages.\n\n\"Lobotomies et électrochocs sans anesthésie. Sept patients tués entre 1940 et 1947. Il était convaincu qu'ils étaient possédés par des démons. En mars 1947, le patient 34-A lui a arraché le larynx pendant une séance.\"\n\n\"Le pire, c'est qu'il avait peut-être raison sur certains d'eux,\" dit Dean doucement.\n\n\"Ses cendres sont dans le jardin est. Parterre de roses, côté est.\" Sam ferme le dossier. \"Il pense toujours soigner des possédés. Il ne réalise pas qu'il est mort.\"\n\n\"Le jardin. On le brûle.\"",
    choices: [
      { text: "Aller directement au jardin", nextSceneId: 'garden_door', xpGain: 30, addKnowledge: "Harrow croit encore soigner des possédés. Cendres : parterre de roses, jardin est. Sel + feu = fin définitive." },
      { text: "Explorer la chaufferie d'abord", nextSceneId: 'furnace_room', xpGain: 5 },
    ],
  },

  furnace_room: {
    id: 'furnace_room', title: 'La Chaufferie', sceneArt: 'basement',
    text: "Une énorme chaudière industrielle silencieuse depuis des décennies. Dean éclaire les murs.\n\nPartout — gravés dans le métal et le béton — des pentagrammes, des cercles de contrainte, des chiffres répétés. Une inscription : \"Que les démons brûlent et que les âmes soient libres.\"\n\n\"Harrow dessine ça depuis sa mort,\" dit Sam doucement. \"Même comme fantôme, il continue ses exorcismes.\" Il déchiffre une autre ligne. \"Il est sincère, Dean. Dans sa tête, il sauve le monde.\"\n\nDean baisse sa lampe. Ça ne change rien à ce qu'ils doivent faire.",
    choices: [
      { text: "Remonter vers le hall principal", nextSceneId: 'hall_cleared', xpGain: 10, addKnowledge: "Harrow grave des symboles dans la chaufferie depuis sa mort. Il croit sincèrement chasser des démons." },
    ],
  },

  hall_cleared: {
    id: 'hall_cleared', title: 'Hall Principal', sceneArt: 'dark_corridor',
    text: "Vous remontez dans le hall. Pour l'instant, aucune trace d'Harrow — mais l'EMF ne se tait pas totalement.\n\nDevant vous : l'escalier vers l'étage, une porte marquée CHAPELLE à droite, et la porte de service menant au jardin.",
    choices: [
      { text: "Entrer dans la chapelle", nextSceneId: 'chapel', xpGain: 5 },
      { text: "Sortir vers le jardin", nextSceneId: 'garden_door', xpGain: 5 },
    ],
  },

  chapel: {
    id: 'chapel', title: 'La Chapelle', sceneArt: 'chapel',
    text: "La chapelle est l'endroit le plus intact de l'asile. Bancs droits, autel au fond, vitraux fracassés.\n\nMais l'odeur — soufre. Fort. Trop fort pour un fantôme. Et la température monte — l'inverse d'une présence fantomatique.\n\nDes yeux noirs s'allument dans l'ombre derrière l'autel. Une femme, la quarantaine, voix deux octaves trop basse.\n\n\"Les petits Winchester.\" Elle sourit. \"Je m'appelle Corvan. Et j'ai été... encourageant le bon docteur. Son désespoir est si nourrissant.\"",
    choices: [
      { text: "Exorciser le démon !", nextSceneId: 'exorcism_start', requiredItem: 'john_journal', xpGain: 20 },
      { text: "Lancer l'eau bénite !", nextSceneId: 'holy_water_attack', requiredItem: 'holy_water', removeItem: 'holy_water', deanDamage: 20, samDamage: 10, xpGain: 10, addKnowledge: "L'eau bénite brûle les démons mais ne les détruit pas." },
      { text: "Fuir la chapelle !", nextSceneId: 'flee_chapel', deanDamage: 15, samDamage: 15 },
    ],
  },

  exorcism_start: {
    id: 'exorcism_start', title: 'Exorcisme', sceneArt: 'chapel',
    text: "Dean ouvre le journal de John et commence à lire en latin.\n\n\"Exorcizamus te, omnis immunde spiritus—\"\n\nCorvan hurle. Pas avec une voix humaine — avec quelque chose d'ancien. Elle lève la main et Dean est projeté contre le mur. Sam rattrape le journal et continue, la voix ferme malgré le sang au coin de la lèvre.\n\n\"—omnis satanica potestas, omnis incursio infernalis adversarii—\"\n\nCorvan s'agenouille involontairement. La fumée noire commence à sortir de sa bouche.",
    choices: [
      { text: "Finir l'exorcisme — tenir bon !", nextSceneId: 'exorcism_success', removeItem: 'john_journal', deanDamage: 20, xpGain: 50, addKnowledge: "Démon Corvan exorcisé. Il utilisait Harrow comme outil de terreur." },
    ],
  },

  exorcism_success: {
    id: 'exorcism_success', title: 'Démon Expulsé', sceneArt: 'dark_corridor',
    text: "La fumée noire jaillit de la bouche de l'hôte en torrent vrillant, remonte le long des murs, disparaît dans le sol avec un hurlement qui s'éteint.\n\nLa femme s'effondre. Dean la rattrape. Elle respire — vivante, confuse, libérée.\n\n\"Où suis-je ?\" Elle regarde ses mains tremblantes.\n\n\"Tout va bien,\" dit Sam. Il regarde Dean. \"Mais on a encore du boulot.\"",
    choices: [
      { text: "Emmener la civile à l'Impala et aller au jardin", nextSceneId: 'garden_door', xpGain: 15 },
    ],
  },

  holy_water_attack: {
    id: 'holy_water_attack', title: 'Eau Bénite', sceneArt: 'chapel',
    text: "Sam lance le flacon. L'eau bénite touche Corvan en plein visage — la peau fume, elle hurle, recule.\n\nMais elle récupère en secondes. Furieuse, elle projette Dean contre l'autel d'un geste de la main.\n\n\"Vous ne faites que me chatouiller.\" Elle recrache quelque chose de noir. \"Et maintenant vous êtes à court.\"\n\nSam saisit Dean. \"On y va !\"",
    choices: [
      { text: "Fuir vers le jardin", nextSceneId: 'garden_door', xpGain: 5 },
    ],
  },

  flee_chapel: {
    id: 'flee_chapel', title: 'Fuite', sceneArt: 'dark_corridor',
    text: "Ils courent. Corvan les poursuit dans le hall, ricanant.\n\nSam tire la porte de service. L'air froid de la nuit les accueille. Corvan s'arrête au seuil — quelque chose la retient à l'intérieur.\n\n\"Allez brûler votre fantôme,\" lance-t-elle. \"Je serai là quand vous reviendrez.\"",
    choices: [
      { text: "Aller au jardin", nextSceneId: 'garden_door' },
    ],
  },

  garden_door: {
    id: 'garden_door', title: 'Le Jardin — Cour Arrière', sceneArt: 'garden',
    text: "La porte de service débouche sur une cour envahie par la végétation. Une clôture en fer délimite l'ancien jardin des patients — rosiers morts, herbes hautes.\n\nL'EMF s'emballe. L'épicentre est là, côté droit, vers les vieux rosiers.\n\n\"Les cendres sont quelque part là-dedans,\" dit Dean en sortant son sel.",
    choices: [
      { text: "Localiser avec l'EMF", nextSceneId: 'emf_locate_ashes', requiredItem: 'emf_meter', xpGain: 15 },
      { text: "Se fier au dossier Harrow", nextSceneId: 'ritual_site', requiredItem: 'harrow_file', xpGain: 10 },
      { text: "Chercher à vue", nextSceneId: 'search_garden', xpGain: 5 },
    ],
  },

  emf_locate_ashes: {
    id: 'emf_locate_ashes', title: 'Signal Maximum', sceneArt: 'garden',
    text: "Sam balaie le jardin méthodiquement. Le signal monte progressivement. Il s'agenouille près d'une section de sol nu entre les vieux rosiers — l'aiguille sort du cadran.\n\n\"Ici. Les cendres sont à dix centimètres sous la surface.\"\n\nDean sort le sel. Le Zippo est dans sa poche depuis quinze ans.",
    choices: [
      { text: "Préparer le rituel sel & feu", nextSceneId: 'salt_burn_ritual', xpGain: 10 },
    ],
  },

  ritual_site: {
    id: 'ritual_site', title: 'Le Parterre de Roses', sceneArt: 'garden',
    text: "Selon le dossier, les cendres ont été dispersées \"dans le parterre est, parmi les roses rouges plantées par Harrow en 1942.\"\n\nDean repère les rosiers les plus anciens — des souches mortes en rangée régulière. Zone centrale, cinq mètres carrés.\n\n\"T'as fait tes devoirs,\" dit-il à Sam avec un sourire de côté. Sam répond avec un regard éloquent.",
    choices: [
      { text: "Préparer le rituel sel & feu", nextSceneId: 'salt_burn_ritual', xpGain: 10 },
    ],
  },

  search_garden: {
    id: 'search_garden', title: 'Fouille à Vue', sceneArt: 'garden',
    text: "Dix minutes de ratissage. Trop long. L'EMF gresille partout sans précision.\n\nPuis le froid revient. Le Dr. Harrow descend du ciel comme une chute d'eau glaciale.\n\n\"Je vous vois. Vous portez le Mal en vous. Je dois vous soigner.\"\n\nDean esquive la première attaque de justesse.",
    choices: [
      { text: "Frapper le fantôme pour gagner du temps", nextSceneId: 'search_garden_fight', requiredItem: 'iron_rod', deanDamage: 10, xpGain: 10 },
      { text: "Ignorer et chercher vite — prendre les coups", nextSceneId: 'search_garden_fight', deanDamage: 30, samDamage: 15, xpGain: 5 },
    ],
  },

  search_garden_fight: {
    id: 'search_garden_fight', title: 'Sam Trouve la Zone', sceneArt: 'ghost_encounter',
    text: "Sam pointe l'EMF dans toutes les directions pendant que Dean tient le fantôme à distance. Chaque coup de tisonnier disperse Harrow pour quelques secondes.\n\n\"SAM !\"\n\n\"J'ai ! J'ai quelque chose !\" L'EMF bondit au maximum sur un point précis dans les rosiers. \"ICI !\"\n\nDean attrape le sel d'une main, le Zippo de l'autre.",
    choices: [
      { text: "Exécuter le rituel immédiatement", nextSceneId: 'salt_burn_ritual', xpGain: 10 },
    ],
  },

  salt_burn_ritual: {
    id: 'salt_burn_ritual', title: 'Sel & Feu — Le Rituel', sceneArt: 'ritual',
    text: "Dean verse le sel en cercle sur la zone identifiée. Sam ferme le cercle. La procédure est simple et définitive : sel sur les cendres, puis feu.\n\nDean sort son Zippo — le même depuis quinze ans, un pentagramme de protection gravé par John quand ils étaient gamins.\n\nIl l'approche du sol salé.\n\nEt à ce moment, le Dr. Harrow se matérialise au-dessus d'eux, grandissant, deux mètres d'ombre projetant un froid absolu. Sa voix plonge dans les basses.\n\n\"Non... non... MES CENDRES—\"",
    choices: [
      { text: "Allumer le feu — tenir bon !", nextSceneId: 'ritual_climax', deanDamage: 15, samDamage: 10, xpGain: 30 },
    ],
  },

  ritual_climax: {
    id: 'ritual_climax', title: 'La Combustion', sceneArt: 'ritual',
    text: "La flamme prend. Bleu d'abord, puis orange vif. Le sol rougit. Les cendres brûlent.\n\nHarrow se tord — un hurlement brise une fenêtre. Il fonce sur Sam, Dean interpose le tisonnier. L'esprit se disperse, se reforme, plus petit déjà. La combustion travaille.\n\nEncore et encore. Sa forme s'affaiblit. Sa voix faiblit.\n\n\"Je voulais juste... les sauver.\"\n\nPuis il n'est plus rien. Juste le crépitement du feu dans la nuit froide du Kansas.",
    choices: [
      { text: "Laisser le feu se consumer — case closed", nextSceneId: 'victory', xpGain: 50 },
    ],
  },

  victory: {
    id: 'victory', title: 'Dossier #34-B — Résolu', sceneArt: 'victory',
    text: "Le feu s'éteint quand il n'y a plus rien à brûler. L'EMF émet un dernier bip et s'arrête.\n\nDean regarde les cendres refroidies, les mains dans les poches. \"Corvan est partie aussi. Les démons restent pas quand ils perdent leur source de chaos.\" Il ne finit pas sa phrase.\n\nIls retournent à l'Impala sans un mot. Dean démarre. Kansas City FM joue Led Zeppelin.\n\nL'Asile de Blackwater est silencieux pour la première fois depuis soixante-dix ans.\n\n— Dossier #34-B : RÉSOLU —",
    choices: [],
  },

  game_over: {
    id: 'game_over', title: 'TOMBÉS AU COMBAT', sceneArt: 'game_over',
    text: "Le Dr. Harrow les regarde d'en haut, sa forme lumineuse et froide ne laissant plus aucun doute sur l'issue.\n\nSam est à terre. Dean essaie de se relever. Il n'y parvient pas.\n\nDeux chasseurs qui n'ont pas complété la chasse cette nuit.\n\nCe n'est pas la fin des Winchester. C'est juste... une mauvaise nuit.\n\n— La chasse est finie pour ce soir —",
    choices: [],
  },
};
