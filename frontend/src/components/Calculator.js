import React, { useState } from 'react';
import '../assets/css/Calculator.css';

const Calculator = () => {
  // BMI Calculator State
  const [bmiData, setBmiData] = useState({
    weight: '',
    height: '',
    result: null,
    category: ''
  });

  // Fat Burn Calculator State
  const [fatBurnData, setFatBurnData] = useState({
    age: '',
    gender: 'male',
    heartRate: '',
    result: null
  });

  // Calories Calculator State
  const [caloriesData, setCaloriesData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'sedentary',
    result: null
  });

  // BMI Calculator Function
  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // Convert cm to meters
    
    if (weight && height) {
      const bmi = weight / (height * height);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi >= 18.5 && bmi < 25) category = 'Normal weight';
      else if (bmi >= 25 && bmi < 30) category = 'Overweight';
      else category = 'Obese';

      setBmiData({
        ...bmiData,
        result: bmi.toFixed(1),
        category
      });
    }
  };

  // Fat Burn Calculator Function
  const calculateFatBurn = () => {
    const age = parseInt(fatBurnData.age);
    const maxHR = 220 - age;
    const currentHR = parseInt(fatBurnData.heartRate);
    
    if (age && currentHR) {
      const fatBurnZone = {
        lower: Math.round(maxHR * 0.6),
        upper: Math.round(maxHR * 0.7)
      };

      const inFatBurnZone = currentHR >= fatBurnZone.lower && currentHR <= fatBurnZone.upper;
      
      setFatBurnData({
        ...fatBurnData,
        result: {
          maxHR,
          fatBurnZone,
          currentHR,
          inZone: inFatBurnZone
        }
      });
    }
  };

  // Calories Calculator Function
  const calculateCalories = () => {
    const weight = parseFloat(caloriesData.weight);
    const height = parseFloat(caloriesData.height);
    const age = parseInt(caloriesData.age);
    const { gender, activityLevel } = caloriesData;

    if (weight && height && age) {
      // Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
      let bmr;
      if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }

      // Activity Multipliers
      const multipliers = {
        sedentary: 1.2,      // Little or no exercise
        light: 1.375,        // Light exercise 1-3 days/week
        moderate: 1.55,      // Moderate exercise 3-5 days/week
        active: 1.725,       // Heavy exercise 6-7 days/week
        veryActive: 1.9      // Very heavy exercise, physical job
      };

      const tdee = bmr * multipliers[activityLevel];
      
      setCaloriesData({
        ...caloriesData,
        result: {
          bmr: Math.round(bmr),
          maintenance: Math.round(tdee),
          weightLoss: Math.round(tdee - 500),
          weightGain: Math.round(tdee + 500)
        }
      });
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <h1>Fitness Calculators</h1>
        <p>Calculate your BMI, Fat Burn Zone, and Daily Calories</p>
      </div>

      <div className="calculator-grid">
        {/* BMI Calculator */}
        <div className="calculator-card">
          <h2>BMI Calculator</h2>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={bmiData.weight}
              onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
              placeholder="Enter weight"
            />
          </div>
          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              value={bmiData.height}
              onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
              placeholder="Enter height"
            />
          </div>
          <button className="calculate-btn" onClick={calculateBMI}>Calculate BMI</button>
          {bmiData.result && (
            <div className="result">
              <h3>BMI Results</h3>
              <p>BMI: <span>{bmiData.result}</span></p>
              <p>Category: <span>{bmiData.category}</span></p>
            </div>
          )}
        </div>

        {/* Fat Burn Calculator */}
        <div className="calculator-card">
          <h2>Fat Burn Calculator</h2>
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              value={fatBurnData.age}
              onChange={(e) => setFatBurnData({ ...fatBurnData, age: e.target.value })}
              placeholder="Enter age"
            />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select
              value={fatBurnData.gender}
              onChange={(e) => setFatBurnData({ ...fatBurnData, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-group">
            <label>Current Heart Rate (bpm)</label>
            <input
              type="number"
              value={fatBurnData.heartRate}
              onChange={(e) => setFatBurnData({ ...fatBurnData, heartRate: e.target.value })}
              placeholder="Enter heart rate"
            />
          </div>
          <button className="calculate-btn" onClick={calculateFatBurn}>Calculate Fat Burn Zone</button>
          {fatBurnData.result && (
            <div className="result">
              <h3>Fat Burn Results</h3>
              <p>Max Heart Rate: <span>{fatBurnData.result.maxHR} bpm</span></p>
              <p>Fat Burn Zone: <span>{fatBurnData.result.fatBurnZone.lower} - {fatBurnData.result.fatBurnZone.upper} bpm</span></p>
              <p>Current Status: <span>{fatBurnData.result.inZone ? 'In Fat Burn Zone' : 'Outside Fat Burn Zone'}</span></p>
            </div>
          )}
        </div>

        {/* Calories Calculator */}
        <div className="calculator-card">
          <h2>Calories Calculator</h2>
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={caloriesData.weight}
              onChange={(e) => setCaloriesData({ ...caloriesData, weight: e.target.value })}
              placeholder="Enter weight"
            />
          </div>
          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              value={caloriesData.height}
              onChange={(e) => setCaloriesData({ ...caloriesData, height: e.target.value })}
              placeholder="Enter height"
            />
          </div>
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              value={caloriesData.age}
              onChange={(e) => setCaloriesData({ ...caloriesData, age: e.target.value })}
              placeholder="Enter age"
            />
          </div>
          <div className="input-group">
            <label>Gender</label>
            <select
              value={caloriesData.gender}
              onChange={(e) => setCaloriesData({ ...caloriesData, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="input-group">
            <label>Activity Level</label>
            <select
              value={caloriesData.activityLevel}
              onChange={(e) => setCaloriesData({ ...caloriesData, activityLevel: e.target.value })}
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 days/week)</option>
              <option value="moderate">Moderate (exercise 3-5 days/week)</option>
              <option value="active">Active (exercise 6-7 days/week)</option>
              <option value="veryActive">Very Active (hard exercise & physical job)</option>
            </select>
          </div>
          <button className="calculate-btn" onClick={calculateCalories}>Calculate Calories</button>
          {caloriesData.result && (
            <div className="result">
              <h3>Calories Results</h3>
              <p>BMR: <span>{caloriesData.result.bmr} calories/day</span></p>
              <p>Maintenance: <span>{caloriesData.result.maintenance} calories/day</span></p>
              <p>Weight Loss: <span>{caloriesData.result.weightLoss} calories/day</span></p>
              <p>Weight Gain: <span>{caloriesData.result.weightGain} calories/day</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
