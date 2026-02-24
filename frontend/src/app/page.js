"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sprout,
  ShieldCheck,
  Zap,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Globe,
  Star,
  Shield,
  CreditCard,
  Target
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mesh-bg selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 glass-morph sticky top-4 z-50 mx-4 md:mx-12 mt-4 rounded-3xl border border-white/40">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="bg-emerald-600 p-2.5 rounded-2xl text-white shadow-lg shadow-emerald-200"
          >
            <Sprout size={22} strokeWidth={2.5} />
          </motion.div>
          <span className="text-2xl font-black tracking-tighter text-gray-900 font-display">
            AGRI<span className="text-emerald-600">360</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <a href="#features" className="hover:text-emerald-600 transition">Solutions</a>
          <a href="#governance" className="hover:text-emerald-600 transition">Governance</a>
          <a href="#security" className="hover:text-emerald-600 transition">Trust</a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-[13px] font-black uppercase tracking-widest text-gray-500 hover:text-emerald-600 transition">
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary !py-2.5 !px-8 shadow-xl">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-8 pt-28 pb-40 relative flex flex-col items-center">
          <motion.div
            {...fadeInUp}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-emerald-600 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border border-emerald-100 shadow-sm mb-12"
          >
            <Zap size={14} fill="currentColor" /> Kerala's #1 MSP Liquidity Protocol
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-[110px] font-black tracking-tight text-center leading-[0.85] max-w-5xl mb-12 font-display"
          >
            Zero wait time. <br />
            <span className="text-gradient">Total Prosperity.</span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 text-center max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
          >
            Empowering 2.3 Million Kerala farmers with AI-backed instant escrow disbursements. No more waiting cycles—liquidity delivered the moment you harvest.
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <Link href="/signup" className="btn-primary !py-5 !px-12 text-lg group shadow-2xl">
              Launch Dashboard <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 px-6 opacity-60">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-gray-900">+4.2k Active Farmers</p>
            </div>
          </motion.div>

          {/* Floating Accent Shapes */}
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-emerald-200/20 blur-[100px] animate-float"></div>
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-200/20 blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
        </section>

        {/* Value Prop Grid */}
        <section id="features" className="px-8 pb-40 max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp} className="card-premium group">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl w-fit mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-emerald-100">
                <Star size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Escrow Guaranteed</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Smart contracts lock your MSP funds the moment procurement starts. Instant disbursement upon mill verification.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card-premium group">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl w-fit mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-blue-100">
                <Shield size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">AI Fraud Shield</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Our proprietary AI models analyze moisture, quantity, and land area in real-time to prevent brokerage middleman exploitation.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="card-premium group">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-3xl w-fit mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-amber-100">
                <Target size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">Yield Prediction</h3>
              <p className="text-gray-500 font-medium leading-relaxed">
                Helping the Kerala Government forecast state-wide production using high-resolution NDVI vegetation indices and historical data.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="bg-gray-900 py-32 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <span className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs mb-6 block leading-none">The Future of Agri-Fintech</span>
                <h2 className="text-4xl md:text-6xl text-white font-black mb-8 leading-[0.95] font-display">
                  One platform. <br />
                  Total Visibility.
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: CreditCard, title: "Farmer Credit Scoring", desc: "Build a digital credit history based on your harvest patterns." },
                    { icon: Globe, title: "District Heatmaps", desc: "Live monitoring of procurement status across all 14 districts." },
                    { icon: ShieldCheck, title: "Tamper-proof Logs", desc: "Every action from paddy dump to payout is audited securely." }
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 10 }}
                      className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-default"
                    >
                      <item.icon className="text-emerald-500 shrink-0" size={24} />
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 card bg-white p-2 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/20">
                  <div className="bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100">
                    <img src="https://images.unsplash.com/photo-1594776208133-35da395956e1?q=80&w=1200" alt="Dashboard Preview" className="w-full opacity-90 transition hover:opacity-100 grayscale hover:grayscale-0 duration-1000" />
                  </div>
                </div>
                {/* Visual accents */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500 rounded-full blur-[80px] opacity-30"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 px-8 text-center bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tight leading-none font-display">
              Ready to secure your <span className="text-emerald-600">financial future?</span>
            </h2>
            <Link href="/signup" className="btn-primary !py-6 !px-16 text-xl shadow-2xl">
              Create Your Free Account
            </Link>
            <p className="mt-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
              No middleman fees • No waiting periods • AI Powered
            </p>
          </div>
        </section>
      </main>

      <footer className="py-20 px-8 border-t bg-gray-50/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-600 p-2 rounded-xl text-white">
                  <Sprout size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter font-display">AGRI360</span>
              </div>
              <p className="text-gray-500 font-medium">
                Leading the digital transformation of Kerala's agricultural economy through innovative escrow solutions and artificial intelligence.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-32">
              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Platform</h4>
                <ul className="space-y-4 text-sm font-bold text-gray-600">
                  <li><a href="#" className="hover:text-emerald-600">Analytics</a></li>
                  <li><a href="#" className="hover:text-emerald-600">Risk Audit</a></li>
                  <li><a href="#" className="hover:text-emerald-600">MSP Policy</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Ecosystem</h4>
                <ul className="space-y-4 text-sm font-bold text-gray-600">
                  <li><a href="#" className="hover:text-emerald-600">For Farmers</a></li>
                  <li><a href="#" className="hover:text-emerald-600">For Mills</a></li>
                  <li><a href="#" className="hover:text-emerald-600">For Banks</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-12 border-t border-gray-200/50">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              © 2026 Kerala State Agriculture Department. Developed for Digital Kerala Initiative.
            </p>
            <div className="flex gap-6 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-gray-900 transition">Privacy</a>
              <a href="#" className="hover:text-gray-900 transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
