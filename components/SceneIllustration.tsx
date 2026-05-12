import React from 'react';
import { SceneArt } from '../types';

const Impala = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fffde7" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#fffde7" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="motelGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#ff6b00" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="180" fill="#080808"/>
    <rect width="600" height="100" fill="#0d0d1a"/>
    {[...Array(40)].map((_, i) => (
      <circle key={i} cx={(i * 157) % 600} cy={(i * 43) % 90} r={i % 3 === 0 ? 1.5 : 0.8} fill="white" opacity={0.4 + (i % 5) * 0.1}/>
    ))}
    <circle cx="480" cy="40" r="22" fill="#fffde7" opacity="0.15"/>
    <circle cx="480" cy="40" r="14" fill="#fffde7" opacity="0.7"/>
    <ellipse cx="450" cy="38" rx="28" ry="14" fill="#1a1a2e" opacity="0.85"/>
    <rect x="0" y="130" width="600" height="50" fill="#111"/>
    <rect x="0" y="128" width="600" height="6" fill="#1c1c1c"/>
    <line x1="0" y1="153" x2="600" y2="153" stroke="#222" strokeWidth="2" strokeDasharray="30,20"/>
    <rect x="30" y="80" width="90" height="55" fill="#1a0a00" rx="2"/>
    <rect x="35" y="75" width="80" height="8" fill="#c45a00" opacity="0.8"/>
    <text x="75" y="70" fill="#ff6b00" fontSize="10" textAnchor="middle" fontFamily="monospace" opacity="0.9">MOTEL</text>
    <rect x="28" y="77" width="94" height="60" fill="url(#motelGlow)" opacity="0.4"/>
    <rect x="42" y="88" width="18" height="25" fill="#c45a00" opacity="0.4"/>
    <rect x="68" y="88" width="18" height="25" fill="#c45a00" opacity="0.3"/>
    <path d="M120 138 L140 128 L260 122 L380 122 L480 126 L510 132 L510 145 L120 145 Z" fill="#0a0a0a"/>
    <path d="M150 128 L170 118 L330 114 L420 116 L460 120 L460 128 L150 128 Z" fill="#111"/>
    <rect x="120" y="138" width="390" height="8" fill="#0d0d0d"/>
    <circle cx="175" cy="142" r="7" fill="#050505" stroke="#222" strokeWidth="1"/>
    <circle cx="455" cy="142" r="7" fill="#050505" stroke="#222" strokeWidth="1"/>
    <rect x="290" y="124" width="30" height="6" fill="#1a1a00" rx="1"/>
    <rect x="292" y="125" width="26" height="4" fill="#3a3000" opacity="0.7"/>
    <rect x="160" y="119" width="50" height="12" fill="#1a1000" rx="1" opacity="0.6"/>
    <rect x="390" y="121" width="50" height="10" fill="#1a1000" rx="1" opacity="0.6"/>
    <rect x="132" y="130" width="15" height="3" fill="#5a4a00" opacity="0.8" rx="1"/>
    <rect x="487" y="130" width="15" height="3" fill="#3a3000" opacity="0.8" rx="1"/>
  </svg>
);

