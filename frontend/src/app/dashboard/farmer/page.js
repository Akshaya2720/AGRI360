"use client";

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    TrendingUp,
    Clock,
    CreditCard,
    AlertCircle,
    Package,
    ArrowRight,
    ChevronRight,
    Zap,
    MoveUpRight
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="card-premium flex flex-col justify-between group cursor-default"
    >
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
                <Icon size={22} strokeWidth={2.5} />
            </div>
            {trend && (
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border border-emerald-100">
                    <MoveUpRight size={10} strokeWidth={3} /> {trend}
                </div>
            )}
        </div>
        <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{title}</p>
            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{value}</h3>
        </div>
    </motion.div>
);

export default function FarmerDashboard() {
    const { t } = useTranslation();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex min-h-screen mesh-bg">
            <Sidebar />
            <main className="flex-1 ml-64 p-12">
                <header className="mb-12 flex justify-between items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight font-display italic">
                            Namaskaram, <span className="text-emerald-600 NOT-italic font-black uppercase tracking-tighter">{user?.name}</span>! 👋
                        </h1>
                        <p className="text-gray-500 mt-2 font-bold tracking-tight opacity-70">
                            Your harvest is currently powering the state's central grain reserve.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4"
                    >
                        <button className="flex items-center gap-2 p-3.5 bg-white border rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition">
                            <Clock size={18} /> Past Reports
                        </button>
                        <button className="btn-primary !py-3.5">
                            New Submission +
                        </button>
                    </motion.div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <StatCard
                        title="MSP Disbursed"
                        value="₹45,200"
                        icon={TrendingUp}
                        trend="12.4%"
                        color="bg-emerald-600"
                        delay={0.1}
                    />
                    <StatCard
                        title="Agri Credit Score"
                        value="740"
                        icon={CreditCard}
                        color="bg-indigo-600"
                        delay={0.2}
                    />
                    <StatCard
                        title="Safety Risk Index"
                        value="15%"
                        icon={AlertCircle}
                        color="bg-amber-500"
                        delay={0.3}
                    />
                    <StatCard
                        title="Total Quantities"
                        value="1,200 Kg"
                        icon={Package}
                        color="bg-slate-900"
                        delay={0.4}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Activity Feed */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-8 card-premium"
                    >
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Activity</h2>
                            <button className="text-[11px] font-black uppercase tracking-widest text-emerald-600 hover:gap-2 flex items-center gap-1 transition-all">
                                View Full History <ChevronRight size={14} />
                            </button>
                        </div>

                        <div className="space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-gray-50 transition-all">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border flex items-center justify-center text-gray-400 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-colors">
                                            <Package size={24} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 tracking-tight">Paddy Submission #TXN-00{i}2</p>
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">Palakkad District • {i + 500}Kg • Matta</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-2">
                                        <span className="px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest bg-emerald-50 text-emerald-700 uppercase border border-emerald-100 shadow-sm">
                                            SETTLED
                                        </span>
                                        <p className="font-black text-sm text-gray-900">₹{(i + 12) * 1000}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* AI Insights Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="lg:col-span-4 bg-emerald-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-16 bg-emerald-500/20 blur-[60px] rounded-full group-hover:blur-[80px] transition-all duration-700"></div>
                        <div className="relative z-10">
                            <div className="bg-emerald-500/20 w-fit p-3 rounded-2xl mb-8 border border-emerald-500/20">
                                <Zap size={24} fill="currentColor" />
                            </div>
                            <h2 className="text-3xl font-black mb-6 tracking-tight leading-none italic font-display">
                                Elite <br />
                                <span className="text-emerald-400 NOT-italic">Credit Insight</span>
                            </h2>
                            <p className="text-emerald-100/70 font-bold tracking-tight mb-10 leading-relaxed text-sm">
                                Your consistent delivery history has unlocked a new tier for government local subsidies. Keep it up!
                            </p>

                            <div className="p-6 bg-white/10 rounded-3xl border border-white/10 mb-8 backdrop-blur-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Instant Pre-Approved Loan</p>
                                <p className="text-4xl font-black text-white tracking-tighter mb-2">₹25,000</p>
                                <p className="text-xs font-bold text-emerald-200/50">Interest: 3.5% APY</p>
                            </div>

                            <button className="w-full py-4 bg-white text-emerald-950 font-black rounded-2xl text-sm uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                                Claim Credit Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
