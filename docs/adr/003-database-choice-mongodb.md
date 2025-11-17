# ADR 003: Database Choice - MongoDB Atlas

* **Date:** 17/11/2025
* **Status:** Accepted

## Context
We need a database to store the results of our log analysis, as well as user and project data.

## Decision
We will use **MongoDB Atlas** (M0 Free Tier).

## Consequences
* **Pros:**
    * The `M0` tier is free forever and requires zero maintenance.
    * MongoDB is "document-based" (it stores JSON-like objects), which is perfect for our flexible analysis data.
    * `Spring Data MongoDB` provides excellent, easy integration.
* **Cons:**
    * It's a cloud service, so it relies on an internet connection.