const Research = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="180" fill="#080808"/>
    <rect x="150" y="60" width="300" height="100" fill="#0f1520" rx="8"/>
    <rect x="155" y="65" width="290" height="90" fill="#1a2535" rx="6"/>
    <rect x="160" y="70" width="280" height="80" fill="#0a1628" rx="4"/>
    <rect x="165" y="75" width="270" height="70" fill="#1e3a5f" rx="2" opacity="0.8"/>
    {[...Array(8)].map((_, i) => (
      <rect key={i} x={170} y={80 + i * 8} width={80 + (i % 3) * 40} height={4} fill="#dccfbf" opacity={0.15 + (i % 2) * 0.1} rx="1"/>
    ))}
    <rect x="250" y="78" width="60" height="40" fill="#e8f4f8" opacity="0.6" rx="2"/>
    <rect x="255" y="83" width="50" height="6" fill="#7ab8d4" opacity="0.8" rx="1"/>
    <rect x="255" y="92" width="35" height="4" fill="#9ecce0" opacity="0.6" rx="1"/>
    <rect x="255" y="99" width="42" height="4" fill="#9ecce0" opacity="0.5" rx="1"/>
    <rect x="148" y="155" width="310" height="8" fill="#0a0a0a" rx="4"/>
    <rect x="50" y="110" width="80" height="55" fill="#1a1000" rx="2" transform="rotate(-8 50 110)"/>
    <rect x="55" y="115" width="70" height="4" fill="#dccfbf" opacity="0.2" rx="1" transform="rotate(-8 50 110)"/>
    <rect x="55" y="122" width="55" height="3" fill="#dccfbf" opacity="0.15" rx="1" transform="rotate(-8 50 110)"/>
    <rect x="460" y="105" width="80" height="55" fill="#1a1000" rx="2" transform="rotate(5 460 105)"/>
    <rect x="465" y="112" width="65" height="4" fill="#dccfbf" opacity="0.2" rx="1" transform="rotate(5 460 105)"/>
    <ellipse cx="90" cy="145" rx="25" ry="12" fill="#3a2000" opacity="0.9"/>
    <ellipse cx="90" cy="140" rx="20" ry="10" fill="#5a3500"/>
    <ellipse cx="90" cy="138" rx="18" ry="8" fill="#2a1500" opacity="0.8"/>
    <rect x="0" y="0" width="600" height="180" fill="black" opacity="0.4"/>
    <rect x="155" y="65" width="290" height="90" fill="#4a8fce" opacity="0.05" rx="6"/>
  </svg>
);

const AsylumExterior = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="moonBg" cx="75%" cy="20%" r="30%">
        <stop offset="0%" stopColor="#1a1a2e" stopOpacity="1"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="1"/>
      </radialGradient>
    </defs>
    <rect width="600" height="180" fill="url(#moonBg)"/>
    <ellipse cx="460" cy="30" rx="60" ry="25" fill="#1c1c2e" opacity="0.9"/>
    <ellipse cx="510" cy="25" rx="40" ry="20" fill="#1a1a2e" opacity="0.8"/>
    <circle cx="480" cy="28" r="18" fill="#fffde7" opacity="0.7"/>
    <ellipse cx="495" cy="26" rx="20" ry="12" fill="#1c1a2a" opacity="0.75"/>
    <path d="M50 100 L50 30 L60 30 L60 20 L65 15 L70 20 L70 30 L130 30 L130 20 L135 15 L140 20 L140 30 L200 30 L200 100 Z" fill="#0d0d0d"/>
    <path d="M200 100 L200 25 L210 25 L215 15 L220 25 L270 25 L275 15 L280 25 L350 25 L355 15 L360 25 L400 25 L400 100 Z" fill="#111"/>
    <path d="M400 100 L400 40 L420 40 L420 20 L440 5 L460 20 L460 40 L550 40 L550 100 Z" fill="#0d0d0d"/>
    <rect x="440" y="5" width="2" height="100" fill="#0a0a0a"/>
    {[[80,50,18,30],[110,50,18,30],[230,40,15,28],[290,40,15,28],[320,40,15,28],[430,50,14,25],[470,50,14,25]].map(([x,y,w,h],i) => (
      <g key={i}>
        <path d={`M${x} ${y+h} L${x} ${y+6} Q${x+w/2} ${y} ${x+w} ${y+6} L${x+w} ${y+h} Z`} fill="#0a0506"/>
        <path d={`M${x+2} ${y+h} L${x+2} ${y+7} Q${x+w/2} ${y+2} ${x+w-2} ${y+7} L${x+w-2} ${y+h} Z`} fill="#150808" opacity="0.5"/>
      </g>
    ))}
    <rect x="0" y="135" width="600" height="45" fill="#080808"/>
    {[...Array(20)].map((_, i) => (
      <g key={i}>
        <rect x={i * 31} y="100" width="3" height="35" fill="#1a1a1a"/>
        <polygon points={`${i*31+1.5},100 ${i*31-1},97 ${i*31+4},97`} fill="#222"/>
      </g>
    ))}
    <path d="M200 60 L210 40 L215 55 L220 38 L225 52 L230 42 L235 60 Z" fill="white" opacity="0.7"/>
    <path d="M380 80 L387 65 L390 75 L393 62 L396 73 L400 66 L404 80 Z" fill="white" opacity="0.5"/>
  </svg>
);

