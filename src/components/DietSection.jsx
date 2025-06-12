import React, { useState } from "react";
import DietGenerator from "./DietGenerator.jsx";

const DietSection = () => {
  const [activeTab, setActiveTab] = useState("generatePlan");

  const nutritionTips = [
    {
      id: 1,
      title: "Adequate Protein",
      content:
        "Essential for muscle repair and growth. Aim for 1.6-2.2g per kg of body weight if you're active.",
      icon: "🍗",
    },
    {
      id: 2,
      title: "Complex Carbohydrates",
      content:
        "Choose whole grains like oats, brown rice, and quinoa for sustained energy release.",
      icon: "🌾",
    },
    {
      id: 3,
      title: "Healthy Fats",
      content:
        "Incorporate sources like avocados, nuts, and olive oil for hormone regulation and overall health.",
      icon: "🥑",
    },
    {
      id: 4,
      title: "Hydration is Key",
      content:
        "Water is crucial for performance, digestion, and nutrient transport. Don't wait until you're thirsty to drink.",
      icon: "💧",
    },
    {
      id: 5,
      title: "Micronutrients Matter",
      content:
        "Eat a variety of colorful fruits and vegetables to get essential vitamins and minerals.",
      icon: "🍇🥦",
    },
    {
      id: 6,
      title: "Time Your Nutrients",
      content:
        "Consume a mix of protein and carbs 1-2 hours before and after your workouts to maximize recovery and performance.",
      icon: "⏱️",
    },
    {
      id: 7,
      title: "Don't Forget Fiber",
      content:
        "Fiber from vegetables, fruits, and legumes supports a healthy gut and aids in digestion.",
      icon: "🥕",
    },
    {
      id: 8,
      title: "Limit Processed Foods",
      content:
        "Minimize intake of sugary drinks, refined grains, and heavily processed snacks to improve body composition and health.",
      icon: "🚫🍔",
    },
    {
      id: 9,
      title: "Get Enough Iron",
      content:
        "Iron is critical for carrying oxygen to your muscles. Good sources include lean red meat, spinach, and lentils.",
      icon: "🥬",
    },
  ];

  const mealPlans = [
    {
      id: 1,
      time: "Breakfast",
      meals: [
        "Scrambled eggs with spinach and a slice of whole-wheat toast.",
        "Oatmeal with berries, walnuts, and a scoop of protein powder.",
        "Greek yogurt with granola and a drizzle of honey.",
      ],
    },
    {
      id: 2,
      time: "Lunch",
      meals: [
        "Grilled chicken salad with mixed greens, cherry tomatoes, and a light vinaigrette.",
        "Quinoa bowl with black beans, corn, avocado, and lime.",
        "Tuna salad (made with Greek yogurt) sandwich on whole-grain bread.",
      ],
    },
    {
      id: 3,
      time: "Dinner",
      meals: [
        "Baked salmon with roasted asparagus and sweet potato wedges.",
        "Lean ground turkey stir-fry with broccoli, bell peppers, and brown rice.",
        "Lentil soup with a side of whole-grain bread.",
      ],
    },
    {
      id: 4,
      time: "Snacks",
      meals: [
        "Apple slices with two tablespoons of peanut butter.",
        "A handful of almonds or walnuts.",
        "Cottage cheese with pineapple chunks.",
      ],
    },
    {
      id: 5,
      time: "Post-Workout",
      meals: [
        "Protein shake with one banana and almond milk.",
        "Chocolate milk.",
        "A small bowl of Greek yogurt with fruit.",
      ],
    },
    {
      id: 6,
      time: "Pre-Workout (Light)",
      meals: [
        "A small banana.",
        "A rice cake with a thin layer of honey.",
        "A small cup of black coffee.",
      ],
    },
  ];

  const recipes = [
    {
      id: 1,
      name: "Protein Power Smoothie",
      ingredients: [
        "1 scoop chocolate protein powder",
        "1 banana",
        "1 cup almond milk",
        "1 tbsp almond butter",
        "Handful of spinach",
      ],
      instructions: [
        "Place all ingredients in a blender.",
        "Blend until smooth.",
        "Serve immediately for a quick post-workout meal.",
      ],
    },
    {
      id: 2,
      name: "Quick Lentil Soup",
      ingredients: [
        "1 tbsp olive oil",
        "1 onion, chopped",
        "2 carrots, chopped",
        "1 cup red lentils, rinsed",
        "4 cups vegetable broth",
        "1 tsp cumin",
      ],
      instructions: [
        "Sauté onion and carrots in oil until soft.",
        "Add lentils, broth, and cumin.",
        "Bring to a boil, then simmer for 20-25 minutes until lentils are tender.",
      ],
    },
    {
      id: 3,
      name: "Sheet Pan Lemon Herb Chicken",
      ingredients: [
        "2 chicken breasts, cut into chunks",
        "1 head of broccoli, cut into florets",
        "1 red bell pepper, sliced",
        "2 tbsp olive oil",
        "1 tsp dried oregano",
        "Juice of 1 lemon",
      ],
      instructions: [
        "Preheat oven to 200°C (400°F).",
        "Toss chicken and veggies with olive oil, oregano, salt, and pepper on a baking sheet.",
        "Bake for 20-25 minutes, or until chicken is cooked through.",
        "Squeeze lemon juice over everything before serving.",
      ],
    },
    {
      id: 4,
      name: "Overnight Oats",
      ingredients: [
        "1/2 cup rolled oats",
        "1/2 cup milk (any kind)",
        "1/4 cup Greek yogurt",
        "1 tbsp chia seeds",
        "1 tbsp maple syrup",
        "Your favorite fruit for topping",
      ],
      instructions: [
        "In a jar, mix oats, milk, yogurt, chia seeds, and syrup.",
        "Stir well, cover, and refrigerate overnight.",
        "In the morning, stir again and top with fresh fruit.",
      ],
    },
    {
      id: 5,
      name: "Simple Quinoa Salad",
      ingredients: [
        "1 cup cooked quinoa, cooled",
        "1 can (15oz) chickpeas, rinsed",
        "1 cucumber, diced",
        "1/2 red onion, finely chopped",
        "Feta cheese (optional)",
        "Dressing: Olive oil, lemon juice, salt, pepper",
      ],
      instructions: [
        "In a large bowl, combine quinoa, chickpeas, cucumber, and red onion.",
        "In a small bowl, whisk together dressing ingredients.",
        "Pour dressing over the salad and toss to combine. Add feta cheese if desired.",
      ],
    },
  ];

  return (
    <div className="p-8 font-['Tajawal'] text-slate-300 bg-slate-950 rounded-md min-h-screen">
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
          { key: "generatePlan", label: "Plangenerater" },
          { key: "nutritionTips", label: "nutritionTips" },
          { key: "mealPlans", label: "mealPlans" },
          { key: "recipes", label: "recipes" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`py-2 px-6 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 ${
              activeTab === key
                ? "bg-blue-800 text-white shadow-lg shadow-blue-800/20"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
            onClick={() => setActiveTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {/* هون بتتولد البرامج*/}
      <div className="mt-8">
        {activeTab === "generatePlan" && <DietGenerator />}

        {activeTab === "nutritionTips" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {nutritionTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-slate-900 rounded-xl p-6 text-center hover:shadow-lg transition duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-slate-100 font-semibold text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-slate-400 text-sm">{tip.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "mealPlans" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {mealPlans.map((plan) => (
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
          </div>
        )}

        {activeTab === "recipes" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {recipes.map((recipe) => (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-12 pt-6 border-t border-slate-800 text-slate-500 text-sm">
        For personalized nutrition consultations, please contact the club’s
        nutrition specialist.
      </div>
    </div>
  );
};

export default DietSection;
