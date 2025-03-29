import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report

# Load Datasets

training_df = pd.read_csv("datasets/Training.csv")  # Contains symptoms & disease to predict
description_df = pd.read_csv("datasets/description.csv")
diets_df = pd.read_csv("datasets/diets.csv")
medication_df = pd.read_csv("datasets/medications.csv")
precaution_df = pd.read_csv("datasets/precautions_df.csv")
symptoms_df = pd.read_csv("datasets/symtoms_df.csv")
symptoms_severity_df = pd.read_csv("datasets/Symptom-severity.csv")
workout_df = pd.read_csv("datasets/workout_df.csv")

# Split into test train datasets

X = training_df.drop(columns=["prognosis"])  # All symptom columns
y = training_df["prognosis"]  # Disease to predict

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with StandarScaler + SVC Model

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", SVC(kernel="linear"))
])

# Train the pipeline

pipeline.fit(X_train, y_train)

# Make predictions

y_pred = pipeline.predict(X_test)

# Dynamic Predictions Function

user_input = input("Enter your symptoms") # Talking input

def symptom_to_array(input):
    user_symptoms = input.lower().split(",") # Spliting and converting to array
    symptoms_vector = np.zeros(len(X.columns)) # Array with all zeros

    for symptom in user_symptoms: # Loop through symptoms entered as input
        symptom = symptom.strip() # remove extra spaces
        if symptom in X.columns: # Loop through symptoms dataset
            symptoms_vector[list(X.columns).index(symptom)] = 1 # Converting 0 to 1 where index matches with symtop

    return symptoms_vector

# Predicting from input

user_vector = symptom_to_array(user_input)
disease = pipeline.predict(user_vector.reshape(1, -1)) # It needed 2D array [[0, 0, 1, 0]]

print(disease)









# print(description_df.head())
# print(diets_df.head())
# print(medication_df.head())
# print(precaution_df.head())
# print(symptoms_df.head())
# print(symptoms_severity_df.head())
# print(training_df.head())
# print(workout_df.head())