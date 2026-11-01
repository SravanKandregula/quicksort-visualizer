'use strict';
import React from 'react';
import { GitCompare, Table, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Primary Comparison Matrix Table */}
      <div className="border border-ink/20 bg-white rounded-sm overflow-hidden shadow-subtle">
        <div className="p-4 bg-ink/[0.03] border-b border-ink/15 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="w-4 h-4 text-ink" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              Comprehensive Quick Sort Strategy Comparison
            </h3>
          </div>
          <span className="text-[11px] font-mono text-ink/70">Academic Benchmarks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono divide-y divide-ink/15">
            <thead className="bg-ink/[0.04] text-ink uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 border-r border-ink/15">Feature / Metric</th>
                <th className="py-3 px-4 border-r border-ink/15 font-bold">First Element Pivot</th>
                <th className="py-3 px-4 border-r border-ink/15 font-bold bg-ink text-white">
                  Median-of-Three Pivot
                </th>
                <th className="py-3 px-4 font-bold">Last Element Pivot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 text-ink/90">
              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Pivot Selection
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15">First element (ar[low])</td>
                <td className="py-2.5 px-4 border-r border-ink/15 font-semibold bg-ink/[0.03]">
                  Median of low, mid, high
                </td>
                <td className="py-2.5 px-4">Last element (ar[high])</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Partition Scheme
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15">Two-pointer bidirectional</td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03]">
                  Pre-sort 3 elements, then two-pointer scan
                </td>
                <td className="py-2.5 px-4">Lomuto single-pass forward scan</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Best Time Complexity
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15">O(n log n)</td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03]">O(n log n)</td>
                <td className="py-2.5 px-4">O(n log n)</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Average Time Complexity
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15">O(n log n)</td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03] font-semibold">
                  O(n log n) (lowest constants)
                </td>
                <td className="py-2.5 px-4">O(n log n)</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Worst Time Complexity
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15 font-bold">O(n²)</td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03] font-bold">
                  O(n²) (adversary arrays)
                </td>
                <td className="py-2.5 px-4 font-bold">O(n²)</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Worst Space (Stack)
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15">O(n)</td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03]">O(n)</td>
                <td className="py-2.5 px-4">O(n)</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Sorted Input Behavior
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15 text-ink font-semibold">
                  Worst-case O(n²) trigger
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03] text-ink font-semibold">
                  Balanced split! O(n log n)
                </td>
                <td className="py-2.5 px-4 text-ink font-semibold">Worst-case O(n²) trigger</td>
              </tr>

              <tr>
                <td className="py-2.5 px-4 font-semibold border-r border-ink/15 bg-ink/[0.01]">
                  Swap Count Efficiency
                </td>
                <td className="py-2.5 px-4 border-r border-ink/15">Fewer swaps (inversions only)</td>
                <td className="py-2.5 px-4 border-r border-ink/15 bg-ink/[0.03]">
                  Optimal two-pointer + 3 median swaps
                </td>
                <td className="py-2.5 px-4">Higher swaps (~3x more than Hoare)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Behavioral Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-ink flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-ink" />
          Comparative Behavioral Breakdown
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="font-bold uppercase text-[11px] text-ink font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 bg-ink rounded-sm" />
              Behavior on Arrays with Duplicate Elements
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              When an array contains identical values: Lomuto pushes all equal elements to the left partition, which skews splits. Two-pointer partitioning stops when elements equal the pivot, encouraging partitions to split evenly down the middle.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="font-bold uppercase text-[11px] text-ink font-mono flex items-center gap-1.5">
              <Cpu className="w-2 h-2 bg-ink rounded-sm" />
              Hardware Cache Locality & Practical Performance
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              Quick Sort is favored in real-world libraries (<code className="font-mono">qsort</code>, <code className="font-mono">std::sort</code>) over Merge Sort because its partitioning operates sequentially in contiguous memory blocks, maximizing CPU L1/L2 cache line hits.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="font-bold uppercase text-[11px] text-ink font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-ink" />
              Academic Caveat: Median Heuristics
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              <strong>Median-of-Three does NOT guarantee balanced partitions in all theoretical cases.</strong> It samples only 3 points. Adversary poison distributions can still create skewed partitions (<code className="font-mono">1</code> and <code className="font-mono">n - 2</code>), leading to <code className="font-mono">O(n²)</code>.
            </p>
          </div>

          <div className="p-4 border border-ink/15 bg-white rounded-sm space-y-2 shadow-subtle">
            <div className="font-bold uppercase text-[11px] text-ink font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-ink" />
              Industry Standard Solution: Introsort
            </div>
            <p className="text-ink/80 leading-relaxed text-[11px]">
              Modern production runtimes use <strong>Introsort</strong>: they run Quick Sort with Median-of-Three by default. If recursion depth exceeds <code className="font-mono">2 * log₂(n)</code>, it seamlessly switches to Heap Sort, ensuring a strict <code className="font-mono">O(n log n)</code> upper bound.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
