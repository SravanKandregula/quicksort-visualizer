import { PivotStrategyInfo } from './types';

export const PIVOT_STRATEGIES: Record<string, PivotStrategyInfo> = {
  FIRST: {
    id: 'FIRST',
    title: 'First Element as Pivot',
    shortName: 'First Pivot',
    tagline: 'Simple, direct, but vulnerable to already-sorted input',
    description:
      'The element at ar[low] is picked as the partition pivot. The two-pointer partition scans from both ends to partition values less than or equal to the pivot on the left and values greater than the pivot on the right.',
    pros: 'Minimal pivot selection overhead (O(1)); simple to implement and trace.',
    cons: 'Degenerates to worst-case O(n²) time on already sorted or reverse-sorted inputs because partitions are maximally unbalanced (0 and n-1 elements).',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
    },
  },
  MEDIAN_OF_THREE: {
    id: 'MEDIAN_OF_THREE',
    title: 'Median of Three as Pivot',
    shortName: 'Median-of-Three',
    tagline: 'Samples first, middle, and last elements to prevent worst-case degeneration on sorted arrays',
    description:
      'Samples ar[low], ar[mid], and ar[high] where mid = (low + high) / 2. Performs 3 pairwise comparisons/swaps to order them, moves the median candidate to ar[low], and partitions using the classic two-pointer scheme.',
    pros: 'Substantially reduces the probability of O(n²) behavior on sorted and reverse-sorted inputs. Nearly guarantees non-empty partitions on inputs of length ≥ 3.',
    cons: 'Slightly higher constant overhead (up to 3 comparisons and 4 swaps per partition). Does not theoretically guarantee O(n log n) worst-case (adversary arrays can still trigger O(n²)).',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
    },
  },
  LAST: {
    id: 'LAST',
    title: 'Last Element as Pivot (Lomuto)',
    shortName: 'Last Pivot',
    tagline: 'Classic Lomuto partitioning scheme using the last element',
    description:
      'The element at ar[high] is chosen as the pivot. Uses a single forward scan pointer j and a boundary pointer i to place all elements <= pivot in the left subarray, then swaps ar[i+1] with the pivot.',
    pros: 'Very compact and intuitive partition loop with clear invariant: ar[low..i] <= pivot and ar[i+1..j-1] > pivot.',
    cons: 'Performs more swaps on average than Hoare/two-pointer partitioning. Suffers from O(n²) worst-case on already sorted arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(n)',
    },
  },
};

export interface SampleArray {
  name: string;
  description: string;
  array: number[];
}

export const SAMPLE_ARRAYS: SampleArray[] = [
  {
    name: 'Random Unsorted',
    description: 'General case with mixed values',
    array: [29, 10, 14, 37, 13, 45, 8, 22],
  },
  {
    name: 'Nearly Sorted',
    description: 'Array with only 1 or 2 misplaced elements',
    array: [10, 15, 12, 25, 30, 28, 40, 50],
  },
  {
    name: 'Reverse Sorted',
    description: 'Worst-case trigger for naive first/last pivot schemes',
    array: [80, 70, 60, 50, 40, 30, 20, 10],
  },
  {
    name: 'With Duplicates',
    description: 'Tests partition behavior with repeated elements',
    array: [25, 10, 25, 5, 25, 30, 10, 25],
  },
  {
    name: 'Negative Numbers',
    description: 'Tests sign handling across positive and negative values',
    array: [-5, 12, -18, 0, 7, -3, 24, -9],
  },
  {
    name: 'Short Array (5 items)',
    description: 'Fast walkthrough for lectures & viva demonstrations',
    array: [38, 27, 43, 3, 9],
  },
];
