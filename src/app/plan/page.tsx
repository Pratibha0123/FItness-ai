"use client";

import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import AI_Assistants from "@/assets/hero-ai.png";

const Plan = () => {
  return (
    <div className="relative bg-background/40 backdrop-blur-md border border-border/50 rounded-2xl p-10 text-center shadow-lg overflow-hidden max-w-4xl mx-auto mb-3">
      
    
      <div className="flex justify-center mb-8">
        <Image
          src={AI_Assistants}
          alt="Fitness Training"
          width={400}
          height={400}
          className="rounded-2xl shadow-lg object-cover"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4">
        <Button
          size="lg"
          asChild
          className="relative overflow-hidden bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl hover:bg-primary/100 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Link href="/daily-diet-food">
            <span className="flex items-center justify-center gap-2 relative">
              Create Your Daily Diet Plan
              <ArrowRightIcon className="h-5 w-5 text-primary-foreground" />
            </span>
          </Link>
        </Button>

        <Button
          size="lg"
          asChild
          className="relative overflow-hidden bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg font-semibold rounded-xl hover:bg-secondary/100 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Link href="/fitness-training">
            <span className="flex items-center justify-center gap-2 relative">
              Create Your Fitness Training Plan
              <ArrowRightIcon className="h-5 w-5 text-secondary-foreground" />
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Plan;
