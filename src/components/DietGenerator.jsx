// src/components/DietGenerator.js

import React, { useState } from "react";
import { foods } from "../utils/diet.js"; // Make sure the path is correct

// Helper function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const DietGenerator = () => {
  const [targetCalories, setTargetCalories] = useState(2000);
  const [numMeals, setNumMeals] = useState(3);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGeneratePlan = () => {
    // Filter foods by category
    const proteins = foods.filter((f) => f.category === "Protein");
    const carbs = foods.filter((f) => f.category === "Carbohydrate");
    const veggies = foods.filter((f) => f.category === "Vegetable");

    const mealNames = [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Snack 1",
      "Snack 2",
      "Post-Workout",
    ];

    let newPlan = {
      meals: [],
      totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
    };

    for (let i = 0; i < numMeals; i++) {
      let meal = {
        name: mealNames[i] || `Meal ${i + 1}`,
        items: [],
        totals: { calories: 0, protein: 0, carbs: 0, fats: 0 },
      };

      // Simple algorithm: pick one from each core category
      const proteinChoice = getRandomItem(proteins);
      meal.items.push(proteinChoice);

      const carbChoice = getRandomItem(carbs);
      meal.items.push(carbChoice);

      const veggieChoice = getRandomItem(veggies);
      meal.items.push(veggieChoice);

      // Calculate totals for the meal and the full plan
      meal.items.forEach((item) => {
        meal.totals.calories += item.calories;
        meal.totals.protein += item.protein;
        meal.totals.carbs += item.carbs;
        meal.totals.fats += item.fats;
      });

      newPlan.meals.push(meal);
      newPlan.totals.calories += meal.totals.calories;
      newPlan.totals.protein += meal.totals.protein;
      newPlan.totals.carbs += meal.totals.carbs;
      newPlan.totals.fats += meal.totals.fats;
    }

    setGeneratedPlan(newPlan);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 text-slate-300 transition-all duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-6 mb-8 p-6 bg-slate-800/50 rounded-lg">
        <div className="w-full">
          <label
            htmlFor="calories"
            className="block text-sm font-medium text-slate-400 mb-2">
            Target Daily Calories
          </label>
          <input
            type="number"
            id="calories"
            step="50"
            value={targetCalories}
            onChange={(e) => setTargetCalories(parseInt(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-md p-3 w-full text-white text-center text-lg font-bold"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="meals"
            className="block text-sm font-medium text-slate-400 mb-2">
            Number of Meals
          </label>
          <select
            id="meals"
            value={numMeals}
            onChange={(e) => setNumMeals(parseInt(e.target.value))}
            className="bg-slate-900 border border-slate-700 rounded-md p-3 w-full text-white text-center text-lg font-bold">
            <option value="2">2 Meals</option>
            <option value="3">3 Meals</option>
            <option value="4">4 Meals</option>
            <option value="5">5 Meals</option>
          </select>
        </div>
        <button
          onClick={handleGeneratePlan}
          className="w-full py-3 px-6 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors text-lg">
          Generate Plan
        </button>
      </div>

      {generatedPlan && (
        <div className="animate-fade-in">
          {/* Summary Section */}
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4">Proposed Plan Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-400">
                  {Math.round(generatedPlan.totals.calories)}
                </div>
                <div className="text-slate-400 text-sm">Calories</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-red-400">
                  {Math.round(generatedPlan.totals.protein)}g
                </div>
                <div className="text-slate-400 text-sm">Protein</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-400">
                  {Math.round(generatedPlan.totals.carbs)}g
                </div>
                <div className="text-slate-400 text-sm">Carbs</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400">
                  {Math.round(generatedPlan.totals.fats)}g
                </div>
                <div className="text-slate-400 text-sm">Fats</div>
              </div>
            </div>
          </div>

          {/* Meals Section */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {generatedPlan.meals.map((meal, index) => (
              <div
                key={index}
                className="bg-slate-800 p-5 rounded-lg flex flex-col">
                <h3 className="text-xl font-bold text-blue-400 border-b border-slate-700 pb-2 mb-4">
                  {meal.name}
                </h3>
                <ul className="space-y-3 flex-grow">
                  {meal.items.map((item) => (
                    <li key={item.id} className="text-sm flex justify-between">
                      <span>
                        {item.name}{" "}
                        <span className="text-xs text-slate-500">
                          ({item.serving_size_grams}g)
                        </span>
                      </span>
                      <span className="font-mono text-slate-400">
                        {item.calories} cal
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-slate-700 mt-4 pt-2 text-right">
                  <span className="font-bold text-white">
                    Meal Total: {Math.round(meal.totals.calories)} cal
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DietGenerator;
