"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import TerminalOverlay from "@/components/TerminalOverlay";
import UserPrograms from "@/components/UserPrograms";
import  hero_ai from '../../public/hero-ai3.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden text-foreground bg-background">
      <section className="relative z-10 flex-grow py-24">
        <div className="container mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 relative">

            {/* Decorative Border Box */}
            <div className="absolute -top-16 -left-8 w-32 h-32 border-l-2 border-t-2 border-primary/40 rounded-tl-lg"></div>

            {/* Left Section */}
            <motion.div
              className="lg:col-span-7 space-y-8 relative"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
              >
                <span className="block text-foreground">Transform</span>
                <span className="block text-primary">Your Body</span>
                <span className="block text-foreground">With Advanced</span>
                <span className="block">
                  <span className="text-primary">AI</span>
                  <span className="text-foreground"> Technology</span>
                </span>
              </motion.h1>

              <motion.div
                variants={fadeInUp}
                className="h-px w-full bg-gradient-to-r from-primary via-secondary to-primary opacity-60"
              />

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              >
                Talk to our AI fitness assistant and get personalized diet plans
                and workout routines designed just for you.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-10 py-6 font-mono"
              >
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">500+</div>
                  <div className="text-xs uppercase tracking-wider">Active Users</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">3min</div>
                  <div className="text-xs uppercase tracking-wider">Generation</div>
                </div>
                <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent"></div>
                <div className="flex flex-col">
                  <div className="text-2xl text-primary">100%</div>
                  <div className="text-xs uppercase tracking-wider">Personalized</div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <Button
                  size="lg"
                  asChild
                  className="overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium hover:scale-105 transition-transform duration-300"
                >
                  <Link href="/generate-program" className="flex items-center font-mono">
                    Build Your Program
                    <ArrowRightIcon className="ml-2 size-5" />
                  </Link>
                </Button>

                {/* <Link
                  href="#learn-more"
                  className="px-8 py-6 text-lg border border-primary/40 text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Link> */}
              </motion.div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Corner pieces */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-border" />
                <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-border" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-border" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-border" />
              </div>

              {/* Hero Image */}
              <div className="relative aspect-square max-w-lg mx-auto">
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative overflow-hidden rounded-lg bg-cyber-black shadow-xl"
                >
                   <Image
                    src={hero_ai}
                    alt="AI Fitness Coach"
                    className="size-full object-cover object-center"
                  />

                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),var(--cyber-glow-primary)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />

                  {/* Targeting lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-primary/40 rounded-full" />
                    <div className="absolute top-1/2 left-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-1/2 right-0 w-1/4 h-px bg-primary/50" />
                    <div className="absolute top-0 left-1/2 h-1/4 w-px bg-primary/50" />
                    <div className="absolute bottom-0 left-1/2 h-1/4 w-px bg-primary/50" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </motion.div>

                {/* <TerminalOverlay /> */}
              </div>
              <TerminalOverlay />
            </motion.div>
          </div>
        </div>
      </section>

      <UserPrograms />
    </div>
  );
};

export default HomePage;
