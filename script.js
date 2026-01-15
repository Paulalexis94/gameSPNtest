// --- CONFIGURATION & DONNÉES ---

const INVENTORY_DB = {
    'salt': { name: 'Sel de Cuisine', icon: 'sparkles', desc: 'Repousse les fantômes.' },
    'holy_water': { name: 'Eau Bénite', icon: 'flask-conical', desc: 'Brûle les démons.' },
    'flashlight': { name: 'Lampe Torche', icon: 'flashlight', desc: 'Voir dans le noir.' },
    'shotgun': { name: 'Fusil', icon: 'crosshair', desc: 'Chargé au sel gemme.' }
};

const SCENES = {
    'start': {
        title: "L'Asile de Blackwater",
        text: "L'Impala s'arrête dans un crissement de pneus. L'Asile de Blackwater se dresse devant vous, une ruine victorienne puant la mort.\n\nDean arme son fusil. Sam vérifie le journal. Deux entrées possibles : la porte principale ou la cave.",
        choices: [
            { text: "Enfoncer la porte principale", next: 'main_hall' },
            { text: "Passer par la cave (Discret)", next: 'basement_entry' }
        ]
    },
    'main_hall': {
        title: "Le Grand Hall",
        text: "La porte grince. Mauvaise idée. La température chute brutalement. Un cri strident déchire l'air et une ombre fonce droit sur Dean !",
        choices: [
            { text: "Tirer au sel gemme !", next: 'combat_win', req: 'salt', remove: 'salt', dmg: 10 },
            { text: "Esquiver !", next: 'combat_dodge', dmg: 25 }
        ]
    },
    'basement_entry': {
        title: "La Cave",
        text: "Vous descendez dans l'obscurité. L'air est lourd. Sam éclaire un vieux dossier médical. La porte derrière vous claque violemment.",
        choices: [
            { text: "Lire le dossier", next: 'basement_clue' },
            { text: "Monter l'escalier", next: 'main_hall_safe' }
        ]
    },
    'combat_win': {
        title: "Esprit Repoussé",
        text: "Le coup part. L'esprit hurle et se dissipe. Dean se frotte l'épaule. 'J'ai horreur de cet endroit.' Vous êtes vivants.",
        choices: [
            { text: "Avancer vers le couloir", next: 'corridor' }
        ]
    },
    'combat_dodge': {
        title: "Impact",
        text: "L'esprit percute Dean et le projette contre le mur. Il se relève en grimaçant. Vous n'avez pas eu le temps de riposter.",
        choices: [
            { text: "Fuir vers le couloir", next: 'corridor' }
        ]
    },
    'basement_clue': {
        title: "Indice Trouvé",
        text: "Le dossier mentionne un patient qui entendait le Diable dans les murs. Un plan indique une cachette au grenier.",
        choices: [
            { text: "Aller au grenier", next: 'attic' }
        ]
    },
    'main_hall_safe': {
        title: "Infiltration",
        text: "Vous arrivez dans le hall sans bruit. Une ombre patrouille près de l'escalier. Elle ne vous a pas vus.",
        choices: [
            { text: "Attaque surprise (Eau Bénite)", next: 'banish_spirit', req: 'holy_water' },
            { text: "Se faufiler", next: 'corridor' }
        ]
    },
    'corridor': { title: "Couloir Sombre", text: "Les ombres s'allongent... (Fin de la démo)", choices: [] },
    'attic': { title: "Le Grenier", text: "Vous trouvez le pentacle de protection. (Fin de la démo)", choices: [] },
    'banish_spirit': { title: "Exorcisme", text: "L'eau bénite vaporise l'esprit. La voie est libre. (Fin de la démo)", choices: [] }
};

let gameState = {
    scene: 'start',
    inventory: ['salt', 'holy_water', 'flashlight'],
    health: { dean: 100, sam: 100 }
};

// --- LOGIQUE DOM ---

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation des icônes Lucide
    lucide.createIcons();
    initGame();
});

function initGame() {
    renderUI();
    loadScene(gameState.scene);
}

