'use strict';
import React, { useRef, useEffect, useMemo } from 'react';
import { ExecutionStep } from '../lib/quicksort/types';
import {
  ArrowUpDown,
  Check,
  ChevronLeft,
  ChevronRight,
  History,
  Target,
  Sparkles,
} from 'lucide-react';

interface PureArrayProcessViewProps {
  step: ExecutionStep;
  steps: ExecutionStep[];
  currentStepIndex: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onJumpToStep: (index: number) => void;
}

export interface MainMilestone {
  mainStepNumber: number;
  originalIndex: number;
  phase: string;
  milestoneTitle: string;
  step: ExecutionStep;
}

export const PureArrayProcessView: React.FC<PureArrayProcessViewProps> = ({
  step,
  steps,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrev,
  onJumpToStep,
}) => {
  const {
    array,
    low,
    high,
    pivot,
    pivotIndex,
    i,
    j,
    comparingIndices,
    swappingIndices,
    finalizedIndices,
    leftPartitionRange,
    rightPartitionRange,
    explanation,
    phase,
  } = step;

  const finalizedSet = new Set(finalizedIndices);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Filter ONLY Main Steps for the second visualization
  const mainMilestones: MainMilestone[] = useMemo(() => {
    const list: MainMilestone[] = [];
    const mainPhases = new Set([
      'PIVOT_SELECTION',
      'PIVOT_PLACE_LOW',
      'MEDIAN_SWAP',
      'SWAP',
      'PIVOT_FINAL_SWAP',
      'PARTITION_DONE',
      'BASE_CASE',
      'SORTED',
    ]);

    let lastAddedPhase = '';
    let lastAddedArrayStr = '';

    for (let idx = 0; idx < steps.length; idx++) {
      const s = steps[idx];
      const isFirst = idx === 0;
      const isLast = idx === steps.length - 1;
      const arrayStr = JSON.stringify(s.array);

      if (isFirst || isLast || mainPhases.has(s.phase)) {
        // Deduplicate adjacent steps that have identical phase and array
        if (s.phase === lastAddedPhase && arrayStr === lastAddedArrayStr && !isLast) {
          continue;
        }

        let title = 'Step Milestone';
        if (s.phase === 'PIVOT_SELECTION' || s.phase === 'PIVOT_PLACE_LOW') {
          title = `Pivot Selected: ${s.pivot ?? s.array[s.pivotIndex ?? 0]}`;
        } else if (s.phase === 'SWAP' || s.phase === 'MEDIAN_SWAP') {
          title = `Elements Swapped`;
        } else if (s.phase === 'PIVOT_FINAL_SWAP' || s.phase === 'PARTITION_DONE') {
          title = `Pivot ${s.pivot} Locked at Index ${s.pivotIndex}`;
        } else if (s.phase === 'BASE_CASE') {
          title = `Subarray Base Case (Length ≤ 1)`;
        } else if (s.phase === 'SORTED') {
          title = `Entire Array Fully Sorted`;
        }

        list.push({
          mainStepNumber: list.length + 1,
          originalIndex: idx,
          phase: s.phase,
          milestoneTitle: title,
          step: s,
        });

        lastAddedPhase = s.phase;
        lastAddedArrayStr = arrayStr;
      }
    }

    return list;
  }, [steps]);

  // Determine which main milestone corresponds to the current step
  const activeMainIndex = useMemo(() => {
    let found = 0;
    for (let m = 0; m < mainMilestones.length; m++) {
      if (mainMilestones[m].originalIndex <= currentStepIndex) {
        found = m;
      } else {
        break;
      }
    }
    return found;
  }, [mainMilestones, currentStepIndex]);

  // Auto-scroll the timeline ONLY horizontally inside container without scrolling window
  useEffect(() => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const activeEl = container.querySelector('[data-active="true"]') as HTMLElement | null;
      if (activeEl) {
        const targetLeft =
          activeEl.offsetLeft -
          container.offsetLeft -
          container.clientWidth / 2 +
          activeEl.clientWidth / 2;
        container.scrollTo({ left: targetLeft, behavior: 'smooth' });
      }
    }
  }, [activeMainIndex]);

  const handleNextMain = () => {
    if (activeMainIndex < mainMilestones.length - 1) {
      onJumpToStep(mainMilestones[activeMainIndex + 1].originalIndex);
    }
  };

  const handlePrevMain = () => {
    if (activeMainIndex > 0) {
      onJumpToStep(mainMilestones[activeMainIndex - 1].originalIndex);
    }
  };

  const currentMainMilestone = mainMilestones[activeMainIndex] || mainMilestones[0];

  return (
    <div className="p-6 bg-white border border-ink/20 rounded-sm shadow-subtle space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-ink/15 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-ink rounded-sm" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
              Pure Array & Pivot Process Visualization
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-ink text-white font-bold rounded-sm uppercase">
              Main Steps Only
            </span>
          </div>
          <p className="text-xs text-ink/70 mt-1">
            Focus purely on the array and pivot at key milestones without source code or micro pointer checks.
          </p>
        </div>

        {/* Step controls for Main Steps */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevMain}
            disabled={activeMainIndex <= 0}
            className="flex items-center gap-1 px-3 py-1.5 border border-ink/30 bg-white hover:border-ink hover:bg-ink/5 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider rounded-sm text-ink transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev Main Step</span>
          </button>

          <span className="text-xs font-mono font-bold text-ink px-2.5 py-1 bg-ink/5 border border-ink/20 rounded-sm">
            Main Step {activeMainIndex + 1} / {mainMilestones.length}
          </span>

          <button
            type="button"
            onClick={handleNextMain}
            disabled={activeMainIndex >= mainMilestones.length - 1}
            className="flex items-center gap-1 px-3.5 py-1.5 bg-ink text-white hover:bg-ink/90 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-subtle"
          >
            <span>Next Main Step</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Milestone Focus Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pivot Card with prominent arrow */}
        <div className="p-4 border-2 border-ink bg-white rounded-sm space-y-1.5 shadow-subtle">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60 flex items-center justify-between">
            <span className="flex items-center gap-1 font-bold text-ink">
              <Target className="w-3.5 h-3.5" />
              Active Pivot
            </span>
            <span className="px-2 py-0.5 bg-ink text-white text-[10px] font-bold rounded-sm flex items-center gap-1">
              <span>PIVOT</span>
              <span>▼</span>
            </span>
          </div>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-2xl font-mono font-bold text-ink">
              {pivot !== null ? pivot : (pivotIndex !== null ? array[pivotIndex] : '—')}
            </span>
            {pivotIndex !== null && (
              <span className="text-xs font-mono font-bold text-ink/70">
                at index [{pivotIndex}]
              </span>
            )}
          </div>
          <p className="text-xs text-ink/75 font-sans leading-relaxed">
            {pivot !== null
              ? `Highlighted with the arrow ▼. Elements ≤ ${pivot} move left; elements ≥ ${pivot} move right.`
              : 'Pivot being selected.'}
          </p>
        </div>

        {/* Current Main Milestone */}
        <div className="p-4 border border-ink/20 bg-ink/[0.02] rounded-sm space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">
            Current Milestone ({activeMainIndex + 1} of {mainMilestones.length})
          </div>
          <div className="text-sm font-mono font-bold text-ink">
            {currentMainMilestone.milestoneTitle}
          </div>
          <p className="text-xs text-ink/80 font-sans leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Subarray Boundaries */}
        <div className="p-4 border border-ink/20 bg-ink/[0.02] rounded-sm space-y-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60">
            Active Subarray Bounds
          </div>
          <div className="text-lg font-mono font-bold text-ink">
            [{low} .. {high}]
          </div>
          <p className="text-xs text-ink/70 font-sans leading-relaxed">
            {finalizedIndices.length} of {array.length} elements are permanently locked into sorted positions.
          </p>
        </div>
      </div>

      {/* Main Array Blocks with Highlighted Arrow on Pivot */}
      <div className="p-6 border border-ink/20 bg-white rounded-sm shadow-subtle">
        <div className="text-xs font-bold uppercase tracking-wider text-ink mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>Array Visualization</span>
            <span className="text-[10px] font-normal text-ink/60 font-mono">
              (Pivot is marked with an arrow ▼ at all times)
            </span>
          </span>
          <span className="text-[11px] font-mono text-ink/60">
            Array Length: {array.length}
          </span>
        </div>

        <div className="py-6 overflow-x-auto scrollbar-thin">
          <div className="flex items-end justify-center gap-3 min-w-max px-4">
            {array.map((val, idx) => {
              const isLow = idx === low;
              const isHigh = idx === high;
              const isI = idx === i;
              const isJ = idx === j;
              const isPivot = idx === pivotIndex;
              const isComparing =
                comparingIndices && (comparingIndices[0] === idx || comparingIndices[1] === idx);
              const isSwapping =
                swappingIndices && (swappingIndices[0] === idx || swappingIndices[1] === idx);
              const isFinalized = finalizedSet.has(idx);

              const inCurrentRange = idx >= low && idx <= high;
              const inLeftPart =
                leftPartitionRange &&
                idx >= leftPartitionRange.low &&
                idx <= leftPartitionRange.high;
              const inRightPart =
                rightPartitionRange &&
                idx >= rightPartitionRange.low &&
                idx <= rightPartitionRange.high;

              let blockClasses = 'bg-white text-ink border-ink/30';

              if (isSwapping) {
                blockClasses = 'bg-ink text-white border-2 border-ink ring-4 ring-ink/20 scale-105 shadow-elevated';
              } else if (isComparing) {
                blockClasses = 'bg-ink/10 text-ink border-2 border-dashed border-ink shadow-subtle';
              } else if (isPivot) {
                blockClasses = 'bg-ink text-white border-2 border-ink ring-2 ring-ink shadow-elevated font-bold';
              } else if (isFinalized) {
                blockClasses = 'bg-ink/90 text-white border border-ink/80';
              } else if (inLeftPart) {
                blockClasses = 'bg-ink/[0.06] text-ink border border-ink/30';
              } else if (inRightPart) {
                blockClasses = 'bg-ink/[0.12] text-ink border border-ink/40';
              } else if (!inCurrentRange) {
                blockClasses = 'bg-white/40 text-ink/30 border-ink/10';
              }

              const absVal = Math.abs(val);
              const height = Math.min(140, Math.max(80, 70 + absVal * 0.8));

              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* Top Indicators: PIVOT ARROW ▼ MUST BE PRESENT EVERY TIME */}
                  <div className="h-14 flex flex-col items-center justify-end mb-1.5 text-xs font-mono font-bold">
                    {/* Pivot Arrow Badge */}
                    {isPivot && (
                      <div className="flex flex-col items-center mb-1 animate-pulse">
                        <span className="px-2 py-0.5 bg-ink text-white text-[10px] font-mono font-bold tracking-wider rounded-sm shadow-elevated flex items-center gap-1 border border-white ring-2 ring-ink">
                          <span>PIVOT</span>
                          <span className="text-[12px] leading-none font-black text-white">▼</span>
                        </span>
                      </div>
                    )}

                    {isSwapping && !isPivot && (
                      <span className="px-2 py-0.5 bg-ink text-white text-[10px] uppercase tracking-wider rounded-sm animate-pulse flex items-center gap-1 mb-1">
                        <ArrowUpDown className="w-3 h-3" />
                        Swap
                      </span>
                    )}

                    {isComparing && !isSwapping && !isPivot && (
                      <span className="px-1.5 py-0.2 bg-ink/15 text-ink text-[10px] uppercase tracking-wider border border-ink/30 rounded-sm mb-1">
                        Compare
                      </span>
                    )}

                    <div className="flex items-center gap-1">
                      {isI && (
                        <span className="px-2 py-0.5 bg-ink text-white rounded-sm font-bold shadow-subtle text-xs">
                          i ▼
                        </span>
                      )}
                      {isJ && (
                        <span className="px-2 py-0.5 border-2 border-ink bg-white text-ink rounded-sm font-bold shadow-subtle text-xs">
                          j ▼
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Block */}
                  <div
                    style={{ height: `${height}px` }}
                    className={`w-14 sm:w-16 flex flex-col justify-between items-center p-2 rounded-sm transition-all duration-200 border ${blockClasses}`}
                  >
                    <div className="text-[10px] font-mono tracking-tight uppercase opacity-85">
                      {isPivot && !isFinalized ? (
                        <span className="bg-white/25 px-1.5 py-0.2 rounded-sm text-white font-bold">
                          PIVOT
                        </span>
                      ) : isFinalized ? (
                        <span className="flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Lock
                        </span>
                      ) : inLeftPart ? (
                        <span>≤ Pivot</span>
                      ) : inRightPart ? (
                        <span>≥ Pivot</span>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    <div className="text-base sm:text-lg font-mono font-bold tracking-tight">
                      {val}
                    </div>

                    <div className="text-[10px] font-mono opacity-60">
                      {val < 0 ? 'neg' : ''}
                    </div>
                  </div>

                  {/* Index and bounds */}
                  <div className="mt-1.5 flex flex-col items-center">
                    <span className="text-xs font-mono font-bold text-ink/75">
                      [{idx}]
                    </span>

                    <div className="h-5 flex items-center justify-center gap-1 mt-0.5 text-[10px] font-mono">
                      {isLow && (
                        <span className="px-1.5 bg-ink/10 border border-ink/25 rounded-sm font-semibold">
                          LOW
                        </span>
                      )}
                      {isHigh && (
                        <span className="px-1.5 bg-ink/10 border border-ink/25 rounded-sm font-semibold">
                          HIGH
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progressive Step History: ONLY MAIN STEPS */}
      <div className="p-5 border border-ink/15 bg-ink/[0.01] rounded-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-ink" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              Progressive Main Milestone Timeline ({mainMilestones.length} Main Steps)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-ink/60">
            Click any milestone to inspect
          </span>
        </div>

        {/* Scrollable Horizontal Step Stream - Container scroll only */}
        <div
          ref={timelineRef}
          className="flex gap-3 overflow-x-auto py-2 scrollbar-thin"
        >
          {mainMilestones.map((m, mIdx) => {
            const isCurrent = mIdx === activeMainIndex;
            const isPast = mIdx < activeMainIndex;

            return (
              <div
                key={mIdx}
                data-active={isCurrent ? 'true' : 'false'}
                onClick={() => onJumpToStep(m.originalIndex)}
                className={`flex-shrink-0 p-3.5 border rounded-sm cursor-pointer transition-all w-64 ${
                  isCurrent
                    ? 'border-2 border-ink bg-white shadow-elevated ring-2 ring-ink/20'
                    : isPast
                    ? 'border-ink/20 bg-white hover:border-ink hover:bg-ink/[0.02]'
                    : 'border-ink/10 bg-ink/[0.01] opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono pb-1 border-b border-ink/10 mb-2">
                  <span className={`font-bold ${isCurrent ? 'text-ink' : 'text-ink/70'}`}>
                    Main Step {m.mainStepNumber}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded-sm text-[9px] font-bold uppercase ${
                      isCurrent
                        ? 'bg-ink text-white'
                        : 'bg-ink/10 text-ink'
                    }`}
                  >
                    {m.phase.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="text-xs font-bold font-sans text-ink mb-1.5 truncate">
                  {m.milestoneTitle}
                </div>

                {/* Array snapshot preview with Pivot highlighted */}
                <div className="flex flex-wrap gap-1 my-2 font-mono text-xs">
                  {m.step.array.map((v, vIdx) => {
                    const isPiv = vIdx === m.step.pivotIndex;
                    const isFin = m.step.finalizedIndices.includes(vIdx);

                    return (
                      <span
                        key={vIdx}
                        className={`px-1.5 py-0.5 rounded-sm text-[10px] font-bold ${
                          isPiv
                            ? 'bg-ink text-white ring-1 ring-ink'
                            : isFin
                            ? 'bg-ink/20 text-ink'
                            : 'bg-ink/5 text-ink/80'
                        }`}
                        title={isPiv ? `Pivot: ${v}` : undefined}
                      >
                        {v}
                      </span>
                    );
                  })}
                </div>

                {/* Brief step explanation */}
                <p className="text-[11px] text-ink/75 font-sans line-clamp-2 leading-relaxed">
                  {m.step.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
