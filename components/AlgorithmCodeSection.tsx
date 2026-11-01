'use strict';
import React, { useState } from 'react';
import {
  C_CODE_MEDIAN_OF_THREE,
  C_CODE_FIRST,
  C_CODE_LAST,
} from '../lib/quicksort/cCode';
import { PivotStrategy } from '../lib/quicksort/types';
import { Code2, Copy, Check, FileCode, Layers } from 'lucide-react';

export const AlgorithmCodeSection: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<PivotStrategy>('MEDIAN_OF_THREE');
  const [copied, setCopied] = useState<boolean>(false);

  const getCode = (strat: PivotStrategy) => {
    switch (strat) {
      case 'MEDIAN_OF_THREE':
        return C_CODE_MEDIAN_OF_THREE;
      case 'FIRST':
        return C_CODE_FIRST;
      case 'LAST':
        return C_CODE_LAST;
    }
  };

  const activeCode = getCode(selectedStrategy);
  const rawText = activeCode.map((c) => c.code).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white border border-ink/15 rounded-sm">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-ink" />
          <span className="text-xs font-bold uppercase tracking-wider text-ink">
            Select C Implementation:
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedStrategy('MEDIAN_OF_THREE')}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-sm border transition-colors ${
              selectedStrategy === 'MEDIAN_OF_THREE'
                ? 'bg-ink text-white border-ink'
                : 'border-ink/20 text-ink bg-white hover:bg-ink/5'
            }`}
          >
            Median-of-Three (Supplied C)
          </button>

          <button
            onClick={() => setSelectedStrategy('FIRST')}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-sm border transition-colors ${
              selectedStrategy === 'FIRST'
                ? 'bg-ink text-white border-ink'
                : 'border-ink/20 text-ink bg-white hover:bg-ink/5'
            }`}
          >
            First Element Pivot
          </button>

          <button
            onClick={() => setSelectedStrategy('LAST')}
            className={`px-3 py-1 text-xs font-mono font-semibold rounded-sm border transition-colors ${
              selectedStrategy === 'LAST'
                ? 'bg-ink text-white border-ink'
                : 'border-ink/20 text-ink bg-white hover:bg-ink/5'
            }`}
          >
            Last Element Pivot (Lomuto)
          </button>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="border border-ink/20 bg-white rounded-sm overflow-hidden shadow-subtle">
        <div className="flex items-center justify-between px-4 py-2.5 bg-ink/[0.03] border-b border-ink/15">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink">
            <Code2 className="w-4 h-4 text-ink" />
            <span>
              {selectedStrategy === 'MEDIAN_OF_THREE'
                ? 'quicksort_median_of_three.c'
                : selectedStrategy === 'FIRST'
                ? 'quicksort_first_pivot.c'
                : 'quicksort_lomuto.c'}
            </span>
            <span className="text-[10px] font-normal text-ink/60">
              ({activeCode.length} lines)
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border border-ink/25 bg-white hover:border-ink hover:bg-ink/5 rounded-sm text-ink transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-ink" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-ink" />
                <span>Copy C Source</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed max-h-[600px] overflow-y-auto bg-white">
          {activeCode.map((line) => (
            <div key={line.lineNum} className="flex hover:bg-ink/[0.02]">
              <span className="w-10 flex-shrink-0 text-right pr-4 text-ink/40 select-none text-[11px]">
                {line.lineNum}
              </span>
              <pre className="whitespace-pre text-ink/90 font-mono">{line.code}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Breakdown */}
      <div className="p-4 border border-ink/15 bg-ink/[0.02] rounded-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-ink" />
          Key Architectural Highlights for Examinations & Viva
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
          <div className="p-3 bg-white border border-ink/15 rounded-sm space-y-1">
            <div className="font-bold font-mono text-ink text-[11px]">In-Place Sorting</div>
            <p className="text-ink/80 text-[11px] leading-relaxed">
              Elements are swapped directly within array memory without allocating auxiliary arrays of size <code className="font-mono">n</code>.
            </p>
          </div>

          <div className="p-3 bg-white border border-ink/15 rounded-sm space-y-1">
            <div className="font-bold font-mono text-ink text-[11px]">Two-Pointer vs Lomuto</div>
            <p className="text-ink/80 text-[11px] leading-relaxed">
              Hoare’s scan moves from both edges and only swaps inversions. Lomuto scans linearly with two forward pointers, swapping elements into place continuously.
            </p>
          </div>

          <div className="p-3 bg-white border border-ink/15 rounded-sm space-y-1">
            <div className="font-bold font-mono text-ink text-[11px]">Stack Optimization</div>
            <p className="text-ink/80 text-[11px] leading-relaxed">
              Tail recursion optimization is achieved in production libraries by recursing into the smaller partition first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
