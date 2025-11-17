"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Weight_gain from "@/assets/women/Weight_Gain.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// TYPES
interface ProgressPoint {
  date: string;
  weight: number;
}

interface Meal {
  title: string;
  example: string;
  note: string;
}

interface DayPlan {
  day: string;
  calories: number;
  meals: Meal[];
}

// ---- Utility Functions ----
const calculateBMI = (weightKg: number, heightCm: number): number | null => {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  return +(weightKg / (h * h)).toFixed(1);
};

const estimateCalories = (
  weightKg: number,
  heightCm: number,
  activityFactor = 1.4
) => {
  const age = 30; // female default
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const maintenance = Math.round(bmr * activityFactor);
  return {
    maintenance,
    gainLow: maintenance + 300,
    gainHigh: maintenance + 500,
  };
};

const generateWeeklyMealPlan = (caloriesTarget: number): DayPlan[] => {
  const baseMeals: Meal[] = [
    {
      title: "Breakfast",
      example: "Oats with milk, banana & peanut butter",
      note: "",
    },
    {
      title: "Mid-Morning Snack",
      example: "Greek yogurt + granola",
      note: "",
    },
    {
      title: "Lunch",
      example: "Rice + chicken/paneer + avocado salad",
      note: "",
    },
    {
      title: "Snack",
      example: "Mixed nuts + fruit",
      note: "",
    },
    {
      title: "Dinner",
      example: "Sweet potato + fish/paneer + veggies",
      note: "",
    },
    {
      title: "Evening Snack",
      example: "Milk + oats + smoothie",
      note: "",
    },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days.map((d, i) => ({
    day: d,
    calories: caloriesTarget + (i % 2 ? 50 : 0),
    meals: baseMeals.map((m, idx) => ({
      ...m,
      note: idx % 2 ? "Add extra cheese or olive oil" : "Use full-fat ingredients",
    })),
  }));
};

// ----------------------------------------------------
// PAGE COMPONENT
// ----------------------------------------------------
export default function WeightGainPage() {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.4);

  const [mealPlan, setMealPlan] = useState<DayPlan[] | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // track progress
  const [progress, setProgress] = useState<ProgressPoint[]>(() => {
    try {
      const raw =
        typeof window !== "undefined" &&
        localStorage.getItem("wg_progress");
      return raw
        ? JSON.parse(raw)
        : [{ date: new Date().toISOString().slice(0, 10), weight: 0 }];
    } catch {
      return [{ date: new Date().toISOString().slice(0, 10), weight: 0 }];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wg_progress", JSON.stringify(progress));
    }
  }, [progress]);

  // ---- MAIN ESTIMATE FUNCTION ----
  const estimate = async () => {
    if (!weight || !height) {
      setResultText("Please enter weight and height.");
      return;
    }

    setLoading(true);

    const bmiValue = calculateBMI(Number(weight), Number(height));
    const est = estimateCalories(Number(weight), Number(height), activity);

    const meal = generateWeeklyMealPlan(est.gainLow);
    setMealPlan(meal);

    // AI API call
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "weightPlan",
          payload: { weight, height, activity },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.calories) {
          est.gainLow = data.calories;
          est.gainHigh = data.calories + 200;
        }
      }
    } catch {
      // ignore
    }

    setResultText(
      `BMI: ${bmiValue}. Recommended intake: ${est.gainLow}–${est.gainHigh} kcal/day`
    );
    setLoading(false);
  };

  // ---- Add Progress ----
  const addProgressPoint = (value: number) => {
    const newPoint: ProgressPoint = {
      date: new Date().toISOString().slice(0, 10),
      weight: value,
    };
    setProgress([...progress.filter((p) => p.weight > 0), newPoint]);
  };

  // ----------------------------------------------------
  // UI
  // ----------------------------------------------------
  return (
    <main className="min-h-screen bg-black text-white py-10 px-6 relative overflow-hidden">

      {/* Soft glowing lights */}
      <div className="absolute -top-40 left-0 h-96 w-96 bg-pink-600/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] bg-purple-600/20 blur-3xl rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
          <div className="relative aspect-[16/6] w-full">
            <Image
              src={Weight_gain}
              alt="Weight Gain"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute left-6 bottom-6">
              <h1 className="text-4xl font-extrabold text-pink-300">
                Healthy Weight Gain
              </h1>
              <p className="text-white/80 text-sm">
                AI-powered healthy mass gain guidance.
              </p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT — Estimator */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-pink-300">
              Weight Gain Estimator
            </h2>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-sm">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(ev) =>
                    setWeight(ev.target.value ? Number(ev.target.value) : "")
                  }
                  className="mt-2 w-full p-3 rounded-lg bg-black border border-pink-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(ev) =>
                    setHeight(ev.target.value ? Number(ev.target.value) : "")
                  }
                  className="mt-2 w-full p-3 rounded-lg bg-black border border-pink-700 text-white"
                />
              </div>

              <div>
                <label className="text-sm">Activity</label>
                <select
                  value={activity}
                  onChange={(ev) => setActivity(Number(ev.target.value))}
                  className="mt-2 w-full p-3 rounded-lg bg-black border border-pink-700 text-white"
                >
                  <option value={1.2}>Sedentary</option>
                  <option value={1.375}>Light</option>
                  <option value={1.55}>Moderate</option>
                  <option value={1.725}>Active</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={estimate}
                className="flex-1 bg-pink-600 text-white p-3 rounded-lg font-semibold shadow"
              >
                {loading ? "Calculating..." : "Estimate"}
              </button>

              <button
                onClick={() => {
                  setWeight("");
                  setHeight("");
                  setMealPlan(null);
                  setResultText(null);
                }}
                className="flex-1 border border-gray-600 p-3 rounded-lg bg-black text-white"
              >
                Reset
              </button>
            </div>

            {resultText && (
              <div className="mt-4 p-3 rounded-lg bg-pink-900/40 border border-pink-700 text-pink-200">
                {resultText}
              </div>
            )}

            {/* Meal Plan */}
            {mealPlan &&
              mealPlan.map((d) => (
                <div
                  key={d.day}
                  className="p-3 mt-4 rounded-lg bg-black border border-pink-700 shadow text-white"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-pink-300">{d.day}</span>
                    <span className="text-sm">{d.calories} kcal</span>
                  </div>

                  <ul className="mt-2 text-sm space-y-1">
                    {d.meals.map((m, idx) => (
                      <li key={idx}>
                        <strong>{m.title}:</strong> {m.example}{" "}
                        <span className="text-gray-400">— {m.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </motion.div>

          {/* RIGHT — Progress Tracker */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/10 border border-pink-700 rounded-2xl p-4 shadow">
              <h4 className="font-semibold mb-2 text-pink-300">
                Weight Progress
              </h4>

              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progress.filter((p) => p.weight > 0)}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#fff" }} />
                    <YAxis tick={{ fill: "#fff" }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#ec4899"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Today's weight"
                  className="p-2 rounded bg-black border border-pink-700 text-white"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      const value = Number(
                        (event.target as HTMLInputElement).value
                      );
                      addProgressPoint(value);
                      (event.target as HTMLInputElement).value = "";
                    }
                  }}
                />

                <button
                  className="p-2 rounded bg-pink-600 text-white"
                  onClick={() => {
                    const promptValue = prompt("Enter weight (kg)");
                    if (promptValue) addProgressPoint(Number(promptValue));
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