function renderUI() {
    // Update Health
    document.getElementById('dean-hp-text').textContent = `${gameState.health.dean}%`;
    document.getElementById('dean-hp-bar').style.width = `${gameState.health.dean}%`;
    
    document.getElementById('sam-hp-text').textContent = `${gameState.health.sam}%`;
    document.getElementById('sam-hp-bar').style.width = `${gameState.health.sam}%`;

    // Update Inventory
    const list = document.getElementById('inventory-list');
    list.innerHTML = '';
    
    if (gameState.inventory.length === 0) {
        list.innerHTML = '<span class="text-stone-600 italic text-sm">Sac vide...</span>';
    } else {
        gameState.inventory.forEach(itemId => {
            const item = INVENTORY_DB[itemId];
            if (item) {
                const div = document.createElement('div');
                div.className = 'flex items-center gap-3 p-3 border border-stone-600 bg-stone-900/50 rounded-sm';
                div.innerHTML = `
                    <i data-lucide="${item.icon}" class="text-parchment-dark w-4 h-4"></i>
                    <span class="text-sm font-bold tracking-widest uppercase text-parchment">${item.name}</span>
                `;
                list.appendChild(div);
            }
        });
    }
    // Re-render icons for new elements
    lucide.createIcons();
}

function loadScene(sceneId) {
    const scene = SCENES[sceneId];
    if (!scene) return;

    // Reset UI
    const titleEl = document.getElementById('scene-title');
    const textEl = document.getElementById('scene-text');
    const choicesEl = document.getElementById('choices-area');
    const cursor = document.getElementById('cursor');

    choicesEl.style.opacity = '0';
    choicesEl.innerHTML = ''; // Clear previous choices
    
    titleEl.textContent = scene.title;
    textEl.textContent = '';
    cursor.style.display = 'inline';

    // Typewriter
    let i = 0;
    const speed = 20;
    
    function type() {
        if (i < scene.text.length) {
            textEl.textContent += scene.text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            cursor.style.display = 'none';
            renderChoices(scene.choices);
        }
    }
    type();
}

function renderChoices(choices) {
    const choicesEl = document.getElementById('choices-area');
    choicesEl.innerHTML = '';

    if (!choices || choices.length === 0) {
        const btn = createChoiceBtn("Recommencer la chasse", true, () => location.reload());
        choicesEl.appendChild(btn);
    } else {
        choices.forEach(choice => {
            const hasReq = !choice.req || gameState.inventory.includes(choice.req);
            let text = choice.text;
            
            const btn = createChoiceBtn(text, hasReq, () => makeChoice(choice));
            
            if (choice.req && !hasReq) {
                const reqName = INVENTORY_DB[choice.req]?.name || choice.req;
                const badge = document.createElement('span');
                badge.className = "text-xs text-blood-red border border-blood-red px-2 py-1 ml-2 uppercase";
                badge.textContent = `Requis: ${reqName}`;
                btn.firstChild.appendChild(badge); // Add badge to the flex container inside button
            }
            
            choicesEl.appendChild(btn);
        });
    }

    // Fade In
    choicesEl.style.opacity = '1';
}

function createChoiceBtn(text, enabled, onClick) {
    const btn = document.createElement('button');
    btn.className = `
        relative p-4 text-left border-2 transition-all flex justify-between items-center
        ${enabled 
            ? 'border-stone-700 bg-stone-900/80 hover:bg-[#1a1a1a] hover:border-blood-red hover:pl-6 text-parchment cursor-pointer' 
            : 'border-stone-900 bg-black/50 text-stone-700 cursor-not-allowed decoration-line-through'}
    `;
    btn.innerHTML = `<span class="uppercase tracking-wider font-special-elite">${text}</span>`;
    
    if (enabled) {
        btn.onclick = onClick;
    } else {
        btn.disabled = true;
    }
    return btn;
}

function makeChoice(choice) {
    // Inventory logic
    if (choice.remove) {
        const idx = gameState.inventory.indexOf(choice.remove);
        if (idx > -1) gameState.inventory.splice(idx, 1);
    }

    // Health logic
    if (choice.dmg) {
        gameState.health.dean -= choice.dmg; // Simplified damage to Dean
        if (gameState.health.dean < 0) gameState.health.dean = 0;
    }

    renderUI();

    if (gameState.health.dean <= 0 && gameState.health.sam <= 0) {
        gameOver();
    } else {
        gameState.scene = choice.next;
        loadScene(gameState.scene);
    }
}

function gameOver() {
    const titleEl = document.getElementById('scene-title');
    const textEl = document.getElementById('scene-text');
    const choicesEl = document.getElementById('choices-area');

    titleEl.textContent = "MORTS AU COMBAT";
    titleEl.className = "text-2xl text-blood-red font-bold border-b border-stone-800 w-full pb-2";
    textEl.textContent = "La chasse est finie.";
    choicesEl.innerHTML = '';
    
    const btn = createChoiceBtn("Ressusciter", true, () => location.reload());
    choicesEl.appendChild(btn);
    choicesEl.style.opacity = '1';
}