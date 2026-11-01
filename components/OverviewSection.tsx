'use strict';
import React from 'react';
import {
  Split,
  Layers,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

export const OverviewSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Hero / Introduction */}
      <div className="p-6 bg-white border border-ink/20 rounded-sm space-y-4 shadow-subtle">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-ink text-white rounded-sm">
            Core Concept
          </span>
          <span className="text-xs font-mono text-ink/70">Divide & Conquer Paradigm</span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-ink uppercase">
          What is Quick Sort?
        </h2>

        <p className="text-sm md:text-base text-ink/90 leading-relaxed font-sans">
          <strong>Quick Sort</strong> is an in-place, comparison-based sorting algorithm based on the <em>Divide and Conquer</em> paradigm. Invented by British computer scientist Tony Hoare in 1959, it achieves an average-case time complexity of <code className="font-mono bg-ink/5 px-1.5 py-0.5 border border-ink/15 rounded-sm">O(n log n)</code> by dividing a large problem into two smaller subproblems separated by a specially selected element called the <strong>pivot</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono">
          <div className="p-3.5 border border-ink/15 bg-ink/[0.02] rounded-sm">
            <div className="font-bold uppercase text-ink mb-1">1. Divide</div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              Rearrange elements so that every element smaller than the pivot is placed to its left, and every element larger than the pivot is placed to its right.
            </p>
          </div>
          <div className="p-3.5 border border-ink/15 bg-ink/[0.02] rounded-sm">
            <div className="font-bold uppercase text-ink mb-1">2. Conquer</div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              Recursively apply the same sorting procedure to the subarray of elements to the left of the pivot and to the subarray to the right.
            </p>
          </div>
          <div className="p-3.5 border border-ink/15 bg-ink/[0.02] rounded-sm">
            <div className="font-bold uppercase text-ink mb-1">3. Combine</div>
            <p className="font-sans text-ink/80 text-[11px] leading-relaxed">
              Trivial! Because partitioning sorts the elements in-place around finalized pivot positions, no explicit merging step is required.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Key Operational Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold uppercase tracking-wider text-ink flex items-center gap-2">
          <Layers className="w-5 h-5 text-ink" />
          The 6 Fundamental Phases of Quick Sort
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-white rounded-sm text-xs font-mono font-bold flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm font-bold uppercase text-ink">Pivot Selection</h4>
            </div>
            <p className="text-xs text-ink/80 leading-relaxed font-sans">
              A key value is chosen from the current subarray. The choice of pivot directly determines partition balance. Strategies include First Element, Median-of-Three, or Last Element.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-white rounded-sm text-xs font-mono font-bold flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm font-bold uppercase text-ink">Partitioning (Scanning)</h4>
            </div>
            <p className="text-xs text-ink/80 leading-relaxed font-sans">
              Pointers (e.g., <code className="font-mono">i</code> and <code className="font-mono">j</code>) scan through the subarray to identify elements that violate the ordering invariant.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-white rounded-sm text-xs font-mono font-bold flex items-center justify-center">
                3
              </span>
              <h4 className="text-sm font-bold uppercase text-ink">Inversion Swapping</h4>
            </div>
            <p className="text-xs text-ink/80 leading-relaxed font-sans">
              When the left pointer encounters an element larger than the pivot and the right pointer encounters an element smaller than the pivot, they are swapped.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-white rounded-sm text-xs font-mono font-bold flex items-center justify-center">
                4
              </span>
              <h4 className="text-sm font-bold uppercase text-ink">Final Pivot Placement</h4>
            </div>
            <p className="text-xs text-ink/80 leading-relaxed font-sans">
              Once pointers cross, the pivot element is swapped into the partition boundary index. The pivot is now at its <strong>permanent sorted position</strong>.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-white rounded-sm text-xs font-mono font-bold flex items-center justify-center">
                5
              </span>
              <h4 className="text-sm font-bold uppercase text-ink">Recursive Sub-Sorting</h4>
            </div>
            <p className="text-xs text-ink/80 leading-relaxed font-sans">
              Quick Sort is invoked recursively for the left subarray <code className="font-mono">[low .. pi - 1]</code> and right subarray <code className="font-mono">[pi + 1 .. high]</code>.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-ink text-white rounded-sm text-xs font-mono font-bold flex items-center justify-center">
                6
              </span>
              <h4 className="text-sm font-bold uppercase text-ink">Base Condition (Termination)</h4>
            </div>
            <p className="text-xs text-ink/80 leading-relaxed font-sans">
              Subarrays with zero or one element (<code className="font-mono">low &gt;= high</code>) are already sorted and return immediately, unwinding the call stack.
            </p>
          </div>
        </div>
      </div>

      {/* Pivot Strategies Breakdown */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold uppercase tracking-wider text-ink flex items-center gap-2">
          <Split className="w-5 h-5 text-ink" />
          The Three Supported Pivot Strategies Explained
        </h3>

        {/* Strategy 1: First Element */}
        <div className="p-5 border border-ink/20 bg-white rounded-sm space-y-3 shadow-subtle">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold uppercase text-ink">
              1. First Element as Pivot (ar[low])
            </h4>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-ink/5 border border-ink/15 rounded-sm text-ink">
              Textbook Approach
            </span>
          </div>
          <p className="text-xs md:text-sm text-ink/85 leading-relaxed font-sans">
            Picks <code className="font-mono">ar[low]</code> as the pivot. The left pointer <code className="font-mono">i</code> starts at <code className="font-mono">low + 1</code>, and right pointer <code className="font-mono">j</code> starts at <code className="font-mono">high</code>.
          </p>
          <div className="p-3 bg-ink/[0.03] border border-ink/15 rounded-sm text-xs font-sans space-y-1.5">
            <div className="font-bold text-ink uppercase text-[11px] flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-ink" />
              Behavior on Sorted Arrays:
            </div>
            <p className="text-ink/80 leading-relaxed">
              If the input is already sorted, the first element is the minimum. Partitioning leaves 0 elements on the left and <code className="font-mono">n - 1</code> on the right, degrading recursion tree depth to <code className="font-mono">O(n)</code> and producing worst-case <code className="font-mono">O(n²)</code> run time.
            </p>
          </div>
        </div>

        {/* Strategy 2: Median-of-Three */}
        <div className="p-5 border-2 border-ink bg-white rounded-sm space-y-3 shadow-subtle">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold uppercase text-ink">
              2. Median-of-Three as Pivot (Supplied C Implementation)
            </h4>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-ink text-white rounded-sm">
              Standard Engineering Heuristic
            </span>
          </div>
          <p className="text-xs md:text-sm text-ink/85 leading-relaxed font-sans">
            Samples three elements from the subarray: first (<code className="font-mono">low</code>), middle (<code className="font-mono">mid = (low + high) / 2</code>), and last (<code className="font-mono">high</code>).
          </p>

          <div className="p-3.5 bg-ink/[0.03] border border-ink/15 rounded-sm space-y-2 text-xs font-mono">
            <div className="font-bold text-ink uppercase text-[11px]">The Exact 3-Comparison Procedure:</div>
            <ol className="list-decimal list-inside space-y-1 text-ink/90">
              <li>Compare <code className="bg-white px-1 py-0.2 border rounded-sm">ar[low] &gt; ar[mid]</code>: if true, swap <code className="font-semibold">ar[low]</code> and <code className="font-semibold">ar[mid]</code>.</li>
              <li>Compare <code className="bg-white px-1 py-0.2 border rounded-sm">ar[low] &gt; ar[high]</code>: if true, swap <code className="font-semibold">ar[low]</code> and <code className="font-semibold">ar[high]</code>.</li>
              <li>Compare <code className="bg-white px-1 py-0.2 border rounded-sm">ar[mid] &gt; ar[high]</code>: if true, swap <code className="font-semibold">ar[mid]</code> and <code className="font-semibold">ar[high]</code>.</li>
              <li>Swap <code className="bg-white px-1 py-0.2 border rounded-sm">ar[low]</code> and <code className="font-semibold">ar[mid]</code>: moves the true median into position <code className="font-mono">low</code> to serve as <code className="font-mono">pi</code>.</li>
            </ol>
          </div>

          <div className="p-3 bg-ink/[0.03] border border-ink/15 rounded-sm text-xs font-sans space-y-1.5">
            <div className="font-bold text-ink uppercase text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-ink" />
              Why Median-of-Three Prevents Degradation:
            </div>
            <p className="text-ink/80 leading-relaxed">
              On sorted or reverse-sorted data, the median element is guaranteed to be near the true numerical center of the three samples. Because it cannot be the extreme minimum or maximum of the subarray, both partitions are non-empty for <code className="font-mono">length &gt;= 3</code>, avoiding <code className="font-mono">O(n²)</code> on sorted arrays.
            </p>
          </div>
        </div>

        {/* Strategy 3: Lomuto Last Pivot */}
        <div className="p-5 border border-ink/20 bg-white rounded-sm space-y-3 shadow-subtle">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold uppercase text-ink">
              3. Last Element Pivot (Lomuto Partition Scheme)
            </h4>
            <span className="text-[11px] font-mono px-2 py-0.5 bg-ink/5 border border-ink/15 rounded-sm text-ink">
              Single-Pass Forward Scan
            </span>
          </div>
          <p className="text-xs md:text-sm text-ink/85 leading-relaxed font-sans">
            Selects <code className="font-mono">ar[high]</code> as the pivot. It maintains boundary index <code className="font-mono">i = low - 1</code> marking elements <code className="font-mono">&lt;= pi</code> and pointer <code className="font-mono">j</code> advancing forward. Very concise to write, but performs roughly 3× more swaps on average than Hoare partition.
          </p>
        </div>
      </div>
    </div>
  );
};
