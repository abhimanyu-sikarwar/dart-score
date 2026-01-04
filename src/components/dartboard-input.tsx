'use client';

import { useCallback, useRef, useState, MouseEvent, TouchEvent } from 'react';
import { Multiplier } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DartboardInputProps {
  onSegmentClick: (segment: number, multiplier: Multiplier) => void;
  disabled?: boolean;
}

// Standard dartboard segment order (clockwise from top)
const SEGMENT_ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

// Radii as percentages of the dartboard
const RADII = {
  DOUBLE_OUTER: 1,
  DOUBLE_INNER: 0.935,
  TREBLE_OUTER: 0.63,
  TREBLE_INNER: 0.565,
  OUTER_BULL: 0.16,
  INNER_BULL: 0.064,
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const BOARD_SIZE = 100;

function getSegmentFromAngle(angleDeg: number): number {
  const normalizedAngle = ((angleDeg % 360) + 360) % 360;
  const segmentIndex = Math.floor(((normalizedAngle + 9) % 360) / 18);
  return SEGMENT_ORDER[segmentIndex];
}

function getMultiplierFromRadius(radius: number): Multiplier | 'miss' {
  if (radius > RADII.DOUBLE_OUTER) return 'miss';
  if (radius > RADII.DOUBLE_INNER) return 'double';
  if (radius > RADII.TREBLE_OUTER) return 'single';
  if (radius > RADII.TREBLE_INNER) return 'triple';
  return 'single';
}

function getTouchDistance(touches: React.TouchList): number {
  if (touches.length < 2) return 0;
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getTouchCenter(touches: React.TouchList): { x: number; y: number } {
  if (touches.length < 2) return { x: touches[0].clientX, y: touches[0].clientY };
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  };
}

export function DartboardInput({ onSegmentClick, disabled }: DartboardInputProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProcessingRef = useRef<boolean>(false);
  const isPinchingRef = useRef<boolean>(false);
  const initialPinchDistanceRef = useRef<number>(0);
  const initialZoomRef = useRef<number>(1);

  const [zoom, setZoom] = useState(1);
  const [viewCenter, setViewCenter] = useState({ x: 50, y: 50 });

  // Convert screen coordinates to board coordinates
  const screenToBoardCoords = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return { x: 50, y: 50 };

    const rect = containerRef.current.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;

    const viewSize = BOARD_SIZE / zoom;
    const viewX = viewCenter.x - viewSize / 2;
    const viewY = viewCenter.y - viewSize / 2;

    return {
      x: viewX + relX * viewSize,
      y: viewY + relY * viewSize,
    };
  }, [zoom, viewCenter]);

  const clampViewCenter = useCallback((x: number, y: number, currentZoom: number) => {
    const viewSize = BOARD_SIZE / currentZoom;
    const halfView = viewSize / 2;
    const minCenter = halfView;
    const maxCenter = BOARD_SIZE - halfView;

    return {
      x: Math.max(minCenter, Math.min(maxCenter, x)),
      y: Math.max(minCenter, Math.min(maxCenter, y)),
    };
  }, []);

  const processHit = useCallback((clientX: number, clientY: number) => {
    if (disabled || !svgRef.current || isProcessingRef.current || isPinchingRef.current) return;

    isProcessingRef.current = true;

    const boardCoords = screenToBoardCoords(clientX, clientY);
    const x = (boardCoords.x - 50) / 50;
    const y = (boardCoords.y - 50) / 50;

    const radius = Math.sqrt(x * x + y * y);
    const angleDeg = Math.atan2(x, -y) * (180 / Math.PI);

    if (radius <= RADII.INNER_BULL) {
      onSegmentClick(25, 'double');
    } else if (radius <= RADII.OUTER_BULL) {
      onSegmentClick(25, 'single');
    } else {
      const multiplier = getMultiplierFromRadius(radius);
      if (multiplier === 'miss') {
        onSegmentClick(0, 'single');
      } else {
        const segment = getSegmentFromAngle(angleDeg);
        onSegmentClick(segment, multiplier);
      }
    }

    setTimeout(() => {
      isProcessingRef.current = false;
    }, 400);
  }, [disabled, onSegmentClick, screenToBoardCoords]);

  const handleClick = (e: MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    processHit(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2) {
      // Start pinch zoom
      isPinchingRef.current = true;
      initialPinchDistanceRef.current = getTouchDistance(e.touches);
      initialZoomRef.current = zoom;
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2 && isPinchingRef.current) {
      e.preventDefault();

      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / initialPinchDistanceRef.current;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, initialZoomRef.current * scale));

      // Get pinch center and zoom toward it
      const center = getTouchCenter(e.touches);
      const boardCenter = screenToBoardCoords(center.x, center.y);

      // Adjust view center to zoom toward pinch point
      if (newZoom !== zoom) {
        const zoomRatio = newZoom / zoom;
        const newViewCenter = {
          x: boardCenter.x + (viewCenter.x - boardCenter.x) / zoomRatio,
          y: boardCenter.y + (viewCenter.y - boardCenter.y) / zoomRatio,
        };

        setViewCenter(clampViewCenter(newViewCenter.x, newViewCenter.y, newZoom));
        setZoom(newZoom);
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent<SVGSVGElement>) => {
    if (isPinchingRef.current) {
      isPinchingRef.current = false;
      // Don't register a tap after pinch
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 100);
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    if (e.changedTouches.length > 0 && e.touches.length === 0) {
      processHit(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
  };

  const resetZoom = () => {
    setZoom(1);
    setViewCenter({ x: 50, y: 50 });
  };

  const generateSegmentPath = (index: number, innerRadius: number, outerRadius: number): string => {
    const startAngle = (index * 18 - 9 - 90) * (Math.PI / 180);
    const endAngle = (index * 18 + 9 - 90) * (Math.PI / 180);

    const innerStartX = 50 + innerRadius * 50 * Math.cos(startAngle);
    const innerStartY = 50 + innerRadius * 50 * Math.sin(startAngle);
    const innerEndX = 50 + innerRadius * 50 * Math.cos(endAngle);
    const innerEndY = 50 + innerRadius * 50 * Math.sin(endAngle);
    const outerStartX = 50 + outerRadius * 50 * Math.cos(startAngle);
    const outerStartY = 50 + outerRadius * 50 * Math.sin(startAngle);
    const outerEndX = 50 + outerRadius * 50 * Math.cos(endAngle);
    const outerEndY = 50 + outerRadius * 50 * Math.sin(endAngle);

    return `M ${innerStartX} ${innerStartY}
            A ${innerRadius * 50} ${innerRadius * 50} 0 0 1 ${innerEndX} ${innerEndY}
            L ${outerEndX} ${outerEndY}
            A ${outerRadius * 50} ${outerRadius * 50} 0 0 0 ${outerStartX} ${outerStartY}
            Z`;
  };

  const renderSegments = () => {
    const segments = [];

    for (let i = 0; i < 20; i++) {
      const isEven = i % 2 === 0;

      segments.push(
        <path
          key={`double-${i}`}
          d={generateSegmentPath(i, RADII.DOUBLE_INNER, RADII.DOUBLE_OUTER)}
          className={cn(
            isEven ? 'fill-red-600' : 'fill-green-600',
            'hover:brightness-125 transition-all'
          )}
        />
      );

      segments.push(
        <path
          key={`outer-single-${i}`}
          d={generateSegmentPath(i, RADII.TREBLE_OUTER, RADII.DOUBLE_INNER)}
          className={cn(
            isEven ? 'fill-neutral-900' : 'fill-amber-100',
            'hover:brightness-125 transition-all'
          )}
        />
      );

      segments.push(
        <path
          key={`triple-${i}`}
          d={generateSegmentPath(i, RADII.TREBLE_INNER, RADII.TREBLE_OUTER)}
          className={cn(
            isEven ? 'fill-red-600' : 'fill-green-600',
            'hover:brightness-125 transition-all'
          )}
        />
      );

      segments.push(
        <path
          key={`inner-single-${i}`}
          d={generateSegmentPath(i, RADII.OUTER_BULL, RADII.TREBLE_INNER)}
          className={cn(
            isEven ? 'fill-neutral-900' : 'fill-amber-100',
            'hover:brightness-125 transition-all'
          )}
        />
      );
    }

    return segments;
  };

  const renderNumbers = () => {
    const numbers = [];
    const numberRadius = 0.88;

    for (let i = 0; i < 20; i++) {
      const angle = (i * 18 - 90) * (Math.PI / 180);
      const x = 50 + numberRadius * 50 * Math.cos(angle);
      const y = 50 + numberRadius * 50 * Math.sin(angle);

      numbers.push(
        <text
          key={`number-${i}`}
          x={x}
          y={y}
          className="fill-white text-[3px] font-bold pointer-events-none select-none"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {SEGMENT_ORDER[i]}
        </text>
      );
    }

    return numbers;
  };

  // Calculate viewBox based on zoom and center
  const viewSize = BOARD_SIZE / zoom;
  const viewX = viewCenter.x - viewSize / 2;
  const viewY = viewCenter.y - viewSize / 2;
  const viewBox = `${viewX} ${viewY} ${viewSize} ${viewSize}`;

  const isZoomed = zoom > 1.1;

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full aspect-square max-w-[320px] mx-auto', disabled && 'opacity-50 pointer-events-none')}
    >
      {/* Reset zoom button - only show when zoomed */}
      {isZoomed && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 z-10 h-8 px-2 gap-1 bg-background/80 backdrop-blur-sm"
          onClick={resetZoom}
        >
          <RotateCcw className="h-3 w-3" />
          <span className="text-xs">Reset</span>
        </Button>
      )}

      {isZoomed && (
        <div className="absolute top-2 left-2 z-10 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
          {zoom.toFixed(1)}x
        </div>
      )}

      {!isZoomed && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 text-xs text-muted-foreground bg-background/60 backdrop-blur-sm px-2 py-1 rounded">
          Pinch to zoom
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="w-full h-full touch-none select-none rounded-full overflow-hidden"
        style={{ touchAction: 'none' }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <circle cx="50" cy="50" r="50" className="fill-neutral-800" />

        {renderSegments()}

        {SEGMENT_ORDER.map((_, i) => {
          const angle = (i * 18 - 9 - 90) * (Math.PI / 180);
          const innerX = 50 + RADII.OUTER_BULL * 50 * Math.cos(angle);
          const innerY = 50 + RADII.OUTER_BULL * 50 * Math.sin(angle);
          const outerX = 50 + RADII.DOUBLE_OUTER * 50 * Math.cos(angle);
          const outerY = 50 + RADII.DOUBLE_OUTER * 50 * Math.sin(angle);
          return (
            <line
              key={`wire-${i}`}
              x1={innerX}
              y1={innerY}
              x2={outerX}
              y2={outerY}
              className="stroke-neutral-400 pointer-events-none"
              strokeWidth="0.15"
            />
          );
        })}

        <circle
          cx="50"
          cy="50"
          r={RADII.OUTER_BULL * 50}
          className="fill-green-600 hover:brightness-125 transition-all"
        />

        <circle
          cx="50"
          cy="50"
          r={RADII.INNER_BULL * 50}
          className="fill-red-600 hover:brightness-125 transition-all"
        />

        <circle cx="50" cy="50" r={RADII.DOUBLE_INNER * 50} className="fill-none stroke-neutral-400 pointer-events-none" strokeWidth="0.15" />
        <circle cx="50" cy="50" r={RADII.TREBLE_OUTER * 50} className="fill-none stroke-neutral-400 pointer-events-none" strokeWidth="0.15" />
        <circle cx="50" cy="50" r={RADII.TREBLE_INNER * 50} className="fill-none stroke-neutral-400 pointer-events-none" strokeWidth="0.15" />
        <circle cx="50" cy="50" r={RADII.OUTER_BULL * 50} className="fill-none stroke-neutral-400 pointer-events-none" strokeWidth="0.15" />

        {renderNumbers()}
      </svg>
    </div>
  );
}
