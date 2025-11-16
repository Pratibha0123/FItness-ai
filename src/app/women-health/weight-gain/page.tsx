// Weight Gain Page — Full Feature Upgrade
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Weight_gain from "@/assets/women/Weight_Gain.png";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

type ProgressPoint = { date: string; weight: number };

const sampleFoods = {
  recommended: [
    { name: "Full-fat dairy (milk, yogurt, cheese)", why: "High-calorie & protein-dense" },
    { name: "Nuts & nut butters", why: "Healthy fats and calories per bite" },
    { name: "Avocado", why: "Nutrient-dense healthy fats" },
    { name: "Whole eggs", why: "Protein + healthy fats to support muscle" },
    { name: "Oats & granola", why: "Complex carbs with good calorie density" },
    { name: "Olive oil (added to dishes)", why: "Easy calorie boost" },
    { name: "Lean red meat", why: "Protein & iron to support muscle growth" },
    { name: "Starchy vegetables (potatoes, sweet potato)", why: "Carb-dense sides" },
    { name: "Smoothies with milk/banana/peanut butter", why: "Liquid calories — easy to consume" },
  ],
  avoid: [
    { name: "Very low-calorie diets", why: "Won't support weight gain" },
    { name: "High-sugar empty calories", why: "May increase fat but harm health" },
    { name: "Excessive caffeine", why: "Appetite suppression in some people" },
  ],
};

function calculateBMI(weightKg: number, heightCm: number) {
  if (!weightKg || !heightCm) return null;
  const h = heightCm / 100;
  const bmi = +(weightKg / (h * h)).toFixed(1);
  return bmi;
}

function estimateCalories(weightKg: number, heightCm: number, activityFactor = 1.4) {
  // Mifflin-St Jeor (female estimate) — approximate
  // Note: age not provided; assume 30 for estimation
  const age = 30;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161; // female
  const maintenance = Math.round(bmr * activityFactor);
  // For healthy weight gain add +300-500 kcal
  const gainLow = maintenance + 300;
  const gainHigh = maintenance + 500;
  return { maintenance, gainLow, gainHigh };
}

function generateWeeklyMealPlan(caloriesTarget: number) {
  // Simple template-based 7-day plan; in real app, this would be AI-generated
  const baseMeals = [
    {
      title: "Breakfast",
      example: "Oat porridge with milk, banana, and 2 tbsp peanut butter",
    },
    { title: "Mid-morning Snack", example: "Greek yogurt with granola and honey" },
    { title: "Lunch", example: "Rice, grilled chicken, avocado salad" },
    { title: "Afternoon Snack", example: "Handful of mixed nuts + fruit" },
    { title: "Dinner", example: "Sweet potato, fish or paneer, steamed veggies" },
    { title: "Evening Snack", example: "Smoothie with milk, oats, and nut butter" },
  ];

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  return days.map((d, idx) => ({
    day: d,
    calories: Math.round(caloriesTarget + (idx % 3) * 50),
    meals: baseMeals.map((m) => ({ ...m, note: idx % 2 ? "Add extra oil or cheese" : "Use full-fat ingredients" })),
  }));
}

