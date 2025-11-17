// app/api/ai/route.ts
import { NextResponse } from "next/server";

interface PredictCyclePayload {
  lastPeriod: string;
  cycleLength: number;
}

interface WeightPlanPayload {
  weight: number;
  height: number;
}

interface RequestBody {
  action?: string;
  payload?: PredictCyclePayload | WeightPlanPayload | Record<string, unknown>;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { action, payload } = body ?? {};

    // -----------------------------
    // 1️⃣ Predict Cycle
    // -----------------------------
    if (action === "predictCycle" && payload) {
      const data = payload as PredictCyclePayload;

      const start = new Date(data.lastPeriod);
      const cycle = Number(data.cycleLength) || 28;

      const nextStart = new Date(start.getTime() + cycle * 24 * 60 * 60 * 1000);

      return NextResponse.json({
        ok: true,
        predicted: nextStart.toDateString(),
      });
    }

    // -----------------------------
    // 2️⃣ PCOS Analysis
    // -----------------------------
    if (action === "analyzePCOS") {
      return NextResponse.json({
        ok: true,
        advice:
          "Mock suggestion: Focus on low GI foods, maintain resistance training 2–3 times weekly, and consult an endocrinologist for proper hormonal evaluation.",
      });
    }

    // -----------------------------
    // 3️⃣ Thyroid Insights
    // -----------------------------
    if (action === "thyroidInsights") {
      return NextResponse.json({
        ok: true,
        insights:
          "Mock insight: Consider TSH/T4 testing through your doctor, practice moderate cardio, ensure adequate iodine intake, and improve sleep routine.",
      });
    }

    // -----------------------------
    // 4️⃣ Weight Gain Plan
    // -----------------------------
    if (action === "weightPlan" && payload) {
      const data = payload as WeightPlanPayload;

      const weight = Number(data.weight);
      const height = Number(data.height);

      const bmi = weight / (height / 100) ** 2;

      const recommendedCalories = Math.round(2500 + (25 - bmi) * 50);

      return NextResponse.json({
        ok: true,
        bmi: bmi.toFixed(1),
        calories: recommendedCalories,
      });
    }

    // -----------------------------
    // ❌ Unknown Action
    // -----------------------------
    return NextResponse.json(
      { ok: false, error: "Unknown action" },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
