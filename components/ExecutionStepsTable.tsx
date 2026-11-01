'use strict';
import React, { useState } from 'react';
import { ExecutionStep } from '../lib/quicksort/types';
import { Search, Filter } from 'lucide-react';

interface ExecutionStepsTableProps {
  steps: ExecutionStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const ExecutionStepsTable: React.FC<ExecutionStepsTableProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [phaseFilter, setPhaseFilter] = useState<string>('ALL');

  const filteredSteps = steps.filter((step) => {
    const matchesSearch =
      step.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      step.stepNumber.toString().includes(searchTerm) ||
      step.codeLine.toString().includes(searchTerm);

    const matchesPhase = phaseFilter === 'ALL' || step.phase === phaseFilter;

    return matchesSearch && matchesPhase;
  });

  const uniquePhases = Array.from(new Set(steps.map((s) => s.phase)));

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3.5 bg-white border border-ink/15 rounded-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search steps, operations, values..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs font-mono border border-ink/25 bg-white text-ink focus:border-ink rounded-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-ink/70" />
          <span className="text-xs font-mono text-ink/70 uppercase">Filter:</span>
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="px-2.5 py-1 text-xs font-mono border border-ink/25 bg-white text-ink rounded-sm focus:border-ink"
          >
            <option value="ALL">All Phases ({steps.length})</option>
            {uniquePhases.map((phase) => (
              <option key={phase} value={phase}>
                {phase.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-ink/15 bg-white rounded-sm overflow-x-auto max-h-[600px] overflow-y-auto shadow-subtle">
        <table className="w-full text-left text-xs font-mono divide-y divide-ink/10">
          <thead className="bg-ink/[0.03] text-ink uppercase tracking-wider text-[11px] sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="py-2.5 px-3 border-r border-ink/10 w-16 text-center">Step</th>
              <th className="py-2.5 px-3 border-r border-ink/10 w-36">Phase</th>
              <th className="py-2.5 px-3 border-r border-ink/10 w-20 text-center">C Line</th>
              <th className="py-2.5 px-3 border-r border-ink/10 w-44">Pointers & Pivot</th>
              <th className="py-2.5 px-4">Dynamic State Explanation</th>
              <th className="py-2.5 px-3 w-20 text-center">Jump</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {filteredSteps.map((step) => {
              const isActive = step.stepNumber - 1 === currentStepIndex;

              return (
                <tr
                  key={step.stepNumber}
                  onClick={() => onSelectStep(step.stepNumber - 1)}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-ink text-white font-semibold'
                      : 'hover:bg-ink/[0.02] text-ink/90'
                  }`}
                >
                  <td className="py-2.5 px-3 border-r border-current/15 text-center font-bold">
                    #{step.stepNumber}
                  </td>
                  <td className="py-2.5 px-3 border-r border-current/15">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-tight ${
                        isActive
                          ? 'bg-white text-ink font-bold'
                          : 'bg-ink/10 text-ink border border-ink/20'
                      }`}
                    >
                      {step.phase.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 border-r border-current/15 text-center">
                    Line {step.codeLine}
                  </td>
                  <td className="py-2.5 px-3 border-r border-current/15 text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {step.pivot !== null && <span>pi={step.pivot}</span>}
                      {step.i !== null && <span>i={step.i}</span>}
                      {step.j !== null && <span>j={step.j}</span>}
                    </div>
                  </td>
                  <td className="py-2.5 px-4 font-sans text-xs leading-relaxed">
                    {step.explanation}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStep(step.stepNumber - 1);
                      }}
                      className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-sm border transition-colors ${
                        isActive
                          ? 'bg-white text-ink border-white'
                          : 'border-ink/25 hover:border-ink hover:bg-ink/5 text-ink'
                      }`}
                    >
                      {isActive ? 'Current' : 'Go'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
