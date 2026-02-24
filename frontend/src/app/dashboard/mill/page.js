"use client";

import { useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '@/components/dashboard/Sidebar';
import {
    Package,
    Droplet,
    ChevronRight,
    Camera,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

export default function MillDashboard() {
    const [activeTab, setActiveTab] = useState('pending');

    const mockBatches = [
        { id: 'BATCH-402', farmer: 'Sankar Das', qty: '1200 Kg', type: 'Paddy Jyothi', moisture: '16.2%' },
        { id: 'BATCH-405', farmer: 'Amin Kutty', qty: '2500 Kg', type: 'Paddy Matta', moisture: '18.1%' },
    ];

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Mill Operations 🏭</h1>
                    <p className="text-gray-500 mt-2">Quality verification and batch management for [Palarivattom Mill].</p>
                </header>

                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('pending')}
                        className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'pending' ? 'bg-[var(--primary)] text-white shadow-lg' : 'bg-white border'}`}
                    >
                        Assigned Batches (2)
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'history' ? 'bg-[var(--primary)] text-white shadow-lg' : 'bg-white border'}`}
                    >
                        Verified History
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mockBatches.map((batch) => (
                        <div key={batch.id} className="card relative transition hover:shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">{batch.id}</h3>
                                    <p className="text-xs text-gray-400">Assigned by SupplyCo • Feb 22</p>
                                </div>
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold">
                                    PENDING QUALITY CHECK
                                </span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Farmer</span>
                                    <span className="font-medium">{batch.farmer}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Quantity</span>
                                    <span className="font-medium">{batch.qty}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Declared Moisture</span>
                                    <span className="font-medium text-amber-600">{batch.moisture}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t font-semibold">
                                <p className="text-sm">Verify Details</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-gray-400">Lab Moisture %</label>
                                        <div className="relative">
                                            <Droplet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" />
                                            <input type="number" step="0.1" className="w-full pl-9 p-2 border rounded-lg bg-gray-50" placeholder="17.2" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-gray-400">Grain Grade</label>
                                        <select className="w-full p-2 border rounded-lg bg-gray-50 text-sm">
                                            <option>Grade A</option>
                                            <option>Common</option>
                                            <option>Reject</option>
                                        </select>
                                    </div>
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-50 transition text-sm">
                                    <Camera size={18} /> Upload Quality Photo
                                </button>

                                <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
                                    <AlertCircle size={20} className="text-blue-600 shrink-0" />
                                    <p className="text-[10px] text-blue-800 leading-relaxed font-normal">
                                        AI will cross-check your lab moisture entry with the farmer's declaration and history to detect anomalies.
                                    </p>
                                </div>

                                <button className="btn-primary w-full py-3 mt-4 flex items-center justify-center gap-2">
                                    Confirm & Submit Grade <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="card bg-gray-50 border-dashed border-2 flex flex-col items-center justify-center text-center py-20">
                        <Package size={40} className="text-gray-300 mb-4" />
                        <p className="text-gray-400 font-medium">Wait for new assignments</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Auto-refresh active</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
