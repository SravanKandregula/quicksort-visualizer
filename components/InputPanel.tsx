'use strict';
import React, { useState, useEffect } from 'react';
import {
  Shuffle,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { PivotStrategy } from '../lib/quicksort/types';
import { SAMPLE_ARRAYS } from '../lib/quicksort/constants';

interface InputPanelProps {
  array: number[];
  onArrayChange: (newArray: number[]) => void;
  strategy: PivotStrategy;
  onStrategyChange: (strategy: PivotStrategy) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  array,
  onArrayChange,
  strategy,
  onStrategyChange,
}) => {
  const [rawInput, setRawInput] = useState<string>(array.join(', '));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setRawInput(array.join(', '));
  }, [array]);

  const handleApplyInput = () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const tokens = rawInput
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (tokens.length === 0) {
      setErrorMessage('Please enter at least 1 number.');
      return;
    }

    if (tokens.length > 50) {
      setErrorMessage('Maximum 50 elements allowed for clear visualization.');
      return;
    }

    const parsed: number[] = [];
    for (let i = 0; i < tokens.length; i++) {
      const num = Number(tokens[i]);
      if (isNaN(num) || !Number.isInteger(num)) {
        setErrorMessage(`"${tokens[i]}" is not a valid integer.`);
        return;
      }
      if (num < -999 || num > 999) {
        setErrorMessage(`Values must be between -999 and 999.`);
        return;
      }
      parsed.push(num);
    }

    onArrayChange(parsed);
    setSuccessMessage(`Loaded ${parsed.length} elements successfully!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleApplySample = (sample: number[]) => {
    setErrorMessage(null);
    setRawInput(sample.join(', '));
    onArrayChange([...sample]);
  };

  const handleGenerateRandom = () => {
    const count = Math.min(Math.max(array.length, 6), 10);
    const randoms: number[] = [];
    for (let k = 0; k < count; k++) {
      randoms.push(Math.floor(Math.random() * 90) + 5);
    }
    setErrorMessage(null);
    setRawInput(randoms.join(', '));
    onArrayChange(randoms);
  };

  return (
    <div className="bg-white border-b border-ink/15 px-4 lg:px-8 py-5">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Step 1: User Array Input Section */}
        <div className="p-4 bg-ink/[0.02] border border-ink/15 rounded-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label htmlFor="array-input" className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <span className="w-4 h-4 bg-ink text-white rounded-sm text-[10px] font-mono font-bold flex items-center justify-center">
                  1
                </span>
                <span>Enter Your Array Elements</span>
              </label>
              <p className="text-xs text-ink/70 mt-0.5">
                Type integers separated by commas or spaces (e.g. <code className="font-mono bg-white px-1.5 py-0.2 border border-ink/20 rounded-sm">29, 10, 14, 37, 13, 45, 8, 22</code>). Supports negative values.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-ink/60 bg-white px-2 py-0.5 border border-ink/15 rounded-sm">
                Size: <strong className="text-ink">{array.length}</strong> elements
              </span>
            </div>
          </div>

          {/* Input field + Load button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="array-input"
              type="text"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyInput();
                }
              }}
              placeholder="e.g. 25, 10, 48, 12, 33, 90, 4"
              className="flex-1 px-3.5 py-2 text-sm font-mono font-medium border border-ink/30 bg-white text-ink placeholder:text-ink/40 focus:border-ink focus:ring-1 focus:ring-ink rounded-sm"
            />
            <button
              onClick={handleApplyInput}
              className="px-4 py-2 bg-ink text-white hover:bg-ink/90 active:bg-ink/80 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 shadow-subtle shrink-0"
            >
              <span>Load & Visualize</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-ink font-medium p-2 bg-ink/10 border border-ink/30 rounded-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="flex items-center gap-1.5 text-xs text-ink font-medium p-2 bg-ink/5 border border-ink/25 rounded-sm">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-ink/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink/60 mr-1">
              Sample Presets:
            </span>
            <button
              onClick={handleGenerateRandom}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold border border-ink/25 bg-white hover:border-ink hover:bg-ink/5 text-ink rounded-sm transition-colors"
            >
              <Shuffle className="w-3 h-3" />
              <span>Random</span>
            </button>
            {SAMPLE_ARRAYS.map((sample) => (
              <button
                key={sample.name}
                onClick={() => handleApplySample(sample.array)}
                className="px-2.5 py-1 text-xs font-semibold border border-ink/25 bg-white hover:border-ink hover:bg-ink/5 text-ink rounded-sm transition-colors"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Choose Pivot Strategy */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
            <span className="w-4 h-4 bg-ink text-white rounded-sm text-[10px] font-mono font-bold flex items-center justify-center">
              2
            </span>
            <span>Choose Pivot Strategy</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Strategy 1: First Element */}
            <div
              onClick={() => onStrategyChange('FIRST')}
              className={`p-3.5 border transition-all cursor-pointer rounded-sm ${
                strategy === 'FIRST'
                  ? 'bg-ink text-white border-ink shadow-subtle'
                  : 'bg-white text-ink border-ink/20 hover:border-ink hover:bg-ink/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  Strategy 01
                </span>
                <div
                  className={`w-3.5 h-3.5 border flex items-center justify-center rounded-sm ${
                    strategy === 'FIRST' ? 'border-white bg-white' : 'border-ink/40'
                  }`}
                >
                  {strategy === 'FIRST' && <div className="w-1.5 h-1.5 bg-ink rounded-sm" />}
                </div>
              </div>
              <h3 className="text-xs font-bold tracking-tight uppercase mt-1">
                First Element as Pivot
              </h3>
              <p className={`text-[11px] mt-1 leading-relaxed ${strategy === 'FIRST' ? 'text-white/80' : 'text-ink/70'}`}>
                Uses <code className="font-mono">ar[low]</code> as pivot with inward two-pointer scan.
              </p>
            </div>

            {/* Strategy 2: Median-of-Three */}
            <div
              onClick={() => onStrategyChange('MEDIAN_OF_THREE')}
              className={`p-3.5 border transition-all cursor-pointer rounded-sm ${
                strategy === 'MEDIAN_OF_THREE'
                  ? 'bg-ink text-white border-ink shadow-subtle'
                  : 'bg-white text-ink border-ink/20 hover:border-ink hover:bg-ink/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                    Strategy 02
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.2 uppercase rounded-sm ${
                      strategy === 'MEDIAN_OF_THREE' ? 'bg-white text-ink' : 'bg-ink text-white'
                    }`}
                  >
                    Recommended
                  </span>
                </div>
                <div
                  className={`w-3.5 h-3.5 border flex items-center justify-center rounded-sm ${
                    strategy === 'MEDIAN_OF_THREE' ? 'border-white bg-white' : 'border-ink/40'
                  }`}
                >
                  {strategy === 'MEDIAN_OF_THREE' && <div className="w-1.5 h-1.5 bg-ink rounded-sm" />}
                </div>
              </div>
              <h3 className="text-xs font-bold tracking-tight uppercase mt-1">
                Median Element as Pivot
              </h3>
              <p className={`text-[11px] mt-1 leading-relaxed ${strategy === 'MEDIAN_OF_THREE' ? 'text-white/80' : 'text-ink/70'}`}>
                Median-of-three (<code className="font-mono">low</code>, <code className="font-mono">mid</code>, <code className="font-mono">high</code>) using supplied C logic.
              </p>
            </div>

            {/* Strategy 3: Last Element */}
            <div
              onClick={() => onStrategyChange('LAST')}
              className={`p-3.5 border transition-all cursor-pointer rounded-sm ${
                strategy === 'LAST'
                  ? 'bg-ink text-white border-ink shadow-subtle'
                  : 'bg-white text-ink border-ink/20 hover:border-ink hover:bg-ink/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-70">
                  Strategy 03
                </span>
                <div
                  className={`w-3.5 h-3.5 border flex items-center justify-center rounded-sm ${
                    strategy === 'LAST' ? 'border-white bg-white' : 'border-ink/40'
                  }`}
                >
                  {strategy === 'LAST' && <div className="w-1.5 h-1.5 bg-ink rounded-sm" />}
                </div>
              </div>
              <h3 className="text-xs font-bold tracking-tight uppercase mt-1">
                Last Element as Pivot (Lomuto)
              </h3>
              <p className={`text-[11px] mt-1 leading-relaxed ${strategy === 'LAST' ? 'text-white/80' : 'text-ink/70'}`}>
                Uses <code className="font-mono">ar[high]</code> as pivot with forward single scan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
