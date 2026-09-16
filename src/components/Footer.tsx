import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-center md:text-left">
            <Link href="/" className="text-2xl font-heading font-bold text-white tracking-wider mb-2 block">
              TECH<span className="text-cyan-500">TACTIX</span> 2026
            </Link>
            <p className="text-slate-400 text-sm max-w-xs">
              CSI Student Chapter<br/>
              St. Peter&apos;s Engineering College<br/>
              Maisammaguda
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end text-sm text-slate-400">
            <p className="font-semibold text-white mb-1">EVENT DETAILS</p>
            <p>21 September 2026</p>
            <p>10:00 AM onwards</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 CSI Student Chapter. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
            <Link href="#rounds" className="hover:text-cyan-400 transition-colors">Rounds</Link>
            <Link href="/register" className="hover:text-cyan-400 transition-colors">Register</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
