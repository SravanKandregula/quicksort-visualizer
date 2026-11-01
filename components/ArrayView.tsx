'use strict';
import React from 'react';
import { ExecutionStep } from '../lib/quicksort/types';
import { ArrowUpDown, Check, Info } from 'lucide-react';

interface ArrayViewProps {
  step: ExecutionStep;
}

export const ArrayView: React.FC<ArrayViewProps> = ({ step }) => {
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
    partitionRange,
    leftPartitionRange,
    rightPartitionRange,
  } = step;

  const finalizedSet = new Set(finalizedIndices);

  return (
    <div className="flex flex-col h-full justify-between space-y-5">
      {/* Subarray info strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-ink/[0.03] border border-ink/15 rounded-sm text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="font-bold uppercase tracking-wider text-ink">Active Subarray:</span>
          <span className="px-2 py-0.5 bg-white border border-ink/20 rounded-sm">
            low: <strong className="text-ink">{low}</strong>
          </span>
          <span className="px-2 py-0.5 bg-white border border-ink/20 rounded-sm">
            high: <strong className="text-ink">{high}</strong>
          </span>
          <span className="text-ink/60">
            [{low >= 0 ? low : 0} .. {high >= 0 ? high : 0}]
          </span>
        </div>

        {pivot !== null && (
          <div className="flex items-center gap-1.5">
            <span className="text-ink/60 uppercase">Pivot:</span>
            <span className="px-2 py-0.5 bg-ink text-white font-bold rounded-sm">
              pi = {pivot} {pivotIndex !== null ? `(idx: ${pivotIndex})` : ''}
            </span>
          </div>
        )}
      </div>

      {/* Main Blocks Display */}
      <div className="my-auto py-6 overflow-x-auto scrollbar-thin">
        <div className="flex items-end justify-center gap-2.5 min-w-max px-4">
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
              blockClasses = 'bg-ink text-white border-2 border-ink ring-2 ring-ink/20 scale-105 shadow-elevated';
            } else if (isComparing) {
              blockClasses = 'bg-ink/10 text-ink border-2 border-dashed border-ink shadow-subtle';
            } else if (isPivot) {
              blockClasses = 'bg-ink text-white border-2 border-ink shadow-subtle font-bold';
            } else if (isFinalized) {
              blockClasses = 'bg-ink/90 text-white border border-ink/80';
            } else if (inLeftPart) {
              blockClasses = 'bg-ink/[0.06] text-ink border border-ink/30';
            } else if (inRightPart) {
              blockClasses = 'bg-ink/[0.12] text-ink border border-ink/40';
            } else if (!inCurrentRange) {
              blockClasses = 'bg-white/50 text-ink/30 border-ink/10';
            }

            const absVal = Math.abs(val);
            const height = Math.min(130, Math.max(72, 60 + absVal * 0.7));

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Top pointer & Pivot Arrow indicators above block */}
                <div className="h-14 flex flex-col items-center justify-end mb-1 text-[10px] font-mono font-bold">
                  {/* Highlight Pivot with an Arrow EVERY TIME */}
                  {isPivot && (
                    <div className="flex flex-col items-center mb-1 animate-pulse">
                      <span className="px-1.5 py-0.5 bg-ink text-white text-[9px] font-mono font-bold tracking-wider rounded-sm shadow-elevated flex items-center gap-1 border border-white ring-1 ring-ink">
                        <span>PIVOT</span>
                        <span className="text-[11px] leading-none">▼</span>
                      </span>
                    </div>
                  )}

                  {isSwapping && (
                    <span className="px-1.5 py-0.5 bg-ink text-white text-[9px] uppercase tracking-wider rounded-sm animate-pulse flex items-center gap-0.5 mb-1">
                      <ArrowUpDown className="w-2.5 h-2.5" />
                      Swap
                    </span>
                  )}
                  {isComparing && !isSwapping && (
                    <span className="px-1 py-0.2 bg-ink/15 text-ink text-[9px] uppercase tracking-wider border border-ink/30 rounded-sm mb-1">
                      Compare
                    </span>
                  )}
                  <div className="flex items-center gap-1">
                    {isI && (
                      <span className="px-1.5 py-0.5 bg-ink text-white rounded-sm font-bold shadow-subtle">
                        i
                      </span>
                    )}
                    {isJ && (
                      <span className="px-1.5 py-0.5 border-2 border-ink bg-white text-ink rounded-sm font-bold shadow-subtle">
                        j
                      </span>
                    )}
                  </div>
                </div>

                {/* The Block */}
                <div
                  style={{ height: `${height}px` }}
                  className={`w-12 sm:w-14 flex flex-col justify-between items-center p-1.5 rounded-sm transition-all duration-200 border ${blockClasses}`}
                >
                  <div className="text-[9px] font-mono tracking-tight uppercase opacity-80">
                    {isPivot && !isFinalized ? (
                      <span className="bg-white/20 px-1 py-0.2 rounded-sm text-white font-bold">PIVOT</span>
                    ) : isFinalized ? (
                      <span className="flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Lock
                      </span>
                    ) : inLeftPart ? (
                      <span>L-Part</span>
                    ) : inRightPart ? (
                      <span>R-Part</span>
                    ) : (
                      <span></span>
                    )}
                  </div>

                  <div className="text-sm sm:text-base font-mono font-bold tracking-tight">
                    {val}
                  </div>

                  <div className="text-[9px] font-mono opacity-50">
                    {val < 0 ? 'neg' : ''}
                  </div>
                </div>

                {/* Bottom index label & range bounds */}
                <div className="mt-1 flex flex-col items-center">
                  <span className="text-[10px] font-mono font-bold text-ink/70">
                    [{idx}]
                  </span>

                  <div className="h-5 flex items-center justify-center gap-1 mt-0.5 text-[9px] font-mono">
                    {isLow && (
                      <span className="px-1 bg-ink/10 border border-ink/25 rounded-sm font-semibold">
                        LOW
                      </span>
                    )}
                    {isHigh && (
                      <span className="px-1 bg-ink/10 border border-ink/25 rounded-sm font-semibold">
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

      {/* Partition Subarray Layout */}
      {partitionRange && (
        <div className="p-3.5 bg-ink/[0.02] border border-ink/15 rounded-sm">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink mb-2">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Partition Subarray Layout
            </span>
            <span className="text-[11px] font-mono text-ink/60 font-normal">
              [{partitionRange.low} .. {partitionRange.high}]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="flex items-center justify-between font-bold text-[11px] text-ink">
                <span>Left Subarray (≤ pivot)</span>
                <span>
                  {leftPartitionRange
                    ? `[${leftPartitionRange.low} .. ${leftPartitionRange.high}]`
                    : 'Empty'}
                </span>
              </div>
              <p className="text-[11px] text-ink/70 mt-1 font-sans">
                {leftPartitionRange
                  ? `Elements smaller than or equal to the pivot.`
                  : `No smaller elements in this branch.`}
              </p>
            </div>

            <div className="p-2.5 border border-ink bg-ink text-white rounded-sm">
              <div className="flex items-center justify-between font-bold text-[11px]">
                <span>Pivot Element</span>
                <span>{pivotIndex !== null ? `Index [${pivotIndex}]` : 'N/A'}</span>
              </div>
              <p className="text-[11px] text-white/80 mt-1 font-sans">
                {pivot !== null
                  ? `Value = ${pivot}. Locked in place.`
                  : 'Pivot is being selected.'}
              </p>
            </div>

            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="flex items-center justify-between font-bold text-[11px] text-ink">
                <span>Right Subarray (≥ pivot)</span>
                <span>
                  {rightPartitionRange
                    ? `[${rightPartitionRange.low} .. ${rightPartitionRange.high}]`
                    : 'Empty'}
                </span>
              </div>
              <p className="text-[11px] text-ink/70 mt-1 font-sans">
                {rightPartitionRange
                  ? `Elements larger than or equal to the pivot.`
                  : `No larger elements in this branch.`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visual State Legend */}
      <div className="pt-2 border-t border-ink/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 bg-white border border-ink/40 rounded-sm" />
            <span className="truncate">Normal</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 bg-ink text-white rounded-sm font-bold text-[8px] flex items-center justify-center">
              P
            </div>
            <span className="truncate">Pivot</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 bg-ink text-white rounded-sm text-[8px] flex items-center justify-center font-bold">
              i
            </div>
            <span className="truncate">Pointer i</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 border-2 border-ink bg-white text-ink rounded-sm text-[8px] flex items-center justify-center font-bold">
              j
            </div>
            <span className="truncate">Pointer j</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 bg-ink/10 border-2 border-dashed border-ink rounded-sm" />
            <span className="truncate">Comparing</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 bg-ink text-white rounded-sm flex items-center justify-center">
              <ArrowUpDown className="w-2.5 h-2.5" />
            </div>
            <span className="truncate">Swapping</span>
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-white border border-ink/20 rounded-sm">
            <div className="w-3.5 h-3.5 bg-ink/90 text-white rounded-sm flex items-center justify-center">
              <Check className="w-2.5 h-2.5" />
            </div>
            <span className="truncate">Locked</span>
          </div>
        </div>
      </div>
    </div>
  );
};
