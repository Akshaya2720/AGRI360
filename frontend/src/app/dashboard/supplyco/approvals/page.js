"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import axios from 'axios';
import {
    CheckCircle,
    XCircle,
    Info,
    AlertTriangle,
    User,
    MapPin,
    Package,
    ShieldCheck,
    ArrowRight,
    Search
} from 'lucide-react';

export default function SupplyCoApprovals() {
    const { token } = useSelector((state) => state.auth);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPending = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/officer/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubmissions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleApprove = async (id) => {
        if (!confirm('Authorize Escrow Disbursement: This action will trigger an immediate bank transfer to the farmer. Proceed?')) return;
        try {
            await axios.post(`http://localhost:5000/api/officer/approve/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPending();
        } catch (err) {
            alert('Authorization failed');
        }
    };

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
                            Authorization <span className="text-emerald-600 NOT-italic">Queue</span> 🏛️
                        </h1>
                        <p className="text-gray-500 mt-2 font-bold tracking-tight opacity-70">Reviewing and triggering state-backed escrow payouts.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-1 px-1 bg-white border rounded-[1.5rem] shadow-sm flex items-center gap-1"
                    >
                        <div className="px-6 py-3 bg-slate-900 text-white rounded-[1.25rem] shadow-xl">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Escrow Liquidity</p>
                            <p className="text-lg font-black tracking-tighter">₹1.25 Cr</p>
                        </div>
                        <div className="px-6 py-3">
                            <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Queue Status</p>
                            <p className="text-lg font-black tracking-tighter text-gray-800">{submissions.length} Pending</p>
                        </div>
                    </motion.div>
                </header>

                <div className="mb-10 flex gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Filter by Farmer ID, Taluk, or Risk Score..."
                            className="w-full pl-12 pr-6 py-4 bg-white border rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
                        />
                    </div>
                    <button className="px-8 py-4 bg-white border rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition shadow-sm">
                        Export CSV
                    </button>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4 opacity-40">
                        <Activity className="animate-pulse text-emerald-600" size={40} />
                        <p className="font-black text-xs uppercase tracking-[0.3em]">Synchronizing Blockchain Logs...</p>
                    </div>
                ) : (
                    <div className="space-y-8 pb-20">
                        <AnimatePresence mode="popLayout">
                            {submissions.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-32 card-premium bg-white/50 border-dashed border-2"
                                >
                                    <ShieldCheck size={48} className="mx-auto text-emerald-600/30 mb-4" />
                                    <p className="font-black text-gray-400 uppercase tracking-widest">Queue Clear. No Pending Authorizations.</p>
                                </motion.div>
                            )}
                            {submissions.map((sub, idx) => (
                                <motion.div
                                    key={sub.id}
                                    layout
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="card-premium grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:bg-white/90"
                                >
                                    {/* Farmer Identity */}
                                    <div className="lg:col-span-3">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm relative">
                                                <User size={24} strokeWidth={2.5} />
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white"></div>
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 tracking-tight text-lg">{sub.farmer.user.name}</p>
                                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{sub.farmer.taluk} Region</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                                            <MapPin size={12} /> {sub.farmer.village}
                                        </div>
                                    </div>

                                    {/* Payload Specs */}
                                    <div className="lg:col-span-3 border-l px-8">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Paddy Volume</p>
                                                <div className="flex items-end gap-1">
                                                    <span className="text-2xl font-black text-gray-900 leading-none">{sub.quantityKg}</span>
                                                    <span className="text-[10px] font-bold text-gray-500 mb-1">KG</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-8">
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Moisture</p>
                                                    <p className={`font-black text-sm ${sub.moisture > 17 ? 'text-amber-600' : 'text-emerald-700'}`}>{sub.moisture}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Variety</p>
                                                    <p className="font-black text-sm text-gray-800">Matta</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Integrity & Risk */}
                                    <div className="lg:col-span-3 border-l px-8">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">AI Integrity Score</p>
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-12 h-12 flex items-center justify-center font-black text-lg text-gray-900">
                                                <svg className="absolute w-full h-full -rotate-90">
                                                    <circle cx="24" cy="24" r="22" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                                                    <circle
                                                        cx="24" cy="24" r="22" fill="none"
                                                        stroke={sub.riskScore > 0.6 ? '#e11d48' : '#10b981'}
                                                        strokeWidth="4"
                                                        strokeDasharray={2 * Math.PI * 22}
                                                        strokeDashoffset={2 * Math.PI * 22 * (1 - (sub.riskScore || 0))}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                {((sub.riskScore || 0) * 100).toFixed(0)}%
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${sub.riskScore > 0.6 ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                    {sub.riskScore > 0.6 ? 'Manual Audit Req' : 'System Verified'}
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-0.5">Confidence: 0.98</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Authorization Actions */}
                                    <div className="lg:col-span-3 flex gap-3">
                                        <button
                                            onClick={() => handleApprove(sub.id)}
                                            className="flex-1 btn-primary !py-4 shadow-emerald-100 hover:shadow-emerald-200"
                                        >
                                            <CheckCircle size={18} strokeWidth={2.5} /> Authorize
                                        </button>
                                        <button className="flex-1 bg-white border border-rose-100 text-rose-600 rounded-2xl py-4 flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition shadow-sm">
                                            <XCircle size={18} strokeWidth={2.5} /> Flag
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </main>
        </div>
    );
}
