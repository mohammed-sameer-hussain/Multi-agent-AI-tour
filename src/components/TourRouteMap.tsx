import React, { useState, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Footprints, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Navigation, 
  Eye, 
  ListOrdered, 
  Info,
  Building2,
  Landmark,
  Palette,
  UtensilsCrossed
} from 'lucide-react';
import { Waypoint, InterestCategory } from '../lib/types.ts';

interface TourRouteMapProps {
  waypoints: Waypoint[];
  activeWaypointIndex: number;
  onSelectWaypoint: (index: number) => void;
  tourLocation: string;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; stroke: string; dot: string }> = {
  Overview: { bg: 'bg-amber-500', text: 'text-amber-400', stroke: '#f59e0b', dot: '#fbbf24' },
  Architecture: { bg: 'bg-cyan-500', text: 'text-cyan-400', stroke: '#06b6d4', dot: '#22d3ee' },
  History: { bg: 'bg-amber-500', text: 'text-amber-400', stroke: '#f59e0b', dot: '#fbbf24' },
  Culture: { bg: 'bg-purple-500', text: 'text-purple-400', stroke: '#a855f7', dot: '#c084fc' },
  Culinary: { bg: 'bg-emerald-500', text: 'text-emerald-400', stroke: '#10b981', dot: '#34d399' },
  'Wrap-up': { bg: 'bg-amber-500', text: 'text-amber-400', stroke: '#f59e0b', dot: '#fbbf24' }
};

