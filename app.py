from flask import Flask, render_template, send_from_directory, request, jsonify
from ml_script import get_disease, get_description, get_diets, get_medications, get_workouts, get_precautions

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/symptoms")
def symptoms():
    return send_from_directory("datasets", "Symptom-severity.csv")

@app.route("/check_disease", methods=["POST"])
def check():
    data = request.get_json()  # Get JSON data from request
    symptoms = data.get("symptoms", [])  # Extract symptoms list

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400
    
    disease = get_disease(symptoms)
    description = get_description(disease)
    # Ensure no NaN values by replacing them with None
    diets = [x if x == x else None for x in get_diets(disease)]
    medications = [x if x == x else None for x in get_medications(disease)]
    precautions = [x if x == x else None for x in get_precautions(disease)]
    workouts = [x if x == x else None for x in get_workouts(disease)]


    return jsonify({
        "disease": disease,
        "description": description,
        "diets": diets,
        "medications": medications,
        "precautions": precautions,
        "workouts": workouts
    })


if __name__ == "__main__":
    app.run(debug=True)