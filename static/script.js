function symptomApp() {
    return {
        searchQuery: '',
        selectedSymptoms: [],
        symptoms: [],

        disease: '',
        diets: [],
        medications: [],
        precautions: [],
        workouts: [],
        description: [],

        async loadSymptoms() {
            try {
                const response = await fetch('/symptoms');
                const text = await response.text();
                const rows = text.split('\n').map(row => row.split(','));

                let symptoms = [...new Set(rows.map(row => row[0]).filter(s => s))]; // Remove duplicates and falsy values
                symptoms.shift(); // Remove the first element "Symptoms"
                symptoms.pop();   // Remove the last element "Prognosis"

                this.symptoms = symptoms; // Store the processed array

            } catch (error) {
                console.error('Error loading CSV:', error);
            }
        },

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

        async checkDisease() {
            if (this.selectedSymptoms.length === 0) {
                alert("Please select symptoms first!");
                return;
            }
        
            try {
                const response = await fetch("/check_disease", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ symptoms: this.selectedSymptoms })  // Send selected symptoms
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
        
                this.disease = data.disease || "No disease found";
                this.diets = data.diets || [];
                this.medications = data.medications || [];
                this.precautions = data.precautions.length ? data.precautions.slice(1) : [];
                this.workouts = data.workouts || [];
                this.description = data.description || [];
        
            } catch (error) {
                console.error("Error checking disease:", error);
                alert("An error occurred while fetching disease information.");
            }
        },        

        formatList(items) {
            return items.length ? items.map(item => `<li>${item}</li>`).join('') : "<li>No data available</li>";
        }
    };
}
