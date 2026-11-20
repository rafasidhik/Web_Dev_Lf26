# Task 12: Feedback Portal

A modern, responsive feedback collection and management web app built with Next.js App Router, TypeScript, and Supabase for the μLearn Web Development Challenge.

## Overview

A full-stack feedback portal web application built using Next.js App Router, React 19, TypeScript, and Supabase PostgreSQL. Features an interactive feedback submission form with star ratings and category selection, asynchronous API route handlers for full CRUD operations (submission, real-time listing, inline editing, and deletion), dual-layer validation using HTML5 constraints and server-side Zod schemas, persistent cloud storage with Row Level Security (RLS) policies, responsive status indicators, and a default sample feedback entry featuring the creator's μLearn ID.

## Features

- Responsive feedback submission form accepting user name, message, star rating (1–5), and categories
- Asynchronous API route handlers (`/api/feedback`) for complete CRUD operations powered by Next.js App Router
- Persistent cloud storage integration with Supabase PostgreSQL and Row Level Security (RLS) policies
- Default sample feedback entry seeded with the creator's μLearn ID (`rafasidhik@mulearn`)
- Inline feedback editing allowing users to update their name, feedback, rating, and category directly
- Confirmation-prompted deletion with instant UI synchronization and database record cleanup
- Dual-layer validation enforcing length bounds, sanitization, whitespace trimming, and UUID checks via client constraints and Zod
- Asynchronous UI state management with loading spinners, disabled button states (`isSubmitting`, `isUpdating`, `deletingId`), and duplicate request prevention
- Dedicated initial loading state preventing layout shifts and false empty state flashes
- Strict TypeScript static typing with zero `any` types and full ESLint compliance
- Accessibility considerations including semantic form controls, dynamic status announcements (`role="status"`), and accessible star ratings
- Fully responsive layout tested across viewports (320px to 1440px) styled with pure modern CSS and custom design tokens

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Supabase (PostgreSQL)
- Zod
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
cd Web_Dev_Lf26/feedback-portal
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

[View Project](https://feedback-portal-xi.vercel.app/)
