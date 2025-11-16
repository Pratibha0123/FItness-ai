// app/women-health/thyroid/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import Thyroid from "@/assets/women/Thyroid.png";

// type ProgressEntry = {
//   date: string;
//   weight?: number;
//   energy?: number;
//   notes?: string;
// };

type MealDay = {
  day: string;
  meals: { name: string; type: "recommended" | "avoid" }[];
};

const thyroidMealPlan: MealDay[] = [
  { day: "Day 1", meals: [{ name: "Oats with almond milk", type: "recommended" }, { name: "Grilled salmon salad", type: "recommended" }, { name: "Quinoa with veggies", type: "recommended" }] },
  { day: "Day 2", meals: [{ name: "Scrambled eggs with spinach", type: "recommended" }, { name: "Chicken stir fry", type: "recommended" }, { name: "Brown rice with broccoli", type: "recommended" }] },
  { day: "Day 3", meals: [{ name: "Yogurt with berries", type: "recommended" }, { name: "Tuna salad", type: "recommended" }, { name: "Sweet potato & spinach", type: "recommended" }] },
  { day: "Day 4", meals: [{ name: "Smoothie with banana & almond milk", type: "recommended" }, { name: "Grilled chicken with zucchini", type: "recommended" }, { name: "Lentil soup", type: "recommended" }] },
  { day: "Day 5", meals: [{ name: "Boiled eggs & avocado toast", type: "recommended" }, { name: "Quinoa & chickpeas", type: "recommended" }, { name: "Salmon & asparagus", type: "recommended" }] },
  { day: "Day 6", meals: [{ name: "Cottage cheese & berries", type: "recommended" }, { name: "Turkey salad", type: "recommended" }, { name: "Brown rice & veggies", type: "recommended" }] },
  { day: "Day 7", meals: [{ name: "Oat pancakes", type: "recommended" }, { name: "Grilled fish & spinach", type: "recommended" }, { name: "Lentil & vegetable stew", type: "recommended" }] },
];

export default function ThyroidPage() {
  const [notes, setNotes] = useState<string>("");
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => {
    // const saved = localStorage.getItem("thyroidProgress");
    // if (saved) setProgress(JSON.parse(saved));
  }, []);

  // const saveProgress = (entry: ProgressEntry) => {
  //   const updated = [...progress, entry];
  //   setProgress(updated);
  //   localStorage.setItem("thyroidProgress", JSON.stringify(updated));
  // };

  // const resetProgress = () => {
  //   setProgress([]);
  //   localStorage.removeItem("thyroidProgress");
  // };

  const getInsights = async () => {
    if (!notes.trim()) {
      setInsight("Please add notes or lab results.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "thyroidInsights", payload: { notes } }),
      });
      const data = await res.json();
      setInsight(data.ok ? data.insights : "Error retrieving insights.");
    } catch {
      setInsight("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
          <div className="relative h-56 sm:h-72 w-full">
            <Image src={Thyroid} alt="Thyroid Hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute left-6 bottom-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                Thyroid Support
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-1">
                Guidance for thyroid balance, energy & metabolism.
              </p>
            </div>
          </div>
        </div>

        {/* Notes & Insights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 border border-primary/10 shadow-lg mb-6"
        >
          <label className="text-sm font-medium">Notes or lab results</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="TSH: 4.5 mIU/L, fatigue, weight gain..."
            className="mt-2 w-full p-3 rounded-lg border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={getInsights}
              className="flex-1 bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition"
            >
              {loading ? "Checking..." : "Get Insights"}
            </button>
            <button
              onClick={() => { setNotes(""); setInsight(null); }}
              className="flex-1 border p-3 rounded-lg hover:border-primary transition"
            >
              Clear
            </button>
          </div>

          {insight && (
            <div className="mt-4 p-3 rounded-md bg-[#061017]/60 text-primary whitespace-pre-line">
              {insight}
            </div>
          )}
        </motion.div>

        {/* 7-Day Thyroid Meal Plan - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 border border-primary/10 shadow-lg mb-6"
        >
          <h2 className="text-lg font-semibold mb-4">7-Day Thyroid-Friendly Meal Plan</h2>
          <div className="space-y-3">
            {thyroidMealPlan.map((day, idx) => (
              <motion.div
                key={day.day}
                className="bg-[#061017]/30 rounded-lg overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <button
                  className="w-full text-left p-3 font-medium text-white hover:bg-[#07101a]/50 flex justify-between items-center"
                  onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                >
                  {day.day}
                  <span className={`transform transition-transform duration-300 ${expandedDay === idx ? "rotate-45" : "rotate-0"}`}>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </span>
                </button>
                {expandedDay === idx && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="p-3 pl-6 list-disc list-inside text-sm text-foreground/90 space-y-1"
                  >
                    {day.meals.map((meal, mIdx) => (
                      <li key={mIdx} className="flex items-center gap-2">
                        {meal.type === "recommended" ? (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                        )}
                        {meal.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
