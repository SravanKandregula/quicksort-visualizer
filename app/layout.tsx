import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quick Sort Visualizer — Interactive Algorithm Laboratory',
  description: 'Understand Divide and Conquer Through Interactive Execution, Synchronized C Source Code, and Step-by-Step State Tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-ink min-h-screen selection:bg-ink selection:text-white">
        {children}
      </body>
    </html>
  );
}
