'use strict';
import React, { useEffect, useRef } from 'react';
import { PivotStrategy, ExecutionStep } from '../lib/quicksort/types';
import { getCCodeForStrategy } from '../lib/quicksort/cCode';
import { Variable, Terminal } from 'lucide-react';

interface CodeViewProps {
  strategy: PivotStrategy;
  step: ExecutionStep;
}

export const CodeView: React.FC<CodeViewProps> = ({ strategy, step }) => {
  const codeLines = getCCodeForStrategy(strategy);
  const activeLine = step.codeLine;
  const activeLineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active line inside the container without scrolling the page window
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeLineRef.current;
      const elemTop = element.offsetTop;
      const elemBottom = elemTop + element.offsetHeight;
      const contTop = container.scrollTop;
      const contBottom = contTop + container.clientHeight;

      if (elemTop < contTop) {
        container.scrollTo({ top: Math.max(0, elemTop - 12), behavior: 'smooth' });
      } else if (elemBottom > contBottom) {
        container.scrollTo({ top: elemBottom - container.clientHeight + 12, behavior: 'smooth' });
      }
    }
  }, [activeLine]);

  const renderHighlightedCode = (code: string) => {
    const keywords = ['int', 'void', 'if', 'else', 'while', 'for', 'return'];
    const parts = code.split(/(\b(?:int|void|if|else|while|for|return)\b|\/\*.*?\*\/)/g);

    return parts.map((part, index) => {
      if (keywords.includes(part)) {
        return (
          <span key={index} className="font-bold underline decoration-ink/30">
            {part}
          </span>
        );
      }
      if (part.startsWith('/*')) {
        return (
          <span key={index} className="italic opacity-60">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* Scope Variables Table */}
      <div className="p-3 bg-ink/[0.03] border border-ink/15 rounded-sm">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink mb-2">
          <div className="flex items-center gap-1.5">
            <Variable className="w-3.5 h-3.5" />
            <span>Scope Variables</span>
          </div>
          <span className="text-[11px] font-mono text-ink/70">
            Line #{activeLine}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
            <span className="text-ink/60">low:</span>
            <strong className="text-ink">{step.low !== null ? step.low : '—'}</strong>
          </div>
          <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
            <span className="text-ink/60">high:</span>
            <strong className="text-ink">{step.high !== null ? step.high : '—'}</strong>
          </div>
          {step.variables.mid !== undefined && (
            <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
              <span className="text-ink/60">mid:</span>
              <strong className="text-ink">{step.variables.mid}</strong>
            </div>
          )}
          <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
            <span className="text-ink/60">pi:</span>
            <strong className="text-ink">{step.pivot !== null ? step.pivot : '—'}</strong>
          </div>
          <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
            <span className="text-ink/60">i:</span>
            <strong className="text-ink">{step.i !== null ? step.i : '—'}</strong>
          </div>
          <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
            <span className="text-ink/60">j:</span>
            <strong className="text-ink">{step.j !== null ? step.j : '—'}</strong>
          </div>
          {step.variables.tmp !== undefined && (
            <div className="px-2 py-1 bg-white border border-ink/20 rounded-sm flex items-center gap-1.5">
              <span className="text-ink/60">tmp:</span>
              <strong className="text-ink">{step.variables.tmp}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Code Listing */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto max-h-[460px] border border-ink/20 bg-white rounded-sm font-mono text-xs leading-relaxed"
      >
        <div className="divide-y divide-ink/5">
          {codeLines.map((lineObj) => {
            const isCurrent = lineObj.lineNum === activeLine;
            return (
              <div
                key={lineObj.lineNum}
                ref={isCurrent ? activeLineRef : null}
                className={`flex items-start transition-colors duration-150 ${
                  isCurrent
                    ? 'bg-ink text-white font-semibold'
                    : 'text-ink/90 hover:bg-ink/[0.03]'
                }`}
              >
                <div
                  className={`w-10 flex-shrink-0 text-right pr-2.5 py-1 select-none font-mono text-[11px] border-r ${
                    isCurrent
                      ? 'border-white/30 text-white/70 bg-ink'
                      : 'border-ink/10 text-ink/40 bg-ink/[0.01]'
                  }`}
                >
                  {lineObj.lineNum}
                </div>

                <div className="w-4 flex-shrink-0 text-center py-1 select-none text-[10px]">
                  {isCurrent ? '▶' : ''}
                </div>

                <div className="flex-1 py-1 pr-3 whitespace-pre overflow-x-auto">
                  {renderHighlightedCode(lineObj.code)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operation Explanation Callout */}
      <div className="p-3 bg-white border border-ink/20 rounded-sm">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
          <Terminal className="w-3.5 h-3.5" />
          <span>Line Action</span>
        </div>
        <p className="text-xs text-ink/80 leading-relaxed font-sans">
          {step.explanation}
        </p>
      </div>
    </div>
  );
};
