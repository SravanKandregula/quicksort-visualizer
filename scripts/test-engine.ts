import { generateQuickSortSteps } from '../lib/quicksort/engine';
import { PivotStrategy } from '../lib/quicksort/types';

const testCases: { name: string; array: number[] }[] = [
  { name: 'Standard unsorted', array: [10, 80, 30, 90, 40, 50, 70] },
  { name: 'Already sorted', array: [10, 20, 30, 40, 50] },
  { name: 'Reverse sorted', array: [50, 40, 30, 20, 10] },
  { name: 'Duplicates & negatives', array: [5, -2, 8, -2, 5, 1, 0, -10] },
  { name: 'Two elements', array: [42, 17] },
  { name: 'Two elements sorted', array: [17, 42] },
  { name: 'Single element', array: [99] },
  { name: 'Identical elements', array: [7, 7, 7, 7] },
];

const strategies: PivotStrategy[] = ['MEDIAN_OF_THREE', 'FIRST', 'LAST'];

let allPassed = true;

for (const strat of strategies) {
  console.log(`\n================ Testing Strategy: ${strat} ================`);
  for (const tc of testCases) {
    const expected = [...tc.array].sort((a, b) => a - b);
    const steps = generateQuickSortSteps({ array: tc.array, strategy: strat });
    const finalStep = steps[steps.length - 1];
    const finalArray = finalStep.array;

    const isMatch = JSON.stringify(finalArray) === JSON.stringify(expected);
    if (!isMatch) {
      console.error(`❌ FAILED: ${tc.name} with ${strat}`);
      console.error(`  Expected:`, expected);
      console.error(`  Got:     `, finalArray);
      allPassed = false;
    } else {
      console.log(`✅ PASSED: ${tc.name} (${steps.length} steps, comparisons: ${finalStep.stats.comparisons}, swaps: ${finalStep.stats.swaps})`);
    }
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY!');
}
