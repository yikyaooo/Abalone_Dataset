function validateFeature(featureId) {
  var value = parseFloat(document.getElementById(featureId).value);
  if (isNaN(value) || value <= 0 || value.toString().includes("%") || value.toString().includes("$") || value.toString().includes("€") || isNaN(value) || value < 0) {
    alert("Error: Feature " + featureId + " must be a positive number (no alphabets, %, $, or € symbols allowed).");
    return false;
  }
  return true;
}

document.getElementById("predictionForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Get input values
    var feature1 =  document.querySelector('input[name="sex"]:checked').value;
    var feature2 = parseFloat(document.getElementById("feature2").value)/200;
    var feature3 = parseFloat(document.getElementById("feature3").value)/200;
    var feature4 = parseFloat(document.getElementById("feature4").value)/200;
    var feature5 = parseFloat(document.getElementById("feature5").value)/200;
    var feature6 = parseFloat(document.getElementById("feature6").value)/200;
    var feature7 = parseFloat(document.getElementById("feature7").value)/200;
    var feature8 = parseFloat(document.getElementById("feature8").value)/200;

    if (!validateFeature("feature2") || !validateFeature("feature3") || 
    !validateFeature("feature4") || !validateFeature("feature5") || 
    !validateFeature("feature6") || !validateFeature("feature7") || !validateFeature("feature8")) {
      return;  // Prevent form submission if validation fails
    }
  
    // Prepare data as JSON
    var data = {
        features: [[feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8]]
      };
  
    // Make prediction request
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('error');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful prediction response
      var predictionResult = document.getElementById("predictionResult");
      predictionResult.textContent = "Predicted Age: " + Math.ceil(data.prediction + 1.5);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
      var predictionResult = document.getElementById("predictionResult");
      predictionResult.textContent = "Prediction failed: " + error.message;
    });
  });
  