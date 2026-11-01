'use strict';
import React from 'react';
import { Gauge, Calculator, AlertOctagon } from 'lucide-react';

export const ComplexitySection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Time & Space Complexity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time Complexity */}
        <div className="p-5 bg-white border border-ink/20 rounded-sm space-y-3 shadow-subtle">
          <div className="flex items-center justify-between border-b border-ink/10 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-ink" />
              Time Complexity Summary
            </h3>
            <span className="text-[11px] font-mono text-ink/70">Comparisons Count</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 bg-ink/[0.02] border border-ink/15 rounded-sm">
              <span className="text-ink font-sans font-semibold">Best Case:</span>
              <span className="font-bold text-sm bg-white px-2 py-0.5 border border-ink/20 rounded-sm">
                O(n log n)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-ink/[0.02] border border-ink/15 rounded-sm">
              <span className="text-ink font-sans font-semibold">Average Case:</span>
              <span className="font-bold text-sm bg-white px-2 py-0.5 border border-ink/20 rounded-sm">
                O(n log n)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-ink/[0.04] border border-ink/25 rounded-sm">
              <span className="text-ink font-sans font-semibold">Worst Case:</span>
              <span className="font-bold text-sm bg-ink text-white px-2 py-0.5 rounded-sm">
                O(n²)
              </span>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="p-5 bg-white border border-ink/20 rounded-sm space-y-3 shadow-subtle">
          <div className="flex items-center justify-between border-b border-ink/10 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-ink" />
              Auxiliary Space (Call Stack)
            </h3>
            <span className="text-[11px] font-mono text-ink/70">Activation Depth</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 bg-ink/[0.02] border border-ink/15 rounded-sm">
              <span className="text-ink font-sans font-semibold">Best Case:</span>
              <span className="font-bold text-sm bg-white px-2 py-0.5 border border-ink/20 rounded-sm">
                O(log n)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-ink/[0.02] border border-ink/15 rounded-sm">
              <span className="text-ink font-sans font-semibold">Average Case:</span>
              <span className="font-bold text-sm bg-white px-2 py-0.5 border border-ink/20 rounded-sm">
                O(log n)
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-ink/[0.04] border border-ink/25 rounded-sm">
              <span className="text-ink font-sans font-semibold">Worst Case:</span>
              <span className="font-bold text-sm bg-ink text-white px-2 py-0.5 rounded-sm">
                O(n)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recurrence Relations */}
      <div className="p-5 bg-white border border-ink/20 rounded-sm space-y-4 shadow-subtle">
        <h3 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-2">
          <Calculator className="w-4 h-4 text-ink" />
          Mathematical Recurrence Relations & Derivations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 border border-ink/15 bg-ink/[0.02] rounded-sm space-y-2">
            <div className="font-bold text-ink uppercase text-[11px] border-b border-ink/10 pb-1">
              Best Case: Perfectly Balanced Partitions
            </div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              When the pivot divides the subarray of size n into two equal halves of size n/2:
            </p>
            <div className="p-2.5 bg-white border border-ink/20 rounded-sm text-center font-bold text-sm">
              T(n) = 2 · T(n/2) + Θ(n)
            </div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              Applying Master Theorem (a = 2, b = 2, f(n) = Θ(n)):
            </p>
            <div className="p-2 bg-ink/[0.03] border border-ink/15 rounded-sm text-center">
              log_b(a) = log₂(2) = 1 &nbsp;⇒&nbsp; <strong>T(n) = Θ(n log n)</strong>
            </div>
          </div>

          <div className="p-4 border border-ink/15 bg-ink/[0.02] rounded-sm space-y-2">
            <div className="font-bold text-ink uppercase text-[11px] border-b border-ink/10 pb-1">
              Worst Case: Maximally Unbalanced Partitions
            </div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              When the pivot is consistently the extreme minimum or maximum:
            </p>
            <div className="p-2.5 bg-white border border-ink/20 rounded-sm text-center font-bold text-sm">
              T(n) = T(n - 1) + Θ(n)
            </div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              Expanding telescopically yields:
            </p>
            <div className="p-2 bg-ink text-white rounded-sm text-center font-bold">
              T(n) = Θ(n²)
            </div>
          </div>
        </div>
      </div>

      {/* Critical Theoretical Distinctions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-ink" />
          Critical Theoretical Distinctions (Essential for Viva)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-ink font-mono">
              <span className="w-2 h-2 bg-ink rounded-sm" />
              Median-of-Three Does NOT Guarantee O(n log n) Worst Case
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              Median-of-Three protects against sorted arrays, but it is <strong>still a heuristic</strong>. Engineered poison arrays can consistently force an unbalanced partition, resulting in <code className="font-mono">O(n²)</code> run time.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-ink font-mono">
              <span className="w-2 h-2 bg-ink rounded-sm" />
              True Median Selection vs Median-of-Three
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              To guarantee strict <code className="font-mono">O(n log n)</code> worst-case time, an algorithm must find the true mathematical median using the <em>BFPRT (Median of Medians) algorithm</em> in deterministic <code className="font-mono">O(n)</code> time at every step.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-ink font-mono">
              <span className="w-2 h-2 bg-ink rounded-sm" />
              Array Storage O(1) vs Recursion Stack Space
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              Quick Sort requires <code className="font-mono">O(1)</code> auxiliary storage for array swapping (in-place). However, activation frames on the call stack consume <code className="font-mono">O(log n)</code> on average and <code className="font-mono">O(n)</code> in the worst case.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-ink font-mono">
              <span className="w-2 h-2 bg-ink rounded-sm" />
              Median-of-Three Overhead is Constant O(1)
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              The 3 comparisons and up to 4 swaps used in median-of-three selection execute in constant time <code className="font-mono">O(1)</code> before partitioning begins, without altering asymptotic partition complexity <code className="font-mono">Θ(n)</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
