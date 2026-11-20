# Task 07: Movie Explorer

A responsive movie browsing web app built with React and TypeScript for the μLearn Web Development Challenge.

## Overview
An interactive movie browsing application demonstrating React fundamentals, component architecture, and unidirectional data flow: breaking UI into reusable components (`MovieCard`, `MovieGrid`, `MovieDetails`), passing structured data and event handlers down through props, implementing dynamic search and genre filtering, and delivering a responsive grid-based viewing experience with detailed modal overviews.

## Features
- Modular component architecture with reusable `MovieCard`, `MovieGrid`, and `MovieDetails` components
- Unidirectional data flow passing movie data and selection handlers cleanly via props
- Real-time search functionality filtering across movie titles, genres, and directors
- Interactive genre filter chips with active state indicators and live movie counter
- Detailed movie modal view displaying synopses, release years, runtime, directors, and ratings
- Accessible modal dialog with backdrop click dismissal and dedicated close button
- Graceful empty state handling when no matching movies are found
- Fully responsive layout across mobile, tablet, and desktop devices

## Tech Stack
- HTML5
- CSS3
- TypeScript
- React
- Vite

## Getting Started

### Prerequisites
- Modern web browser
- Git
- Node.js & npm

### Installation
```bash
git clone https://github.com/rafasidhik/Web_Dev_Lf26.git
cd Web_Dev_Lf26/movie-explorer
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
[View Project](https://movie-exp1orer.vercel.app/)
