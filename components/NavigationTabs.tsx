'use strict';
import React from 'react';
import {
  Sliders,
  PlaySquare,
  Code2,
  ListOrdered,
  Gauge,
  GitCompare,
} from 'lucide-react';

export type TabId =
  | 'overview'
  | 'visualizer'
  | 'code'
  | 'steps'
  | 'complexity'
  | 'comparison';

interface NavigationTabsProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  stepCount?: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  onSelectTab,
  stepCount,
}) => {
  const tabs: { id: TabId; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'visualizer', label: 'Visualizer', icon: <PlaySquare className="w-4 h-4" /> },
    { id: 'overview', label: 'Overview', icon: <Sliders className="w-4 h-4" /> },
    { id: 'code', label: 'Algorithm Code', icon: <Code2 className="w-4 h-4" /> },
    {
      id: 'steps',
      label: 'Execution Steps',
      icon: <ListOrdered className="w-4 h-4" />,
      badge: stepCount ? stepCount : undefined,
    },
    { id: 'complexity', label: 'Complexity Analysis', icon: <Gauge className="w-4 h-4" /> },
    { id: 'comparison', label: 'Comparison', icon: <GitCompare className="w-4 h-4" /> },
  ];

  return (
    <nav className="border-b border-ink/15 bg-white px-4 lg:px-8 pt-2">
      <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all border-b-2 rounded-t-sm whitespace-nowrap ${
                isActive
                  ? 'border-ink bg-ink text-white shadow-subtle'
                  : 'border-transparent text-ink/70 hover:text-ink hover:bg-ink/[0.03]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-sm ${
                    isActive ? 'bg-white/20 text-white' : 'bg-ink/10 text-ink'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
