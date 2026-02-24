"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Sprout,
    ArrowRight,
    Lock,
    Mail,
    Globe,
    ChevronLeft
} from 'lucide-react';

export default function LoginPage() {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            dispatch(setCredentials({ user: data, token: data.token }));
            router.push('/dashboard/farmer'); // Defaulting to farmer for now
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Login failed'));
            alert(err.response?.data?.message || 'Login failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen flex mesh-bg p-6 overflow-hidden">
            <Link href="/" className="absolute top-12 left-12 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition group z-50">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <div className="flex-1 hidden lg:flex flex-col justify-center items-start pl-20 space-y-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="bg-emerald-600 p-3 rounded-2xl text-white w-fit shadow-2xl">
                        <Sprout size={32} />
                    </div>
                    <h1 className="text-7xl font-black tracking-tighter leading-none italic font-display">
                        Prosperity <br />
                        <span className="text-emerald-600 NOT-italic">Starts Here.</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-bold tracking-tight max-w-md">
                        Access Kerala's most trusted agricultural liquidity platform. Secure, AI-powered, and instant.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-12"
                >
                    <div>
                        <p className="text-3xl font-black text-gray-900 tracking-tighter">₹1.2Cr+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Escrow Liquidity</p>
                    </div>
                    <div className="border-l pl-12">
                        <p className="text-3xl font-black text-gray-800 tracking-tighter">4.2k+</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Farmers Active</p>
                    </div>
                </motion.div>
            </div>

            <main className="flex-1 flex items-center justify-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md card-premium glass-morph p-12 relative z-10"
                >
                    <div className="mb-10 flex justify-between items-center">
                        <h2 className="text-2xl font-black tracking-tight text-gray-900 italic font-display">Sign In</h2>
                        <button
                            onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ml' : 'en')}
                            className="text-[10px] p-2 px-3 border rounded-xl font-black uppercase tracking-widest hover:bg-emerald-50 hover:text-emerald-600 transition"
                        >
                            {i18n.language === 'en' ? 'മലയാളം' : 'English'}
                        </button>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1">Email / Mobile</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Password</label>
                                <a href="#" className="text-[10px] font-black text-emerald-600 uppercase hover:underline">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
                                <input
                                    type="password"
                                    className="w-full pl-12 pr-6 py-4 bg-gray-50/50 border rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary !py-5 shadow-2xl group">
                            Validate Identity <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center mt-10 text-[11px] font-black uppercase tracking-widest text-gray-400">
                        New to Agri360? <Link href="/signup" className="text-emerald-600 hover:underline">Create Account</Link>
                    </p>
                </motion.div>

                {/* Background Blobs for Login side */}
                <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-400/10 blur-[100px] rounded-full"></div>
            </main>
        </div>
    );
}
