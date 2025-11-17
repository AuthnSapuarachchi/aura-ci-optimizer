# MVP Scope

This document defines the features for the first working version of Aura.

## Features (IN-SCOPE for MVP)

* **Users:** A user can register and log in (Authentication).
* **Frontend:** A simple dashboard.
* **Logs:** A user can **manually upload** a log file.
* **Backend:** The backend will receive this file.
* **ML (Simple):** A *very simple* Python script (not ML yet) will parse the file to find:
    * The final status (e.g., "Success" or "Failure").
    * The total duration.
* **Display:** The dashboard will show a list of uploaded logs and their status/duration.

## Features (OUT-OF-SCOPE for MVP)

* **No** real ML models (no failure prediction, no log anomaly detection).
* **No** GitHub connection (no webhooks).
* **No** time-series database (no InfluxDB).
* **No** Docker or Kubernetes.
* **No** "smart" analytics dashboard.
