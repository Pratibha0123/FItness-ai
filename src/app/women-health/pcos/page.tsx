/* eslint-disable @typescript-eslint/no-explicit-any */
// app/women-health/pcos/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import PCOS from "@/assets/women/women_banner.png";

type Recommendation = {
  category: string;
  tips: string[];
};

export default function PCOSPage() {
  const [symptoms, setSymptoms] = useState("");
  const [advice, setAdvice] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"insights" | "meal" | "workout">("insights");

  const analyze = async () => {
    if (!symptoms.trim()) return alert("Please enter symptoms.");
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "analyzePCOS", payload: { symptoms } }),
      });
      const data = await res.json();
      if (data.ok) setAdvice(data.advice);
      else setAdvice([{ category: "Error", tips: ["Unable to analyze symptoms."] }]);
    } catch {
      setAdvice([{ category: "Network Error", tips: ["Please try again later."] }]);
    } finally {
      setLoading(false);
    }
  };

  const mealPlan = [
    { meal: "Breakfast", items: ["Oatmeal with nuts", "Green smoothie", "Egg white omelette"] },
    { meal: "Lunch", items: ["Grilled chicken salad", "Quinoa with veggies", "Lentil soup"] },
    { meal: "Snack", items: ["Greek yogurt", "Fruit with nuts", "Hummus with carrot sticks"] },
    { meal: "Dinner", items: ["Baked salmon with broccoli", "Stir-fried tofu & veggies", "Brown rice & beans"] },
  ];

  const workoutPlan = [
    { day: "Monday", activities: ["30 min brisk walk", "15 min core strengthening"] },
    { day: "Wednesday", activities: ["Yoga flow 45 min", "10 min meditation"] },
    { day: "Friday", activities: ["Strength training 30 min", "Stretching 15 min"] },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
          <div className="relative h-56 sm:h-72 w-full">
            <Image src={PCOS} alt="PCOS Hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute left-6 bottom-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md">
                PCOS Assistant
              </h1>
              <p className="text-sm sm:text-base text-white/80 mt-1">
                Lifestyle, diet, and training guidance for PCOS.
              </p>
            </div>
          </div>
        </div>

        {/* Symptoms Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 border border-primary/10 shadow-lg mb-6"
        >
          <label className="text-sm font-medium">Describe symptoms</label>
          <textarea
            rows={5}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Irregular periods, acne, weight gain..."
            className="mt-2 w-full p-3 rounded-lg border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={analyze}
              className="flex-1 bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
            <button
              onClick={() => { setSymptoms(""); setAdvice(null); }}
              className="flex-1 border p-3 rounded-lg hover:border-primary transition"
            >
              Clear
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {["insights", "meal", "workout"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 p-3 rounded-lg font-medium transition ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-white/70 hover:bg-card/80"
              }`}
            >
              {tab === "insights" ? "AI Insights" : tab === "meal" ? "Meal Plan" : "Workout Plan"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {activeTab === "insights" && advice && (
            <div className="space-y-3">
              {advice.map((rec, idx) => (
                <div key={idx} className="bg-[#061017]/30 p-3 rounded-lg hover:bg-[#07101a]/50 transition-colors shadow-sm">
                  <h3 className="font-medium text-white">{rec.category}</h3>
                  <ul className="mt-2 list-disc list-inside text-sm text-foreground/90 space-y-1">
                    {rec.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "meal" && (
            <div className="space-y-4">
              {mealPlan.map((meal, idx) => (
                <div key={idx} className="bg-[#061017]/30 p-3 rounded-lg hover:bg-[#07101a]/50 transition-colors">
                  <h3 className="font-medium text-white">{meal.meal}</h3>
                  <ul className="list-disc list-inside text-sm text-foreground/90 mt-1 space-y-1">
                    {meal.items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === "workout" && (
            <div className="space-y-4">
              {workoutPlan.map((day, idx) => (
                <div key={idx} className="bg-[#061017]/30 p-3 rounded-lg hover:bg-[#07101a]/50 transition-colors">
                  <h3 className="font-medium text-white">{day.day}</h3>
                  <ul className="list-disc list-inside text-sm text-foreground/90 mt-1 space-y-1">
                    {day.activities.map((act, aIdx) => (
                      <li key={aIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
