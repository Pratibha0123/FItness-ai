"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const dailyFoodPlan = [
  {
    meal: "Breakfast",
    time: "7:00–9:00 AM",
    foods: ["½ cup rolled oats cooked with milk or water", "1 boiled egg or Greek yogurt (150g)", "½ banana or 1 small apple/berries", "1 tsp chia seeds or flax seeds (optional)"],
  },
  {
    meal: "Mid-Morning Snack",
    time: "10:30–11:30 AM",
    foods: ["10–12 almonds or walnuts", "1 orange or 1 cup watermelon/papaya", "Green tea or black coffee (optional)"],
  },
  {
    meal: "Lunch",
    time: "12:30–2:00 PM",
    foods: ["100–150g grilled chicken/fish/paneer/tofu", "1–2 chapatis or ½ cup rice/quinoa", "1–2 cups cooked/raw vegetables", "1 tsp olive oil/ghee", "Salad with cucumber, tomato, carrot (optional)"],
  },
  {
    meal: "Afternoon Snack",
    time: "3:30–4:30 PM",
    foods: ["1 boiled egg or small bowl of sprouts", "1 small fruit (apple/pear/dates)", "Green tea (optional)"],
  },
  {
    meal: "Dinner",
    time: "7:30–9:00 PM",
    foods: ["100–150g grilled fish/chicken/paneer", "2 cups vegetables cooked/raw", "½–1 chapati or ½ cup rice (light dinner)", "Small bowl of soup (optional)"],
  },
  {
    meal: "Before Bed (Optional)",
    time: "9:30–10:00 PM",
    foods: ["Warm milk or yogurt", "1 tsp flax seeds or a few almonds"],
  },
];

export default function DailyFoodPlan() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Daily Food Plan</h1>
      <Accordion type="single" collapsible className="space-y-4">
        {dailyFoodPlan.map((item, index) => (
          <AccordionItem key={index} value={item.meal} className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-3 bg-primary/10 font-semibold hover:bg-primary/20">
              <div className="flex justify-between w-full items-center">
                <span>{item.meal}</span>
                <span className="text-sm text-muted-foreground">{item.time}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-background/50">
              <ul className="list-disc list-inside space-y-1">
                {item.foods.map((food, i) => (
                  <li key={i} className="text-foreground">{food}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
