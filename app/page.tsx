'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../components/Header';
import { NavigationTabs, TabId } from '../components/NavigationTabs';
import { InputPanel } from '../components/InputPanel';
import { VisualizerPanel } from '../components/VisualizerPanel';
import { ExecutionStepsTable } from '../components/ExecutionStepsTable';
import { OverviewSection } from '../components/OverviewSection';
import { AlgorithmCodeSection } from '../components/AlgorithmCodeSection';
import { ComplexitySection } from '../components/ComplexitySection';
import { ComparisonSection } from '../components/ComparisonSection';
import { CompletionModal } from '../components/CompletionModal';
import { PresentationView } from '../components/PresentationView';

import { PivotStrategy, ExecutionStep } from '../lib/quicksort/types';
import { generateQuickSortSteps } from '../lib/quicksort/engine';

const INITIAL_ARRAY = [29, 10, 14, 37, 13, 45, 8, 22];

export default function QuickSortLaboratory() {
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
  const [strategy, setStrategy] = useState<PivotStrategy>('MEDIAN_OF_THREE');
  const [steps, setSteps] = useState<ExecutionStep[]>(() =>
    generateQuickSortSteps({ array: INITIAL_ARRAY, strategy: 'MEDIAN_OF_THREE' })
  );
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(700);
  const [activeTab, setActiveTab] = useState<TabId>('visualizer');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  // Generate steps whenever array or strategy changes
  useEffect(() => {
    const generated = generateQuickSortSteps({ array, strategy });
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setIsCompletionModalOpen(false);
  }, [array, strategy]);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  // Step navigation handlers
  const handleNext = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) {
        const nextIdx = prev + 1;
        if (nextIdx === steps.length - 1) {
          setIsPlaying(false);
          setIsCompletionModalOpen(true);
        }
        return nextIdx;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [steps.length]);

  const handlePrev = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
    setIsPlaying(false);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setIsCompletionModalOpen(false);
  }, []);

  const handleJumpToStep = (stepIdx: number) => {
    const clamped = Math.max(0, Math.min(steps.length - 1, stepIdx));
    setCurrentStepIndex(clamped);
    if (clamped === steps.length - 1) {
      setIsPlaying(false);
      setIsCompletionModalOpen(true);
    }
  };

  // Auto-play interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            const nextIdx = prev + 1;
            if (nextIdx === steps.length - 1) {
              setIsPlaying(false);
              setIsCompletionModalOpen(true);
            }
            return nextIdx;
          }
          setIsPlaying(false);
          return prev;
        });
      }, playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReset();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPresentationMode((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleReset]);

  if (!currentStep) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-ink font-mono text-sm">
        Initializing Quick Sort Engine...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col justify-between selection:bg-ink selection:text-white">
      <div>
        {/* Academic Header */}
        <Header
          isPresentationMode={isPresentationMode}
          onTogglePresentation={() => setIsPresentationMode((p) => !p)}
          onReset={handleReset}
          currentStep={currentStepIndex + 1}
          totalSteps={totalSteps}
        />

        {/* Navigation Tabs */}
        <NavigationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          stepCount={totalSteps}
        />

        {/* Input & Pivot Setup Panel */}
        {activeTab === 'visualizer' && (
          <InputPanel
            array={array}
            onArrayChange={setArray}
            strategy={strategy}
            onStrategyChange={setStrategy}
          />
        )}

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          {activeTab === 'visualizer' && (
            <VisualizerPanel
              strategy={strategy}
              step={currentStep}
              steps={steps}
              currentStepIndex={currentStepIndex}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onNext={handleNext}
              onPrev={handlePrev}
              onReset={handleReset}
              onJumpToStep={handleJumpToStep}
              playbackSpeed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
            />
          )}

          {activeTab === 'overview' && <OverviewSection />}

          {activeTab === 'code' && <AlgorithmCodeSection />}

          {activeTab === 'steps' && (
            <ExecutionStepsTable
              steps={steps}
              currentStepIndex={currentStepIndex}
              onSelectStep={(idx) => {
                handleJumpToStep(idx);
                setActiveTab('visualizer');
              }}
            />
          )}

          {activeTab === 'complexity' && <ComplexitySection />}

          {activeTab === 'comparison' && <ComparisonSection />}
        </main>
      </div>

      {/* Presentation Mode Fullscreen Overlay */}
      {isPresentationMode && (
        <PresentationView
          strategy={strategy}
          step={currentStep}
          currentStepIndex={currentStepIndex}
          totalSteps={totalSteps}
          isPlaying={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onNext={handleNext}
          onPrev={handlePrev}
          onReset={handleReset}
          onExit={() => setIsPresentationMode(false)}
          playbackSpeed={playbackSpeed}
          onSpeedChange={setPlaybackSpeed}
        />
      )}

      {/* Completion Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onReset={handleReset}
        step={currentStep}
        strategy={strategy}
        totalSteps={totalSteps}
      />

      {/* Academic Footer */}
      <footer className="border-t border-ink/15 bg-white py-5 px-4 lg:px-8 mt-16 text-xs font-mono text-ink/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <strong>Quick Sort Laboratory & Visualizer</strong> — Data Structures and Algorithms Interactive Demonstration
          </div>
          <div className="flex items-center gap-3">
            <span>Clean White & Dark Theme (#FFFFFF & #282B4A)</span>
            <span>•</span>
            <span>B.Tech CSE Laboratory Tool</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
