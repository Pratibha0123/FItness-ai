"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dumbbell, Brain, Smile, Target } from "lucide-react";
import CornerElements from "@/components/CornerElements";

const Coaching = () => {
  return (
    <section className="relative z-10 pt-24 pb-32 flex-grow container mx-auto px-4">
      {/* Hero Section */}
      <div className="relative text-center mb-16">
        <CornerElements />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
          Coaching for <span className="text-primary">Fitness & Personality</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Unlock your best version with personalized fitness, mindset, and personality 
          coaching programs. Designed to help you grow stronger — physically, mentally, 
          and emotionally.
        </p>
      </div>

      {/* Programs Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center hover:shadow-lg transition-all">
          <div className="mb-4 flex justify-center">
            <Dumbbell className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2"><Link href='/fitness-training'>Fitness Training</Link></h3>
          <p className="text-muted-foreground text-sm">
            Custom workout routines built for your body type, lifestyle, and fitness goals. 
            Includes cardio, strength, flexibility, and endurance training.
          </p>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center hover:shadow-lg transition-all">
          <div className="mb-4 flex justify-center">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Mindset Development</h3>
          <p className="text-muted-foreground text-sm">
            Transform your mindset with focus, motivation, and emotional balance. 
            Learn to build discipline and stay consistent toward your goals.
          </p>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center hover:shadow-lg transition-all">
          <div className="mb-4 flex justify-center">
            <Smile className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Personality Coaching</h3>
          <p className="text-muted-foreground text-sm">
            Boost your communication, confidence, and presentation skills. 
            Build a personality that radiates positivity and leadership.
          </p>
        </Card>
      </div>

      {/* How It Works */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-4 font-mono">
          How <span className="text-primary">Coaching Works</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-10">
          Our coaching approach combines AI-guided insights with expert mentorship. 
          Every plan is tailored for your goals, whether it’s fitness transformation, 
          confidence building, or overall lifestyle improvement.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
              <span className="text-primary font-bold">1</span>
            </div>
            <h4 className="font-bold text-foreground mb-2">Assessment</h4>
            <p className="text-muted-foreground text-sm">
              We start by analyzing your current habits, fitness level, and personality type.
            </p>
          </Card>

          <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
              <span className="text-primary font-bold">2</span>
            </div>
            <h4 className="font-bold text-foreground mb-2">Personal Plan</h4>
            <p className="text-muted-foreground text-sm">
              A custom plan is created — covering workouts, nutrition, and personality tasks.
            </p>
          </Card>

          <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
              <span className="text-primary font-bold">3</span>
            </div>
            <h4 className="font-bold text-foreground mb-2">Progress & Growth</h4>
            <p className="text-muted-foreground text-sm">
              Track your growth with weekly updates and one-on-one mentorship sessions.
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <Target className="w-10 h-10 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4 font-mono">
          Ready to <span className="text-primary">Transform Yourself?</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Begin your personalized coaching journey today. Strengthen your body, 
          sharpen your mind, and elevate your confidence — all in one place.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/signup">Join Coaching Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default Coaching;
