'use strict';
import React from 'react';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface HeaderProps {
  isPresentationMode: boolean;
  onTogglePresentation: () => void;
  onReset: () => void;
  currentStep: number;
  totalSteps: number;
}

export const Header: React.FC<HeaderProps> = ({
  isPresentationMode,
  onTogglePresentation,
  onReset,
  currentStep,
  totalSteps,
}) => {
  return (
    <header className="border-b border-ink/15 bg-white px-4 lg:px-8 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Title and metadata */}
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-ink uppercase">
              Quick Sort Visualizer
            </h1>
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 border border-ink/30 bg-ink/5 rounded-sm text-ink">
              Sorting Algorithm
            </span>
            <span className="text-[11px] font-mono tracking-tight px-2 py-0.5 bg-ink text-white rounded-sm">
              Divide & Conquer
            </span>
          </div>
          <p className="text-xs md:text-sm text-ink/70 mt-1">
            Understand Divide and Conquer Through Interactive Execution, Synchronized C Code & State Tracking
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {totalSteps > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-ink/15 bg-ink/[0.02] rounded-sm text-xs font-mono text-ink">
              <span className="text-ink/60">Step:</span>
              <span className="font-bold">{currentStep}</span>
              <span className="text-ink/40">/</span>
              <span>{totalSteps}</span>
            </div>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-ink/25 bg-white hover:border-ink hover:bg-ink/5 active:bg-ink/10 transition-colors text-xs font-semibold tracking-wide uppercase rounded-sm text-ink"
            title="Reset Array and Visualization (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={onTogglePresentation}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 transition-colors text-xs font-semibold tracking-wide uppercase rounded-sm shadow-subtle"
            title="Enter Presentation Mode (P)"
          >
            {isPresentationMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Presentation Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
