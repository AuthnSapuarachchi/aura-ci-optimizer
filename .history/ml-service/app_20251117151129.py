import re
from flask import Flask, request, jsonify

# Create the Flask application
app = Flask(__name__)

def parse_log_simple(log_text):
    """
    A simple 'dumb' parser for our MVP.
    It uses regular expressions (regex) to find patterns.
    """
    try:
        # Try to find a 'status'
        status_match = re.search(r"Build status: (\w+)", log_text)
        status = status_match.group(1) if status_match else "UNKNOWN"

        # Try to find a 'duration'
        duration_match = re.search(r"Total time: (\d+)s", log_text)
        duration_seconds = int(duration_match.group(1)) if duration_match else 0

        return {
            "parsedStatus": status,
            "parsedDurationSeconds": duration_seconds
        }

    except Exception as e:
        print(f"Error parsing log: {e}")
        return {
            "parsedStatus": "ERROR",
            "parsedDurationSeconds": 0
        }


@app.route("/api/v1/analyze", methods=["POST"])
def analyze_log():
    """
    This is our main API endpoint. It takes raw text
    and returns the JSON analysis.
    """
    # Get the raw text from the POST request body
    log_text = request.data.decode('utf-8')

    # Run our simple parser
    analysis_result = parse_log_simple(log_text)

    # Return the result as JSON
    return jsonify(analysis_result)


# This makes the app runnable with "python app.py"
if __name__ == "__main__":
    app.run(debug=True, port=5000)