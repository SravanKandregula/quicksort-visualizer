'use strict';
import React from 'react';
import { ExecutionStep } from '../lib/quicksort/types';
import { Zap } from 'lucide-react';

interface ConditionLogicCardProps {
  step: ExecutionStep;
}

export const ConditionLogicCard: React.FC<ConditionLogicCardProps> = ({ step }) => {
  const {
    phase,
    array,
    pivot,
    pivotIndex,
    i,
    j,
    low,
    high,
    comparingIndices,
    swappingIndices,
    variables,
    explanation,
  } = step;

  const getLogic = () => {
    const pVal = pivot ?? (pivotIndex !== null ? array[pivotIndex] : (variables?.pi ?? 'pi'));

    switch (phase) {
      case 'SWAP': {
        const swapI = swappingIndices ? swappingIndices[0] : (i ?? 0);
        const swapJ = swappingIndices ? swappingIndices[1] : (j ?? 0);
        // Note: the step in engine was recorded after swapping array[swapI] and array[swapJ]
        const valNowI = array[swapI];
        const valNowJ = array[swapJ];
        const origIVal = valNowJ;
        const origJVal = valNowI;

        return {
          badge: 'SWAP',
          badgeColor: 'bg-ink text-white',
          title: 'Inversion Detected',
          conditionRule: 'ar[i] > pi && ar[j] < pi',
          soAction: 'so swap ar[i] with ar[j]; i++; j--;',
          liveEvaluation: `ar[${swapI}] (${origIVal}) > ${pVal}  &&  ar[${swapJ}] (${origJVal}) < ${pVal}  ⟶  Condition TRUE`,
          reason: `Left element (${origIVal}) is greater than pivot, and right element (${origJVal}) is smaller than pivot. Exchanging them puts both into their proper partitions.`,
        };
      }

      case 'POINTER_MOVE_I': {
        const prevI = (i ?? 1) - 1;
        const val = prevI >= 0 && prevI < array.length ? array[prevI] : '—';

        return {
          badge: 'i++',
          badgeColor: 'bg-ink text-white',
          title: 'Left Pointer Advance',
          conditionRule: 'ar[i] < pi && i < high',
          soAction: 'so i++;',
          liveEvaluation: `ar[${prevI}]=${val} < ${pVal} && ${prevI} < ${high}  ⟶  Condition TRUE`,
          reason: `Value ${val} is strictly less than pivot ${pVal}. It belongs in the left partition, so left pointer i advances rightward.`,
        };
      }

      case 'POINTER_MOVE_J': {
        const prevJ = (j ?? 0) + 1;
        const val = prevJ >= 0 && prevJ < array.length ? array[prevJ] : '—';

        return {
          badge: 'j--',
          badgeColor: 'border-2 border-ink bg-white text-ink font-bold',
          title: 'Right Pointer Inward Step',
          conditionRule: 'ar[j] > pi && j >= low',
          soAction: 'so j--;',
          liveEvaluation: `ar[${prevJ}]=${val} > ${pVal} && ${prevJ} >= ${low}  ⟶  Condition TRUE`,
          reason: `Value ${val} is strictly greater than pivot ${pVal}. It belongs in the right partition, so right pointer j moves leftward.`,
        };
      }

      case 'POINTER_COMPARE': {
        if (comparingIndices && comparingIndices.length >= 2) {
          const checkIdx = comparingIndices[0];
          const checkVal = array[checkIdx];
          const isLeft = checkIdx === i;

          if (isLeft) {
            const cond = checkVal < (pivot ?? 0);
            return {
              badge: 'COMPARE i',
              badgeColor: 'bg-ink/15 text-ink border border-ink/30',
              title: 'Compare Left Element with Pivot',
              conditionRule: 'ar[i] < pi && i < high',
              soAction: cond ? 'so i++; (advance)' : 'so stop i (ar[i] >= pivot, wait to swap)',
              liveEvaluation: `ar[${checkIdx}]=${checkVal} < pi(${pVal}) && ${checkIdx} < ${high}  ⟶  ${cond ? 'TRUE' : 'FALSE'}`,
              reason: cond
                ? `Value is smaller than pivot. Pointer i will keep scanning rightward.`
                : `Value ${checkVal} is >= pivot ${pVal}. Pointer i stops here waiting for an inversion swap.`,
            };
          } else {
            const cond = checkVal > (pivot ?? 0);
            return {
              badge: 'COMPARE j',
              badgeColor: 'bg-ink/15 text-ink border border-ink/30',
              title: 'Compare Right Element with Pivot',
              conditionRule: 'ar[j] > pi && j >= low',
              soAction: cond ? 'so j--; (decrement)' : 'so stop j (ar[j] <= pivot, wait to swap)',
              liveEvaluation: `ar[${checkIdx}]=${checkVal} > pi(${pVal}) && ${checkIdx} >= ${low}  ⟶  ${cond ? 'TRUE' : 'FALSE'}`,
              reason: cond
                ? `Value is greater than pivot. Pointer j will keep scanning leftward.`
                : `Value ${checkVal} is <= pivot ${pVal}. Pointer j stops here waiting for an inversion swap.`,
            };
          }
        }

        const condLoop = (i ?? 0) <= (j ?? 0);
        return {
          badge: 'LOOP CHECK',
          badgeColor: 'bg-ink/10 text-ink',
          title: 'Partition Scan Loop Condition',
          conditionRule: 'i <= j',
          soAction: condLoop ? 'so continue scanning pointers;' : 'so exit loop (pointers crossed);',
          liveEvaluation: `i (${i}) <= j (${j})  ⟶  ${condLoop ? 'TRUE (Active Scan)' : 'FALSE (Pointers Crossed)'}`,
          reason: condLoop
            ? 'Pointers i and j have not crossed; partition inward scans continue.'
            : 'Pointers i and j have crossed; elements are partitioned around pivot.',
        };
      }

      case 'PIVOT_FINAL_SWAP': {
        const jIdx = j ?? (pivotIndex ?? 0);
        const oldAtJ = array[low];

        return {
          badge: 'PIVOT LOCK',
          badgeColor: 'bg-ink text-white',
          title: 'Pointers Crossed — Final Pivot Swap',
          conditionRule: 'i >= j (pointers crossed)',
          soAction: 'so swap ar[low] with ar[j]; /* lock pivot */',
          liveEvaluation: `i (${i}) >= j (${jIdx}) (TRUE)  ⟶  swap pivot ar[${low}] (${oldAtJ}) with ar[${jIdx}] (${pVal})`,
          reason: `Both pointers have met/crossed. All elements left of [${jIdx}] are <= ${pVal}, and all elements right of [${jIdx}] are >= ${pVal}. Pivot is permanently locked in sorted position.`,
        };
      }

      case 'MEDIAN_COMPARE': {
        const cA = comparingIndices ? comparingIndices[0] : low;
        const cB = comparingIndices ? comparingIndices[1] : high;
        const valA = array[cA];
        const valB = array[cB];
        const needsSwap = valA > valB;

        return {
          badge: 'MEDIAN CHECK',
          badgeColor: 'bg-ink/15 text-ink',
          title: 'Median-of-Three Pair Comparison',
          conditionRule: `ar[${cA}] > ar[${cB}]`,
          soAction: needsSwap ? `so swap ar[${cA}] with ar[${cB}];` : `so keep order (ar[${cA}] <= ar[${cB}]);`,
          liveEvaluation: `ar[${cA}]=${valA} > ar[${cB}]=${valB}  ⟶  ${needsSwap ? 'TRUE (Swap needed)' : 'FALSE (Already ordered)'}`,
          reason: 'Median-of-three compares candidate elements [low], [mid], [high] to locate the median value.',
        };
      }

      case 'MEDIAN_SWAP': {
        const sA = swappingIndices ? swappingIndices[0] : low;
        const sB = swappingIndices ? swappingIndices[1] : high;

        return {
          badge: 'MEDIAN SWAP',
          badgeColor: 'bg-ink text-white',
          title: 'Median Candidate Reorder',
          conditionRule: `ar[${sA}] > ar[${sB}] was TRUE`,
          soAction: `so swap ar[${sA}] with ar[${sB}];`,
          liveEvaluation: `Swapped ar[${sA}] and ar[${sB}] to satisfy ar[${sA}] <= ar[${sB}]`,
          reason: 'Orders sampled elements so that ar[mid] holds the true median of three.',
        };
      }

      case 'PIVOT_PLACE_LOW': {
        return {
          badge: 'PIVOT SET',
          badgeColor: 'bg-ink text-white',
          title: 'Place Median Pivot at Index Low',
          conditionRule: 'pi = ar[mid]',
          soAction: 'so swap ar[low] with ar[mid]; pi = ar[low];',
          liveEvaluation: `ar[low=${low}] = ${pVal} (Median moved to index low for Hoare partition)`,
          reason: 'Standard QuickSort implementation references index low as the pivot element during scanning.',
        };
      }

      case 'PIVOT_SELECTION': {
        return {
          badge: 'PIVOT INIT',
          badgeColor: 'bg-ink text-white',
          title: 'Pivot Selection',
          conditionRule: `pi = ar[${pivotIndex ?? low}]`,
          soAction: `so i = ${low + 1}; j = ${high};`,
          liveEvaluation: `Selected pivot value ${pVal} for active subarray [${low} .. ${high}]`,
          reason: 'Subarray partitioning begins with pivot selection and pointer initialization.',
        };
      }

      case 'POINTER_INIT': {
        return {
          badge: 'POINTERS',
          badgeColor: 'bg-ink text-white',
          title: 'Pointers Initialized',
          conditionRule: 'i = low + 1, j = high',
          soAction: 'so while (i <= j) { /* begin scan */ }',
          liveEvaluation: `i = ${i}, j = ${j}, pivot = ${pVal}`,
          reason: 'Pointer i scans right searching for values > pivot; pointer j scans left searching for values < pivot.',
        };
      }

      case 'BASE_CASE': {
        return {
          badge: 'BASE CASE',
          badgeColor: 'bg-ink/10 text-ink',
          title: 'Subarray Size ≤ 1',
          conditionRule: 'low >= high',
          soAction: 'so return; /* trivially sorted */',
          liveEvaluation: `low (${low}) >= high (${high})  ⟶  Length: ${high >= low ? 1 : 0}`,
          reason: 'A subarray with 0 or 1 element is inherently sorted. No partitioning needed.',
        };
      }

      case 'PARTITION_DONE': {
        return {
          badge: 'PARTITIONED',
          badgeColor: 'bg-ink text-white',
          title: 'Partition Completed',
          conditionRule: 'pivot locked at index j',
          soAction: `so recurse left [${low}..${(pivotIndex ?? 0) - 1}] & right [${(pivotIndex ?? 0) + 1}..${high}]`,
          liveEvaluation: `Pivot ${pVal} locked at index [${pivotIndex}]. Left elements <= ${pVal}, Right elements >= ${pVal}.`,
          reason: 'Subarray is divided into two independent subproblems around the locked pivot.',
        };
      }

      case 'RECURSE_LEFT': {
        return {
          badge: 'RECURSE L',
          badgeColor: 'bg-ink/10 text-ink',
          title: 'Recursion on Left Subarray',
          conditionRule: `low < pivotIndex - 1`,
          soAction: `so quickSort(low, pivotIndex - 1);`,
          liveEvaluation: `Sorting left slice [${low} .. ${(pivotIndex ?? 1) - 1}]`,
          reason: 'QuickSort recursively sorts the elements smaller than the locked pivot.',
        };
      }

      case 'RECURSE_RIGHT': {
        return {
          badge: 'RECURSE R',
          badgeColor: 'bg-ink/10 text-ink',
          title: 'Recursion on Right Subarray',
          conditionRule: `pivotIndex + 1 < high`,
          soAction: `so quickSort(pivotIndex + 1, high);`,
          liveEvaluation: `Sorting right slice [${(pivotIndex ?? 0) + 1} .. ${high}]`,
          reason: 'QuickSort recursively sorts the elements greater than the locked pivot.',
        };
      }

      case 'SORTED': {
        return {
          badge: 'COMPLETE',
          badgeColor: 'bg-ink text-white',
          title: 'Array Fully Sorted',
          conditionRule: 'all recursive calls complete',
          soAction: 'so algorithm terminates; array is in ascending order.',
          liveEvaluation: `Sorted array: [${array.join(', ')}]`,
          reason: 'All recursive partitions and pivot locks have resolved successfully.',
        };
      }

      default: {
        return {
          badge: phase.replace(/_/g, ' '),
          badgeColor: 'bg-ink/10 text-ink',
          title: 'Step Evaluation',
          conditionRule: explanation,
          soAction: 'so proceed to next step;',
          liveEvaluation: `low=${low}, high=${high}, pivot=${pVal}, i=${i ?? '—'}, j=${j ?? '—'}`,
          reason: explanation,
        };
      }
    }
  };

  const logic = getLogic();

  return (
    <div className="mt-3 p-3 bg-white border border-ink/20 rounded-sm shadow-subtle space-y-2">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-ink/10 pb-1.5">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-ink">
          <Zap className="w-3.5 h-3.5 fill-ink" />
          <span>Condition & Decision Logic:</span>
          <span className="font-normal text-ink/60 text-[11px] normal-case hidden sm:inline">
            ({logic.title})
          </span>
        </div>
        <span
          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${logic.badgeColor}`}
        >
          {logic.badge}
        </span>
      </div>

      {/* Primary Rule & Action matching user requirement: eg: i < pivot && i < high so i++; */}
      <div className="p-2.5 bg-ink/[0.03] border border-ink/15 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] uppercase font-bold text-ink/60 font-mono tracking-wider">
            Condition:
          </span>
          <code className="text-xs font-bold text-ink font-mono px-1.5 py-0.5 bg-white border border-ink/20 rounded-sm">
            {logic.conditionRule}
          </code>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink font-mono">
          <span className="px-2 py-0.5 bg-ink text-white rounded-sm text-[11px]">
            {logic.soAction}
          </span>
        </div>
      </div>

      {/* Live Value Evaluation & Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2 bg-white border border-ink/15 rounded-sm space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-ink/60 block">
            Live Evaluated Values:
          </span>
          <p className="text-[11px] font-bold text-ink break-words">
            {logic.liveEvaluation}
          </p>
        </div>

        <div className="p-2 bg-white border border-ink/15 rounded-sm space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-ink/60 block font-sans">
            Why:
          </span>
          <p className="text-[11px] font-sans text-ink/80 leading-snug">
            {logic.reason}
          </p>
        </div>
      </div>
    </div>
  );
};