const DarkCorridor = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="corridorLight" cx="50%" cy="50%" r="15%">
        <stop offset="0%" stopColor="#fffde7" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="180" fill="#080808"/>
    <polygon points="0,0 600,0 400,180 200,180" fill="#0d0d0d"/>
    <polygon points="0,0 100,0 200,180 0,180" fill="#111"/>
    <polygon points="500,0 600,0 600,180 400,180" fill="#111"/>
    <polygon points="100,0 500,0 400,180 200,180" fill="#0f0f0f"/>
    <polygon points="130,0 470,0 390,180 210,180" fill="#0a0a0a"/>
    <polygon points="160,0 440,0 380,180 220,180" fill="#080808"/>
    {[[0,180,200,180],[400,180,600,180],[100,0,500,0]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1a1a" strokeWidth="1"/>
    ))}
    <circle cx="300" cy="88" r="40" fill="url(#corridorLight)"/>
    <circle cx="300" cy="88" r="8" fill="#fffde7" opacity="0.4"/>
    <rect x="0" y="0" width="600" height="180" fill="#8a0b0b" opacity="0.03"/>
    {[[150,20,160,160],[440,20,430,160]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1c1c1c" strokeWidth="2" strokeDasharray="4,8"/>
    ))}
  </svg>
);

const Basement = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bulbLight" cx="50%" cy="10%" r="50%">
        <stop offset="0%" stopColor="#fffde7" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="180" fill="#080808"/>
    <rect width="600" height="180" fill="url(#bulbLight)"/>
    <circle cx="300" cy="15" r="8" fill="#fffde7" opacity="0.8"/>
    <line x1="300" y1="0" x2="300" y2="15" stroke="#555" strokeWidth="2"/>
    {[...Array(7)].map((_, i) => {
      const w = 600 - i * 60, x = i * 30, y = i * 22 + 90;
      return <rect key={i} x={x} y={y} width={w} height={14} fill={i%2===0?'#111':'#0d0d0d'} stroke="#1a1a1a" strokeWidth="1"/>;
    })}
    {[...Array(5)].map((_, i) => (
      <rect key={i} x={60+i*100} y={0} width={18} height={120} fill="#1a1a1a" rx="2"/>
    ))}
    {[...Array(8)].map((_, i) => {
      const x = 180 + (i % 4) * 60, y = 10 + Math.floor(i/4) * 14;
      return <ellipse key={i} cx={x+3} cy={y+8} rx="1.5" ry="4" fill="#4a90d0" opacity="0.6"/>;
    })}
    <rect x="0" y="155" width="600" height="25" fill="#0d0d0d"/>
    {[...Array(6)].map((_, i) => (
      <rect key={i} x={i*100+5} y={158} width={90} height={3} fill="#1a1a1a" rx="1"/>
    ))}
  </svg>
);

