# Quick Sort Interactive Algorithm Visualizer

A professional, responsive, interactive educational web application designed for B.Tech Computer Science students, Data Structures and Algorithms laboratory demonstrations, classroom presentations, technical viva preparation, and algorithmic self-learning.

## 🎨 Clean Visual Foundation

- **Primary / Background**: `#FFFFFF` (Pure Crisp White)
- **Secondary / Dark**: `#282B4A` (Deep Slate / Navy)
- **Styling Rules**:
  - Exclusively built using `#FFFFFF` and `#282B4A` with subtle opacity variations for borders, muted backgrounds, highlights, and overlays.
  - Rectangular button geometry (subtle 2px–4px corner radius; no pill shapes).
  - High-contrast visual hierarchy optimized for lecture hall projectors, laptop screens, and viva demonstrations.
  - Zero unwanted page jumps or auto-scrolling when clicking Next Step or Previous Step.

---

## 🚀 Key Features & Layout

### 1. Direct User Array Input & Pivot Setup
- **Step 1: Enter Your Array Elements**:
  - Direct typing/pasting input field supporting comma or space-separated numbers (e.g. `29, 10, 14, 37, 13, 45, 8, 22`).
  - Supports negative values (e.g. `-15, 42, -3, 0, 18`).
  - **Load & Visualize** button with instant integer validation.
  - One-click presets: `[Random]`, `[Nearly Sorted]`, `[Reverse Sorted]`, `[With Duplicates]`, `[Negative Numbers]`, `[Short Array]`.
- **Step 2: Choose Pivot Selection Strategy**:
  - Three clean, uncluttered cards: First Element as Pivot, Median Element as Pivot, Last Element as Pivot (Lomuto).

### 2. Primary Representation Workspace (Array + Synchronized C Code)
- **Left Panel (Array Visualization)**:
  - **Prominent Pivot Arrow (`PIVOT ▼`)**: Every time a pivot is active or identified, a sharp arrow badge (`PIVOT ▼`) points directly into the pivot block.
  - Rectangular blocks with array values, indices, and active pointer tags (`i ▼`, `j ▼`, `LOW`, `HIGH`).
- **Right Panel (Synchronized C Source Code)**:
  - Real C implementation for the chosen strategy with executing line indicator (`▶`), scope variables table, and plain-English line interpretation.
  - Auto-scroll confined strictly to the internal code box (zero window/page scrolling).

### 3. Step Controller Bar (Directly Under the Representation)
- Located immediately below the parallel workspace so your eyes remain on the visual blocks:
  - `[ Previous Step ]` and `[ Next Step ]`
  - `[ Auto Play / Pause ]`
  - `[ Reset ]`
  - Step scrubber slider (`Step X of Y`)
  - Speed toggle (`0.5x`, `1x`, `2x`)
  - Global keyboard shortcuts: `→` (Next), `←` (Prev), `Space` (Play/Pause), `R` (Reset), `P` (Presentation Mode).

### 4. Pure Algorithmic Process Visualization (Main Steps Only — No Code)
- A dedicated, full-width conceptual visual representation right after the controls:
  - **Reduced to Main Steps Only**: Eliminates repetitive micro-increments of `i` and `j`, presenting only the critical milestones:
    1. Pivot Selection & Placement
    2. Element Swaps
    3. Pivot Locked In Position
    4. Base Cases
    5. Final Sorted Array
  - **Highlighted with an Arrow (`PIVOT ▼`) Every Time**: The active pivot block is visibly marked with a glowing down arrow badge at all times.
  - **Progressive Main Milestone Timeline**: A clean timeline of major milestone cards. Clicking any card jumps directly to that milestone without scrolling the browser page.
  - Dedicated **`[Prev Main Step]`** and **`[Next Main Step]`** buttons for milestone-to-milestone navigation.

### 5. Educational Modules & Viva Preparation
- **Overview**: Divide & Conquer concepts and the 6 phases of Quick Sort.
- **Algorithm Code**: Full, copyable C source files.
- **Execution Steps**: Searchable, filterable step log with click-to-jump.
- **Complexity Analysis**: Time ($O(n \log n)$ best/avg, $O(n^2)$ worst), space ($O(\log n)$ best/avg, $O(n)$ worst), Master Theorem derivations, and viva exam preparation notes.
- **Comparison Table**: Comprehensive comparison matrix across pivot schemes, partition schemes, duplicate handling, and cache locality.
- **Presentation Mode**: Fullscreen projector view with enlarged typography and keyboard control.
- **Completion Screen**: Verified execution metrics modal upon sort completion.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Runtime**: Node.js v20+

---

## 🏃 Running the Application

```bash
# Build
npm run build

# Start production server
npm start
```
Server is running on **`http://localhost:3000`**.
