'use client';

import React, { useState } from 'react';
import { HAMILTON_MAPS_LINK, NEIGHBORHOODS } from '@/data/properties';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Compass, 
  Waves, 
  Mountain, 
  CheckCircle2, 
  Info,
  Globe,
  Layers,
  Eye,
  Maximize2,
  Wind,
  Trees,
  Sun
} from 'lucide-react';

interface InteractivePeninsulaMapProps {
  onSelectArea: (areaName: string) => void;
  selectedArea: string;
}

interface CorridorNode {
  id: string;
  name: string;
  category: 'coastal' | 'beach' | 'mountain' | 'hub';
  x: number; // percentage on map
  y: number;
  description: string;
  avgLotPrice: string;
  distanceFromHamilton: string;
  features: string[];
}

interface TerrainLandmark {
  id: string;
  name: string;
  elevation: string;
  category: 'hq' | 'beach' | 'mountain' | 'estuary' | 'ridge';
  x: number; // %
  y: number; // %
  description: string;
  terrainType: string;
  gradient: string;
  seaView: string;
  soilFoundation: string;
  highlights: string[];
}

const PENINSULA_NODES: CorridorNode[] = [
  {
    id: 'lumley',
    name: 'Lumley & Aberdeen',
    category: 'hub',
    x: 28,
    y: 18,
    description: 'Bustling beach promenade, commercial nightlife, luxury serviced residences, and gateway to the Peninsula.',
    avgLotPrice: '$80,000 - $140,000 / lot',
    distanceFromHamilton: '12 km (20 mins)',
    features: ['Beach dining & hotels', 'Close to central Freetown', 'High rental yields'],
  },
  {
    id: 'lakka',
    name: 'Lakka & Ogoo Farm',
    category: 'coastal',
    x: 35,
    y: 34,
    description: 'Golden sand beaches, active fishing harbor, and emerging gated residential communities.',
    avgLotPrice: '$35,000 - $55,000 / lot',
    distanceFromHamilton: '5 km (8 mins)',
    features: ['Lakka beach seafood', 'Peaceful compounds', 'Fast highway commute'],
  },
  {
    id: 'hamilton',
    name: 'Hamilton Peninsula (Kam HQ)',
    category: 'beach',
    x: 42,
    y: 48,
    description: 'Headquarters of Kam Buy & Rent Property. Spectacular Atlantic coastline, executive villas, and serene palm groves.',
    avgLotPrice: '$40,000 - $65,000 / lot',
    distanceFromHamilton: '0 km (You Are Here)',
    features: ['Kam Buy & Rent HQ', 'Direct beach frontage', 'Rapid property appreciation'],
  },
  {
    id: 'sussex',
    name: 'Sussex & River No. 2',
    category: 'beach',
    x: 52,
    y: 62,
    description: 'World-renowned white sand river estuary, eco-residences, and secluded tropical retreats.',
    avgLotPrice: '$45,000 - $70,000 / lot',
    distanceFromHamilton: '6 km (9 mins)',
    features: ['River No. 2 estuary', 'Lush rainforest backdrop', 'Prime holiday homes'],
  },
  {
    id: 'tokeh',
    name: 'Tokeh Beach',
    category: 'beach',
    x: 62,
    y: 78,
    description: 'Expansive powder-white beaches, luxury resorts, and high-prestige legacy land plots.',
    avgLotPrice: '$35,000 - $60,000 / lot',
    distanceFromHamilton: '14 km (18 mins)',
    features: ['World-class white sand', 'Tourism resort zone', 'Generous town lot sizes'],
  },
  {
    id: 'regent',
    name: 'Regent & Hill Station',
    category: 'mountain',
    x: 68,
    y: 28,
    description: 'High-elevation mountain ridge with refreshingly cool temperatures and diplomatic estates.',
    avgLotPrice: '$50,000 - $90,000 / lot',
    distanceFromHamilton: '16 km (25 mins)',
    features: ['Cool mountain breeze', 'Diplomatic corridor', 'Panoramic valley views'],
  },
];

