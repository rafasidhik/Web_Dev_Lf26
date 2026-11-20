# Task 11: Developer Portfolio

A modern, responsive personal developer portfolio web app built with Next.js App Router, TypeScript, and Vanilla CSS for the μLearn Web Development Challenge.

## Overview

A personal developer portfolio web application designed with a Noir & Stone aesthetic (dark, minimal, elegant). Built using Next.js App Router, TypeScript, and pure CSS, featuring genuine personal and academic background information, a showcase of six selected projects with reusable cards, categorized technical skills and tools, an embedded μLearn rank and karma profile card, and direct contact channels.

## Features

- Multi-page routing across Home, About, Projects, Skills, and Contact routes powered by Next.js App Router
- Shared layout architecture with a persistent navigation bar and site footer across all views
- Noir & Stone design theme featuring a minimal dark palette with high-contrast warm stone/gold accents
- Genuine Home and About pages introducing developer background.
- Reusable project card component architecture (`ProjectCard`) displaying categorized projects, tech stacks, and direct links
- Showcase of six selected projects.
- Categorized technical skills section covering Programming, Web Development, Tools & Platforms, and Areas of Interest
- Embedded μLearn profile card displaying live rank and karma points with proportional, non-clipped responsive scaling
- Functional contact section with verified direct channels (Email, GitHub, LinkedIn)
- Strict TypeScript static typing with zero `any` types and full ESLint compliance
- Accessibility considerations including high-contrast text ratios, semantic HTML landmarks, external link `aria-label` tags, and visible focus rings
- Fully responsive design tested across viewports (320px to 1440px) with defensive word-break styling

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- CSS3
- Turbopack

## Getting Started

### Prerequisites

- Modern web browser
- Git
- Node.js & npm

### Installation

```bash
git clone https://github.com/rafasidhik/Web_Dev_Lf26.git
cd Web_Dev_Lf26/developer-portfolio
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Or build and run the production server:

```bash
npm run build
npm run start
```

## Live Demo

[View Project](https://its-me-rafa.vercel.app/)