const GhostEncounter = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ghostAura" cx="50%" cy="40%" r="40%">
        <stop offset="0%" stopColor="#c8dcff" stopOpacity="0.4"/>
        <stop offset="60%" stopColor="#7099cc" stopOpacity="0.1"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
      <filter id="ghostBlur">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>
    <rect width="600" height="180" fill="#06080f"/>
    <rect width="600" height="180" fill="url(#ghostAura)"/>
    <ellipse cx="300" cy="72" rx="55" ry="65" fill="#c8dcff" opacity="0.12" filter="url(#ghostBlur)"/>
    <path d="M270 130 Q270 70 300 50 Q330 70 330 130 Q315 120 300 125 Q285 120 270 130 Z" fill="#c8dcff" opacity="0.18"/>
    <path d="M272 128 Q272 72 300 52 Q328 72 328 128 Q314 118 300 123 Q286 118 272 128 Z" fill="white" opacity="0.08" filter="url(#ghostBlur)"/>
    <ellipse cx="288" cy="82" rx="6" ry="8" fill="#06080f" opacity="0.9"/>
    <ellipse cx="312" cy="82" rx="6" ry="8" fill="#06080f" opacity="0.9"/>
    {[...Array(20)].map((_, i) => (
      <circle key={i} cx={150 + (i*23)%300} cy={20 + (i*17)%140} r={1 + i%2} fill="#c8dcff" opacity={0.1 + (i%5)*0.05}/>
    ))}
    {[[240,40,8,30],[340,55,6,25],[260,100,5,20],[330,110,7,22]].map(([cx,cy,rx,ry],i) => (
      <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#c8dcff" opacity="0.08" filter="url(#ghostBlur)"/>
    ))}
  </svg>
);

const Demon = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="demonGlow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#6b2800" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="180" fill="#080808"/>
    <rect width="600" height="180" fill="url(#demonGlow)"/>
    <ellipse cx="300" cy="75" rx="40" ry="28" fill="#06040a" opacity="0.95"/>
    <ellipse cx="278" cy="72" rx="16" ry="12" fill="#080808"/>
    <ellipse cx="322" cy="72" rx="16" ry="12" fill="#080808"/>
    <ellipse cx="278" cy="72" rx="12" ry="9" fill="#050505"/>
    <ellipse cx="322" cy="72" rx="12" ry="9" fill="#050505"/>
    {[[265,68],[275,68],[289,68],[309,68],[323,68],[333,68]].map(([x,y],i)=>(
      <circle key={i} cx={x} cy={y} r={1.5} fill="#1a0a0a" opacity="0.8"/>
    ))}
    {[...Array(12)].map((_, i) => {
      const x = 150 + (i*30), bh = 30 + (i%4)*20;
      return <path key={i} d={`M${x} 180 Q${x+8} ${170-bh} ${x+15} 180`} fill="#3a1500" opacity={0.3 + (i%3)*0.1}/>;
    })}
    {[...Array(8)].map((_, i) => {
      const x = 100 + i*50, h = 15 + (i%3)*10;
      return <path key={i} d={`M${x} 180 Q${x+6} ${168-h} ${x+12} 180`} fill="#c45a00" opacity="0.2"/>;
    })}
    <rect x="0" y="0" width="600" height="180" fill="#8a0b0b" opacity="0.04"/>
  </svg>
);

const Chapel = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="180" fill="#080808"/>
    <path d="M200 180 L200 60 Q300 20 400 60 L400 180 Z" fill="#0d0d0d"/>
    <path d="M210 180 L210 65 Q300 28 390 65 L390 180 Z" fill="#0a0a0a"/>
    {[...Array(6)].map((_, i) => (
      <rect key={i} x={80+i*80} y={100} width={30} height={80} fill="#0d0a08" rx="1"/>
    ))}
    {[...Array(6)].map((_, i) => (
      <rect key={i} x={82+i*80} y={102} width={26} height={76} fill="#100e0b" rx="1"/>
    ))}
    <rect x="270" y="30" width="60" height="100" fill="#1a0a00"/>
    <rect x="278" y="35" width="44" height="90" fill="#110600" rx="2"/>
    <rect x="295" y="38" width="10" height="42" fill="#3a1500" opacity="0.7"/>
    <rect x="285" y="55" width="30" height="8" fill="#3a1500" opacity="0.7"/>
    {[[235,58,22,40,'#4a1a1a'],[258,62,18,38,'#1a2a4a'],[280,55,20,42,'#3a3a1a'],[320,55,20,42,'#1a3a2a'],[343,62,18,38,'#4a1a1a'],[363,58,22,40,'#1a2a4a']].map(([x,y,w,h,c],i)=>(
      <g key={i}>
        <path d={`M${x} ${+y+h} L${x} ${+y+8} Q${+x+w/2} ${y} ${+x+w} ${+y+8} L${+x+w} ${+y+h} Z`} fill={c as string} opacity="0.5"/>
        <path d={`M${x} ${+y+h} L${x} ${+y+8} Q${+x+w/2} ${y} ${+x+w} ${+y+8} L${+x+w} ${+y+h} Z`} fill="none" stroke="#222" strokeWidth="1"/>
        <line x1={+x+w/2} y1={+y+4} x2={+x+w/2} y2={+y+h} stroke="#333" strokeWidth="0.5" opacity="0.5"/>
      </g>
    ))}
  </svg>
);