const TERRAIN_LANDMARKS: TerrainLandmark[] = [
  {
    id: 'kam-hq',
    name: 'Kam Buy & Rent HQ (Hamilton Beachfront)',
    elevation: '12m elevation (Peninsular Highway)',
    category: 'hq',
    x: 44,
    y: 50,
    description: 'Prime headquarters on the Peninsular Highway corridor. Gentle 3% ocean-facing slope with direct Atlantic sunset panoramas and immediate tarmac access.',
    terrainType: 'Elevated Coastal Sandstone & Alluvial Terrace',
    gradient: '3% (Gentle oceanward slope)',
    seaView: '180° Unobstructed Atlantic Oceanfront',
    soilFoundation: 'Stable lateritic bedrock, ideal for multi-story villas',
    highlights: [
      'Kam Buy & Rent headquarters & inspection dispatch',
      'Direct paved Peninsular Highway access',
      'Zero tidal flood risk (12m above high water)',
      'Protected by natural rainforest mountain watershed',
    ],
  },
  {
    id: 'hamilton-beach',
    name: 'Hamilton Atlantic Beach Cove',
    elevation: '0 - 4m sea level',
    category: 'beach',
    x: 28,
    y: 52,
    description: 'Golden palm-fringed Atlantic coastline. Sheltered natural bay offering calm waters, gentle onshore trade winds, and prestigious oceanfront residential parcels.',
    terrainType: 'Fine Quartz Beach Sand & Coastal Foreshore',
    gradient: '1% (Gentle tidal sand shelf)',
    seaView: 'Direct Atlantic Surf & Golden Sunset',
    soilFoundation: 'Deep maritime sand with firm coastal substrate',
    highlights: [
      'Pristine golden sand beach frontage',
      'West-facing orientation into Atlantic sunset',
      'Exclusive private villa & eco-resort zoning',
    ],
  },
  {
    id: 'mountain-spine',
    name: 'Hamilton Peninsula Mountain Ridge',
    elevation: '580m peak elevation',
    category: 'mountain',
    x: 74,
    y: 42,
    description: 'Lush tropical rainforest escarpment of the Western Area Peninsula National Park. Creates a natural microclimate with 3-5°C cooler temperatures and clean gravity-fed mountain spring water.',
    terrainType: 'Granitic & Gabbro Mountain Massif',
    gradient: '28% (Steep forested mountain amphitheater)',
    seaView: 'Panoramic 360° Peninsula & Ocean Vistas',
    soilFoundation: 'Solid granitic bedrock',
    highlights: [
      'Protected National Park rainforest canopy',
      'Natural gravity-fed mountain spring watershed',
      'Cool mountain evening breezes',
    ],
  },
  {
    id: 'lakka-ridge',
    name: 'Lakka & Ogoo Coastal Plateau',
    elevation: '45m elevation',
    category: 'ridge',
    x: 38,
    y: 28,
    description: 'Northern gateway connecting Hamilton to Goderich and Lumley. Elevated plateau offering expansive sea views over Lakka fishing bay.',
    terrainType: 'Undulating Coastal Terrace',
    gradient: '6% (Moderate ridge slope)',
    seaView: 'North-West view to Cape Sierra & Lumley',
    soilFoundation: 'Lateritic clay & weathered rock',
    highlights: [
      'Fast 8-minute drive to Goderich & Lumley',
      'Panoramic ocean & fishing harbor outlook',
      'Gated residential compound developments',
    ],
  },
  {
    id: 'sussex-estuary',
    name: 'Sussex & River No. 2 Estuary',
    elevation: '2 - 15m elevation',
    category: 'estuary',
    x: 58,
    y: 72,
    description: 'Scenic freshwater river delta meeting the Atlantic ocean. Surrounded by pristine mangrove ecosystems and pure white silica sands.',
    terrainType: 'Estuarine Sandbank & Tidal Basin',
    gradient: '2% (Gentle delta slope)',
    seaView: 'Estuary meets Atlantic Surf',
    soilFoundation: 'Alluvial sand & firm riverbank gravel',
    highlights: [
      'World-famous pure white sand beaches',
      'Eco-luxury villas and holiday retreats',
      '6 km south of Kam Buy & Rent HQ',
    ],
  },
];

