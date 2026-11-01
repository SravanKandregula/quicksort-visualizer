export type PivotStrategy = 'FIRST' | 'MEDIAN_OF_THREE' | 'LAST';

export type ExecutionPhase =
  | 'IDLE'
  | 'CALL_QUICKSORT'
  | 'BASE_CASE'
  | 'PIVOT_SELECTION'
  | 'MEDIAN_COMPARE'
  | 'MEDIAN_SWAP'
  | 'PIVOT_PLACE_LOW'
  | 'POINTER_INIT'
  | 'POINTER_MOVE_I'
  | 'POINTER_MOVE_J'
  | 'POINTER_COMPARE'
  | 'SWAP'
  | 'PIVOT_FINAL_SWAP'
  | 'PARTITION_DONE'
  | 'RECURSE_LEFT'
  | 'RECURSE_RIGHT'
  | 'SORTED';

export interface RecursionTreeNode {
  id: string;
  parentId: string | null;
  depth: number;
  low: number;
  high: number;
  initialSubarray: number[];
  pivotValue: number | null;
  pivotFinalIndex: number | null;
  status: 'pending' | 'active' | 'completed' | 'base_case';
  leftRange?: { low: number; high: number } | null;
  rightRange?: { low: number; high: number } | null;
}

export interface ExecutionVariables {
  low?: number | null;
  high?: number | null;
  mid?: number | null;
  pi?: number | null;
  i?: number | null;
  j?: number | null;
  tmp?: number | null;
  [key: string]: number | string | null | undefined;
}

export interface ExecutionStats {
  comparisons: number;
  swaps: number;
  partitions: number;
  recursiveCalls: number;
  maxRecursionDepth: number;
}

export interface ExecutionStep {
  stepNumber: number;
  array: number[];
  low: number;
  high: number;
  pivot: number | null;
  pivotIndex: number | null;
  i: number | null;
  j: number | null;
  comparingIndices: [number, number] | null;
  swappingIndices: [number, number] | null;
  finalizedIndices: number[];
  partitionRange: { low: number; high: number } | null;
  leftPartitionRange: { low: number; high: number } | null;
  rightPartitionRange: { low: number; high: number } | null;
  activeRecursionId: string;
  codeLine: number;
  explanation: string;
  phase: ExecutionPhase;
  variables: ExecutionVariables;
  stats: ExecutionStats;
  treeSnapshot: RecursionTreeNode[];
}

export interface CSourceCodeLine {
  lineNum: number;
  code: string;
  comment?: string;
}

export interface PivotStrategyInfo {
  id: PivotStrategy;
  title: string;
  shortName: string;
  tagline: string;
  description: string;
  pros: string;
  cons: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: {
    best: string;
    average: string;
    worst: string;
  };
}
