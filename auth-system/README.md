# Task 14: Authentication System

A modern, responsive full-stack JWT authentication web app built with Next.js App Router, TypeScript, and Supabase for the μLearn Web Development Challenge.

## Overview

A full-stack authentication web application built using Next.js App Router, React 19, TypeScript, and Supabase PostgreSQL. Features user registration (sign-up) and login flows with email normalization and minimum password length enforcement, secure server-side password hashing using bcrypt, stateless session management with jose JWT tokens stored exclusively in secure HttpOnly cookies, timing-attack mitigation using precomputed dummy hash comparison, protected dashboard routing enforced via Next.js Proxy (`src/proxy.ts`) and Server Component session verification, automatic redirection of unauthenticated visitors to login and authenticated users away from auth pages, secure logout with complete session cookie clearing, accessible UI controls, and a fully responsive layout.

## Features

- Asynchronous user registration API with case-insensitive email normalization, required field validation, and minimum 8-character password enforcement
- Credential-based login authentication verifying registered users against Supabase PostgreSQL
- Cryptographic password hashing powered by `bcryptjs` with salt rounds, ensuring plaintext passwords are never stored
- Constant-time credential verification mitigating email enumeration and timing attacks using precomputed dummy bcrypt comparison
- Stateless session management powered by `jose` issuing cryptographically signed HS256 JWT tokens with a 7-day expiration
- Secure cookie storage with `HttpOnly`, `SameSite=lax`, `Path=/`, and `Secure` attributes protecting tokens against client-side script extraction
- Double-layer server-side protected route authorization for `/dashboard` via Next.js Proxy (`src/proxy.ts`) and React Server Component verification
- Automatic redirection routing unauthenticated visitors to `/login` and redirecting active authenticated sessions away from auth pages
- Dedicated logout route handler clearing authentication session cookies and terminating access to protected views
- Server-side and client-side input validation powered by Zod schemas and HTML5 constraints
- Graceful error handling for invalid credentials, duplicate accounts, and malformed request bodies
- Strict TypeScript static typing with zero `any` types and full ESLint compliance
- Accessibility considerations including semantic form controls, keyboard navigation, and explicit label associations
- Fully responsive layout tested across viewports (320px to 1440px) styled with pure modern CSS and custom design tokens

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Supabase (PostgreSQL)
- jose (JWT)
- bcryptjs
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
cd Web_Dev_Lf26/auth-system
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

[View Project](https://auth-system-authify.vercel.app/)
