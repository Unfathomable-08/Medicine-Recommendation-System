function symptomApp() {
    return {
        searchQuery: '',
        selectedSymptoms: [],
        symptoms: [
            "Fever", "Cough", "Headache", "Sore throat", "Fatigue", "Muscle pain",
            "Shortness of breath", "Loss of taste", "Loss of smell", "Sneezing"
        ],

        disease: '',
        diets: [],
        medications: [],
        precautions: [],
        workouts: [],

        get filteredSymptoms() {
            return this.symptoms.filter(symptom => 
                symptom.toLowerCase().includes(this.searchQuery.toLowerCase()) && 
                !this.selectedSymptoms.includes(symptom)
            );
        },

        addSymptom(symptom) {
            if (!this.selectedSymptoms.includes(symptom)) {
                this.selectedSymptoms.push(symptom);
                this.searchQuery = '';
            }
        },

        removeSymptom(index) {
            this.selectedSymptoms.splice(index, 1);
        },

        checkDisease() {
            if (this.selectedSymptoms.length === 0) {
                alert("Please select symptoms first!");
                return;
            }

            // Mock API call (Replace with actual API)
            this.disease = "Common Cold";
            this.diets = ["Drink warm fluids", "Eat vitamin C-rich foods"];
            this.medications = ["Paracetamol", "Cough syrup"];
            this.precautions = ["Wear a mask", "Rest properly"];
            this.workouts = ["Light stretching", "Breathing exercises"];
        },

        formatList(items) {
            return items.length ? items.map(item => `<li>${item}</li>`).join('') : "<li>No data available</li>";
        }
    };
}
