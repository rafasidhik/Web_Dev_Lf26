# Task 09 & 10: Virtualized Photo Browser

A high-performance virtualized photo browsing web app built with React, TypeScript, and TanStack Virtual for the μLearn Web Development Challenge.

## Overview

An interactive, client-side photo gallery designed to handle massive local photo collections (20,000+ images) smoothly without uploading private files to any server. Combines DOM virtualization (`@tanstack/react-virtual`), lazy reference-counted object URL lifecycle management (`URL.createObjectURL` / `URL.revokeObjectURL`), non-blocking asynchronous folder indexing, and a refactored modular architecture with single-responsibility components and custom React hooks.

## Features

- Client-side folder selection using the native browser directory picker (`webkitdirectory`) with non-blocking local indexing
- Zero-server privacy guarantee—photos are read, processed, and previewed entirely in the browser
- Virtualized grid rendering via `@tanstack/react-virtual` ensuring only visible photo cards mount in the DOM for smooth 60fps scrolling across 20,000+ photos
- Lazy object URL management (`useObjectUrl`) with reference counting that acquires URLs on demand and revokes them upon unmount to eliminate memory leaks
- Interactive high-resolution photo viewer modal with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`) and focus trapping
- Detailed photo metadata display including filename, human-readable file size (`formatFileSize`), photo index counter, and asynchronous natural pixel dimension detection
- Robust edge case handling for empty folders, non-image files, unsupported formats (RAW, PSD, TIFF), and files with missing MIME types
- Modular component architecture organized into `components/`, `features/`, `hooks/`, `types/`, and `utils/` with single-responsibility components
- Strict static type safety with TypeScript interfaces, readonly types, zero `any` types, Prettier formatting, and ESLint compliance
- Real-time DOM counter displaying total indexed photos alongside active mounted DOM elements
- Fully responsive grid layout across mobile, tablet, and desktop devices

## Tech Stack

- HTML5
- CSS3
- TypeScript
- React
- Vite
- TanStack Virtual

## Getting Started

### Prerequisites

- Modern web browser
- Git
- Node.js & npm

### Installation

```bash
git clone https://github.com/rafasidhik/Web_Dev_Lf26.git
cd Web_Dev_Lf26/virtualized-photo-browser
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Or build and preview the production bundle:

```bash
npm run build
npm run preview
```

## Live Demo

[View Project](https://pixelvau1t.vercel.app/)
