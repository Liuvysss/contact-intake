# README - Project by Liuvys Perez

## Overview

Safe Contact Intake System is a privacy-conscious contact form
application built with React and Vite on the frontend. It is paired
with an Express backend that receives contact requests and stores
submissions in a local JSON file.

The application is designed to demonstrate core full-stack
JavaScript principles including controlled form state,
client-side validation, asynchronous API communication,
component-based architecture, and file-based data persistence.

User input drives the entire experience, with validation handled in
the React interface and submitted data securely posted to the backend
through the `/api/contact` endpoint.

---

## Features

- Responsive contact intake form built with React
- Optional name field for privacy-conscious submissions
- Required safe contact method and message fields
- Preferred contact time field for flexible follow-up
- Client-side validation with clear error messaging
- Async form submission with loading state feedback
- Confirmation messaging after successful submission
- Express API endpoint for processing contact requests
- Local JSON file persistence for saved submissions

---

## Technical Notes

- Built with React and Vite
- Functional components with Hooks (`useState`)
- Controlled form inputs throughout the application
- `fetch()` used for asynchronous POST requests
- Express server handles API routing and validation
- Node.js file system promises API used for local data storage
- Vite dev server proxies `/api` requests to `http://localhost:4000`

---

## How to Use

1. Open the application
   - View the Safe Contact Intake form interface
   - Review the privacy-focused introductory message
2. Complete the form
   - Enter a name if desired
   - Provide a safe contact method
   - Add a preferred contact time if needed
   - Write your message
3. Submit the form
   - Click `Submit`
   - Validation will prevent incomplete required fields
4. Review the response
   - A confirmation message appears after successful submission
   - If something goes wrong, the app shows a retry message

---

## How to Run

1. Start the backend server
   - `cd server`
   - `npm install`
   - `node index.js`
2. Start the frontend development server
   - `cd client`
   - `npm install`
   - `npm run dev`
3. Open in browser
   - `http://localhost:5173`

Or

Use the Vite development server for the React app while the Express
API runs on `http://localhost:4000`
