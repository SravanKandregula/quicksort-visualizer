import {
  ExecutionStep,
  ExecutionStats,
  ExecutionPhase,
  RecursionTreeNode,
  PivotStrategy,
} from './types';

export interface GenerateStepsOptions {
  array: number[];
  strategy: PivotStrategy;
}

export function generateQuickSortSteps(options: GenerateStepsOptions): ExecutionStep[] {
  const originalArray = [...options.array];
  const n = originalArray.length;
  const currentArray = [...originalArray];
  const steps: ExecutionStep[] = [];

  const finalizedSet = new Set<number>();
  const stats: ExecutionStats = {
    comparisons: 0,
    swaps: 0,
    partitions: 0,
    recursiveCalls: 0,
    maxRecursionDepth: 0,
  };

  const treeNodes: RecursionTreeNode[] = [];
  let nodeCounter = 0;

  function cloneTree(): RecursionTreeNode[] {
    return JSON.parse(JSON.stringify(treeNodes));
  }

  function addStep(params: {
    low: number;
    high: number;
    pivot: number | null;
    pivotIndex: number | null;
    i: number | null;
    j: number | null;
    comparingIndices?: [number, number] | null;
    swappingIndices?: [number, number] | null;
    partitionRange?: { low: number; high: number } | null;
    leftPartitionRange?: { low: number; high: number } | null;
    rightPartitionRange?: { low: number; high: number } | null;
    activeRecursionId: string;
    codeLine: number;
    explanation: string;
    phase: ExecutionPhase;
    variables?: Record<string, number | string | null>;
  }) {
    steps.push({
      stepNumber: steps.length + 1,
      array: [...currentArray],
      low: params.low,
      high: params.high,
      pivot: params.pivot,
      pivotIndex: params.pivotIndex,
      i: params.i,
      j: params.j,
      comparingIndices: params.comparingIndices ?? null,
      swappingIndices: params.swappingIndices ?? null,
      finalizedIndices: Array.from(finalizedSet).sort((a, b) => a - b),
      partitionRange: params.partitionRange ?? (params.low <= params.high ? { low: params.low, high: params.high } : null),
      leftPartitionRange: params.leftPartitionRange ?? null,
      rightPartitionRange: params.rightPartitionRange ?? null,
      activeRecursionId: params.activeRecursionId,
      codeLine: params.codeLine,
      explanation: params.explanation,
      phase: params.phase,
      variables: params.variables ?? {},
      stats: { ...stats },
      treeSnapshot: cloneTree(),
    });
  }

  // Handle edge case: empty array
  if (n === 0) {
    addStep({
      low: 0,
      high: -1,
      pivot: null,
      pivotIndex: null,
      i: null,
      j: null,
      activeRecursionId: 'root',
      codeLine: 1,
      explanation: 'The input array is empty. No sorting required.',
      phase: 'SORTED',
      variables: {},
    });
    return steps;
  }

  // Handle edge case: single element
  if (n === 1) {
    finalizedSet.add(0);
    const rootNode: RecursionTreeNode = {
      id: 'node-0',
      parentId: null,
      depth: 0,
      low: 0,
      high: 0,
      initialSubarray: [currentArray[0]],
      pivotValue: currentArray[0],
      pivotFinalIndex: 0,
      status: 'completed',
    };
    treeNodes.push(rootNode);

    const checkLine = options.strategy === 'MEDIAN_OF_THREE' ? 38 : options.strategy === 'FIRST' ? 26 : 20;
    const endLine = options.strategy === 'MEDIAN_OF_THREE' ? 43 : options.strategy === 'FIRST' ? 31 : 25;

    addStep({
      low: 0,
      high: 0,
      pivot: currentArray[0],
      pivotIndex: 0,
      i: null,
      j: null,
      activeRecursionId: 'node-0',
      codeLine: checkLine,
      explanation: `Single-element array [${currentArray[0]}] at index 0 is trivially sorted. Base condition low >= high met.`,
      phase: 'BASE_CASE',
      variables: { low: 0, high: 0 },
    });

    addStep({
      low: 0,
      high: 0,
      pivot: currentArray[0],
      pivotIndex: 0,
      i: null,
      j: null,
      activeRecursionId: 'node-0',
      codeLine: endLine,
      explanation: `Sorting completed! The element ${currentArray[0]} is in its correct sorted position.`,
      phase: 'SORTED',
      variables: {},
    });

    return steps;
  }

  // Recursive QuickSort with execution recording
  function quickSort(low: number, high: number, depth: number, parentId: string | null): void {
    stats.recursiveCalls++;
    if (depth > stats.maxRecursionDepth) {
      stats.maxRecursionDepth = depth;
    }

    const nodeId = `node-${nodeCounter++}`;
    const initialSubarray = currentArray.slice(low, high + 1);

    const node: RecursionTreeNode = {
      id: nodeId,
      parentId,
      depth,
      low,
      high,
      initialSubarray,
      pivotValue: null,
      pivotFinalIndex: null,
      status: low >= high ? 'base_case' : 'active',
    };
    treeNodes.push(node);

    // Initial call step
    addStep({
      low,
      high,
      pivot: null,
      pivotIndex: null,
      i: null,
      j: null,
      activeRecursionId: nodeId,
      codeLine: options.strategy === 'MEDIAN_OF_THREE' ? 37 : options.strategy === 'FIRST' ? 25 : 19,
      explanation: `Calling quickSort(ar, low=${low}, high=${high}) on subarray [${initialSubarray.join(', ')}]. Depth: ${depth}.`,
      phase: 'CALL_QUICKSORT',
      variables: { low, high, depth },
    });

    // Check base condition: low < high
    const checkLine = options.strategy === 'MEDIAN_OF_THREE' ? 38 : options.strategy === 'FIRST' ? 26 : 20;

    if (low >= high) {
      node.status = 'base_case';
      if (low === high && low >= 0 && low < n) {
        finalizedSet.add(low);
      }
      addStep({
        low,
        high,
        pivot: null,
        pivotIndex: null,
        i: null,
        j: null,
        activeRecursionId: nodeId,
        codeLine: checkLine,
        explanation: low === high
          ? `Base condition reached: low (${low}) == high (${high}). Subarray of length 1 [${currentArray[low]}] is inherently sorted.`
          : `Base condition reached: low (${low}) > high (${high}). Subarray is empty. Nothing to partition.`,
        phase: 'BASE_CASE',
        variables: { low, high },
      });
      return;
    }

    // Partition
    const partitionCallLine = options.strategy === 'MEDIAN_OF_THREE' ? 39 : options.strategy === 'FIRST' ? 27 : 21;
    addStep({
      low,
      high,
      pivot: null,
      pivotIndex: null,
      i: null,
      j: null,
      activeRecursionId: nodeId,
      codeLine: partitionCallLine,
      explanation: `Invoking partition(ar, low=${low}, high=${high}) to organize elements around a pivot.`,
      phase: 'PIVOT_SELECTION',
      variables: { low, high },
    });

    let pivotIndex: number;
    stats.partitions++;

    if (options.strategy === 'MEDIAN_OF_THREE') {
      pivotIndex = partitionMedianOfThree(low, high, nodeId, node);
    } else if (options.strategy === 'FIRST') {
      pivotIndex = partitionFirst(low, high, nodeId, node);
    } else {
      pivotIndex = partitionLastLomuto(low, high, nodeId, node);
    }

    finalizedSet.add(pivotIndex);
    node.pivotFinalIndex = pivotIndex;
    node.pivotValue = currentArray[pivotIndex];
    node.status = 'completed';
    node.leftRange = low <= pivotIndex - 1 ? { low, high: pivotIndex - 1 } : null;
    node.rightRange = pivotIndex + 1 <= high ? { low: pivotIndex + 1, high } : null;

    // Recurse left
    const recurseLeftLine = options.strategy === 'MEDIAN_OF_THREE' ? 40 : options.strategy === 'FIRST' ? 28 : 22;
    addStep({
      low,
      high,
      pivot: currentArray[pivotIndex],
      pivotIndex,
      i: null,
      j: null,
      partitionRange: { low, high },
      leftPartitionRange: low <= pivotIndex - 1 ? { low, high: pivotIndex - 1 } : null,
      rightPartitionRange: pivotIndex + 1 <= high ? { low: pivotIndex + 1, high } : null,
      activeRecursionId: nodeId,
      codeLine: recurseLeftLine,
      explanation: `Pivot element ${currentArray[pivotIndex]} is now locked at index ${pivotIndex}. Next, recursively sort left partition [${low}..${pivotIndex - 1}].`,
      phase: 'RECURSE_LEFT',
      variables: { low, high, pi: currentArray[pivotIndex], pivotIndex },
    });

    quickSort(low, pivotIndex - 1, depth + 1, nodeId);

    // Recurse right
    const recurseRightLine = options.strategy === 'MEDIAN_OF_THREE' ? 41 : options.strategy === 'FIRST' ? 29 : 23;
    addStep({
      low,
      high,
      pivot: currentArray[pivotIndex],
      pivotIndex,
      i: null,
      j: null,
      partitionRange: { low, high },
      leftPartitionRange: low <= pivotIndex - 1 ? { low, high: pivotIndex - 1 } : null,
      rightPartitionRange: pivotIndex + 1 <= high ? { low: pivotIndex + 1, high } : null,
      activeRecursionId: nodeId,
      codeLine: recurseRightLine,
      explanation: `Left partition complete. Now recursively sort right partition [${pivotIndex + 1}..${high}].`,
      phase: 'RECURSE_RIGHT',
      variables: { low, high, pi: currentArray[pivotIndex], pivotIndex },
    });

    quickSort(pivotIndex + 1, high, depth + 1, nodeId);
  }

  // --- MEDIAN OF THREE PARTITION ---
  function partitionMedianOfThree(
    low: number,
    high: number,
    nodeId: string,
    node: RecursionTreeNode
  ): number {
    let tmp: number;
    const mid = Math.floor((low + high) / 2);

    addStep({
      low,
      high,
      pivot: currentArray[mid],
      pivotIndex: mid,
      i: null,
      j: null,
      activeRecursionId: nodeId,
      codeLine: 3,
      explanation: `Median-of-Three: Compute midpoint index mid = (${low} + ${high}) / 2 = ${mid}. Three candidate elements are ar[low=${low}]=${currentArray[low]}, ar[mid=${mid}]=${currentArray[mid]}, ar[high=${high}]=${currentArray[high]}.`,
      phase: 'PIVOT_SELECTION',
      variables: { low, high, mid },
    });

    // Check 1: ar[low] > ar[mid]
    stats.comparisons++;
    addStep({
      low,
      high,
      pivot: currentArray[mid],
      pivotIndex: mid,
      i: low,
      j: mid,
      comparingIndices: [low, mid],
      activeRecursionId: nodeId,
      codeLine: 5,
      explanation: `Comparing ar[low=${low}]=${currentArray[low]} with ar[mid=${mid}]=${currentArray[mid]}. Condition (ar[low] > ar[mid]) evaluates to ${currentArray[low] > currentArray[mid]}.`,
      phase: 'MEDIAN_COMPARE',
      variables: { low, high, mid, 'ar[low]': currentArray[low], 'ar[mid]': currentArray[mid] },
    });

    if (currentArray[low] > currentArray[mid]) {
      stats.swaps++;
      tmp = currentArray[low];
      currentArray[low] = currentArray[mid];
      currentArray[mid] = tmp;

      addStep({
        low,
        high,
        pivot: currentArray[mid],
        pivotIndex: mid,
        i: low,
        j: mid,
        swappingIndices: [low, mid],
        activeRecursionId: nodeId,
        codeLine: 6,
        explanation: `Swapping ar[low=${low}] and ar[mid=${mid}] so that ar[low] (${currentArray[low]}) <= ar[mid] (${currentArray[mid]}).`,
        phase: 'MEDIAN_SWAP',
        variables: { low, high, mid, tmp, 'ar[low]': currentArray[low], 'ar[mid]': currentArray[mid] },
      });
    }

    // Check 2: ar[low] > ar[high]
    stats.comparisons++;
    addStep({
      low,
      high,
      pivot: currentArray[mid],
      pivotIndex: mid,
      i: low,
      j: high,
      comparingIndices: [low, high],
      activeRecursionId: nodeId,
      codeLine: 8,
      explanation: `Comparing ar[low=${low}]=${currentArray[low]} with ar[high=${high}]=${currentArray[high]}. Condition (ar[low] > ar[high]) evaluates to ${currentArray[low] > currentArray[high]}.`,
      phase: 'MEDIAN_COMPARE',
      variables: { low, high, mid, 'ar[low]': currentArray[low], 'ar[high]': currentArray[high] },
    });

    if (currentArray[low] > currentArray[high]) {
      stats.swaps++;
      tmp = currentArray[low];
      currentArray[low] = currentArray[high];
      currentArray[high] = tmp;

      addStep({
        low,
        high,
        pivot: currentArray[mid],
        pivotIndex: mid,
        i: low,
        j: high,
        swappingIndices: [low, high],
        activeRecursionId: nodeId,
        codeLine: 9,
        explanation: `Swapping ar[low=${low}] and ar[high=${high}] so that ar[low] (${currentArray[low]}) <= ar[high] (${currentArray[high]}).`,
        phase: 'MEDIAN_SWAP',
        variables: { low, high, mid, tmp, 'ar[low]': currentArray[low], 'ar[high]': currentArray[high] },
      });
    }

    // Check 3: ar[mid] > ar[high]
    stats.comparisons++;
    addStep({
      low,
      high,
      pivot: currentArray[mid],
      pivotIndex: mid,
      i: mid,
      j: high,
      comparingIndices: [mid, high],
      activeRecursionId: nodeId,
      codeLine: 11,
      explanation: `Comparing ar[mid=${mid}]=${currentArray[mid]} with ar[high=${high}]=${currentArray[high]}. Condition (ar[mid] > ar[high]) evaluates to ${currentArray[mid] > currentArray[high]}.`,
      phase: 'MEDIAN_COMPARE',
      variables: { low, high, mid, 'ar[mid]': currentArray[mid], 'ar[high]': currentArray[high] },
    });

    if (currentArray[mid] > currentArray[high]) {
      stats.swaps++;
      tmp = currentArray[mid];
      currentArray[mid] = currentArray[high];
      currentArray[high] = tmp;

      addStep({
        low,
        high,
        pivot: currentArray[mid],
        pivotIndex: mid,
        i: mid,
        j: high,
        swappingIndices: [mid, high],
        activeRecursionId: nodeId,
        codeLine: 12,
        explanation: `Swapping ar[mid=${mid}] and ar[high=${high}] so that ar[mid] (${currentArray[mid]}) <= ar[high] (${currentArray[high]}). Now ar[mid] holds the true median of three!`,
        phase: 'MEDIAN_SWAP',
        variables: { low, high, mid, tmp, 'ar[mid]': currentArray[mid], 'ar[high]': currentArray[high] },
      });
    }

    // Place median pivot at low
    stats.swaps++;
    tmp = currentArray[low];
    currentArray[low] = currentArray[mid];
    currentArray[mid] = tmp;

    addStep({
      low,
      high,
      pivot: currentArray[low],
      pivotIndex: low,
      i: low,
      j: mid,
      swappingIndices: [low, mid],
      activeRecursionId: nodeId,
      codeLine: 15,
      explanation: `Placing the median candidate ar[mid=${mid}] (${currentArray[low]}) into ar[low=${low}] to serve as the pivot element.`,
      phase: 'PIVOT_PLACE_LOW',
      variables: { low, high, mid, tmp, 'ar[low]': currentArray[low], 'ar[mid]': currentArray[mid] },
    });

    const pi = currentArray[low];
    node.pivotValue = pi;

    let i = low + 1;
    let j = high;

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: low,
      i,
      j,
      activeRecursionId: nodeId,
      codeLine: 16,
      explanation: `Pivot initialized: pi = ${pi} at index ${low}. Left pointer i initialized to low+1 (${i}), right pointer j initialized to high (${j}).`,
      phase: 'POINTER_INIT',
      variables: { low, high, pi, i, j },
    });

    // Two pointer partition loop
    while (i <= j) {
      addStep({
        low,
        high,
        pivot: pi,
        pivotIndex: low,
        i,
        j,
        activeRecursionId: nodeId,
        codeLine: 19,
        explanation: `Checking partition loop condition: i (${i}) <= j (${j}) is true. Begin scanning pointers.`,
        phase: 'POINTER_COMPARE',
        variables: { low, high, pi, i, j },
      });

      // Advance i while (ar[i] < pi && i < high)
      while (i < high) {
        stats.comparisons++;
        const cond = currentArray[i] < pi;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          comparingIndices: [i, low],
          activeRecursionId: nodeId,
          codeLine: 20,
          explanation: `Left pointer check: comparing ar[i=${i}]=${currentArray[i]} < pi (${pi}). Result: ${cond}.`,
          phase: 'POINTER_COMPARE',
          variables: { low, high, pi, i, j, 'ar[i]': currentArray[i] },
        });

        if (cond) {
          i++;
          addStep({
            low,
            high,
            pivot: pi,
            pivotIndex: low,
            i,
            j,
            activeRecursionId: nodeId,
            codeLine: 21,
            explanation: `ar[i] < pi is true, so advance left pointer i to index ${i}.`,
            phase: 'POINTER_MOVE_I',
            variables: { low, high, pi, i, j },
          });
        } else {
          break;
        }
      }

      // Advance j while (ar[j] > pi && j >= low)
      while (j >= low) {
        stats.comparisons++;
        const cond = currentArray[j] > pi;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          comparingIndices: [j, low],
          activeRecursionId: nodeId,
          codeLine: 22,
          explanation: `Right pointer check: comparing ar[j=${j}]=${currentArray[j]} > pi (${pi}). Result: ${cond}.`,
          phase: 'POINTER_COMPARE',
          variables: { low, high, pi, i, j, 'ar[j]': currentArray[j] },
        });

        if (cond) {
          j--;
          addStep({
            low,
            high,
            pivot: pi,
            pivotIndex: low,
            i,
            j,
            activeRecursionId: nodeId,
            codeLine: 23,
            explanation: `ar[j] > pi is true, so decrement right pointer j to index ${j}.`,
            phase: 'POINTER_MOVE_J',
            variables: { low, high, pi, i, j },
          });
        } else {
          break;
        }
      }

      // If i < j swap
      addStep({
        low,
        high,
        pivot: pi,
        pivotIndex: low,
        i,
        j,
        activeRecursionId: nodeId,
        codeLine: 24,
        explanation: `Pointer comparison: i (${i}) < j (${j}) evaluates to ${i < j}.`,
        phase: 'POINTER_COMPARE',
        variables: { low, high, pi, i, j },
      });

      if (i < j) {
        stats.swaps++;
        tmp = currentArray[i];
        currentArray[i] = currentArray[j];
        currentArray[j] = tmp;

        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          swappingIndices: [i, j],
          activeRecursionId: nodeId,
          codeLine: 25,
          explanation: `Inversion found: ar[i=${i}]=${currentArray[j]} is > pi and ar[j=${j}]=${currentArray[i]} is < pi. Swapping ar[i] and ar[j].`,
          phase: 'SWAP',
          variables: { low, high, pi, i, j, tmp, 'ar[i]': currentArray[i], 'ar[j]': currentArray[j] },
        });

        i++;
        j--;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          activeRecursionId: nodeId,
          codeLine: 26,
          explanation: `After swap, advance i to ${i} and decrement j to ${j}.`,
          phase: 'POINTER_INIT',
          variables: { low, high, pi, i, j },
        });
      } else {
        i++;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          activeRecursionId: nodeId,
          codeLine: 29,
          explanation: `Pointers have crossed or met (i=${i} >= j=${j}). Increment i to ${i} to exit outer loop.`,
          phase: 'POINTER_MOVE_I',
          variables: { low, high, pi, i, j },
        });
      }
    }

    // Place pivot at ar[j]
    stats.swaps++;
    currentArray[low] = currentArray[j];
    currentArray[j] = pi;

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: j,
      i,
      j,
      swappingIndices: [low, j],
      activeRecursionId: nodeId,
      codeLine: 32,
      explanation: `Placing pivot ${pi} at index j (${j}) by swapping ar[low=${low}] and ar[j=${j}]. All elements in [${low}..${j - 1}] are <= ${pi}, and elements in [${j + 1}..${high}] are >= ${pi}.`,
      phase: 'PIVOT_FINAL_SWAP',
      variables: { low, high, pi, i, j, 'ar[low]': currentArray[low], 'ar[j]': currentArray[j] },
    });

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: j,
      i,
      j,
      partitionRange: { low, high },
      leftPartitionRange: low <= j - 1 ? { low, high: j - 1 } : null,
      rightPartitionRange: j + 1 <= high ? { low: j + 1, high } : null,
      activeRecursionId: nodeId,
      codeLine: 34,
      explanation: `Partition finished! Returning partition index j = ${j}. Pivot ${pi} is at its permanent sorted position.`,
      phase: 'PARTITION_DONE',
      variables: { low, high, pi, j },
    });

    return j;
  }

  // --- FIRST ELEMENT PIVOT PARTITION ---
  function partitionFirst(
    low: number,
    high: number,
    nodeId: string,
    node: RecursionTreeNode
  ): number {
    const pi = currentArray[low];
    node.pivotValue = pi;
    let i = low + 1;
    let j = high;
    let tmp: number;

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: low,
      i,
      j,
      activeRecursionId: nodeId,
      codeLine: 2,
      explanation: `First Element Pivot: Selected ar[low=${low}] = ${pi} as pivot. Initializing left pointer i = ${i} and right pointer j = ${high}.`,
      phase: 'PIVOT_SELECTION',
      variables: { low, high, pi, i, j },
    });

    while (i <= j) {
      addStep({
        low,
        high,
        pivot: pi,
        pivotIndex: low,
        i,
        j,
        activeRecursionId: nodeId,
        codeLine: 6,
        explanation: `Checking outer loop condition: i (${i}) <= j (${j}) is true.`,
        phase: 'POINTER_COMPARE',
        variables: { low, high, pi, i, j },
      });

      // Advance i while ar[i] <= pi && i <= high
      while (i <= high) {
        stats.comparisons++;
        const cond = currentArray[i] <= pi;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          comparingIndices: [i, low],
          activeRecursionId: nodeId,
          codeLine: 7,
          explanation: `Checking left pointer: ar[i=${i}]=${currentArray[i]} <= pi (${pi}). Result: ${cond}.`,
          phase: 'POINTER_COMPARE',
          variables: { low, high, pi, i, j, 'ar[i]': currentArray[i] },
        });

        if (cond) {
          i++;
          addStep({
            low,
            high,
            pivot: pi,
            pivotIndex: low,
            i,
            j,
            activeRecursionId: nodeId,
            codeLine: 8,
            explanation: `ar[i] <= pi, incrementing left pointer i to index ${i}.`,
            phase: 'POINTER_MOVE_I',
            variables: { low, high, pi, i, j },
          });
        } else {
          break;
        }
      }

      // Decrement j while ar[j] > pi && j >= low
      while (j >= low) {
        stats.comparisons++;
        const cond = currentArray[j] > pi;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          comparingIndices: [j, low],
          activeRecursionId: nodeId,
          codeLine: 9,
          explanation: `Checking right pointer: ar[j=${j}]=${currentArray[j]} > pi (${pi}). Result: ${cond}.`,
          phase: 'POINTER_COMPARE',
          variables: { low, high, pi, i, j, 'ar[j]': currentArray[j] },
        });

        if (cond) {
          j--;
          addStep({
            low,
            high,
            pivot: pi,
            pivotIndex: low,
            i,
            j,
            activeRecursionId: nodeId,
            codeLine: 10,
            explanation: `ar[j] > pi, decrementing right pointer j to index ${j}.`,
            phase: 'POINTER_MOVE_J',
            variables: { low, high, pi, i, j },
          });
        } else {
          break;
        }
      }

      // Check i < j
      addStep({
        low,
        high,
        pivot: pi,
        pivotIndex: low,
        i,
        j,
        activeRecursionId: nodeId,
        codeLine: 11,
        explanation: `Comparing pointers: i (${i}) < j (${j}) evaluates to ${i < j}.`,
        phase: 'POINTER_COMPARE',
        variables: { low, high, pi, i, j },
      });

      if (i < j) {
        stats.swaps++;
        tmp = currentArray[i];
        currentArray[i] = currentArray[j];
        currentArray[j] = tmp;

        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          swappingIndices: [i, j],
          activeRecursionId: nodeId,
          codeLine: 12,
          explanation: `Swapping inverted elements ar[i=${i}]=${currentArray[j]} and ar[j=${j}]=${currentArray[i]}.`,
          phase: 'SWAP',
          variables: { low, high, pi, i, j, tmp, 'ar[i]': currentArray[i], 'ar[j]': currentArray[j] },
        });

        i++;
        j--;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: low,
          i,
          j,
          activeRecursionId: nodeId,
          codeLine: 15,
          explanation: `After swap, incremented i to ${i} and decremented j to ${j}.`,
          phase: 'POINTER_INIT',
          variables: { low, high, pi, i, j },
        });
      }
    }

    // Place pivot at j
    stats.swaps++;
    tmp = currentArray[low];
    currentArray[low] = currentArray[j];
    currentArray[j] = tmp;

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: j,
      i,
      j,
      swappingIndices: [low, j],
      activeRecursionId: nodeId,
      codeLine: 19,
      explanation: `Swapping pivot ar[low=${low}]=${pi} with ar[j=${j}]=${currentArray[low]} to place pivot in its finalized position.`,
      phase: 'PIVOT_FINAL_SWAP',
      variables: { low, high, pi, i, j, tmp, 'ar[low]': currentArray[low], 'ar[j]': currentArray[j] },
    });

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: j,
      i,
      j,
      partitionRange: { low, high },
      leftPartitionRange: low <= j - 1 ? { low, high: j - 1 } : null,
      rightPartitionRange: j + 1 <= high ? { low: j + 1, high } : null,
      activeRecursionId: nodeId,
      codeLine: 22,
      explanation: `Partition finished! Returning partition index j = ${j}. Left subarray [${low}..${j - 1}] elements are <= ${pi}; Right subarray [${j + 1}..${high}] elements are >= ${pi}.`,
      phase: 'PARTITION_DONE',
      variables: { low, high, pi, j },
    });

    return j;
  }

  // --- LAST ELEMENT PIVOT (LOMUTO) PARTITION ---
  function partitionLastLomuto(
    low: number,
    high: number,
    nodeId: string,
    node: RecursionTreeNode
  ): number {
    const pi = currentArray[high];
    node.pivotValue = pi;
    let i = low - 1;
    let tmp: number;

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: high,
      i,
      j: low,
      activeRecursionId: nodeId,
      codeLine: 2,
      explanation: `Lomuto Partition: Selected last element ar[high=${high}] = ${pi} as pivot. Initializing boundary pointer i = low - 1 (${i}).`,
      phase: 'PIVOT_SELECTION',
      variables: { low, high, pi, i, j: low },
    });

    for (let j = low; j < high; j++) {
      stats.comparisons++;
      const cond = currentArray[j] <= pi;

      addStep({
        low,
        high,
        pivot: pi,
        pivotIndex: high,
        i,
        j,
        comparingIndices: [j, high],
        activeRecursionId: nodeId,
        codeLine: 6,
        explanation: `Scanning element ar[j=${j}]=${currentArray[j]}: comparing with pivot pi=${pi} (ar[j] <= pi is ${cond}).`,
        phase: 'POINTER_COMPARE',
        variables: { low, high, pi, i, j, 'ar[j]': currentArray[j] },
      });

      if (cond) {
        i++;
        addStep({
          low,
          high,
          pivot: pi,
          pivotIndex: high,
          i,
          j,
          activeRecursionId: nodeId,
          codeLine: 7,
          explanation: `ar[j] <= pi is true: expanding smaller element boundary by incrementing i to ${i}.`,
          phase: 'POINTER_MOVE_I',
          variables: { low, high, pi, i, j },
        });

        if (i !== j) {
          stats.swaps++;
          tmp = currentArray[i];
          currentArray[i] = currentArray[j];
          currentArray[j] = tmp;

          addStep({
            low,
            high,
            pivot: pi,
            pivotIndex: high,
            i,
            j,
            swappingIndices: [i, j],
            activeRecursionId: nodeId,
            codeLine: 8,
            explanation: `Swapping ar[i=${i}]=${currentArray[j]} and ar[j=${j}]=${currentArray[i]} to move element <= pivot into the left partition.`,
            phase: 'SWAP',
            variables: { low, high, pi, i, j, tmp, 'ar[i]': currentArray[i], 'ar[j]': currentArray[j] },
          });
        }
      }
    }

    // Place pivot at i + 1
    const finalPivotIndex = i + 1;
    stats.swaps++;
    tmp = currentArray[finalPivotIndex];
    currentArray[finalPivotIndex] = currentArray[high];
    currentArray[high] = tmp;

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: finalPivotIndex,
      i,
      j: high,
      swappingIndices: [finalPivotIndex, high],
      activeRecursionId: nodeId,
      codeLine: 13,
      explanation: `Placing pivot ${pi} at correct index i + 1 = ${finalPivotIndex} by swapping ar[${finalPivotIndex}] and ar[high=${high}].`,
      phase: 'PIVOT_FINAL_SWAP',
      variables: { low, high, pi, i, j: high, tmp, pivotIndex: finalPivotIndex },
    });

    addStep({
      low,
      high,
      pivot: pi,
      pivotIndex: finalPivotIndex,
      i,
      j: high,
      partitionRange: { low, high },
      leftPartitionRange: low <= finalPivotIndex - 1 ? { low, high: finalPivotIndex - 1 } : null,
      rightPartitionRange: finalPivotIndex + 1 <= high ? { low: finalPivotIndex + 1, high } : null,
      activeRecursionId: nodeId,
      codeLine: 16,
      explanation: `Lomuto partition complete. Returning partition index ${finalPivotIndex}. Left subarray [${low}..${finalPivotIndex - 1}] has elements <= ${pi}; right subarray [${finalPivotIndex + 1}..${high}] has elements > ${pi}.`,
      phase: 'PARTITION_DONE',
      variables: { low, high, pi, pivotIndex: finalPivotIndex },
    });

    return finalPivotIndex;
  }

  // Kick off recursion
  quickSort(0, n - 1, 0, null);

  // Mark all indices finalized at the end
  for (let idx = 0; idx < n; idx++) {
    finalizedSet.add(idx);
  }

  // Final sorted completion step
  addStep({
    low: 0,
    high: n - 1,
    pivot: null,
    pivotIndex: null,
    i: null,
    j: null,
    activeRecursionId: 'complete',
    codeLine: options.strategy === 'MEDIAN_OF_THREE' ? 43 : options.strategy === 'FIRST' ? 31 : 25,
    explanation: `Quick Sort completed successfully! Entire array [${currentArray.join(', ')}] is sorted in ascending order. Total Comparisons: ${stats.comparisons}, Total Swaps: ${stats.swaps}, Total Partitions: ${stats.partitions}.`,
    phase: 'SORTED',
    variables: {},
  });

  return steps;
}
