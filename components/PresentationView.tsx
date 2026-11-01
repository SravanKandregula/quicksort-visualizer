'use strict';
import React, { useEffect } from 'react';
import { PivotStrategy, ExecutionStep } from '../lib/quicksort/types';
import { ArrayView } from './ArrayView';
import { CodeView } from './CodeView';
import {
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';

interface PresentationViewProps {
  strategy: PivotStrategy;
  step: ExecutionStep;
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onExit: () => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({
  strategy,
  step,
  currentStepIndex,
  totalSteps,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onExit,
  playbackSpeed,
  onSpeedChange,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-white text-ink flex flex-col justify-between overflow-hidden p-4 lg:p-6 select-none">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="text-xl md:text-2xl font-bold tracking-tight uppercase text-ink">
            Quick Sort Visualizer
          </div>
          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-ink text-white uppercase rounded-sm">
            Classroom Mode
          </span>
          <span className="text-xs font-mono px-2 py-0.5 border border-ink/30 rounded-sm">
            {strategy.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-ink/5 border border-ink/20 rounded-sm font-mono text-xs font-bold text-ink">
            Step {currentStepIndex + 1} / {totalSteps}
          </div>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-subtle"
            title="Exit Presentation Mode (Esc)"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Exit Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="p-4 bg-ink/[0.02] border-2 border-ink rounded-sm mb-3">
        <div className="flex items-center justify-between text-xs font-mono border-b border-ink/15 pb-1.5 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider bg-ink text-white px-2 py-0.5 rounded-sm text-[11px]">
              Phase: {step.phase.replace(/_/g, ' ')}
            </span>
            <span className="text-ink/80">
              Synchronized C Line: <strong>#{step.codeLine}</strong>
            </span>
          </div>
          <div className="text-[11px] text-ink/60 hidden sm:block">
            Use [←] and [→] arrow keys
          </div>
        </div>

        <p className="text-base md:text-lg font-medium text-ink leading-relaxed">
          {step.explanation}
        </p>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-0 overflow-hidden">
        <div className="lg:col-span-7 border-2 border-ink p-4 bg-white rounded-sm flex flex-col justify-between overflow-y-auto">
          <ArrayView step={step} />
        </div>

        <div className="lg:col-span-5 border-2 border-ink p-4 bg-white rounded-sm flex flex-col justify-between overflow-y-auto">
          <CodeView strategy={strategy} step={step} />
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="pt-3 mt-3 border-t-2 border-ink flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={onPause}
              className="flex items-center gap-1.5 px-4 py-2 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 text-xs font-bold uppercase tracking-wider rounded-sm shadow-subtle"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              disabled={currentStepIndex >= totalSteps - 1}
              className="flex items-center gap-1.5 px-4 py-2 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 disabled:opacity-40 text-xs font-bold uppercase tracking-wider rounded-sm shadow-subtle"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Auto Play</span>
            </button>
          )}

          <button
            onClick={onPrev}
            disabled={currentStepIndex <= 0}
            className="flex items-center gap-1 px-4 py-2 border-2 border-ink bg-white hover:bg-ink/5 disabled:opacity-30 text-xs font-bold uppercase tracking-wider rounded-sm text-ink transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={onNext}
            disabled={currentStepIndex >= totalSteps - 1}
            className="flex items-center gap-1 px-4 py-2 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 disabled:opacity-40 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-subtle"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-2 border border-ink/30 bg-white hover:bg-ink/5 text-xs font-bold uppercase tracking-wider rounded-sm text-ink transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-ink/60">Comparisons:</span>
            <strong className="text-ink">{step.stats.comparisons}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink/60">Swaps:</span>
            <strong className="text-ink">{step.stats.swaps}</strong>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-ink/60">Calls:</span>
            <strong className="text-ink">{step.stats.recursiveCalls}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
