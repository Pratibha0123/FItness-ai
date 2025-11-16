"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip"; // Tooltip component

import CycleTracker from "@/assets/women/cycle tracker.png";
import PCOS from "@/assets/women/women_banner.png";
import thyroid from "@/assets/women/Thyroid.png";
import weight_gain from "@/assets/women/Weight_Gain.png";

const cards = [
  {
    title: "Cycle Tracker",
    href: "/women-health/cycle-tracker",
    img: CycleTracker,
    desc: "Track cycles, fertile windows & symptoms.",
  },
  {
    title: "PCOS Assistant",
    href: "/women-health/pcos",
    img: PCOS,
    desc: "Lifestyle & diet suggestions for PCOS.",
  },
  {
    title: "Thyroid Support",
    href: "/women-health/thyroid",
    img: thyroid,
    desc: "Balance energy with lifestyle guidance.",
  },
  {
    title: "Weight Gain Guide",
    href: "/women-health/weight-gain",
    img: weight_gain,
    desc: "Safe nutrition & training for healthy gain.",
  },
];

export default function WomenHealthIndex() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute -top-20 -left-32 h-80 w-80 bg-background blur-3xl rounded-full" />
      <div className="absolute bottom-0 -right-32 h-96 w-96 bg-background blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            SmartFit OS — Women’s Health
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            AI-powered tools designed exclusively for women’s hormonal health.
          </p>
        </motion.header>

        {/* Card Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-white/10 backdrop-blur-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Floating Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-xl" />

              {/* Image */}
              <div className="relative aspect-[16/9] w-full">
                <Image src={c.img} alt={c.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Tooltip + Content */}
              <Tooltip content={c.desc}>
                <div className="p-6 relative z-10 cursor-pointer">
                  <h3 className="text-xl font-semibold text-white drop-shadow-sm">
                    {c.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-2">{c.desc}</p>

                  <motion.div whileHover={{ x: 4 }} className="mt-4 flex justify-end">
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-2 text-pink-300 font-medium hover:text-pink-200"
                    >
                      Open <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </Tooltip>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
