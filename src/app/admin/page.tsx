'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdmin } from '@/app/actions/auth';
import { Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await loginAdmin(password);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-navy-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/30 blur-[120px]"></div>
      </div>

      <div className="glass-panel max-w-md w-full p-8 md:p-10 rounded-2xl border border-cyan-900/50 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent"></div>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-navy-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Lock className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">ADMIN ACCESS</h1>
          <p className="text-slate-400 text-sm">Enter the secure password to view the dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 tracking-wider">PASSWORD</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-lg text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || !password}
            className="w-full py-3 font-bold rounded-lg transition-all flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white glow-border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'AUTHENTICATE'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">
            ← Return to Website
          </Link>
        </div>
      </div>
    </main>
  );
}