const Records = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="180" fill="#080808"/>
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <rect x={20+i*115} y={20} width={90} height={140} fill="#111" rx="2"/>
        <rect x={22+i*115} y={22} width={86} height={136} fill="#0d0d0d" rx="1"/>
        {[0,1,2,3,4,5].map(j => (
          <rect key={j} x={28+i*115} y={30+j*20} width={74} height={14} fill="#161616" stroke="#222" strokeWidth="0.5" rx="1"/>
        ))}
        <rect x={50+i*115} y={155} width={30} height={6} fill="#1a1a1a" rx="3"/>
      </g>
    ))}
    <rect x="180" y="115" width="100" height="60" fill="#fffde7" opacity="0.9" transform="rotate(-15 180 115)"/>
    <rect x="183" y="120" width="85" height="4" fill="#999" opacity="0.5" transform="rotate(-15 180 115)"/>
    <rect x="183" y="127" width="60" height="3" fill="#aaa" opacity="0.4" transform="rotate(-15 180 115)"/>
    <rect x="183" y="133" width="70" height="3" fill="#aaa" opacity="0.3" transform="rotate(-15 180 115)"/>
    <rect x="300" y="80" width="110" height="70" fill="#f5e6c8" opacity="0.95" transform="rotate(8 300 80)"/>
    <rect x="305" y="85" width="90" height="4" fill="#8a0b0b" opacity="0.7" transform="rotate(8 300 80)"/>
    <rect x="305" y="92" width="70" height="3" fill="#555" opacity="0.5" transform="rotate(8 300 80)"/>
    <rect x="305" y="98" width="80" height="3" fill="#555" opacity="0.4" transform="rotate(8 300 80)"/>
    <rect x="305" y="104" width="65" height="3" fill="#555" opacity="0.3" transform="rotate(8 300 80)"/>
    <text x="308" y="90" fill="#8a0b0b" fontSize="7" fontFamily="serif" transform="rotate(8 300 80)" opacity="0.8">CONFIDENTIEL</text>
  </svg>
);

const Garden = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="180" fill="#060a06"/>
    <rect x="0" y="0" width="600" height="90" fill="#060a0e"/>
    <circle cx="100" cy="35" r="25" fill="#fffde7" opacity="0.55"/>
    <ellipse cx="80" cy="32" rx="22" ry="14" fill="#0a0e14" opacity="0.8"/>
    {[...Array(15)].map((_, i) => (
      <circle key={i} cx={(i*173+50)%600} cy={(i*47)%80} r="0.8" fill="white" opacity="0.3"/>
    ))}
    {[...Array(12)].map((_, i) => {
      const x = i*50+10, h = 60+i%3*20;
      return (
        <g key={i}>
          <line x1={x} y1={180} x2={x+5} y2={180-h} stroke="#0d1a0d" strokeWidth="2"/>
          <line x1={x+5} y1={180-h} x2={x+15} y2={180-h+20} stroke="#0d1a0d" strokeWidth="1.5"/>
          <line x1={x+5} y1={180-h} x2={x-8} y2={180-h+25} stroke="#0d1a0d" strokeWidth="1.5"/>
          {i%3===0 && <circle cx={x+5} cy={180-h} r="3" fill="#1a0808" opacity="0.6"/>}
        </g>
      );
    })}
    {[...Array(25)].map((_, i) => (
      <g key={i}>
        <rect x={(i*23+5)%590} y={155+(i%3)*8} width={3+i%4} height={20-i%8} fill="#0d1a0d" rx="1" opacity="0.8"/>
      </g>
    ))}
    {[...Array(8)].map((_, i) => (
      <g key={i}>
        <line x1={i*80} y1={90} x2={i*80} y2={155} stroke="#1a1a1a" strokeWidth="1.5"/>
        <polygon points={`${i*80},90 ${i*80-3},85 ${i*80+3},85`} fill="#1a1a1a"/>
      </g>
    ))}
  </svg>
);

