"use client";

import { useSelector } from 'react-redux';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    Building2,
    Wallet,
    AlertOctagon,
    BarChart4
} from 'lucide-react';

const data = [
    { name: 'Palakkad', procurement: 4000, distress: 24 },
    { name: 'Alappuzha', procurement: 3000, distress: 13 },
    { name: 'Thrissur', procurement: 2000, distress: 35 },
    { name: 'Kottayam', procurement: 2780, distress: 18 },
    { name: 'Wayanad', procurement: 1890, distress: 45 },
];

const SummaryCard = ({ title, value, sub, icon: Icon, color }) => (
    <div className="card">
        <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${color}`}>
                <Icon size={28} className="text-white" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
                <p className="text-[10px] text-gray-400 mt-1">{sub}</p>
            </div>
        </div>
    </div>
);

export default function GovernmentDashboard() {
    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">State Analytics Portal 🏛️</h1>
                        <p className="text-gray-500 mt-2">Kerala Paddy Procurement Intelligence System</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 border rounded-lg bg-white font-bold hover:shadow-md transition">Export Report</button>
                        <button className="btn-primary">Live Heatmap View</button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <SummaryCard
                        title="Total Procurement"
                        value="1.2M Tons"
                        sub="↑ 8% from last season"
                        icon={BarChart4}
                        color="bg-indigo-600"
                    />
                    <SummaryCard
                        title="Escrow Liquidity"
                        value="₹452.4Cr"
                        sub="Current Account Balance"
                        icon={Wallet}
                        color="bg-green-600"
                    />
                    <SummaryCard
                        title="Active Mills"
                        value="84"
                        sub="12 pending audit"
                        icon={Building2}
                        color="bg-amber-600"
                    />
                    <SummaryCard
                        title="High Risk Zones"
                        value="4 Districts"
                        sub="Based on distress AI"
                        icon={AlertOctagon}
                        color="bg-red-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="card h-[400px]">
                        <h2 className="text-xl font-bold mb-6">Procurement by District (Tons)</h2>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="procurement" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="card h-[400px]">
                        <h2 className="text-xl font-bold mb-6 text-red-600">Farmer Distress Trend (AI Index)</h2>
                        <ResponsiveContainer width="100%" height="85%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="distress" stroke="#EF4444" fill="#FEE2E2" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="card bg-gray-50 border-dashed border-2 p-0 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center z-10">
                        <div className="text-center">
                            <p className="text-xl font-bold text-gray-800">Dynamic Procurement Heatmap</p>
                            <p className="text-sm text-gray-500 mt-2">Interactive Leaflet Map - Kerala State View</p>
                        </div>
                    </div>
                    <div className="h-[400px] w-full bg-blue-50 opacity-50"></div>
                    {/* Real Leaflet Map would render here */}
                </div>
            </main>
        </div>
    );
}
