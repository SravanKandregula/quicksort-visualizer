'use strict';
import React from 'react';
import { RecursionTreeNode } from '../lib/quicksort/types';
import { GitBranch, CheckCircle2, Clock, PlayCircle } from 'lucide-react';

interface RecursionTreeViewProps {
  treeSnapshot: RecursionTreeNode[];
  activeNodeId: string;
}

export const RecursionTreeView: React.FC<RecursionTreeViewProps> = ({
  treeSnapshot,
  activeNodeId,
}) => {
  if (!treeSnapshot || treeSnapshot.length === 0) {
    return (
      <div className="p-4 text-center text-xs font-mono text-ink/60 border border-ink/15 rounded-sm bg-white">
        No recursion calls registered yet. Start or step the visualization.
      </div>
    );
  }

  const depthGroups: Record<number, RecursionTreeNode[]> = {};
  let maxDepth = 0;

  for (const node of treeSnapshot) {
    if (!depthGroups[node.depth]) {
      depthGroups[node.depth] = [];
    }
    depthGroups[node.depth].push(node);
    if (node.depth > maxDepth) {
      maxDepth = node.depth;
    }
  }

  return (
    <div className="bg-white space-y-4">
      <div className="flex items-center justify-between border-b border-ink/10 pb-2">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-ink" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
            Recursive Call Tree & Call Stack
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-ink/70">
          <span>Total Calls: <strong>{treeSnapshot.length}</strong></span>
          <span>Max Depth: <strong>{maxDepth}</strong></span>
        </div>
      </div>

      <div className="space-y-4 overflow-x-auto py-2">
        {Object.keys(depthGroups)
          .map(Number)
          .sort((a, b) => a - b)
          .map((depth) => {
            const nodes = depthGroups[depth];
            return (
              <div key={depth} className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-ink/60 flex items-center gap-2">
                  <span>Depth {depth}:</span>
                  <div className="flex-1 border-t border-ink/10 border-dashed" />
                </div>

                <div className="flex flex-wrap gap-2.5 pl-2">
                  {nodes.map((node) => {
                    const isActive = node.id === activeNodeId;
                    const isBase = node.status === 'base_case';
                    const isDone = node.status === 'completed';

                    let cardClasses = 'bg-white text-ink border-ink/20';
                    if (isActive) {
                      cardClasses = 'bg-ink text-white border-2 border-ink shadow-elevated';
                    } else if (isDone) {
                      cardClasses = 'bg-ink/[0.04] text-ink border-ink/25';
                    } else if (isBase) {
                      cardClasses = 'bg-ink/[0.02] text-ink/60 border-ink/15 border-dashed';
                    }

                    return (
                      <div
                        key={node.id}
                        className={`p-2.5 border rounded-sm transition-all duration-200 min-w-[160px] ${cardClasses}`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono pb-1 border-b border-current/15 mb-1.5">
                          <span className="font-bold uppercase tracking-wider">
                            quickSort({node.low}, {node.high})
                          </span>
                          <span>
                            {isActive ? (
                              <span className="text-[9px] font-bold px-1 bg-white text-ink rounded-sm">
                                ACTIVE
                              </span>
                            ) : isDone ? (
                              <span className="text-[9px] px-1 bg-ink/10 rounded-sm">
                                DONE
                              </span>
                            ) : (
                              <span className="text-[9px] px-1 bg-ink/5 rounded-sm">
                                {isBase ? 'BASE' : 'PENDING'}
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="text-xs font-mono font-bold tracking-tight">
                          [{node.initialSubarray.join(', ')}]
                        </div>

                        <div className="mt-1 text-[10px] font-mono opacity-80">
                          {node.pivotValue !== null && node.pivotFinalIndex !== null ? (
                            <span>
                              Pivot: <strong>{node.pivotValue}</strong> (idx {node.pivotFinalIndex})
                            </span>
                          ) : (
                            <span className="italic opacity-60">Partitioning...</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
