'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Mail, Lock, ArrowRight, Box } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@atmopt.ai');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock Auth
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Mesh */}
      <div className="fixed inset-0 bg-gradient-mesh pointer-events-none -z-10 opacity-30"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-[40px] p-10 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 -z-10">
           <ShieldCheck size={160} />
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="bg-accent p-3 rounded-2xl shadow-lg shadow-accent/20">
              <Cpu size={24} className="text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter italic">ATM<span className="text-blue-500">OPT</span></span>
          </div>
          <h2 className="text-2xl font-black text-foreground">Secure Login</h2>
          <p className="text-muted-foreground text-xs mt-2 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:outline-none transition-all"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-border" />
              Remember Device
            </label>
            <a href="#" className="hover:text-accent transition-colors">Reset Access</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl bg-accent text-white font-black text-sm shadow-xl shadow-accent/20 flex items-center justify-center space-x-2 transition-all ${
              loading ? 'opacity-70 scale-95' : 'hover:scale-105 active:scale-95'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Establish Connection</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
           <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-4">Or sign in with</div>
           <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-muted border border-border hover:bg-background transition-all">
                 <Box size={18} />
                 <span className="text-xs font-bold">GitHub</span>
              </button>
              <button className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-muted border border-border hover:bg-background transition-all">
                 <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale opacity-70" />
                 <span className="text-xs font-bold">Google</span>
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
