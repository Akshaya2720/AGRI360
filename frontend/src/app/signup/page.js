"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCredentials, setLoading, setError } from '../../store/slices/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sprout,
    ArrowRight,
    User,
    Building,
    Globe,
    CreditCard,
    ChevronLeft,
    Check,
    ShieldCheck,
    Zap,
    Briefcase
} from 'lucide-react';

export default function SignupPage() {
    const { t, i18n } = useTranslation();
    const [role, setRole] = useState('FARMER');
    const [formData, setFormData] = useState({
        name: '', email: '', mobile: '', password: '',
        aadhaarMasked: '', landArea: '', village: '', taluk: '', bankAccount: '', upiId: '',
        departmentCode: '', officialId: ''
    });
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password,
                role: role,
                farmerData: role === 'FARMER' ? {
                    aadhaarMasked: formData.aadhaarMasked,
                    landArea: formData.landArea,
                    village: formData.village,
                    taluk: formData.taluk,
                    bankAccount: formData.bankAccount,
                    upiId: formData.upiId
                } : null,
                officerData: role !== 'FARMER' ? {
                    departmentCode: formData.departmentCode,
                    officialId: formData.officialId
                } : null
            };

            const { data } = await axios.post('http://localhost:5000/api/auth/signup', payload);
            dispatch(setCredentials({ user: data, token: data.token }));
            router.push(`/dashboard/${role.toLowerCase().split('_')[0]}`);
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'Signup failed'));
            alert(err.response?.data?.message || 'Signup failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const roles = [
        { id: 'FARMER', title: 'Farmer', icon: Sprout, desc: 'For agricultural producers' },
        { id: 'SUPPLYCO_OFFICER', title: 'SupplyCo', icon: Building, desc: 'Central procurement' },
        { id: 'MILL_OPERATOR', title: 'Mill', icon: Zap, desc: 'Processing & Quality' },
        { id: 'GOVERNMENT_ADMIN', title: 'Govt', icon: ShieldCheck, desc: 'Audit & Analytics' },
        { id: 'BANK_OFFICER', title: 'Bank', icon: Briefcase, desc: 'Escrow Treasury' }
    ];

    return (
        <div className="min-h-screen mesh-bg py-20 px-6 flex flex-col items-center">
            <Link href="/" className="absolute top-12 left-12 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition group z-50">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl"
            >
                <div className="text-center mb-16">
                    <h1 className="text-6xl font-black tracking-tighter text-gray-900 italic font-display">
                        Join <span className="text-emerald-600 NOT-italic">Agri360</span>
                    </h1>
                    <p className="text-gray-500 font-bold tracking-tight mt-4">Select your operational identity to begin.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-16 px-4">
                    {roles.map((r) => (
                        <button
                            key={r.id}
                            onClick={() => setRole(r.id)}
                            className={`relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center text-center gap-4 group ${role === r.id
                                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xl shadow-emerald-200'
                                    : 'bg-white/50 border-white hover:border-emerald-200 hover:bg-white'
                                }`}
                        >
                            <div className={`p-3 rounded-2xl ${role === r.id ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-emerald-50'} transition-colors`}>
                                <r.icon size={24} strokeWidth={2.5} className={role === r.id ? 'text-white' : 'text-gray-400 group-hover:text-emerald-600'} />
                            </div>
                            <div>
                                <h3 className="font-black text-xs uppercase tracking-widest">{r.title}</h3>
                            </div>
                            {role === r.id && (
                                <motion.div layoutId="check" className="absolute -top-2 -right-2 bg-white text-emerald-600 p-1.5 rounded-full shadow-lg border border-emerald-100">
                                    <Check size={12} strokeWidth={4} />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="card-premium glass-morph p-12 max-w-4xl mx-auto"
                >
                    <form onSubmit={handleSignup} className="space-y-12">
                        {/* Base Identity */}
                        <div className="space-y-8">
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 border-b pb-4 border-emerald-100 italic">01. Core Identity</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput label="Full Legal Name" name="name" placeholder="E.g. John Doe" onChange={handleChange} required />
                                <FormInput label="Email Address" name="email" type="email" placeholder="john@example.com" onChange={handleChange} required />
                                <FormInput label="Mobile Number" name="mobile" placeholder="+91 98765 43210" onChange={handleChange} required />
                                <FormInput label="Security Password" name="password" type="password" placeholder="••••••••" onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Role Specifics */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={role}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 border-b pb-4 border-emerald-100 italic">02. {role.replace('_', ' ')} Requirements</h2>

                                {role === 'FARMER' ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormInput label="Aadhaar (Last 4 digits)" name="aadhaarMasked" placeholder="4321" onChange={handleChange} required />
                                        <FormInput label="Land Area (Acres)" name="landArea" type="number" placeholder="2.5" onChange={handleChange} required />
                                        <FormInput label="Village Name" name="village" placeholder="Pudussery" onChange={handleChange} required />
                                        <FormInput label="Taluk" name="taluk" placeholder="Palakkad" onChange={handleChange} required />
                                        <FormInput label="Bank Account Number" name="bankAccount" placeholder="SBIN000123..." onChange={handleChange} required />
                                        <FormInput label="UPI ID (Optional)" name="upiId" placeholder="farmer@upi" onChange={handleChange} />
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormInput label="Department Code" name="departmentCode" placeholder="SC-PKD-102" onChange={handleChange} required />
                                        <FormInput label="Official employee ID" name="officialId" placeholder="OFF-2026-X8" onChange={handleChange} required />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="pt-8 border-t border-emerald-100">
                            <button type="submit" className="w-full btn-primary !py-6 text-xl shadow-2xl group">
                                Initialize Account <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <p className="text-center mt-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                Already registered? <Link href="/login" className="text-emerald-600 hover:underline">Sign In Instead</Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}

const FormInput = ({ label, ...props }) => (
    <div className="space-y-2 group">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1 group-focus-within:text-emerald-600 transition-colors">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-6 py-4 bg-gray-50/50 border rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm"
        />
    </div>
);
