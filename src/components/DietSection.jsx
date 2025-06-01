import React, { useState } from "react";

const DietSection = () => {
  const [activeTab, setActiveTab] = useState("nutritionTips");

  const nutritionTips = [
    {
      id: 1,
      title: "Zinc",
      content:
        "Plays an important role in supporting the immune system and wound healing.",
      icon: "🥦",
    },
    {
      id: 2,
      title: "Adequate Protein",
      content:
        "Protein is essential for building muscles and repairing tissues. Athletes should consume 1.2 to 2.0 grams per kilogram of body weight per day.",
      icon: "🍗",
    },
    {
      id: 3,
      title: "Complex Carbohydrates",
      content:
        "Complex carbohydrates provide sustained energy and are found in whole grains and vegetables.",
      icon: "🌾",
    },
    {
      id: 4,
      title: "Healthy Fats",
      content:
        "Monounsaturated and polyunsaturated fats support heart and brain health. Found in avocados, nuts, and olive oil.",
      icon: "🥑",
    },
    {
      id: 5,
      title: "Essential Vitamins",
      content:
        "Vitamins A, C, D, and E boost immunity and promote skin and bone health.",
      icon: "🍇🥭",
    },
    {
      id: 6,
      title: "Calcium",
      content: "Essential for bones, teeth, muscles, and nerve function.",
      icon: "🥚🥛",
    },
    {
      id: 7,
      title: "Salts",
      content:
        "Salts maintain fluid balance and support heart and bone health. Found in fruits, vegetables, and nuts.",
      icon: "🧂",
    },
    // بيانات جديدة:
    {
      id: 8,
      title: "Hydration",
      content:
        "Drinking enough water is crucial for optimal muscle function and recovery.",
      icon: "💧",
    },
    {
      id: 9,
      title: "Fiber",
      content:
        "Dietary fiber supports digestion and helps maintain blood sugar levels.",
      icon: "🥕",
    },
  ];

  const mealPlans = [
    {
      id: 1,
      time: "Breakfast",
      meals: [
        "Include carbs, protein, and healthy fats to start your day right.",
      ],
    },
    {
      id: 2,
      time: "Snack",
      meals: [
        "A handful of nuts or a banana to maintain energy.",
        "Apple slices or yogurt with berries.",
      ],
    },
    {
      id: 3,
      time: "Lunch",
      meals: [
        "Grilled chicken breast with brown rice and steamed vegetables.",
        "Tuna salad with olive oil and mixed greens.",
      ],
    },
    {
      id: 4,
      time: "Dinner",
      meals: [
        "Grilled salmon with roasted broccoli.",
        "Quinoa with grilled tofu and salad.",
      ],
    },
    // بيانات جديدة:
    {
      id: 5,
      time: "Post-Workout",
      meals: [
        "Protein shake with banana and almond milk.",
        "Cottage cheese with pineapple chunks.",
      ],
    },
    {
      id: 6,
      time: "Late Snack",
      meals: ["Mixed nuts and seeds.", "Carrot sticks with hummus."],
    },
  ];

  const recipes = [
    {
      id: 1,
      name: "Protein Smoothie",
      ingredients: [
        "1 banana",
        "1 cup almond milk",
        "1 scoop protein powder",
        "1 tbsp peanut butter",
        "Ice cubes",
      ],
      instructions: [
        "Place all ingredients in a blender.",
        "Blend until smooth.",
        "Serve chilled.",
      ],
    },
    {
      id: 2,
      name: "Vegetable Lentil Soup",
      ingredients: [
        "1 cup lentils",
        "1 chopped onion",
        "2 carrots",
        "2 celery sticks",
        "1 potato",
        "4 cups broth",
        "1 tsp cumin",
      ],
      instructions: [
        "Sauté onions and garlic in olive oil.",
        "Add veggies, lentils, and broth.",
        "Simmer for 25-30 mins. Serve warm.",
      ],
    },
    {
      id: 3,
      name: "Quinoa Salad",
      ingredients: [
        "1 cup quinoa",
        "2 cups water",
        "Chopped vegetables",
        "Olive oil",
        "Lemon juice",
        "Salt & pepper",
      ],
      instructions: [
        "Cook quinoa and cool.",
        "Mix with vegetables.",
        "Add dressing and serve chilled.",
      ],
    },
    // بيانات جديدة:
    {
      id: 4,
      name: "Avocado Toast",
      ingredients: [
        "2 slices whole-grain bread",
        "1 ripe avocado",
        "Salt and pepper",
        "Chili flakes (optional)",
        "Lemon juice",
      ],
      instructions: [
        "Toast the bread slices.",
        "Mash avocado with salt, pepper, and lemon juice.",
        "Spread avocado mix on toast and sprinkle chili flakes if desired.",
        "Serve immediately.",
      ],
    },
    {
      id: 5,
      name: "Chia Seed Pudding",
      ingredients: [
        "3 tbsp chia seeds",
        "1 cup almond milk",
        "1 tsp honey",
        "Fresh berries for topping",
      ],
      instructions: [
        "Mix chia seeds with almond milk and honey.",
        "Refrigerate overnight.",
        "Top with fresh berries before serving.",
      ],
    },
  ];

  return (
    <div className="p-8 font-['Tajawal'] text-slate-300 bg-slate-950 rounded-md">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl text-white mb-4">
          Sport Diet Plan
        </h1>
        <p className="text-lg sm:text-xl text-slate-400">
          A full nutrition system to boost performance and build muscle
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {[
          { key: "nutritionTips", label: "Dietary Advice" },
          { key: "mealPlans", label: "Meal Suggestions" },
          { key: "recipes", label: "Healthy Recipes" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`py-2 px-6 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
              activeTab === key
                ? "bg-blue-800 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            onClick={() => setActiveTab(key)}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activeTab === "nutritionTips" &&
          nutritionTips.map((tip) => (
            <div
              key={tip.id}
              className="bg-slate-900 rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h3 className="text-slate-100 font-semibold text-lg mb-2">
                {tip.title}
              </h3>
              <p className="text-slate-400 text-sm">{tip.content}</p>
            </div>
          ))}

        {activeTab === "mealPlans" &&
          mealPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-slate-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-blue-400 text-xl mb-4 border-b border-slate-700 pb-2 text-center">
                {plan.time}
              </h2>
              <ul className="text-slate-300 text-sm space-y-2">
                {plan.meals.map((meal, index) => (
                  <li
                    key={index}
                    className="border-b border-dashed border-slate-800 pb-2 last:border-b-0">
                    {meal}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {activeTab === "recipes" &&
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-slate-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-red-400 text-xl font-bold mb-4 text-center">
                {recipe.name}
              </h2>
              <div className="flex flex-col gap-4 text-slate-300 text-sm">
                <div>
                  <h3 className="text-slate-100 font-semibold mb-2">
                    Ingredients:
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-slate-100 font-semibold mb-2">
                    Instructions:
                  </h3>
                  <ul className="list-decimal list-inside space-y-1">
                    {recipe.instructions.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="text-center mt-12 pt-6 border-t border-slate-800 text-slate-500 text-sm">
        For personalized nutrition consultations, please contact the club’s
        nutrition specialist.
      </div>
    </div>
  );
};

export default DietSection;
