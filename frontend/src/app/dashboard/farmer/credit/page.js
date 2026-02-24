"use client";

import { useSelector } from 'react-redux';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    ShieldCheck,
    TrendingUp,
    HelpCircle,
    ArrowRight,
    Zap,
    CheckCircle2,
    Clock
} from 'lucide-react';

export default function CreditProfile() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Digital Credit Profile 🛡️</h1>
                    <p className="text-gray-500 mt-2">AI-verified financial health and credit history.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 space-y-8">
                        <div className="card bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white border-none shadow-2xl relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                <ShieldCheck size={160} />
                            </div>
                            <p className="text-xs font-bold text-green-200 uppercase tracking-widest mb-1">Agri-Credit Score</p>
                            <h3 className="text-6xl font-black mb-4">740</h3>
                            <div className="flex items-center gap-2 mb-8">
                                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-[10px] font-bold border border-green-500/30 uppercase">Excellent</span>
                                <span className="text-xs text-green-200/60 font-medium">Updated 2 days ago</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-medium border-t border-white/10 pt-4">
                                    <span className="text-green-200/60">Payment Timeliness</span>
                                    <span className="font-bold">98%</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium">
                                    <span className="text-green-200/60">Yield Consistency</span>
                                    <span className="font-bold">High</span>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                                    <Zap size={20} />
                                </div>
                                <h3 className="font-bold">Instant Credit Offer</h3>
                            </div>
                            <p className="text-2xl font-black mb-1">₹25,000</p>
                            <p className="text-xs text-gray-400 mb-6">Interest Rate: 4% p.a. (Govt Subsidized)</p>
                            <button className="btn-accent w-full flex items-center justify-center gap-2">
                                Apply Now <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-8">
                        <div className="card">
                            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                                Credit Health Factors
                                <HelpCircle size={16} className="text-gray-300" />
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex gap-4">
                                    <CheckCircle2 className="text-green-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm">MSP Payout History</h4>
                                        <p className="text-xs text-gray-400 mt-1">12 consistent payouts this year strengthen your profile.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <CheckCircle2 className="text-green-600 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm">Yield Stability</h4>
                                        <p className="text-xs text-gray-400 mt-1">Your yield predictions have matched actual deliveries by 95%.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Clock className="text-amber-500 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm">Verification Tenure</h4>
                                        <p className="text-xs text-gray-400 mt-1">Registered for 1.5 years. Eligibility for kisan credit increases in 6 months.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 opacity-50">
                                    <TrendingUp className="text-gray-400 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-sm">Asset Documentation</h4>
                                        <p className="text-xs text-gray-400 mt-1">Upload verified land deed for 50+ score boost.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-gray-50 border-none">
                            <h2 className="text-xl font-bold mb-6">Income Potential (Next Season)</h2>
                            <div className="h-[200px] flex items-end gap-2 px-4">
                                {[45, 60, 55, 75, 90, 85].map((h, i) => (
                                    <div key={i} className="flex-1 bg-[var(--primary)]/10 rounded-t-lg relative group transition-all hover:bg-[var(--primary)] cursor-pointer" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-xl font-bold">
                                            ₹{(h * 1000).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-400 mt-4 px-2 uppercase font-bold tracking-widest">
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                                <span>Sep</span>
                                <span>Oct</span>
                                <span>Nov</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
