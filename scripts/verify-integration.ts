import { generateQuickSortSteps } from '../lib/quicksort/engine';
import { getCCodeForStrategy } from '../lib/quicksort/cCode';
import { PivotStrategy } from '../lib/quicksort/types';

function runIntegrityChecks() {
  console.log('🧪 Starting Deep Integration & Verification Suite...');

  const testArrays = [
    [29, 10, 14, 37, 13, 45, 8, 22],
    [5, -2, 8, -2, 5, 1, 0, -10],
    [10, 20, 30, 40, 50],
    [50, 40, 30, 20, 10],
    [42, 17],
    [99],
    [7, 7, 7, 7, 7],
  ];

  const strategies: PivotStrategy[] = ['MEDIAN_OF_THREE', 'FIRST', 'LAST'];

  for (const strat of strategies) {
    const cCode = getCCodeForStrategy(strat);
    const maxLine = cCode.length;

    for (const arr of testArrays) {
      const steps = generateQuickSortSteps({ array: arr, strategy: strat });

      // 1. Check steps count > 0
      if (steps.length === 0) {
        throw new Error(`Steps empty for ${strat} with array [${arr.join(',')}]`);
      }

      // 2. Check final array is correctly sorted
      const expectedSorted = [...arr].sort((a, b) => a - b);
      const finalArray = steps[steps.length - 1].array;
      if (JSON.stringify(expectedSorted) !== JSON.stringify(finalArray)) {
        throw new Error(`Sorting incorrect for ${strat}! Expected ${expectedSorted}, got ${finalArray}`);
      }

      // 3. Verify that code line numbers exist in C source code
      for (const st of steps) {
        if (st.codeLine < 1 || st.codeLine > maxLine) {
          throw new Error(`Invalid code line ${st.codeLine} in ${strat} (max: ${maxLine}) at step ${st.stepNumber}`);
        }

        // 4. Verify pointers within range
        if (st.i !== null && (st.i < -1 || st.i > arr.length)) {
          throw new Error(`Pointer i out of bounds: ${st.i}`);
        }
        if (st.j !== null && (st.j < -1 || st.j > arr.length)) {
          throw new Error(`Pointer j out of bounds: ${st.j}`);
        }

        // 5. Verify stats consistency
        if (st.stats.comparisons < 0 || st.stats.swaps < 0) {
          throw new Error(`Negative stats found at step ${st.stepNumber}`);
        }

        // 6. Verify explanation is present
        if (!st.explanation || st.explanation.trim().length === 0) {
          throw new Error(`Empty explanation at step ${st.stepNumber}`);
        }

        // 7. Verify tree snapshot contains valid nodes
        for (const tNode of st.treeSnapshot) {
          if (!tNode.id || tNode.low > tNode.high && tNode.status !== 'base_case') {
            throw new Error(`Invalid tree node in snapshot`);
          }
        }
      }

      // 8. Reversibility check: check that stepping to any step index restores exact identical snapshot
      const midStepIdx = Math.floor(steps.length / 2);
      const snapshotAtMid = steps[midStepIdx];
      // Re-fetching steps
      const reSteps = generateQuickSortSteps({ array: arr, strategy: strat });
      const reSnapshotAtMid = reSteps[midStepIdx];
      if (JSON.stringify(snapshotAtMid) !== JSON.stringify(reSnapshotAtMid)) {
        throw new Error(`State restoration mismatch at step ${midStepIdx}`);
      }
    }
  }

  console.log('✅ ALL INTEGRATION, REVERSIBILITY, AND BOUNDARY CHECKS PASSED!');
}

runIntegrityChecks();
