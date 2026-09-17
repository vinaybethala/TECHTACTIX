"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-09-21T10:00:00+05:30").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-800 via-navy-900 to-black"></div>
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      
      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-medium tracking-[0.2em] text-xs md:text-sm mb-4 uppercase">
            CSI Student Chapter • St. Peter&apos;s Engineering College
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            TECH<br className="md:hidden" />TACTIX
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-2xl mx-auto">
            &quot;Think Smart. Pitch Strong. Defend Better.&quot;
          </p>
        </motion.div>

        {/* Info Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mb-12 animate-float"
        >
          <div className="glass-panel px-6 py-3 rounded-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-xs text-cyan-500 uppercase tracking-wider mb-1">Date</span>
            <span className="font-semibold text-white">21 Sept 2026</span>
          </div>
          <div className="glass-panel px-6 py-3 rounded-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-xs text-cyan-500 uppercase tracking-wider mb-1">Time</span>
            <span className="font-semibold text-white">10:00 AM Onwards</span>
          </div>
          <div className="glass-panel px-6 py-3 rounded-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <span className="text-xs text-cyan-500 uppercase tracking-wider mb-1">Venue</span>
            <span className="font-semibold text-white">Maisammaguda</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link 
            href="/register" 
            className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg overflow-hidden transition-all flex items-center justify-center gap-2 glow-border"
          >
            <span className="relative z-10">REGISTER YOUR TEAM</span>
            <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="#rounds" 
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg backdrop-blur-sm border border-white/10 transition-all flex items-center justify-center"
          >
            EXPLORE EVENT
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex gap-4 md:gap-8"
        >
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINS", value: timeLeft.minutes },
            { label: "SECS", value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-xs text-cyan-500 tracking-[0.2em]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
