"use client";

import Link from "next/link";
import CornerElements from "@/components/CornerElements";

const BlogPage = () => {
  // Placeholder data
  const posts = [
    { id: "1", title: "5 Tips for a Better Workout", date: "Oct 1, 2025" },
    { id: "2", title: "Healthy Diet Habits", date: "Sep 28, 2025" },
    { id: "3", title: "Using AI for Fitness Tracking", date: "Sep 20, 2025" },
  ];

  return (
    <section className="relative z-10 pt-24 pb-32 container mx-auto px-4">
      <div className="relative backdrop-blur-sm border border-border rounded-lg p-8">
        <CornerElements />
        <h1 className="text-3xl font-bold font-mono mb-6 text-center">
          <span className="text-primary">Blog</span>
        </h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block p-4 border border-border rounded hover:bg-primary/10 transition">
              <h2 className="text-xl font-bold text-foreground">{post.title}</h2>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