export const InteractivePeninsulaMap: React.FC<InteractivePeninsulaMapProps> = ({
  onSelectArea,
  selectedArea,
}) => {
  const [viewMode, setViewMode] = useState<'corridor' | 'satellite3d'>('corridor');
  const [activeNode, setActiveNode] = useState<CorridorNode>(
    PENINSULA_NODES.find((n) => n.id === 'hamilton') || PENINSULA_NODES[2]
  );
  const [activeLandmark, setActiveLandmark] = useState<TerrainLandmark>(TERRAIN_LANDMARKS[0]);
  const [is3dTilted, setIs3dTilted] = useState(true);
  const [showContours, setShowContours] = useState(true);

  const handleSelectNode = (node: CorridorNode) => {
    setActiveNode(node);
    onSelectArea(node.name);
  };

  const handleSelectLandmark = (landmark: TerrainLandmark) => {
    setActiveLandmark(landmark);
    onSelectArea('Hamilton Peninsula');
  };

  // Google Maps & Earth 3D Satellite direct URLs centered at Hamilton Peninsula coordinates
  const GOOGLE_SATELLITE_3D_URL = 'https://www.google.com/maps/@8.3752,-13.2758,2500m/data=!3m1!1e3';
  const GOOGLE_EARTH_3D_URL = 'https://earth.google.com/web/@8.3752,-13.2758,200a,2500d,35y,-35h,60t,0r';

  return (
    <section id="peninsula-map" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Ambient background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Western Area Peninsula Highway Corridor
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Explore the Peninsula Real Estate Map
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mt-2">
              From Lumley along the Atlantic Peninsular Highway down to Hamilton, Sussex, River No. 2, and Tokeh. 
              Switch to 3D Satellite view to visualize how the lush rainforest mountains meet the Atlantic ocean.
            </p>
          </div>

          {/* Action Group: View Mode Switch & Direct 3D Satellite Link */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* 3D Satellite View Switch Button */}
            <div className="bg-slate-800 p-1 rounded-2xl border border-slate-700 flex items-center shadow-lg">
              <button
                onClick={() => setViewMode('corridor')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'corridor'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Highway Track</span>
              </button>

              <button
                onClick={() => setViewMode('satellite3d')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'satellite3d'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-300" />
                <span>3D Satellite View</span>
                <span className="px-1.5 py-0.2 bg-cyan-400/20 text-cyan-300 text-[10px] rounded font-black uppercase">
                  3D
                </span>
              </button>
            </div>

            {/* Direct Google Maps / Satellite Anchor */}
            <a
              href={GOOGLE_SATELLITE_3D_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 shadow-md transition-colors"
              title="Open Hamilton Peninsula in Google Maps 3D Satellite"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Google Satellite</span>
            </a>
          </div>
        </div>

        {/* Map Layout: Visual Graphic + Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Map Canvas Container */}
          <div className="lg:col-span-7 bg-slate-800/80 rounded-3xl p-4 sm:p-6 border border-slate-700/80 shadow-2xl relative">
            {/* Map Canvas Control Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-700 mb-4 gap-2">
              <span className="flex items-center gap-1.5 font-semibold text-slate-200">
                {viewMode === 'satellite3d' ? (
                  <>
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hamilton Peninsula 3D Satellite & Topographic Elevation</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Peninsular Coastal Highway Corridor Track</span>
                  </>
                )}
              </span>

              {/* In 3D Satellite Mode: Tilt and Contour Controls */}
              {viewMode === 'satellite3d' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIs3dTilted(!is3dTilted)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                      is3dTilted
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-700 text-slate-300 border-slate-600'
                    }`}
                    title="Toggle 3D perspective terrain tilt"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{is3dTilted ? '3D Oblique' : '2D Top-Down'}</span>
                  </button>

                  <button
                    onClick={() => setShowContours(!showContours)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                      showContours
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-700 text-slate-300 border-slate-600'
                    }`}
                    title="Toggle topographic elevation contour lines"
                  >
                    <Layers className="w-3 h-3" />
                    <span>Contours</span>
                  </button>
                </div>
              ) : (
                <span className="text-[11px]">Click nodes to focus</span>
              )}
            </div>

            {/* Visual Canvas */}
            {viewMode === 'corridor' ? (
              /* Vector Highway Map View */
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 overflow-hidden">
                {/* Atlantic Ocean Label */}
                <div className="absolute top-1/2 left-4 -translate-y-1/2 flex items-center gap-1.5 text-slate-600 font-black tracking-widest text-[11px] uppercase pointer-events-none select-none">
                  <Waves className="w-4 h-4 text-cyan-800" />
                  <span>Atlantic Ocean</span>
                </div>

                {/* Freetown Ridge Label */}
                <div className="absolute top-10 right-4 flex items-center gap-1.5 text-slate-600 font-black tracking-widest text-[11px] uppercase pointer-events-none select-none">
                  <Mountain className="w-4 h-4 text-emerald-900" />
                  <span>Peninsula Mountains</span>
                </div>

                {/* SVG Connecting Road / Coastal Highway */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Coastal line */}
                  <path
                    d="M 120 40 Q 150 140 220 220 T 320 320 T 420 400"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="6,4"
                    className="opacity-40"
                  />
                  {/* Mountain bypass line to Regent */}
                  <path
                    d="M 160 80 Q 300 100 360 140"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    className="opacity-30"
                  />
                </svg>

                {/* Interactive Markers */}
                {PENINSULA_NODES.map((node) => {
                  const isSelected = activeNode.id === node.id;
                  const isHQ = node.id === 'hamilton';

                  return (
                    <button
                      key={node.id}
                      onClick={() => handleSelectNode(node)}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                      aria-label={`Select ${node.name}`}
                    >
                      {/* Pulsing ring for Kam Buy & Rent HQ */}
                      {isHQ && (
                        <span className="absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping" />
                      )}

                      {/* Node marker pin */}
                      <div
                        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all shadow-lg ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 scale-110 ring-4 ring-emerald-400/30'
                            : isHQ
                            ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 hover:scale-105'
                            : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : isHQ ? 'text-white' : 'text-emerald-400'}`} />
                        <span className="whitespace-nowrap">{node.name.split(' ')[0]}</span>
                        {isHQ && (
                          <span className="text-[9px] bg-slate-900 text-emerald-300 px-1 rounded font-extrabold uppercase">
                            HQ
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* 3D Satellite & Topographic Terrain View */
              <div 
                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 transition-all duration-500"
                style={{
                  perspective: '1000px',
                  background: 'linear-gradient(135deg, #022c22 0%, #064e3b 35%, #082f49 70%, #0369a1 100%)',
                }}
              >
                {/* 3D Tilted Terrain Plane */}
                <div 
                  className={`w-full h-full relative transition-transform duration-700 ease-out origin-bottom ${
                    is3dTilted ? 'scale-105' : 'scale-100'
                  }`}
                  style={{
                    transform: is3dTilted ? 'rotateX(26deg) rotateZ(-3deg) translateY(-2%)' : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Topographic Terrain Layer: Ocean, Beach, Highway, and Rainforest Escarpment */}
                  <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 600 450"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      {/* Ocean water gradient */}
                      <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#083344" />
                        <stop offset="50%" stopColor="#0e7490" />
                        <stop offset="100%" stopColor="#0284c7" />
                      </linearGradient>

                      {/* Golden beach sand gradient */}
                      <linearGradient id="beachGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>

                      {/* Mountain rainforest escarpment gradient with 3D shadow relief */}
                      <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#047857" />
                        <stop offset="30%" stopColor="#065f46" />
                        <stop offset="70%" stopColor="#064e3b" />
                        <stop offset="100%" stopColor="#022c22" />
                      </linearGradient>

                      {/* High Peak Ridge shading */}
                      <radialGradient id="peakGlow" cx="70%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#047857" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
                      </radialGradient>
                    </defs>

                    {/* Atlantic Ocean Deep Water (Left third) */}
                    <rect x="0" y="0" width="220" height="450" fill="url(#oceanGrad)" />

                    {/* Atlantic Shoreline Wave Rhythms */}
                    <path
                      d="M 190 0 Q 220 150 200 240 T 230 360 T 210 450 L 0 450 L 0 0 Z"
                      fill="#0e7490"
                      opacity="0.85"
                    />

                    {/* White water surf / surf break */}
                    <path
                      d="M 200 0 Q 230 150 210 240 T 240 360 T 220 450"
                      fill="none"
                      stroke="#ecfeff"
                      strokeWidth="3.5"
                      strokeOpacity="0.7"
                    />

                    {/* Hamilton & Sussex Golden Sand Beach Belt */}
                    <path
                      d="M 200 0 Q 230 150 210 240 T 240 360 T 220 450 L 255 450 Q 275 360 245 240 T 265 150 T 235 0 Z"
                      fill="url(#beachGrad)"
                      opacity="0.9"
                    />

                    {/* Peninsular Highway Tarmac Corridor */}
                    <path
                      d="M 235 0 Q 268 150 250 240 T 278 360 T 260 450"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="5"
                    />
                    <path
                      d="M 235 0 Q 268 150 250 240 T 278 360 T 260 450"
                      fill="none"
                      stroke="#f8fafc"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />

                    {/* Western Area Peninsula National Park Mountain Escarpment (Right half) */}
                    <path
                      d="M 255 0 Q 285 150 265 240 T 295 360 T 275 450 L 600 450 L 600 0 Z"
                      fill="url(#mountainGrad)"
                    />

                    {/* Mountain Ridge 3D Highlight Shading */}
                    <circle cx="430" cy="180" r="160" fill="url(#peakGlow)" />
                    <circle cx="480" cy="300" r="140" fill="url(#peakGlow)" />

                    {/* Topographic Contour Lines (if enabled) */}
                    {showContours && (
                      <g stroke="#34d399" strokeWidth="1" opacity="0.35" fill="none">
                        {/* 50m contour */}
                        <path d="M 290 0 Q 320 150 300 240 T 330 360 T 310 450" />
                        {/* 150m contour */}
                        <path d="M 350 0 Q 380 140 360 230 T 390 350 T 370 450" />
                        {/* 300m contour */}
                        <path d="M 420 20 Q 450 140 430 220 T 460 340 T 440 440" />
                        {/* 500m peak summit contour */}
                        <path d="M 480 80 Q 530 160 500 240 T 520 330" strokeWidth="1.5" opacity="0.6" />
                      </g>
                    )}
                  </svg>

                  {/* Ocean Surface Animation Effect */}
                  <div className="absolute top-10 left-6 flex items-center gap-1.5 text-cyan-200/70 font-black tracking-widest text-[11px] uppercase pointer-events-none select-none">
                    <Waves className="w-4 h-4 text-cyan-400" />
                    <span>Atlantic Shelf (0m)</span>
                  </div>

                  {/* Mountain Ridge Label */}
                  <div className="absolute top-8 right-6 text-right pointer-events-none select-none">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-black tracking-widest text-[11px] uppercase justify-end">
                      <Mountain className="w-4 h-4 text-emerald-400" />
                      <span>Peninsula Mountain Spine</span>
                    </div>
                    <span className="text-[10px] text-emerald-400/80 font-mono">Elevation: 580m</span>
                  </div>

                  {/* Interactive 3D Terrain Landmarks */}
                  {TERRAIN_LANDMARKS.map((landmark) => {
                    const isSelected = activeLandmark.id === landmark.id;
                    const isHQ = landmark.category === 'hq';

                    return (
                      <button
                        key={landmark.id}
                        onClick={() => handleSelectLandmark(landmark)}
                        style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 focus:outline-none"
                        aria-label={`Select ${landmark.name}`}
                      >
                        {/* Pulse effect for Kam HQ */}
                        {isHQ && (
                          <span className="absolute -inset-3 rounded-full bg-emerald-400/40 animate-ping" />
                        )}

                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xl border ${
                            isSelected
                              ? 'bg-cyan-400 text-slate-950 scale-110 ring-4 ring-cyan-400/40 border-cyan-300'
                              : isHQ
                              ? 'bg-emerald-600 text-white ring-2 ring-emerald-300 border-emerald-400 hover:scale-105'
                              : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800 border-slate-700 hover:text-white'
                          }`}
                        >
                          {isHQ ? (
                            <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                          ) : landmark.category === 'beach' ? (
                            <Waves className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                          ) : (
                            <Mountain className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                          <span className="whitespace-nowrap font-extrabold">{landmark.name.split(' ')[0]}</span>
                          <span className={`text-[9px] px-1 py-0.5 rounded font-mono ${
                            isSelected ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {landmark.category === 'hq' ? 'HQ' : landmark.elevation.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* 3D Compass & Elevation Legend Overlay */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] text-slate-300 flex items-center gap-3 z-20">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Sun className="w-3 h-3 text-amber-400" />
                    Sunset: 270° West
                  </span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-300 font-mono">Hamilton: 8°22&apos;N, 13°16&apos;W</span>
                </div>
              </div>
            )}

            {/* Quick Map Legend & Direct Google Earth trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Kam HQ (Peninsular Highway)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                  Atlantic Coastline
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-800 inline-block" />
                  Rainforest Escarpment
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={GOOGLE_EARTH_3D_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 underline transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  <span>Google Earth 3D Orbit</span>
                </a>
              </div>
            </div>
          </div>

          {/* Node / Terrain Landmark Information Panel */}
          <div className="lg:col-span-5 bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-xl flex flex-col justify-between space-y-5">
            {viewMode === 'corridor' ? (
              /* Corridor Node Details */
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                      Corridor Spotlight
                    </span>
                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-slate-300 font-medium">
                      {activeNode.distanceFromHamilton}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white">{activeNode.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {activeNode.description}
                  </p>
                </div>

                {/* Pricing metrics */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-700">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Avg. Land Price (1 Town Lot)
                    </span>
                    <span className="text-sm font-black text-emerald-400">
                      {activeNode.avgLotPrice}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Title Registry
                    </span>
                    <span className="text-xs font-bold text-white flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Conveyance Verified
                    </span>
                  </div>
                </div>

                {/* Key perks */}
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-2">Location Highlights:</span>
                  <div className="space-y-1.5">
                    {activeNode.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onSelectArea(activeNode.name)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors text-center"
                  >
                    Filter {activeNode.name.split(' ')[0]} Listings
                  </button>

                  <a
                    href={HAMILTON_MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                    title="Open location on Google Maps"
                  >
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </>
            ) : (
              /* 3D Terrain Landmark Inspection Panel */
              <>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                      <Mountain className="w-3.5 h-3.5" />
                      Terrain Topography & Elevation Audit
                    </span>
                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded text-cyan-300 font-mono font-bold">
                      {activeLandmark.elevation}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">{activeLandmark.name}</h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {activeLandmark.description}
                  </p>
                </div>

                {/* Topographic Engineering Metrics */}
                <div className="grid grid-cols-2 gap-2.5 p-3.5 bg-slate-900/90 rounded-2xl border border-slate-700 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Slope Gradient
                    </span>
                    <span className="text-xs font-bold text-white mt-0.5 block">
                      {activeLandmark.gradient}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Sea View Orientation
                    </span>
                    <span className="text-xs font-bold text-cyan-300 mt-0.5 block">
                      {activeLandmark.seaView}
                    </span>
                  </div>

                  <div className="col-span-2 pt-1 border-t border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Soil & Structural Foundation
                    </span>
                    <span className="text-[11px] text-slate-300 mt-0.5 block">
                      {activeLandmark.soilFoundation}
                    </span>
                  </div>
                </div>

                {/* Terrain Highlights */}
                <div>
                  <span className="text-xs font-bold text-slate-400 block mb-2">Environmental & Engineering Notes:</span>
                  <div className="space-y-1.5">
                    {activeLandmark.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <a
                    href={GOOGLE_SATELLITE_3D_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Open in Google Maps 3D Satellite</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => {
                      onSelectArea('Hamilton Peninsula');
                      const listingsEl = document.getElementById('listings-grid');
                      if (listingsEl) listingsEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <span>View Listings</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

