"use client";

import Link from "next/link";
import CornerElements from "@/components/CornerElements";

const BlogPage = () => {
  // 📝 Full blog list
  const posts = [
    { id: "1", title: "5 Tips for a Better Workout", date: "Oct 1, 2025" },
    { id: "2", title: "Healthy Diet Habits", date: "Sep 28, 2025" },
    { id: "3", title: "Using AI for Fitness Tracking", date: "Sep 20, 2025" },
    { id: "4", title: "The Power of Morning Yoga", date: "Sep 10, 2025" },
    { id: "5", title: "10-Minute Home Workouts That Work", date: "Aug 30, 2025" },
    { id: "6", title: "Meal Planning for Busy Professionals", date: "Aug 15, 2025" },
    { id: "7", title: "Hydration and Its Hidden Benefits", date: "Aug 5, 2025" },
    { id: "8", title: "Understanding Your Body Type", date: "Jul 25, 2025" },
    { id: "9", title: "Stress Management Through Fitness", date: "Jul 10, 2025" },
    { id: "10", title: "How Sleep Affects Muscle Growth", date: "Jun 30, 2025" },
  ];

  return (
    <section className="relative z-10 pt-24 pb-32 container mx-auto px-4">
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-8 shadow-lg">
        <CornerElements />
        <h1 className="text-3xl font-bold font-mono mb-8 text-center">
          <span className="text-primary">Our Fitness & AI Blog 🏋️‍♀️</span>
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block p-5 border border-border rounded-lg hover:bg-primary/10 transition duration-300"
            >
              <h2 className="text-lg font-semibold text-foreground mb-2">{post.title}</h2>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
