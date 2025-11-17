# Aura: The AI-Powered CI/CD Optimizer


Aura is a full-stack, AI-powered platform designed to help developers analyze, optimize, and predict failures in their CI/CD pipelines.

## 1. The Problem

* CI/CD pipelines are slow, costing developer time and compute resources.
* When pipelines fail, it takes 10-15 minutes to search through thousands of log lines to find the *one* error.
* Flaky or inconsistent tests are hard to spot.

## 2. The Solution

Aura connects to your code repository (like GitHub) and ingests your CI/CD logs. It then uses a web dashboard and a machine learning backend to:

* **Visualize** pipeline performance over time.
* **Detect** bottlenecks (e.g., "This 'build' step is 40% slower").
* **Predict** failures before they happen.
* **Instantly find** the exact error message in a failed log using AI.

## 3. Tech Stack (Planned)

This project is an end-to-end demonstration of Full-stack, DevOps, and MLOps.

| Domain | Technology |
| :--- | :--- |
| **Frontend** | React, Vercel |
| **Backend API** | Spring Boot (Java), Render |
| **ML Service** | Python (Flask), Render |
| **Databases** | MongoDB Atlas (Main), InfluxDB (Time-Series) |
| **DevOps** | Docker, GitHub Actions (CI/CD), Kubernetes (Local) |

## 4. How to Run

(We will fill this in later)
