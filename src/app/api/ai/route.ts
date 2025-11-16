// app/api/ai/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body || {};

    // Mocked behavior for common actions
    if (action === "predictCycle") {
      const { lastPeriod, cycleLength } = payload || {};
      const start = new Date(lastPeriod);
      const nextStart = new Date(start.getTime() + (Number(cycleLength) || 28) * 24 * 60 * 60 * 1000);
      return NextResponse.json({ ok: true, predicted: nextStart.toDateString() });
    }

    if (action === "analyzePCOS") {
      return NextResponse.json({
        ok: true,
        advice:
          "Mock suggestion: consider low glycemic index meals, regular resistance training (2–3x/week), and consult an endocrinologist for hormonal testing.",
      });
    }

    if (action === "thyroidInsights") {
      return NextResponse.json({
        ok: true,
        insights: "Mock insight: check TSH/T4 labs with your doctor; focus on moderate cardio, sufficient iodine, and sleep hygiene.",
      });
    }

    if (action === "weightPlan") {
      const { weight, height } = payload || {};
      const bmi = Number(weight) / ((Number(height) / 100) ** 2);
      const recommendedCalories = Math.round(2500 + (25 - bmi) * 50);
      return NextResponse.json({ ok: true, bmi: bmi.toFixed(1), calories: recommendedCalories });
    }

    return NextResponse.json({ ok: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
