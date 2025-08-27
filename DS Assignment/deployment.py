from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__, template_folder='templates')

model = joblib.load('mlpRegressor.pkl')  

@app.route('/')
def home():
  return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
  try:
    data = request.get_json()
  except:
    return jsonify({'error': 'Invalid JSON data'}), 400

  features = data.get('features')[0]  

  df = pd.DataFrame(data=[features], columns=['Sex', 'Length', 'Diameter', 'Height', 'Whole weight', 'Shucked weight', 'Viscera weight', 'Shell weight'])

  try:
    prediction = model.predict(df)[0]
    return jsonify({'prediction': prediction})
  except Exception as e:
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run(debug=True)
