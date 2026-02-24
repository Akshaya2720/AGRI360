"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Home,
    PlusCircle,
    History,
    LogOut,
    Globe,
    LayoutDashboard,
    CheckCircle,
    ShieldCheck,
    Sprout,
    CreditCard,
    Settings,
    Bell
} from 'lucide-react';

const farmerLinks = [
    { name: 'Overview', icon: Home, path: '/dashboard/farmer' },
    { name: 'Submit Paddy', icon: PlusCircle, path: '/dashboard/farmer/submit' },
    { name: 'History', icon: History, path: '/dashboard/farmer/history' },
    { name: 'Credit Profile', icon: CreditCard, path: '/dashboard/farmer/credit' },
];

const officerLinks = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard/supplyco' },
    { name: 'Approvals', icon: CheckCircle, path: '/dashboard/supplyco/approvals' },
];

const Sidebar = () => {
    const { t, i18n } = useTranslation();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);

    if (!user) return null;

    const links = user.role === 'FARMER' ? farmerLinks : officerLinks;

    return (
        <div className="w-64 glass-morph h-screen fixed left-0 top-0 flex flex-col border-r border-white/50 shadow-[20px_0_50px_rgba(0,0,0,0.02)] z-[100]">
            <div className="p-8 pb-10">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-200">
                        <Sprout size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-gray-900 font-display">
                        AGRI<span className="text-emerald-600">360</span>
                    </span>
                </div>
                <div className="mt-8 p-4 rounded-2xl bg-white/50 border border-white shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Authenticated as</p>
                    <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-emerald-100 text-[9px] font-black text-emerald-700 uppercase tracking-tighter">
                        {user.role.replace('_', ' ')}
                    </span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`group relative flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-300 font-bold text-sm tracking-tight ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                    : 'text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                        >
                            <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                            <span>{link.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active"
                                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 space-y-2 mt-auto pb-8 border-t border-white/40">
                <button
                    onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ml' : 'en')}
                    className="flex items-center justify-between gap-3 p-3.5 w-full hover:bg-gray-100/50 rounded-2xl transition-all text-sm font-bold text-gray-600 border border-transparent hover:border-white"
                >
                    <div className="flex items-center gap-3">
                        <Globe size={18} />
                        <span>Language</span>
                    </div>
                    <span className="bg-white px-2 py-0.5 rounded-lg text-[10px] shadow-sm border">
                        {i18n.language === 'en' ? 'ML' : 'EN'}
                    </span>
                </button>

                <button
                    onClick={() => {
                        dispatch(logout());
                        router.push('/login');
                    }}
                    className="flex items-center gap-3 p-3.5 w-full text-red-500 hover:bg-red-50 rounded-2xl transition-all text-sm font-bold group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span>{t('logout')}</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