const Ritual = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fireGlow" cx="50%" cy="80%" r="50%">
        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.6"/>
        <stop offset="50%" stopColor="#c45a00" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#080808" stopOpacity="0"/>
      </radialGradient>
    </defs>
    <rect width="600" height="180" fill="#080808"/>
    <rect width="600" height="180" fill="url(#fireGlow)"/>
    <ellipse cx="300" cy="145" rx="140" ry="12" fill="#1a0800" opacity="0.8"/>
    <circle cx="300" cy="130" r="110" fill="none" stroke="#c45a00" strokeWidth="2" opacity="0.6"/>
    <circle cx="300" cy="130" r="108" fill="none" stroke="#ff6b00" strokeWidth="0.5" opacity="0.3"/>
    {[0,1,2,3,4].map(i => {
      const a = i * 72 - 90, a1 = a * Math.PI/180;
      const a2 = ((i+2)*72-90)*Math.PI/180;
      const x1=300+105*Math.cos(a1), y1=130+105*Math.sin(a1);
      const x2=300+105*Math.cos(a2), y2=130+105*Math.sin(a2);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c45a00" strokeWidth="1.5" opacity="0.7"/>;
    })}
    {[[280,148,8,22],[295,142,9,28],[310,145,7,24],[270,150,6,18],[325,148,8,20],[260,152,5,16],[335,150,6,17]].map(([x,y,w,h],i)=>(
      <g key={i}>
        <path d={`M${x} ${+y+h} Q${x+w/2} ${y} ${+x+w} ${+y+h} Q${x+w/2} ${+y+h*0.7} ${x} ${+y+h} Z`} fill={i%2===0?'#ff6b00':'#c45a00'} opacity={0.7+i%3*0.1}/>
        <path d={`M${+x+2} ${+y+h} Q${+x+w/2} ${+y+4} ${+x+w-2} ${+y+h} Q${+x+w/2} ${+y+h*0.6} ${+x+2} ${+y+h} Z`} fill="#fffde7" opacity="0.4"/>
      </g>
    ))}
    {[...Array(20)].map((_, i) => (
      <circle key={i} cx={220+(i*20)%160} cy={110-(i*13)%90} r="1.5" fill="#ff6b00" opacity={0.3+i%4*0.15}/>
    ))}
  </svg>
);

