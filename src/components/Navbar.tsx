"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-panel py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-heading font-bold text-white tracking-wider flex items-center gap-2">
          TECH<span className="text-cyan-500">TACTIX</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link href="/" className="hover:text-cyan-400 transition-colors">HOME</Link>
          <Link href="#rounds" className="hover:text-cyan-400 transition-colors">ROUNDS</Link>
          <Link href="#about" className="hover:text-cyan-400 transition-colors">ABOUT</Link>
          <Link 
            href="/register" 
            className="px-6 py-2 rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-navy-900 transition-all glow-border font-bold"
          >
            REGISTER NOW
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass-panel flex flex-col items-center py-6 gap-6 md:hidden"
          >
            <Link href="/" onClick={() => setIsOpen(false)}>HOME</Link>
            <Link href="#rounds" onClick={() => setIsOpen(false)}>ROUNDS</Link>
            <Link href="#about" onClick={() => setIsOpen(false)}>ABOUT</Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="text-cyan-400 font-bold">REGISTER NOW</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
