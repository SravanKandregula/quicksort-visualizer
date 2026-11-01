'use strict';
import React, { useState } from 'react';
import { PivotStrategy, ExecutionStep } from '../lib/quicksort/types';
import { ArrayView } from './ArrayView';
import { CodeView } from './CodeView';
import { PureArrayProcessView } from './PureArrayProcessView';
import { RecursionTreeView } from './RecursionTreeView';
import {
  Activity,
  Layers,
  Repeat,
  GitBranch,
  ArrowRightLeft,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface VisualizerPanelProps {
  strategy: PivotStrategy;
  step: ExecutionStep;
  steps: ExecutionStep[];
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onJumpToStep: (step: number) => void;
  playbackSpeed: number;
  onSpeedChange: (speed: number) => void;
}

export const VisualizerPanel: React.FC<VisualizerPanelProps> = ({
  strategy,
  step,
  steps,
  currentStepIndex,
  totalSteps,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  onJumpToStep,
  playbackSpeed,
  onSpeedChange,
}) => {
  const [showRecursionTree, setShowRecursionTree] = useState<boolean>(false);

  const formatPhaseName = (phase: string) => {
    return phase.replace(/_/g, ' ');
  };

  return (
    <div className="space-y-6">
      {/* 1. Dynamic Step Explanation Banner */}
      <div className="p-5 bg-white border border-ink/20 rounded-sm shadow-subtle space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/10 pb-2.5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 bg-ink text-white text-xs font-mono font-bold uppercase tracking-wider rounded-sm">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <span className="text-xs font-mono font-semibold text-ink uppercase tracking-wide px-2.5 py-0.5 border border-ink/25 bg-ink/[0.02] rounded-sm">
              {formatPhaseName(step.phase)}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-ink/70">
            <span>
              Synced C Line: <strong className="text-ink">#{step.codeLine}</strong>
            </span>
            <span>•</span>
            <span>
              Subarray: <strong>[{step.low} .. {step.high}]</strong>
            </span>
          </div>
        </div>

        <p className="text-base md:text-lg text-ink font-medium leading-relaxed">
          {step.explanation}
        </p>
      </div>

      {/* 2. Visual Representation Workspace (Left: Array, Right: C Code) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Array Visualization */}
        <div className="lg:col-span-7 p-5 bg-white border border-ink/20 rounded-sm shadow-subtle flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/15">
            <h2 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
              <span className="w-2 h-2 bg-ink rounded-sm inline-block" />
              Array Visualization & Pointers
            </h2>
            <span className="text-[11px] font-mono text-ink/60">
              Low: {step.low} | High: {step.high}
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <ArrayView step={step} />
          </div>
        </div>

        {/* Right: Synchronized C Code */}
        <div className="lg:col-span-5 p-5 bg-white border border-ink/20 rounded-sm shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-ink/15">
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-2 h-2 bg-ink rounded-sm inline-block" />
                Synchronized C Source Code
              </h2>
              <span className="text-[11px] font-mono font-semibold text-ink/75 uppercase">
                {strategy === 'MEDIAN_OF_THREE'
                  ? 'Median-of-Three'
                  : strategy === 'FIRST'
                  ? 'First Pivot'
                  : 'Lomuto Last Pivot'}
              </span>
            </div>
            <CodeView strategy={strategy} step={step} />
          </div>
        </div>
      </div>

      {/* 3. STEP CONTROLLER BAR (DIRECTLY UNDER THE REPRESENTATION) */}
      <div className="p-4 bg-white border-2 border-ink rounded-sm shadow-elevated flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Step buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Previous Step */}
          <button
            type="button"
            onClick={onPrev}
            disabled={currentStepIndex <= 0}
            className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-ink bg-white hover:bg-ink/5 active:bg-ink/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider rounded-sm text-ink transition-colors"
            title="Previous Step (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {/* Auto Play / Pause */}
          {isPlaying ? (
            <button
              type="button"
              onClick={onPause}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 text-xs font-bold uppercase tracking-wider rounded-sm shadow-subtle transition-all"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onPlay}
              disabled={currentStepIndex >= totalSteps - 1}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-ink/30 bg-white hover:border-ink hover:bg-ink/5 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider rounded-sm shadow-subtle transition-all"
            >
              <Play className="w-4 h-4 fill-ink" />
              <span>Auto Play</span>
            </button>
          )}

          {/* Next Step (Prominent Primary Button) */}
          <button
            type="button"
            onClick={onNext}
            disabled={currentStepIndex >= totalSteps - 1}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider rounded-sm shadow-subtle transition-all ring-1 ring-ink"
            title="Next Step (Right Arrow or Space)"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-2.5 border border-ink/25 bg-white hover:border-ink hover:bg-ink/5 text-xs font-bold uppercase tracking-wider rounded-sm text-ink transition-colors"
            title="Reset to Step 1 (R)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Step Scrubber Slider & Speed */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-ink/70">Scrub:</span>
            <input
              type="range"
              min="0"
              max={Math.max(0, totalSteps - 1)}
              value={currentStepIndex}
              onChange={(e) => onJumpToStep(parseInt(e.target.value, 10))}
              className="w-28 sm:w-44 accent-ink cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-ink whitespace-nowrap">
              {currentStepIndex + 1} / {totalSteps}
            </span>
          </div>

          <div className="flex items-center gap-1.5 border-l border-ink/20 pl-3">
            <span className="text-xs font-mono text-ink/70">Speed:</span>
            {[
              { label: '0.5x', ms: 1200 },
              { label: '1x', ms: 700 },
              { label: '2x', ms: 300 },
            ].map((sp) => (
              <button
                key={sp.label}
                onClick={() => onSpeedChange(sp.ms)}
                className={`px-2 py-1 text-xs font-mono rounded-sm border transition-colors ${
                  playbackSpeed === sp.ms
                    ? 'bg-ink text-white border-ink font-bold'
                    : 'border-ink/20 text-ink bg-white hover:bg-ink/5'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. DEDICATED VISUAL REPRESENTATION: ONLY ARRAY & PIVOT (STEP-BY-STEP PROCESS, NO CODE) */}
      <PureArrayProcessView
        step={step}
        steps={steps}
        currentStepIndex={currentStepIndex}
        totalSteps={totalSteps}
        onNext={onNext}
        onPrev={onPrev}
        onJumpToStep={onJumpToStep}
      />

      {/* 5. Execution Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 bg-white border border-ink/15 rounded-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">Comparisons</div>
            <div className="text-base font-mono font-bold text-ink mt-0.5">{step.stats.comparisons}</div>
          </div>
          <Activity className="w-4 h-4 text-ink/30" />
        </div>

        <div className="p-3 bg-white border border-ink/15 rounded-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">Swaps</div>
            <div className="text-base font-mono font-bold text-ink mt-0.5">{step.stats.swaps}</div>
          </div>
          <ArrowRightLeft className="w-4 h-4 text-ink/30" />
        </div>

        <div className="p-3 bg-white border border-ink/15 rounded-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">Partitions</div>
            <div className="text-base font-mono font-bold text-ink mt-0.5">{step.stats.partitions}</div>
          </div>
          <Layers className="w-4 h-4 text-ink/30" />
        </div>

        <div className="p-3 bg-white border border-ink/15 rounded-sm flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">Recursive Calls</div>
            <div className="text-base font-mono font-bold text-ink mt-0.5">{step.stats.recursiveCalls}</div>
          </div>
          <Repeat className="w-4 h-4 text-ink/30" />
        </div>

        <div className="p-3 bg-white border border-ink/15 rounded-sm flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">Max Call Depth</div>
            <div className="text-base font-mono font-bold text-ink mt-0.5">{step.stats.maxRecursionDepth}</div>
          </div>
          <GitBranch className="w-4 h-4 text-ink/30" />
        </div>
      </div>

      {/* 6. Collapsible Recursion Tree Section */}
      <div className="border border-ink/15 bg-white rounded-sm overflow-hidden">
        <button
          onClick={() => setShowRecursionTree(!showRecursionTree)}
          className="w-full px-5 py-3.5 bg-ink/[0.02] hover:bg-ink/[0.05] flex items-center justify-between transition-colors text-left"
        >
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-ink" />
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              Recursion Tree & Decomposition Graph
            </span>
            <span className="text-[11px] font-mono text-ink/60">
              ({step.treeSnapshot.length} calls recorded)
            </span>
          </div>
          {showRecursionTree ? (
            <ChevronUp className="w-4 h-4 text-ink" />
          ) : (
            <ChevronDown className="w-4 h-4 text-ink" />
          )}
        </button>

        {showRecursionTree && (
          <div className="p-5 border-t border-ink/15 bg-white">
            <RecursionTreeView
              treeSnapshot={step.treeSnapshot}
              activeNodeId={step.activeRecursionId}
            />
          </div>
        )}
      </div>
    </div>
  );
};
