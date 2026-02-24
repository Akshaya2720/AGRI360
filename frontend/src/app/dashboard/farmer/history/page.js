"use client";

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/dashboard/Sidebar';
import axios from 'axios';
import {
    Package,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    TrendingUp,
    MapPin
} from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        PENDING: "bg-amber-100 text-amber-700",
        APPROVED: "bg-blue-100 text-blue-700",
        MILL_VERIFIED: "bg-purple-100 text-purple-700",
        ESCROW_TRIGGERED: "bg-emerald-100 text-emerald-700",
        SETTLED: "bg-green-100 text-green-700",
        REJECTED: "bg-red-100 text-red-700"
    };
    return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${styles[status]}`}>{status}</span>;
};

export default function FarmerHistory() {
    const { token } = useSelector((state) => state.auth);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/farmer/history', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSubmissions(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [token]);

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 overflow-hidden">
                    <h1 className="text-3xl font-bold text-gray-800">Submission History 📜</h1>
                    <p className="text-gray-500 mt-2">Track your harvests from field to fund.</p>
                </header>

                {loading ? (
                    <div className="flex items-center gap-4 text-gray-400">
                        <Clock className="animate-spin" /> Fetching your records...
                    </div>
                ) : (
                    <div className="space-y-4">
                        {submissions.length === 0 && (
                            <div className="card text-center py-20 bg-gray-50 border-dashed border-2">
                                <Package size={40} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-medium">No submissions found.</p>
                                <p className="text-xs text-gray-400 mt-1">Submit your first harvest to start earning.</p>
                            </div>
                        )}
                        {submissions.map((sub) => (
                            <div key={sub.id} className="card group hover:shadow-md transition cursor-pointer">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{sub.quantityKg} Kg • {sub.cropType}</h3>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <Calendar size={12} /> Received on {new Date(sub.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-8 items-center">
                                        <div className="text-right hidden lg:block">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Moisture</p>
                                            <p className="text-sm font-bold">{sub.moisture}%</p>
                                        </div>
                                        <div className="text-right hidden lg:block">
                                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Risk Score</p>
                                            <p className={`text-sm font-bold ${sub.riskScore > 0.6 ? 'text-red-500' : 'text-green-600'}`}>
                                                {sub.riskScore ? (sub.riskScore * 100).toFixed(0) : '0'}%
                                            </p>
                                        </div>
                                        <div>
                                            <StatusBadge status={sub.status} />
                                        </div>
                                        <div className="pl-4 border-l">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-[var(--primary)]">
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {sub.status === 'REJECTED' && (
                                    <div className="mt-4 bg-red-50 p-3 rounded-lg flex gap-3 items-center">
                                        <AlertCircle size={16} className="text-red-600" />
                                        <p className="text-[10px] text-red-800 font-medium leading-normal">
                                            Submission flagged by AI engine due to moisture anomaly. Please contact your village officer for manual verification.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-12 bg-[var(--primary)]/5 p-8 rounded-2xl border border-[var(--primary)]/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex gap-4 items-center">
                        <div className="p-3 bg-white rounded-xl shadow-sm text-green-700">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold">Automated Escrow Disbursement</h4>
                            <p className="text-xs text-gray-500">Your payments are protected by the Kerala State Escrow Pool.</p>
                        </div>
                    </div>
                    <button className="px-6 py-2 bg-white text-gray-800 font-bold rounded-lg border hover:bg-gray-50 transition">
                        View Payment Policy
                    </button>
                </div>
            </main>
        </div>
    );
}

function ArrowRight({ size, className }) { return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>; }
