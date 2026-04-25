'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Cpu, Shield, Zap, BarChart3, Truck, ArrowRight, Globe, Layers } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none -z-10 opacity-30"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/40 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Cpu size={20} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight italic">ATM<span className="text-blue-500">OPT</span></span>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex space-x-6 text-sm font-bold text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Features</a>
              <a href="#about" className="hover:text-foreground transition-colors">Enterprise</a>
              <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            </div>
            <Link 
              href="/login" 
              className="px-6 py-2 rounded-xl bg-accent text-white font-bold text-sm shadow-lg shadow-accent/20 hover:scale-105 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Zap size={12} className="animate-pulse" />
            <span>Next Generation AI Core</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8"
          >
            Predictive <span className="text-accent">Cash</span> <br /> 
            Logistics <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">Intelligence</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12"
          >
            Optimize your bank's ATM network with deep learning models. Predict depletion, automate redistribution, and reduce logistics costs by up to 28% with our unified command center.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/login" 
              className="group px-8 py-4 rounded-2xl bg-foreground text-background font-black text-sm flex items-center hover:scale-105 transition-all"
            >
              Get Started Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#demo" 
              className="px-8 py-4 rounded-2xl bg-muted border border-border font-black text-sm hover:bg-background transition-all"
            >
              Request Demo
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
           {[
             { label: 'Network Units', val: '2,400+' },
             { label: 'Cost Savings', val: '28.4%' },
             { label: 'Uptime', val: '99.98%' },
             { label: 'Daily Data', val: '1.2 TB' },
           ].map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="text-center"
             >
                <div className="text-4xl font-black text-accent mb-2">{stat.val}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{stat.label}</div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-4xl font-black mb-4">Enterprise Grade Capabilities</h2>
             <p className="text-muted-foreground">The most advanced stack for regional banking networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: 'Neural Depletion', desc: 'Real-time forecasting models with 94.2% accuracy across all ATM types.', icon: Cpu },
               { title: 'Smart Redistribution', desc: 'Automated capital flow logic to eliminate idle cash and prevent shortages.', icon: Layers },
               { title: 'Logistics Matrix', desc: 'Dynamic route optimization for fleet management and fuel cost reduction.', icon: Truck },
               { title: 'Global Oversight', desc: 'Unified command center for national and regional banking headquarters.', icon: Globe },
               { title: 'Advanced Analytics', desc: 'Deep-dive metrics into network health, efficiency, and ROI tracking.', icon: BarChart3 },
               { title: 'Military Security', desc: 'Bank-grade encryption and biometric authentication protocols.', icon: Shield },
             ].map((feature, i) => (
               <motion.div
                 key={feature.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="glass-card p-10 rounded-[32px] hover:border-accent/30 transition-all group"
               >
                  <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mb-8 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border bg-muted/20">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3">
               <div className="bg-foreground p-2 rounded-xl">
                  <Cpu size={20} className="text-background" />
               </div>
               <span className="font-black text-lg tracking-tight italic text-foreground">ATM<span className="text-accent">OPT</span></span>
            </div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
               © 2026 ATM OPTIMIZER AI. GLOBAL BANKING SOLUTIONS.
            </div>
            <div className="flex space-x-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
               <a href="#" className="hover:text-accent">Privacy</a>
               <a href="#" className="hover:text-accent">Terms</a>
               <a href="#" className="hover:text-accent">Support</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
