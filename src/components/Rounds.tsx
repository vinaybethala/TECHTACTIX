"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Waves } from "lucide-react";

export function Rounds() {
  return (
    <section id="rounds" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">THE BATTLE BEGINS</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Two rounds. One ultimate winner. Prepare your knowledge and your pitch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Round 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-2xl border border-cyan-900/30 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-cyan-950/50 rounded-xl border border-cyan-800/50">
                <BrainCircuit className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <div className="text-cyan-500 font-bold tracking-wider text-sm mb-1">ROUND 01</div>
                <h3 className="text-2xl font-heading font-bold text-white">MINDMESH</h3>
              </div>
            </div>
            <h4 className="text-lg font-medium text-slate-200 mb-4">Technical Team Quiz</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex gap-2"><span className="text-cyan-500">▹</span> Teams of 2 compete head-to-head.</li>
              <li className="flex gap-2"><span className="text-cyan-500">▹</span> Quizmaster challenges teams with technical questions across core CS/Engineering domains.</li>
              <li className="flex gap-2"><span className="text-cyan-500">▹</span> Correct answers earn points.</li>
              <li className="flex gap-2"><span className="text-cyan-500">▹</span> Top-scoring teams qualify for Round 2.</li>
            </ul>
          </motion.div>

          {/* Round 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel p-8 rounded-2xl border border-purple-900/30 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-purple-950/50 rounded-xl border border-purple-800/50">
                <Waves className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <div className="text-purple-500 font-bold tracking-wider text-sm mb-1">ROUND 02</div>
                <h3 className="text-2xl font-heading font-bold text-white">SHARKTANK</h3>
              </div>
            </div>
            <h4 className="text-lg font-medium text-slate-200 mb-4">Defend Your Innovation</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex gap-2"><span className="text-purple-500">▹</span> Qualified teams present their technical idea.</li>
              <li className="flex gap-2"><span className="text-purple-500">▹</span> The &quot;Sharks&quot; challenge participants with probing questions.</li>
              <li className="flex gap-2"><span className="text-purple-500">▹</span> Defend your idea through technical knowledge, logic, feasibility, and confidence.</li>
            </ul>
          </motion.div>
        </div>

        {/* Prize Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass-panel max-w-3xl mx-auto p-10 rounded-2xl border border-yellow-500/20"
        >
          <div className="text-yellow-500 font-heading text-xl font-bold tracking-widest mb-2">TOP 5 TEAMS</div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Exciting Cash Prizes</h3>
          <p className="text-slate-400">The ultimate innovators will be rewarded.</p>
        </motion.div>
      </div>
    </section>
  );
}