export function TourRouteMap({
  waypoints,
  activeWaypointIndex,
  onSelectWaypoint,
  tourLocation
}: TourRouteMapProps) {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [hoveredWaypoint, setHoveredWaypoint] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Map canvas coordinate normalization
  const { points, bounds, pathD, totalDistanceKm } = useMemo(() => {
    if (!waypoints || waypoints.length === 0) {
      return { points: [], bounds: null, pathD: '', totalDistanceKm: 0.8 };
    }

    const hasRealCoords = waypoints.some(w => w.latitude && w.longitude);

    let coords: { x: number; y: number }[] = [];

    if (hasRealCoords) {
      const lats = waypoints.map(w => w.latitude || 41.38);
      const lngs = waypoints.map(w => w.longitude || 2.17);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const latRange = Math.max(0.003, maxLat - minLat);
      const lngRange = Math.max(0.003, maxLng - minLng);

      // SVG canvas size: 500 x 360, with 60px padding
      const padX = 70;
      const padY = 60;
      const width = 500 - padX * 2;
      const height = 360 - padY * 2;

      coords = waypoints.map(w => {
        const lat = w.latitude || minLat;
        const lng = w.longitude || minLng;
        // Invert Y for latitude (North is up)
        const normX = (lng - minLng) / lngRange;
        const normY = (maxLat - lat) / latRange;
        return {
          x: Math.round(padX + normX * width),
          y: Math.round(padY + normY * height)
        };
      });
    } else {
      // Procedural scenic walking curve if no coordinates
      const defaultPositions = [
        { x: 90, y: 260 },
        { x: 190, y: 140 },
        { x: 310, y: 210 },
        { x: 420, y: 100 },
        { x: 440, y: 290 }
      ];
      coords = waypoints.map((_, i) => defaultPositions[i % defaultPositions.length]);
    }

    // Build SVG path
    let d = '';
    let totalDist = 0;
    if (coords.length > 0) {
      d = `M ${coords[0].x} ${coords[0].y}`;
      for (let i = 1; i < coords.length; i++) {
        // Curve between points
        const prev = coords[i - 1];
        const curr = coords[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        d += ` Q ${prev.x + (midX - prev.x) * 0.5} ${curr.y - (curr.y - midY) * 0.5}, ${curr.x} ${curr.y}`;

        // Compute simulated distance
        const dx = curr.x - prev.x;
        const dy = curr.y - prev.y;
        totalDist += Math.sqrt(dx * dx + dy * dy) * 4; // ~meters
      }
    }

    const distKm = parseFloat(((totalDist || 1100) / 1000).toFixed(1));

    return {
      points: coords,
      bounds: null,
      pathD: d,
      totalDistanceKm: distKm
    };
  }, [waypoints]);

  const activeIndex = Math.min(activeWaypointIndex, waypoints.length - 1);
  const activePoint = points[activeIndex] || points[0];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      
      {/* Header & View Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Interactive Walking Route</span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {waypoints.length} stops · ~{totalDistanceKm} km walking trail
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'map'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="View vector walking route map"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'list'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="View itinerary steps list"
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Steps</span>
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800/90 shadow-inner">
          
          {/* Map Controls Overlay */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-sm p-1 rounded-lg border border-slate-800 shadow-md">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
              title="Zoom In"
              aria-label="Zoom in on map"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
              title="Zoom Out"
              aria-label="Zoom out on map"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors border-t border-slate-800/80"
              title="Reset Zoom"
              aria-label="Reset map zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Compass Rose */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-800 text-[10px] text-amber-400 font-mono font-bold shadow-sm">
            <Navigation className="w-3 h-3 text-amber-400" />
            <span>N</span>
          </div>

          {/* Interactive SVG Canvas */}
          <div className="w-full aspect-[5/3.6] relative overflow-hidden select-none">
            <svg
              viewBox="0 0 500 360"
              className="w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
            >
              <defs>
                {/* Glow filter for active walking path */}
                <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                {/* Radial glow for active waypoint */}
                <radialGradient id="active-pin-glow">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                {/* Street cobblestone pattern */}
                <pattern id="street-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Background Grid & Cartographic Texture */}
              <rect width="500" height="360" fill="#090d16" />
              <rect width="500" height="360" fill="url(#street-grid)" />

              {/* Simulated Historic District Contours & Plazas */}
              <path
                d="M 40 80 Q 150 40 280 60 T 460 90 L 480 300 Q 320 340 180 320 T 30 280 Z"
                fill="rgba(30, 41, 59, 0.35)"
                stroke="rgba(71, 85, 105, 0.2)"
                strokeWidth="1"
              />

              {/* Simulated Canal / River Path */}
              <path
                d="M 0 180 C 140 160 220 220 360 190 C 440 170 480 200 500 210"
                fill="none"
                stroke="rgba(14, 116, 144, 0.25)"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Walking Route Path (Background Stroke) */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Animated Walking Trail (Foreground Pulsing Dash) */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#route-glow)"
                  className="animate-pulse"
                />
              )}

              {/* Waypoint Connection Midpoint Distance Tags */}
              {points.map((pt, idx) => {
                if (idx === 0) return null;
                const prev = points[idx - 1];
                const mx = (prev.x + pt.x) / 2;
                const my = (prev.y + pt.y) / 2;
                return (
                  <g key={`mid-${idx}`}>
                    <circle cx={mx} cy={my} r="3" fill="#64748b" opacity="0.6" />
                  </g>
                );
              })}

              {/* Waypoint Markers */}
              {waypoints.map((wp, i) => {
                const pt = points[i];
                if (!pt) return null;
                const isActive = i === activeIndex;
                const isHovered = hoveredWaypoint === i;
                const colorConfig = CATEGORY_COLORS[wp.category] || CATEGORY_COLORS.Overview;

                return (
                  <g
                    key={wp.id}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => onSelectWaypoint(i)}
                    onMouseEnter={() => setHoveredWaypoint(i)}
                    onMouseLeave={() => setHoveredWaypoint(null)}
                  >
                    {/* Active Radar Ripple Rings */}
                    {isActive && (
                      <>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="22"
                          fill="url(#active-pin-glow)"
                          className="animate-ping opacity-40"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="16"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          opacity="0.8"
                        />
                      </>
                    )}

                    {/* Outer Pin Body */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive || isHovered ? 13 : 11}
                      fill={isActive ? '#f59e0b' : '#0f172a'}
                      stroke={isActive ? '#ffffff' : colorConfig.stroke}
                      strokeWidth={isActive ? '2.5' : '2'}
                      className="transition-all duration-200"
                    />

                    {/* Step Number Text */}
                    <text
                      x={pt.x}
                      y={pt.y + 3.5}
                      textAnchor="middle"
                      fontSize={isActive ? '10' : '9'}
                      fontWeight="bold"
                      fontFamily="monospace"
                      fill={isActive ? '#090d16' : '#f1f5f9'}
                      pointerEvents="none"
                    >
                      {wp.stepNumber}
                    </text>

                    {/* Landmark Name Label */}
                    <text
                      x={pt.x}
                      y={pt.y + (pt.y > 300 ? -16 : 24)}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="system-ui, sans-serif"
                      fill={isActive ? '#fbbf24' : '#cbd5e1'}
                      className="pointer-events-none drop-shadow-md"
                    >
                      {wp.name.length > 20 ? wp.name.slice(0, 18) + '...' : wp.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hovered / Active Tooltip Pill */}
            {(hoveredWaypoint !== null || activeIndex >= 0) && (
              <div className="absolute bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur-md p-2.5 rounded-lg border border-slate-800 shadow-xl flex items-center justify-between text-xs pointer-events-none">
                {(() => {
                  const targetIdx = hoveredWaypoint !== null ? hoveredWaypoint : activeIndex;
                  const targetWp = waypoints[targetIdx] || waypoints[0];
                  return (
                    <div className="min-w-0 flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                        {targetWp.stepNumber}
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-white truncate block">
                          {targetWp.name}
                        </span>
                        <span className="text-[10px] text-amber-400/90 font-mono">
                          {targetWp.category} · Stop #{targetWp.stepNumber}
                        </span>
                      </div>
                    </div>
                  );
                })()}
                <span className="text-[10px] text-slate-400 font-mono shrink-0 pl-2">
                  Click to sync audio
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Step-by-Step Waypoint Timeline List */
        <div className="space-y-3 relative before:absolute before:left-3.5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-800">
          {waypoints.map((wp, i) => {
            const isActive = i === activeIndex;
            return (
              <div 
                key={wp.id}
                className="relative pl-8 group cursor-pointer"
                onClick={() => onSelectWaypoint(i)}
              >
                {/* Step Pin Marker */}
                <div className={`absolute left-1.5 top-1 -translate-x-1/2 w-5 h-5 rounded-full text-[10px] font-mono font-bold flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/20 scale-110'
                    : 'bg-slate-900 border-2 border-amber-500/80 text-amber-400 group-hover:scale-105'
                }`}>
                  {wp.stepNumber}
                </div>

                <div className={`p-3 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-amber-950/20 border-amber-500/60 shadow-md shadow-amber-950/20'
                    : 'bg-slate-950/70 border-slate-800/80 group-hover:border-amber-500/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xs font-bold transition-colors ${
                      isActive ? 'text-amber-300' : 'text-slate-200 group-hover:text-amber-300'
                    }`}>
                      {wp.name}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-400/90">{wp.category}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {wp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Walking Info Tip */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 text-[11px] text-slate-400 flex items-start gap-2">
        <Footprints className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-300">Walking Navigation:</strong> Follow the numbered pins on the path. Click any pin to jump the spoken guide and transcript directly to that landmark.
        </p>
      </div>

    </div>
  );
}
