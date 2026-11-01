'use strict';
import React from 'react';
import { ExecutionStep, PivotStrategy } from '../lib/quicksort/types';
import { PIVOT_STRATEGIES } from '../lib/quicksort/constants';
import {
  CheckCircle2,
  RotateCcw,
  X,
} from 'lucide-react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  step: ExecutionStep;
  strategy: PivotStrategy;
  totalSteps: number;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onReset,
  step,
  strategy,
  totalSteps,
}) => {
  if (!isOpen) return null;

  const stratInfo = PIVOT_STRATEGIES[strategy];

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-ink/30 w-full max-w-2xl rounded-sm shadow-elevated p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-ink/15 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-ink text-white rounded-sm flex items-center justify-center shadow-subtle">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold uppercase tracking-tight text-ink">
                  Quick Sort Completed!
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-ink text-white uppercase rounded-sm">
                  Sorted
                </span>
              </div>
              <p className="text-xs text-ink/70 font-sans">
                Every element has been placed into its permanent sorted position.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-ink/10 rounded-sm text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sorted Array */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink/70 mb-1.5 flex items-center justify-between font-mono">
            <span>Final Sorted Array:</span>
            <span>[{step.array.length} elements]</span>
          </div>
          <div className="flex flex-wrap gap-1.5 p-3 bg-ink/[0.03] border border-ink/15 rounded-sm max-h-32 overflow-y-auto font-mono text-xs">
            {step.array.map((val, idx) => (
              <div
                key={idx}
                className="px-2.5 py-1.5 bg-ink text-white font-bold rounded-sm flex items-center gap-1 shadow-subtle"
              >
                <span className="text-[10px] opacity-60">[{idx}]</span>
                <span>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Execution Statistics Grid */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink/70 mb-2 font-mono">
            Actual Execution Metrics:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="text-ink/60 text-[10px] uppercase">Comparisons</div>
              <div className="text-base font-bold text-ink mt-0.5">
                {step.stats.comparisons}
              </div>
            </div>

            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="text-ink/60 text-[10px] uppercase">Swaps</div>
              <div className="text-base font-bold text-ink mt-0.5">
                {step.stats.swaps}
              </div>
            </div>

            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="text-ink/60 text-[10px] uppercase">Partitions</div>
              <div className="text-base font-bold text-ink mt-0.5">
                {step.stats.partitions}
              </div>
            </div>

            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="text-ink/60 text-[10px] uppercase">Recursive Calls</div>
              <div className="text-base font-bold text-ink mt-0.5">
                {step.stats.recursiveCalls}
              </div>
            </div>

            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="text-ink/60 text-[10px] uppercase">Max Call Depth</div>
              <div className="text-base font-bold text-ink mt-0.5">
                {step.stats.maxRecursionDepth}
              </div>
            </div>

            <div className="p-2.5 border border-ink/15 bg-white rounded-sm">
              <div className="text-ink/60 text-[10px] uppercase">Total Steps</div>
              <div className="text-base font-bold text-ink mt-0.5">
                {totalSteps}
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Summary */}
        <div className="p-3 bg-ink/[0.02] border border-ink/15 rounded-sm space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink font-mono">
            Applied Strategy: {stratInfo.title}
          </div>
          <p className="text-xs text-ink/80 leading-relaxed font-sans">
            Sorted using {stratInfo.shortName}. {step.explanation}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-ink/15 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 border border-ink/25 bg-white hover:border-ink hover:bg-ink/5 rounded-sm text-xs font-bold uppercase tracking-wider text-ink transition-colors"
          >
            Review Visualizer
          </button>
          <button
            onClick={() => {
              onClose();
              onReset();
            }}
            className="w-full sm:w-auto px-4 py-2 bg-ink text-white hover:bg-ink/90 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors shadow-subtle flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Visualization</span>
          </button>
        </div>
      </div>
    </div>
  );
};
