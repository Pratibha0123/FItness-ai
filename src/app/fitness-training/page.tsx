"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AI_Assistants from "@/assets/hero-ai2.png";
import cardio from "@/assets/icon/cardio.png";
import core from "@/assets/icon/core.jpg";
import flexibility from "@/assets/icon/flexibility.jpg";
import strength from "@/assets/icon/strength.jpg";
import yoga from "@/assets/icon/yoga.jpg";
import hiit from "@/assets/icon/hiit.jpg";

const FitnessTrainingPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/90 to-background/70 text-foreground pt-24 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-mono mb-2">
            <span>Personalized </span>
            <span className="text-primary uppercase">Fitness Training</span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Transform your body with smart, adaptive, and data-driven workouts designed by AI.
          </p>
        </div>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="flex justify-center">
            <Image
              src={AI_Assistants}
              alt="Fitness Training"
              width={600}  // Increased width
              height={600} // Increased height
              className="rounded-2xl shadow-xl object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Train Smarter, Not Harder</h2>
            <p className="text-muted-foreground mb-6">
              Our AI-powered training system adjusts your exercises in real-time based on your
              progress, goals, and energy levels. Whether you’re at home or in the gym, your
              virtual fitness coach keeps you on track.
            </p>
            <Button onClick={() => router.push("/generate-program")} className="rounded-full text-lg px-8 py-4">
              Start Training Now
            </Button>
          </div>
        </div>

        {/* Training Categories */}
        <h2 className="text-2xl font-bold mb-6 text-center">Training Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { title: "Strength Training", desc: "Build lean muscle and improve endurance with personalized weight routines.", icon: strength },
            { title: "Cardio Blast", desc: "Burn calories effectively through dynamic, heart-pumping workouts.", icon: cardio },
            { title: "Flexibility & Mobility", desc: "Enhance posture and reduce injury risk with guided stretching sessions.", icon: flexibility },
            { title: "HIIT & Fat Burn", desc: "High-intensity interval sessions designed to maximize fat burn.", icon: hiit },
            { title: "Yoga & Balance", desc: "Calm your mind and strengthen your core with guided yoga sessions.", icon: yoga },
            { title: "Core & Stability", desc: "Improve balance and stability with customized core-building workouts.", icon: core },
          ].map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-card/90 backdrop-blur-md border border-border/30 rounded-2xl text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                <Image src={item.icon} alt={item.title} width={80} height={80} className="object-contain" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>

       
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-3">
            Ready to Begin Your Transformation?
          </h2>
          <p className="text-muted-foreground mb-6">
            Get your customized workout plan in minutes and start training with your AI coach today.
          </p>
          <Button
            onClick={() => router.push("/generate-program")}
            className="rounded-full text-lg px-10 py-4"
          >
            Generate My Program
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FitnessTrainingPage;
