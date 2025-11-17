
# ADR 001: Initial Tech Stack for MVP

* **Date:** (Your Date, e.g., 2025-11-17)
* **Status:** Proposed

## Context
We need to build the MVP, which consists of a frontend, a backend, and a simple parsing script. We need a database for user data. We must use the free stack we identified.

## Decision
We will use the **MERN** stack for the main application, plus a **Python/Flask** service.

1.  **Frontend:** **React**. It's the most popular frontend library, which is good for my portfolio. It will be hosted on Vercel.
2.  **Backend:** **Node.js (Express)**. It's fast to prototype with, uses JavaScript (like the frontend), and is well-supported on Render's free tier.
3.  **Database:** **MongoDB Atlas**. The free tier is perfect for our user/project data, and its "schemaless" nature is flexible for prototyping.
4.  **Parsing Service:** **Python (Flask)**. The log parsing and future ML work *must* be in Python. We will build it as a separate, small API from day one. It will be hosted on Render.

## Consequences
* This project will be a **microservices architecture** from the start (a Node.js service and a Python service).
* We will need to manage communication between these two backend services.
* The frontend (React) will *only* talk to the Node.js backend. The Node.js backend will talk to the Python service.
