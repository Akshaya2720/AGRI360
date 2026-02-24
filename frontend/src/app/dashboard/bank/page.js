"use client";

import { useSelector } from 'react-redux';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    PiggyBank,
    ArrowUpRight,
    LineChart,
    Activity,
    CalendarDays,
    ShieldCheck
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { day: 'Mon', payout: 400 },
    { day: 'Tue', payout: 300 },
    { day: 'Wed', payout: 500 },
    { day: 'Thu', payout: 450 },
    { day: 'Fri', payout: 600 },
    { day: 'Sat', payout: 200 },
    { day: 'Sun', payout: 100 },
];

const BankMetric = ({ title, value, icon: Icon, color }) => (
    <div className="card">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{title}</p>
                <h3 className="text-3xl font-black mt-2">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={20} className="text-white" />
            </div>
        </div>
    </div>
);

export default function BankDashboard() {
    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Financial Treasury 🏦</h1>
                        <p className="text-gray-500 mt-2">Escrow liquidity and settlement surveillance for [SBI Central].</p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm border border-green-200">
                        <Activity size={16} /> GATEWAY: ACTIVE
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <BankMetric
                        title="Escrow Pool Balance"
                        value="₹12.45 Cr"
                        icon={PiggyBank}
                        color="bg-indigo-600"
                    />
                    <BankMetric
                        title="Daily Payout Volume"
                        value="₹45.2 L"
                        icon={ArrowUpRight}
                        color="bg-emerald-600"
                    />
                    <BankMetric
                        title="Available Credit Line"
                        value="₹8.0 Cr"
                        icon={LineChart}
                        color="bg-amber-600"
                    />
                    <BankMetric
                        title="Settled Transactions"
                        value="14,204"
                        icon={ShieldCheck}
                        color="bg-blue-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="card lg:col-span-2">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                            <CalendarDays size={20} className="text-gray-400" /> Weekly Disbursement Trend
                        </h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorPayout" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="payout" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorPayout)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-bold mb-6">Recent Settlements</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer border border-transparent hover:border-gray-100">
                                    <div>
                                        <p className="text-sm font-bold">TXN-90234{i}</p>
                                        <p className="text-[10px] text-gray-400 uppercase">Feb 23 • 2:45 PM</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black">₹42,500</p>
                                        <p className="text-[10px] text-green-600 font-bold">SUCCESS</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition">
                            Download Audit Logs
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
