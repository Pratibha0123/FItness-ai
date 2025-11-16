// app/women-health/cycle-tracker/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CycleTracker from "@/assets/women/cycle tracker.png";
import { Tooltip } from "@/components/ui/tooltip"; // optional tooltip component, can use your own or a simple div

interface Cycle {
  periodStart: Date;
  periodEnd: Date;
  fertileStart: Date;
  fertileEnd: Date;
  ovulation: Date;
}

export default function CycleTrackerPage() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState<number | "">(28);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const predict = async () => {
    if (!lastPeriod) return setResult("Please pick your last period date.");
    setLoading(true);

    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "predictCycle", payload: { lastPeriod, cycleLength } }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.ok) {
      setResult(`Predicted next period start: ${data.predicted}`);
      generateCalendar(data.predicted, cycleLength);
    } else setResult("Error predicting.");
  };

  const generateCalendar = (predicted: string, length: number | "") => {
    if (!length) return;

    const startDate = new Date(predicted);
    const days: Date[] = [];
    const cycleArray: Cycle[] = [];

    // Generate 6 months of calendar
    const totalDays = 180;
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      days.push(d);
    }

    // Generate cycles
    for (let i = 0; i < 6; i++) {
      const periodStart = new Date(startDate);
      periodStart.setDate(startDate.getDate() + i * Number(length));

      const periodEnd = new Date(periodStart);
      periodEnd.setDate(periodStart.getDate() + 4); // 5-day period

      const ovulation = new Date(periodStart);
      ovulation.setDate(periodStart.getDate() + Number(length) - 14); // ovulation

      const fertileStart = new Date(ovulation);
      fertileStart.setDate(ovulation.getDate() - 5);

      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(ovulation.getDate() + 1);

      cycleArray.push({ periodStart, periodEnd, ovulation, fertileStart, fertileEnd });
    }

    setCalendarDays(days);
    setCycles(cycleArray);
  };

  const getDayLabel = (day: Date) => {
    for (let i = 0; i < cycles.length; i++) {
      const c = cycles[i];
      if (day >= c.periodStart && day <= c.periodEnd) return { label: "Period", cycle: i + 1, color: "bg-red-500 text-white" };
      if (day >= c.fertileStart && day <= c.fertileEnd) return { label: "Fertile Window", cycle: i + 1, color: "bg-green-400 text-white" };
      if (day.toDateString() === c.ovulation.toDateString()) return { label: "Ovulation", cycle: i + 1, color: "bg-yellow-400 text-white" };
    }
    return { label: "Normal day", cycle: null, color: "bg-card text-white/70" };
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="relative h-48 sm:h-56 w-full bg-[#07101a]">
            <Image src={CycleTracker} alt="Cycle Hero" fill style={{ objectFit: "cover" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute left-6 bottom-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold">Cycle Tracker</h1>
              <p className="text-sm text-muted-foreground mt-1">Predict cycles, fertile windows & log symptoms.</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 border border-primary/10 shadow">
          <label className="text-sm font-medium">Last period start</label>
          <input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)} className="mt-2 w-full p-3 rounded-lg border bg-background" />

          <label className="text-sm font-medium mt-4">Cycle length (days)</label>
          <input type="number" min={21} max={45} value={cycleLength ?? ""} onChange={(e) => setCycleLength(e.target.value ? Number(e.target.value) : "")} className="mt-2 w-full p-3 rounded-lg border bg-background" />

          <div className="mt-5 flex gap-3">
            <button onClick={predict} className="flex-1 bg-primary text-primary-foreground p-3 rounded-lg">{loading ? "Predicting..." : "Predict"}</button>
            <button onClick={() => { setLastPeriod(""); setCycleLength(28); setResult(null); setCalendarDays([]); setCycles([]); }} className="flex-1 border p-3 rounded-lg">Reset</button>
          </div>

          {result && <div className="mt-4 p-3 rounded-md bg-[#061017]/60 text-primary">{result}</div>}
        </motion.div>

        {/* Calendar */}
        {calendarDays.length > 0 && (
          <>
            <div className="mt-8 flex flex-wrap gap-2 overflow-x-auto py-2">
              {calendarDays.map((day, idx) => {
                const { label, cycle, color } = getDayLabel(day);
                return (
                  <Tooltip key={idx} content={`${label}${cycle ? ` - Cycle ${cycle}` : ""}`}>
                    <div className={`p-2 min-w-[32px] rounded-lg text-center text-sm font-medium cursor-pointer select-none ${color}`}>
                      {day.getDate()}
                    </div>
                  </Tooltip>
                );
              })}
            </div>

            {/* Cycle Summary */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cycles.map((c, i) => (
                <motion.div key={i} className="p-4 rounded-xl bg-card border border-white/10 shadow" whileHover={{ scale: 1.03 }}>
                  <h4 className="font-semibold text-white">Cycle {i + 1}</h4>
                  <p className="text-sm text-white/70 mt-1">
                    Period: {c.periodStart.toDateString()} - {c.periodEnd.toDateString()}
                  </p>
                  <p className="text-sm text-white/70">
                    Fertile: {c.fertileStart.toDateString()} - {c.fertileEnd.toDateString()}
                  </p>
                  <p className="text-sm text-white/70">Ovulation: {c.ovulation.toDateString()}</p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