const Victory = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dawn" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a0d00"/>
        <stop offset="40%" stopColor="#3d1a00"/>
        <stop offset="70%" stopColor="#7a3500"/>
        <stop offset="100%" stopColor="#c45a00"/>
      </linearGradient>
    </defs>
    <rect width="600" height="180" fill="url(#dawn)"/>
    <ellipse cx="300" cy="180" rx="200" ry="60" fill="#ff8c00" opacity="0.2"/>
    <ellipse cx="300" cy="180" rx="120" ry="35" fill="#ff6b00" opacity="0.25"/>
    <rect x="0" y="140" width="600" height="40" fill="#080808"/>
    <line x1="0" y1="140" x2="600" y2="140" stroke="#1a1000" strokeWidth="2"/>
    {[160,220,280,320,380,440].map((x,i)=>(
      <line key={i} x1={x} y1={140} x2={x+i%2===0?20:-20} y2={105} stroke="#1a1000" strokeWidth="1.5" strokeDasharray="3,4"/>
    ))}
    <perspective-lines>
      <line x1="240" y1="180" x2="300" y2="140" stroke="#222" strokeWidth="2"/>
      <line x1="360" y1="180" x2="300" y2="140" stroke="#222" strokeWidth="2"/>
      <line x1="0" y1="158" x2="600" y2="158" stroke="#111" strokeWidth="1" strokeDasharray="30,15"/>
    </perspective-lines>
    <path d="M430 148 L440 143 L470 141 L490 143 L495 147 L495 151 L430 151 Z" fill="#080808"/>
    <path d="M433 148 L443 144 L468 142 L487 144 L491 148 L491 151 L433 151 Z" fill="#0d0d0d"/>
    <circle cx="443" cy="150" r="4" fill="#080808" stroke="#1a1a1a" strokeWidth="1"/>
    <circle cx="481" cy="150" r="4" fill="#080808" stroke="#1a1a1a" strokeWidth="1"/>
    <rect x="453" y="143" width="22" height="5" fill="#1a0a00" opacity="0.5" rx="1"/>
  </svg>
);

const GameOver = () => (
  <svg viewBox="0 0 600 180" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="180" fill="#050505"/>
    <circle cx="300" cy="75" r="55" fill="none" stroke="#8a0b0b" strokeWidth="1" opacity="0.4"/>
    <circle cx="300" cy="75" r="50" fill="#0a0505"/>
    <ellipse cx="300" cy="62" rx="22" ry="24" fill="#1a0a0a"/>
    <rect x="278" y="82" width="44" height="28" fill="#1a0a0a" rx="4"/>
    <ellipse cx="288" cy="58" rx="7" ry="8" fill="#0d0505"/>
    <ellipse cx="312" cy="58" rx="7" ry="8" fill="#0d0505"/>
    <rect x="284" y="86" width="8" height="5" fill="#0d0505" rx="1"/>
    <rect x="296" y="86" width="8" height="5" fill="#0d0505" rx="1"/>
    <rect x="308" y="86" width="8" height="5" fill="#0d0505" rx="1"/>
    <path d="M285 100 Q300 106 315 100" fill="#0d0505" stroke="#0d0505" strokeWidth="1"/>
    <line x1="180" y1="100" x2="250" y2="140" stroke="#8a0b0b" strokeWidth="2" opacity="0.5"/>
    <line x1="185" y1="140" x2="245" y2="100" stroke="#8a0b0b" strokeWidth="2" opacity="0.5"/>
    <line x1="350" y1="100" x2="420" y2="140" stroke="#8a0b0b" strokeWidth="2" opacity="0.5"/>
    <line x1="355" y1="140" x2="415" y2="100" stroke="#8a0b0b" strokeWidth="2" opacity="0.5"/>
    {[...Array(8)].map((_,i) => (
      <circle key={i} cx={150+(i*45)%350+50} cy={150+(i*17)%20} r="1" fill="#8a0b0b" opacity="0.4"/>
    ))}
  </svg>
);

const illustrations: Record<SceneArt, React.FC> = {
  impala: Impala, research: Research, asylum_exterior: AsylumExterior,
  dark_corridor: DarkCorridor, basement: Basement, ghost_encounter: GhostEncounter,
  demon: Demon, chapel: Chapel, records: Records, garden: Garden,
  ritual: Ritual, victory: Victory, game_over: GameOver,
};

const SceneIllustration: React.FC<{ art: SceneArt }> = ({ art }) => {
  const Illustration = illustrations[art];
  return (
    <div className="scene-illustration w-full overflow-hidden border-b border-stone-800">
      <Illustration />
    </div>
  );
};

export default SceneIllustration;
