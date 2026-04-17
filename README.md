# README – Project by Liuvys Perez

## Overview

Safe Contact Intake System is a secure, privacy-conscious single-page application for the Women’s Resource Center. It enables survivors to safely request help through a trauma-informed, accessible intake form.

The project demonstrates full-stack engineering principles: modern React (Vite) frontend, Node.js (Express) backend, unidirectional data flow, and file-based persistence. Every user interaction is validated and handled with emotional safety and clarity.

---

## Features

- Accessible, trauma-informed intake form
- Optional name, required safe contact method and message
- Controlled inputs with real-time validation and error feedback
- Asynchronous POST to backend API
- Data persistence to a secure JSON file (no database required)
- Confirmation screen with reassuring messaging
- Responsive, mobile-first design
- ARIA roles and keyboard navigation for accessibility

---

## Structure

- `/client`: React 18+ SPA (Vite)
- `/server`: Node.js 20+ Express API

### Backend (Express API)

1. Open a terminal and navigate to `server`:
	```sh
	cd server
	npm install
	npm start
	```
	The API will run on [http://localhost:4000](http://localhost:4000).

### Frontend (React SPA)

1. Open a new terminal and navigate to `client`:
	```sh
	cd client
	npm install
	npm run dev
	```
	The app will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Technical Notes
- Frontend: React (Vite), functional components, Hooks (useState)
- Backend: Node.js 20+, Express, CORS, file-based storage
- Modern JavaScript (ES2021+): optional chaining, nullish coalescing
- Unidirectional data flow: React state → API → file persistence
- Vite proxy for seamless local API integration
- No tracking, analytics, or unnecessary data collection