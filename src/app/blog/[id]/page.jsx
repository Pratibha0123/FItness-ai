"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import CornerElements from "@/components/CornerElements";

const BlogDetailPage = () => {
  const { id } = useParams();

  // 🗞️ Blog data with longer content
  const posts = [
    {
      id: "1",
      title: "5 Tips for a Better Workout",
      date: "Oct 1, 2025",
      content: `
A great workout isn’t just about sweating harder — it’s about training smarter. Whether you’re a beginner or seasoned athlete, small improvements in consistency, form, and focus can transform your results.

1️⃣ **Warm up properly:** Dynamic stretching and light cardio prepare your muscles, boost flexibility, and prevent injury.  
2️⃣ **Focus on form over reps:** A controlled movement engages more muscle fibers and reduces strain.  
3️⃣ **Track your progress:** Use an app or journal to log reps, sets, and rest. Seeing progress keeps you motivated.  
4️⃣ **Don’t skip recovery:** Rest days rebuild muscle tissue and improve strength.  
5️⃣ **Fuel your body:** Eat nutrient-rich meals and stay hydrated for optimal performance.

💪 With consistent practice and mindful training, every workout brings you one step closer to your best self.`,
    },
    {
      id: "2",
      title: "Healthy Diet Habits",
      date: "Sep 28, 2025",
      content: `
Your diet plays a major role in your physical and mental performance. Building sustainable eating habits isn’t about restrictions — it’s about balance and awareness.

🍎 **Start with whole foods:** Focus on fresh vegetables, lean proteins, healthy fats, and complex carbs.  
🥑 **Avoid crash diets:** They may give quick results but often harm your metabolism long-term.  
🥗 **Plan your meals:** Meal prep helps you make healthier choices during busy days.  
🥤 **Hydrate well:** Water supports digestion, detoxification, and metabolism.  
🍫 **Treat yourself occasionally:** A flexible approach keeps your mind and body balanced.

Small, consistent improvements lead to lasting results. Remember, health is a lifestyle, not a 30-day challenge.`,
    },
    {
      id: "3",
      title: "Using AI for Fitness Tracking",
      date: "Sep 20, 2025",
      content: `
Artificial Intelligence is revolutionizing how we track, analyze, and improve our fitness routines. From smart wearables to predictive analytics, AI offers powerful insights that were once possible only with a personal trainer.

🤖 **AI-powered wearables:** Devices like smartwatches can monitor heart rate, sleep, calorie burn, and form accuracy.  
📊 **Predictive analytics:** AI learns from your data to recommend rest periods, nutrition plans, and intensity levels.  
📱 **Virtual coaching:** Apps use AI to provide real-time feedback and personalized training sessions.  

AI isn’t replacing human trainers — it’s empowering individuals to make smarter fitness decisions through data. It’s like having a personal fitness scientist in your pocket.`,
    },
    {
      id: "4",
      title: "The Power of Morning Yoga",
      date: "Sep 10, 2025",
      content: `
Starting your day with yoga isn’t just about flexibility — it’s about awakening your body, clearing your mind, and grounding your energy.

🌅 **Boosts focus:** A short yoga routine enhances mental clarity for the entire day.  
🧘‍♀️ **Improves posture:** Yoga strengthens your spine and core, reducing daily tension.  
💨 **Balances energy:** Breathwork (pranayama) connects your body and mind, calming stress hormones.  

Consistency is key — even 10 minutes of mindful movement can completely change how you start your day.`,
    },
    {
      id: "5",
      title: "10-Minute Home Workouts That Work",
      date: "Aug 30, 2025",
      content: `
No gym? No problem. You can achieve impressive fitness results from your living room.

Try this 10-minute full-body routine:  
- 1 min jumping jacks  
- 1 min squats  
- 1 min push-ups  
- 1 min planks  
- 1 min mountain climbers  
Repeat twice with short rests.

Short, intense workouts help boost metabolism and keep your energy high throughout the day. The best workout is the one you’ll actually do.`,
    },
    {
      id: "6",
      title: "Meal Planning for Busy Professionals",
      date: "Aug 15, 2025",
      content: `
Between meetings, commutes, and deadlines, it’s easy to grab unhealthy food. But with a little planning, you can fuel your body efficiently.

🥦 Cook once, eat twice.  
🍚 Use balanced containers for portion control.  
🥗 Keep protein-rich snacks on hand.  

Healthy eating doesn’t have to be time-consuming — just strategic.`,
    },
    {
      id: "7",
      title: "Hydration and Its Hidden Benefits",
      date: "Aug 5, 2025",
      content: `
Water is life — literally. Staying hydrated helps regulate body temperature, support digestion, and improve skin health.

💧 **Boosts metabolism:** Proper hydration can increase calorie burn by up to 30%.  
🧠 **Enhances focus:** Even slight dehydration reduces concentration.  
💪 **Improves endurance:** Muscles perform best when well-hydrated.  

Aim for 2–3 liters daily, adjusting for activity and climate.`,
    },
    {
      id: "8",
      title: "Understanding Your Body Type",
      date: "Jul 25, 2025",
      content: `
Everyone’s body responds differently to exercise and nutrition. Knowing your type helps you train smarter.

🔹 **Ectomorph:** Lean, struggles to gain weight. Focus on strength training and calorie surplus.  
🔸 **Mesomorph:** Naturally muscular. Maintain a balanced mix of cardio and lifting.  
🔹 **Endomorph:** Gains weight easily. Prioritize cardio and clean eating.  

Once you know your body type, you can align workouts and nutrition for long-term success.`,
    },
    {
      id: "9",
      title: "Stress Management Through Fitness",
      date: "Jul 10, 2025",
      content: `
Exercise is medicine for the mind. Regular movement releases endorphins — nature’s stress relievers.

🏃‍♀️ **Cardio** reduces anxiety and helps release built-up tension.  
🧘‍♂️ **Yoga and meditation** promote relaxation and emotional balance.  
🥊 **Strength training** gives a sense of control and empowerment.  

Fitness doesn’t just build your body — it builds resilience.`,
    },
    {
      id: "10",
      title: "How Sleep Affects Muscle Growth",
      date: "Jun 30, 2025",
      content: `
Sleep is the secret weapon of every athlete. It’s when your body repairs, rebuilds, and grows stronger.

😴 **Deep sleep boosts recovery:** Growth hormone peaks during rest.  
🧬 **Improves metabolism:** Lack of sleep increases fat storage hormones.  
💪 **Enhances focus and energy:** You’ll perform better during workouts.  

Aim for 7–9 hours per night — your muscles will thank you.`,
    },
  ];

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <section className="pt-24 pb-32 container mx-auto px-4 text-center">
        <div className="border border-border rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link href="/blog" className="text-primary underline hover:text-primary/80">
            Go Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 pt-24 pb-32 container mx-auto px-4">
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-8 shadow-lg">
        <CornerElements />

        <h1 className="text-3xl font-bold font-mono mb-4 text-primary">{post.title}</h1>
        <p className="text-sm text-muted-foreground mb-8">{post.date}</p>
        <div className="prose prose-lg text-foreground leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-primary underline hover:text-primary/80">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