export default function WeightGainPage() {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [activity, setActivity] = useState<number>(1.4); // sedentary-1.2, light-1.375, moderate-1.55
  const [bmi, setBmi] = useState<number | null>(null);
  const [calorieEst, setCalorieEst] = useState<{ maintenance: number; gainLow: number; gainHigh: number } | null>(null);
  const [mealPlan, setMealPlan] = useState<unknown[] | null>(null);
  const [resultText, setResultText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Progress tracking (localStorage)
  const [progress, setProgress] = useState<ProgressPoint[]>(() => {
    try {
      const raw = typeof window !== "undefined" && localStorage.getItem("wg_progress");
      return raw ? JSON.parse(raw) : [{ date: new Date().toISOString().slice(0,10), weight: 0 }];
    } catch (e) {
      return [{ date: new Date().toISOString().slice(0,10), weight: 0 }];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wg_progress", JSON.stringify(progress));
    }
  }, [progress]);

  const estimate = async () => {
    if (!weight || !height) return setResultText("Please provide both weight and height.");
    setLoading(true);

    // Local estimation
    const bmiVal = calculateBMI(Number(weight), Number(height));
    setBmi(bmiVal);
    const est = estimateCalories(Number(weight), Number(height), activity);
    setCalorieEst(est);

    // Generate meal plan (simple deterministic)
    const plan = generateWeeklyMealPlan(est.gainLow);
    setMealPlan(plan);

    // Optionally, call /api/ai for richer plan — keep the call but fallback gracefully
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "weightPlan", payload: { weight, height, activity } }),
      });
      if (res.ok) {
        const data = await res.json();
        // if the API returns structured plan, use it; otherwise ignore
        if (data?.plan) setMealPlan(data.plan);
        if (data?.bmi) setBmi(data.bmi);
        if (data?.calories) setCalorieEst({ maintenance: data.maintenance ?? est.maintenance, gainLow: data.calories, gainHigh: data.calories + 200 });
      }
    } catch (e) {
      // ignore API errors — local plan already set
    }

    setResultText(`BMI: ${bmiVal}. Target calories for gain: ~${est.gainLow}–${est.gainHigh} kcal/day`);
    setLoading(false);
  };

  function addProgressPoint(value: number) {
    const newPoint = { date: new Date().toISOString().slice(0,10), weight: value };
    const updated = [...progress.filter(p => p.weight > 0), newPoint];
    setProgress(updated);
  }

  return (
    <main className="min-h-screen bg-background text-foreground py-10 px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-40 left-0 h-96 w-96 bg-pink-500/12 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] bg-purple-500/12 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER IMAGE */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl border border-white/6 bg-white/3 backdrop-blur-xl">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src={Weight_gain}
              alt="Weight Gain Hero"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute left-6 bottom-6">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow">
                Healthy Weight Gain
              </h1>
              <p className="text-sm text-white/70 max-w-md">
                Personalized AI-based nutrition & training for healthy mass gain.
              </p>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Calculator & Inputs */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-4">Weight Gain Estimator</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm text-white/80">Current Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : "")}
                  className="mt-2 w-full p-3 rounded-lg border border-white/20 bg-white/6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                  className="mt-2 w-full p-3 rounded-lg border border-white/20 bg-white/6 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm text-white/80">Activity</label>
                <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="mt-2 w-full p-3 rounded-lg border border-white/20 bg-white/6 text-white">
                  <option value={1.2}>Sedentary</option>
                  <option value={1.375}>Light</option>
                  <option value={1.55}>Moderate</option>
                  <option value={1.725}>Active</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <button onClick={estimate} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-lg font-semibold shadow">{loading ? "Estimating..." : "Estimate"}</button>
              <button onClick={() => { setWeight(""); setHeight(""); setBmi(null); setCalorieEst(null); setMealPlan(null); setResultText(null); }} className="flex-1 border border-white/10 p-3 rounded-lg">Reset</button>
            </div>

            {resultText && <div className="mt-4 p-3 rounded-lg bg-black/30 text-pink-300 border border-pink-400/20 shadow">{resultText}</div>}

            {/* Meal Plan & Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Food Recommendations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/3 border border-white/6">
                  <h4 className="font-medium">Recommended</h4>
                  <ul className="mt-2 text-sm space-y-2">
                    {sampleFoods.recommended.map((f) => (
                      <li key={f.name} className="leading-snug">
                        <strong>{f.name}</strong> — <span className="text-white/70">{f.why}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/3 border border-white/6">
                  <h4 className="font-medium">Foods to limit</h4>
                  <ul className="mt-2 text-sm space-y-2">
                    {sampleFoods.avoid.map((f) => (
                      <li key={f.name} className="leading-snug">
                        <strong>{f.name}</strong> — <span className="text-white/70">{f.why}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {calorieEst && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/3 border border-white/8 text-sm">
                  <div className="text-xs text-white/70">Maintenance</div>
                  <div className="text-lg font-semibold">{calorieEst.maintenance} kcal</div>
                </div>
                <div className="p-3 rounded-lg bg-white/3 border border-white/8 text-sm">
                  <div className="text-xs text-white/70">Target (gain low)</div>
                  <div className="text-lg font-semibold">{calorieEst.gainLow} kcal</div>
                </div>
                <div className="p-3 rounded-lg bg-white/3 border border-white/8 text-sm">
                  <div className="text-xs text-white/70">Target (gain high)</div>
                  <div className="text-lg font-semibold">{calorieEst.gainHigh} kcal</div>
                </div>
              </div>
            )}

            {mealPlan && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">7-day Meal Plan (sample)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {mealPlan.map((d:any) => (
                    <div key={d.day} className="p-3 rounded-lg bg-white/4 border border-white/6">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">{d.day}</div>
                        <div className="text-sm text-white/70">{d.calories} kcal</div>
                      </div>
                      <ul className="mt-2 text-sm space-y-1">
                        {d.meals.map((m:any, idx:number) => (
                          <li key={idx}><strong>{m.title}:</strong> {m.example} <span className="text-white/60">— {m.note}</span></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>

          {/* RIGHT: Progress Chart & Quick Actions */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/8 rounded-2xl p-4 shadow">
              <h4 className="font-semibold mb-2">Progress Tracker</h4>

              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progress.filter(p => p.weight > 0)}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={[dataMin => Math.floor((dataMin||0)-2), dataMax => Math.ceil((dataMax||0)+2)]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#fb7185" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <input type="number" placeholder="Enter today's weight" className="p-2 rounded border bg-white/6" onKeyDown={(e:any) => { if (e.key === 'Enter') { addProgressPoint(Number(e.target.value)); e.target.value=''; } }} />
                <button className="p-2 rounded bg-pink-500 text-white" onClick={() => { const v = prompt('Enter weight (kg)'); if (v) addProgressPoint(Number(v)); }}>Add</button>
              </div>

            </div>

            <div className="bg-white/5 border border-white/8 rounded-2xl p-4 shadow text-sm">
              <h4 className="font-semibold mb-2">Quick Tips</h4>
              <ul className="list-disc ml-5 space-y-2 text-white/80">
                <li>Prefer full-fat, nutrient-dense options.</li>
                <li>Add small snacks between meals (smoothies, nuts).</li>
                <li>Combine strength training with calories for healthy mass.</li>
                <li>Track progress weekly, not daily.</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/8 rounded-2xl p-4 shadow text-sm">
              <h4 className="font-semibold mb-2">Save / Export</h4>
              <div className="flex gap-2">
                <button className="flex-1 p-2 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white" onClick={() => {
                  const blob = new Blob([JSON.stringify({ progress, bmi, calorieEst, mealPlan }, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'weight-gain-export.json'; a.click(); URL.revokeObjectURL(url);
                }}>Export</button>

                <button className="flex-1 p-2 rounded border" onClick={() => { localStorage.removeItem('wg_progress'); setProgress([{ date: new Date().toISOString().slice(0,10), weight: 0 }]); alert('Progress cleared'); }}>Clear</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
