"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Dumbbell, Heart } from "lucide-react";
import CornerElements from "@/components/CornerElements";

const About = () => {
  return (
    <section className="relative z-10 pt-24 pb-32 flex-grow container mx-auto px-4">
      {/* Hero Section */}
      <div className="relative text-center mb-16">
        <CornerElements />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
          About <span className="text-primary">FitMind Coaching</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Welcome to <span className="text-primary font-semibold">FitMind</span> — 
          a modern platform that blends fitness training with personality development.  
          Our goal is to help you achieve physical strength and mental balance 
          through guided coaching, motivation, and transformation.
        </p>

        <Button
          asChild
          size="lg"
          className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Link href="/coaching">Start Your Journey</Link>
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Dumbbell className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Personalized Fitness
          </h3>
          <p className="text-muted-foreground text-sm">
            Custom workout and diet plans designed to suit your body type and lifestyle.
          </p>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Mindset Coaching
          </h3>
          <p className="text-muted-foreground text-sm">
            Build confidence, discipline, and motivation with guided mindset sessions.
          </p>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center">
          <div className="mb-4 flex justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Personality Development
          </h3>
          <p className="text-muted-foreground text-sm">
            Improve communication, confidence, and self-image through holistic training.
          </p>
        </Card>
      </div>

      {/* Coaching Philosophy Section */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl font-bold mb-4 font-mono">
          Our <span className="text-primary">Philosophy</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We believe that fitness isn’t just about how you look — it’s about how you feel, 
          think, and carry yourself every day. Our program helps you build strength, 
          develop your mindset, and unlock the best version of you — inside and out.
        </p>
      </div>

      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 font-mono">
          Meet Your <span className="text-primary">Coaches</span>
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Our certified fitness and personality coaches are here to guide, inspire, 
          and support you throughout your transformation journey.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Ava Sharma", role: "Fitness & Strength Coach", letter: "A" },
            { name: "Ryan Patel", role: "Mindset Mentor", letter: "R" },
            { name: "Nisha Rao", role: "Personality Coach", letter: "N" },
          ].map((coach) => (
            <Card
              key={coach.name}
              className="bg-card/90 backdrop-blur-sm border border-border p-6 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {coach.letter}
                </span>
              </div>
              <h3 className="font-bold text-foreground mb-1">{coach.name}</h3>
              <p className="text-muted-foreground text-sm">{coach.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
