const translations = {
    en: {
        title_agri: 'Agri',
        title_360: '360',
        hero_desc: 'State-wide Agricultural Liquidity Node',
        btn_get_started: 'Get Started',
        signin: 'Stakeholder Sign In',
        footer_gov: 'Secured by Kerala IT Cell',
        nav_dashboard: 'Dashboard',
        nav_harvest: 'Harvest Logs',
        nav_payout: 'Payout History',
        nav_analytics: 'Regional Yield',
        nav_logistics: 'Logistics Node',
        nav_hub: 'Hub Center',
        nav_queue: 'Approval Queue',
        nav_yield_supplyco: 'Yield Analytics',
        nav_mill_center: 'Milling Center',
        nav_quality: 'Quality Checks',
        nav_stock: 'Stock Inventory',
        nav_intel: 'Intelligence Node',
        nav_fraud: 'Fraud Monitoring',
        nav_escrow: 'Escrow Core',
        nav_settlements: 'Settlements',
        greeting: 'Pranam',
        login_title: 'Sign In',
        login_hero: 'Kerala\'s Secure Node.',
        login_desc: 'Enter your credentials to access the central procurement and liquidity network.',
        signup_title: 'Join Agri360',
        signup_desc: 'Select your stakeholder role to initialize the onboarding node.',
        footer_copyright: '© 2026 Agri-Escrow 360 AI Platform'
    },
    ml: {
        title_agri: 'അഗ്രി',
        title_360: '360',
        hero_desc: 'സംസ്ഥാനതല കാർഷിക പണലഭ്യതാ ശൃംഖല',
        btn_get_started: 'ആരംഭിക്കുക',
        signin: 'സ്റ്റേക്ക്ഹോൾഡർ ലോഗിൻ',
        footer_gov: 'കേരള ഐടി സെൽ സുരക്ഷിതം',
        nav_dashboard: 'ഡാഷ്‌ബോർഡ്',
        nav_harvest: 'വിളവെടുപ്പ് രേഖകൾ',
        nav_payout: 'പേയ്മെന്റ് ചരിത്രം',
        nav_analytics: 'പ്രാദേശിക വിളവ്',
        nav_logistics: 'ലോജിസ്റ്റിക് നോഡ്',
        nav_hub: 'ഹബ് സെന്റർ',
        nav_queue: 'അപ്രൂവൽ ക്യൂ',
        nav_yield_supplyco: 'യീൽഡ് അനലിറ്റിക്സ്',
        nav_mill_center: 'മില്ലിംഗ് സെന്റർ',
        nav_quality: 'ക്വാളിറ്റി ചെക്കുകൾ',
        nav_stock: 'സ്റ്റോക്ക് ഇൻവെന്ററി',
        nav_intel: 'ഇന്റലിജൻസ് നോഡ്',
        nav_fraud: 'ഫ്രോഡ് മോണിറ്ററിംഗ്',
        nav_escrow: 'എസ്ക്രോ കോർ',
        nav_settlements: 'സെറ്റിൽമെന്റുകൾ',
        greeting: 'നമസ്കാരം',
        login_title: 'സൈൻ ഇൻ',
        login_hero: 'കേരളത്തിന്റെ സുരക്ഷിത നോഡ്.',
        login_desc: 'സെൻട്രൽ പ്രൊക്യൂർമെന്റ്, ലിക്വിഡിറ്റി നെറ്റ്‌വർക്ക് എന്നിവ ആക്‌സസ് ചെയ്യുന്നതിന് നിങ്ങളുടെ ക്രെഡൻഷ്യലുകൾ നൽകുക.',
        signup_title: 'അഗ്രി360-ൽ ചേരുക',
        signup_desc: 'ഓൺബോർഡിംഗ് നോഡ് ആരംഭിക്കുന്നതിന് നിങ്ങളുടെ സ്റ്റേക്ക്ഹോൾഡർ റോൾ തിരഞ്ഞെടുക്കുക.',
        footer_copyright: '© 2026 അഗ്രി-എസ്ക്രോ 360 AI പ്ലാറ്റ്ഫോം'
    }
};

function getStoredLang() {
    return localStorage.getItem('agri_lang') || 'en';
}

function setStoredLang(lang) {
    localStorage.setItem('agri_lang', lang);
}

function applyTranslations(lang) {
    const t = translations[lang];

    // Global translation logic based on data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = t[key];
            } else {
                el.innerHTML = t[key];
            }
        }
    });

    // Handle specific complex items
    const titleLogo = document.getElementById('main-title');
    if (titleLogo) {
        titleLogo.innerHTML = `${t.title_agri}<span class="emerald-600">${t.title_360}</span>`;
    }
}

// Auto-init on script load
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getStoredLang();
    applyTranslations(currentLang);

    // Update switchers if they exist
    const btnEn = document.getElementById('btn-en');
    const btnMl = document.getElementById('btn-ml');
    if (btnEn && btnMl) {
        btnEn.classList.toggle('active', currentLang === 'en');
        btnMl.classList.toggle('active', currentLang === 'ml');
    }
});
