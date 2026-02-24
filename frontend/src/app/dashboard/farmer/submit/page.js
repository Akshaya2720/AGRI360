"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Sidebar from '@/components/dashboard/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Upload, MapPin, Calendar, Scale, Thermometer } from 'lucide-react';

export default function SubmitPaddy() {
    const { t } = useTranslation();
    const router = useRouter();
    const { token } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        cropType: 'Paddy - Jyothi',
        quantityKg: '',
        moisture: '',
        harvestDate: new Date().toISOString().split('T')[0],
        latitude: 10.8505, // Mock Kochi
        longitude: 76.2711
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/farmer/submit', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Submission Successful!');
            router.push('/dashboard/farmer/history');
        } catch (err) {
            alert(err.response?.data?.message || 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 max-w-4xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Submit New Harvest 🌾</h1>
                    <p className="text-gray-500 mt-2">Enter your crop details for official procurement.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="card grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Box size={16} /> Crop Type
                            </label>
                            <select name="cropType" onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50">
                                <option>Paddy - Jyothi</option>
                                <option>Paddy - Uma</option>
                                <option>Paddy - Matta</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Scale size={16} /> Quantity (Kg)
                            </label>
                            <input
                                name="quantityKg"
                                type="number"
                                placeholder="e.g. 1500"
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Thermometer size={16} /> Moisture %
                            </label>
                            <input
                                name="moisture"
                                type="number"
                                step="0.1"
                                placeholder="e.g. 17.5"
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Calendar size={16} /> Harvest Date
                            </label>
                            <input
                                name="harvestDate"
                                type="date"
                                value={formData.harvestDate}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-red-500" /> Geo-location Trace
                        </h3>
                        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600 font-mono">
                            Latitude: {formData.latitude}, Longitude: {formData.longitude}
                            <p className="text-[10px] mt-2 text-gray-400">Captured via GPS Device Certificate</p>
                        </div>
                    </div>

                    <div className="card border-dashed border-2 border-[var(--primary)] bg-green-50/30 flex flex-col items-center py-10">
                        <Upload size={40} className="text-[var(--primary)] mb-2" />
                        <p className="font-bold text-[var(--primary)]">Upload Harvest Image</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" disabled={loading} className="flex-1 btn-primary py-4 text-lg shadow-lg">
                            {loading ? 'Processing AI Verification...' : 'Submit Harvest'}
                        </button>
                        <button type="button" onClick={() => router.back()} className="px-8 border rounded-xl hover:bg-white transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
