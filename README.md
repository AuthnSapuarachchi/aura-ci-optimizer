# Aura: The AI-Powered CI/CD Optimizer

> A secure, multi-tenant, full-stack microservice application built with React, Spring Boot, and Python. This project demonstrates enterprise-level skills including JWT authentication, multi-tenant data isolation, and a fully containerized deployment.



---

## 🚀 Live Demo

* **Frontend App (Vercel):** [https://aura-ci-optimizer.vercel.app](https://aura-ci-optimizer.vercel.app)
* **Backend API (Render):** [https://aura-spring-backend-1.onrender.com/api/v1/health](https://aura-spring-backend-1.onrender.com/api/v1/health)

*(Note: The free-tier backend services may "sleep" and take 30-60 seconds on the first load to wake up.)*

---

## ✨ Key Features

* **Secure User Authentication:** Full `Register` and `Login` flow using Spring Security.
* **Stateless JWT Authorization:** Uses JSON Web Tokens (JWTs) for secure, stateless API communication.
* **Multi-Tenant Architecture:** A critical feature! Users can **only** view and upload logs associated with their own account.
* **Microservice Backend:** A decoupled backend with two services:
    1.  **Spring Boot API:** Handles all user data, authentication, and business logic.
    2.  **Python (Flask) ML Service:** A separate "brain" that receives log text and performs analysis.
* **AI-Powered Parsing:** The Python service uses regex (and can be upgraded to a full ML model) to parse log files for status and duration.
* **Cloud Deployment:** Fully containerized with **Docker** and deployed via a 3-part system (Vercel + Render x2).

---

## 🏗️ Architecture Diagram

This project uses a modern, decoupled microservice architecture.



1.  **Frontend (Vercel):** The user interacts with the React app.
2.  **Backend API (Render):** The React app sends all requests to the Spring Boot backend.
3.  **Database (MongoDB):** The Spring backend handles all data persistence (users, logs).
4.  **ML Service (Render):** For analysis, the Spring backend calls the Python service, which returns the result.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (with Vite) | Building a fast, reactive Single Page Application (SPA). |
| **Backend API** | Java 21, Spring Boot | The core business logic, security, and API. |
| **ML Service** | Python 3, Flask | The "brain" for parsing log files. |
| **Database** | MongoDB Atlas | Secure, cloud-hosted NoSQL database. |
| **Security** | Spring Security, JWT | Full authentication and authorization. |
| **Deployment** | Docker, Vercel, Render | Containerization and cloud hosting. |

---

## 🧠 Challenges & Learnings

This project was a deep dive into enterprise-level development. The most challenging parts were:

* **Implementing Multi-Tenancy:** Ensuring a user could *only* access their own data. This was solved by linking every `LogAnalysis` document to a `userId` and building all repository methods (like `findByUserId()`) to use this link.
* **Debugging Deployment:** The `POST` request failed on the live app, but `GET` worked. I diagnosed this as a **CORS Preflight** (`OPTIONS`) request being blocked by Spring Security. I fixed it by explicitly permitting `HttpMethod.OPTIONS` in my `SecurityConfig`.
* **The "Sleeping Service":** Another bug was a `403` error caused by the Python service "sleeping." I learned to test for this by "waking up" all services before testing the full chain.

---

## 🏃 How to Run Locally

To run this project on your local machine, you'll need to run all 3 services.

**1. Prerequisites:**
* Java 21 (JDK)
* Node.js
* Python 3.10+
* Git

**2. Clone the Repository:**
```bash
git clone [https://github.com/AuthnSapuarachchi/aura-ci-optimizer.git](https://github.com/AuthnSapuarachchi/aura-ci-optimizer.git)
cd aura-ci-optimizer
