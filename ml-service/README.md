# Aura ML Service (Python/Flask)

This service is the "brain" of Aura. It receives log text, analyzes it, and will eventually house our ML models.

## Tech Stack
* Python
* Flask

## How to Run Locally
1.  `cd` into the `ml-service` folder.
2.  Activate the virtual environment: `source venv/bin/activate`
3.  Install dependencies: `pip install -r requirements.txt`
4.  Run the server: `flask --app app run`
