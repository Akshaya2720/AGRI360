"use client";

import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    BarChart3,
    Users,
    Clock,
    CheckCircle2,
    ShieldAlert,
    Zap,
    ArrowUpRight,
    Activity
} from 'lucide-react';

const MetricCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="card-premium group"
    >
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} text-white shadow-lg`}>
                <Icon size={22} strokeWidth={2.5} />
            </div>
            <div className="text-[10px] font-black text-gray-400 bg-gray-50 border px-2 py-0.5 rounded-md uppercase tracking-widest">Live</div>
        </div>
        <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">{value}</h3>
        <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-4">{title}</p>
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">{subtext}</span>
            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
        </div>
    </motion.div>
);

export default function SupplyCoDashboard() {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="flex min-h-screen mesh-bg">
            <Sidebar />
            <main className="flex-1 ml-64 p-12">
                <header className="mb-12 flex justify-between items-end">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-1"
                    >
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight font-display italic">
                            SupplyCo <span className="text-emerald-600 NOT-italic font-black uppercase tracking-tighter">Command Center</span> 🏢
                        </h1>
                        <p className="text-gray-500 font-bold tracking-tight opacity-70"> Monitoring state-wide procurement liquidity and AI risk vectors.</p>
                    </motion.div>

                    <div className="flex gap-4">
                        <div className="px-6 py-3 bg-white/80 backdrop-blur-sm border rounded-2xl flex items-center gap-3 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Escrow Gateway: Online</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <MetricCard
                        title="Pending Queue"
                        value="24"
                        subtext="avg. wait: 4.2h"
                        icon={Clock}
                        color="bg-amber-500"
                        delay={0.1}
                    />
                    <MetricCard
                        title="Authorized Today"
                        value="142"
                        subtext="yield: 84.5 Tons"
                        icon={CheckCircle2}
                        color="bg-emerald-600"
                        delay={0.2}
                    />
                    <MetricCard
                        title="Disbursed (Escrow)"
                        value="₹24.8L"
                        subtext="100% success rate"
                        icon={BarChart3}
                        color="bg-indigo-600"
                        delay={0.3}
                    />
                    <MetricCard
                        title="Risk Intercepts"
                        value="03"
                        subtext="blocked by ai node"
                        icon={ShieldAlert}
                        color="bg-rose-600"
                        delay={0.4}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-8 card-premium"
                    >
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-10 flex items-center gap-3 italic">
                            District <span className="text-emerald-600 NOT-italic">Load capacity</span>
                        </h2>
                        <div className="space-y-10">
                            {[
                                { name: 'Palakkad', val: 85, color: 'bg-emerald-500' },
                                { name: 'Alappuzha', val: 62, color: 'bg-blue-500' },
                                { name: 'Thrissur', val: 45, color: 'bg-amber-500' },
                                { name: 'Kottayam', val: 32, color: 'bg-indigo-500' }
                            ].map((d, i) => (
                                <div key={d.name} className="group cursor-default">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-3 text-gray-400 group-hover:text-gray-900 transition-colors">
                                        <span>{d.name} Region</span>
                                        <span>{d.val}% utilized</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-50 shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${d.val}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                                            className={`${d.color} h-full rounded-full shadow-lg`}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="lg:col-span-4 bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
                    >
                        <div className="absolute top-0 left-0 p-32 bg-indigo-500/10 blur-[80px] rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black mb-8 tracking-tight italic font-display">
                                Network <span className="text-indigo-400 NOT-italic">Vitality</span>
                            </h2>
                            <div className="space-y-8 mt-12">
                                {[
                                    { name: 'AI Escrow Node', status: 'Operational', val: '24ms' },
                                    { name: 'Satellite NDVI Feed', status: 'Active', val: '99.9%' },
                                    { name: 'UPI Gateway Mock', status: 'Live', val: 'Sync' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                                            <div>
                                                <p className="text-sm font-black tracking-tight">{item.name}</p>
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.status}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-emerald-400 p-2 bg-emerald-500/10 rounded-lg">{item.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 mt-12 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                            <div className="flex items-center gap-2 text-amber-400 mb-2">
                                <Zap size={14} fill="currentColor" />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">AI Insight</span>
                            </div>
                            <p className="text-xs text-slate-300 font-bold leading-relaxed">
                                Heavy rainfall predicted in Palakkad next week. Advise faster drying cycles for Mill assignments.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
