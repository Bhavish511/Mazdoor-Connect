import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { mockWorkers, mockBookings } from "@/lib/mock-data";

const translations = {
    en: {
        "app.name": "Mazdoor Connect",
        "app.tagline": "Verified Workers in 1 Hour",
        "app.taglineUrdu": "محفوظ اور تصدیق شدہ کاریگر",
        "hero.headline": "Find Trusted & Verified Workers",
        "hero.subheadline": "Police verified workers • Fixed prices • Damage protection up to Rs. 25,000",
        "cta.findWorker": "Find a Worker",
        "cta.bookNow": "Book Now",
        "cta.viewProfile": "View Profile",
        "cta.viewAll": "View All",
        "nav.home": "Home",
        "nav.categories": "Categories",
        "nav.howItWorks": "How It Works",
        "nav.about": "About",
        "nav.contact": "Contact",
        "nav.login": "Login",
        "nav.signup": "Sign Up",
        "nav.dashboard": "Dashboard",
        "nav.bookings": "My Bookings",
        "nav.favorites": "Favorites",
        "nav.profile": "Profile",
        "nav.logout": "Logout",
        "category.electrician": "Electrician",
        "category.plumber": "Plumber",
        "category.ac-mechanic": "AC Mechanic",
        "category.carpenter": "Carpenter",
        "category.painter": "Painter",
        "stats.happyCustomers": "Happy Customers",
        "stats.verifiedWorkers": "Verified Workers",
        "stats.avgRating": "Average Rating",
        "stats.jobsCompleted": "Jobs Completed",
        "howItWorks.step1.title": "Browse & Select Worker",
        "howItWorks.step1.desc": "Search through our verified workers and choose the right one for your needs",
        "howItWorks.step2.title": "Book Appointment",
        "howItWorks.step2.desc": "Select a convenient time slot and provide your address details",
        "howItWorks.step3.title": "Get Work Done",
        "howItWorks.step3.desc": "Our verified worker arrives on time and completes the job professionally",
        "trust.cnicVerified": "CNIC Verified",
        "trust.policeVerified": "Police Verified",
        "trust.skillTested": "Skill Tested",
        "trust.damageProtection": "Damage Protection",
        "worker.available": "Available Today",
        "worker.reviews": "reviews",
        "worker.jobs": "jobs completed",
        "worker.perService": "per service",
        "worker.memberSince": "Member since",
        "booking.status.pending": "Pending Confirmation",
        "booking.status.confirmed": "Confirmed",
        "booking.status.in-progress": "In Progress",
        "booking.status.completed": "Completed",
        "booking.status.cancelled": "Cancelled",
        "footer.rights": "All rights reserved",
    },
    ur: {
        "app.name": "مزدور کنیکٹ",
        "app.tagline": "ایک گھنٹے میں تصدیق شدہ کاریگر",
        "app.taglineUrdu": "محفوظ اور تصدیق شدہ کاریگر",
        "hero.headline": "قابل اعتماد اور تصدیق شدہ کاریگر تلاش کریں",
        "hero.subheadline": "پولیس تصدیق شدہ کاریگر • مقررہ قیمتیں • 25,000 روپے تک نقصان کا تحفظ",
        "cta.findWorker": "کاریگر تلاش کریں",
        "cta.bookNow": "ابھی بک کریں",
        "cta.viewProfile": "پروفائل دیکھیں",
        "cta.viewAll": "سب دیکھیں",
        "nav.home": "ہوم",
        "nav.categories": "کیٹیگریز",
        "nav.howItWorks": "کیسے کام کرتا ہے",
        "nav.about": "ہمارے بارے میں",
        "nav.contact": "رابطہ",
        "nav.login": "لاگ ان",
        "nav.signup": "سائن اپ",
        "nav.dashboard": "ڈیش بورڈ",
        "nav.bookings": "میری بکنگز",
        "nav.favorites": "پسندیدہ",
        "nav.profile": "پروفائل",
        "nav.logout": "لاگ آوٹ",
        "category.electrician": "الیکٹریشن",
        "category.plumber": "پلمبر",
        "category.ac-mechanic": "اے سی مکینک",
        "category.carpenter": "بڑھئی",
        "category.painter": "پینٹر",
        "stats.happyCustomers": "خوش گاہک",
        "stats.verifiedWorkers": "تصدیق شدہ کاریگر",
        "stats.avgRating": "اوسط درجہ بندی",
        "stats.jobsCompleted": "مکمل کام",
        "howItWorks.step1.title": "براؤز اور منتخب کریں",
        "howItWorks.step1.desc": "ہمارے تصدیق شدہ کاریگروں میں سے اپنی ضرورت کے مطابق منتخب کریں",
        "howItWorks.step2.title": "اپائنٹمنٹ بک کریں",
        "howItWorks.step2.desc": "مناسب وقت کا انتخاب کریں اور اپنے پتے کی تفصیلات فراہم کریں",
        "howItWorks.step3.title": "کام مکمل کروائیں",
        "howItWorks.step3.desc": "ہمارا تصدیق شدہ کاریگر وقت پر پہنچتا ہے اور پیشہ ورانہ طریقے سے کام مکمل کرتا ہے",
        "trust.cnicVerified": "شناختی کارڈ تصدیق شدہ",
        "trust.policeVerified": "پولیس تصدیق شدہ",
        "trust.skillTested": "مہارت کا ٹیسٹ",
        "trust.damageProtection": "نقصان کا تحفظ",
        "worker.available": "آج دستیاب",
        "worker.reviews": "جائزے",
        "worker.jobs": "مکمل کام",
        "worker.perService": "فی سروس",
        "worker.memberSince": "ممبر بنے",
        "booking.status.pending": "تصدیق زیر التوا",
        "booking.status.confirmed": "تصدیق شدہ",
        "booking.status.in-progress": "جاری",
        "booking.status.completed": "مکمل",
        "booking.status.cancelled": "منسوخ",
        "footer.rights": "جملہ حقوق محفوظ ہیں",
    },
};

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
    const [language, setLanguage] = useState("en");
    const [favoriteWorkers, setFavoriteWorkers] = useState([]);
    const [workers] = useState(mockWorkers);
    const [bookings, setBookings] = useState(mockBookings);
    const [searchQuery, setSearchQuery] = useState("");

    const t = useCallback(
        (key) => {
            return translations[language][key] || key;
        },
        [language]
    );

    const toggleFavorite = useCallback((workerId) => {
        setFavoriteWorkers((prev) =>
            prev.includes(workerId)
                ? prev.filter((id) => id !== workerId)
                : [...prev, workerId]
        );
    }, []);

    const isFavorite = useCallback(
        (workerId) => favoriteWorkers.includes(workerId),
        [favoriteWorkers]
    );

    const getWorkerById = useCallback(
        (id) => workers.find((w) => w.id === id),
        [workers]
    );

    const getWorkersByCategory = useCallback(
        (category) =>
            workers.filter((w) => w.category === category),
        [workers]
    );

    const getFeaturedWorkers = useCallback(
        () =>
            [...workers]
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 6),
        [workers]
    );

    const addBooking = useCallback((booking) => {
        setBookings((prev) => [booking, ...prev]);
    }, []);

    const updateBookingStatus = useCallback(
        (id, status) => {
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status } : b))
            );
        },
        []
    );

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            t,
            favoriteWorkers,
            toggleFavorite,
            isFavorite,
            workers,
            getWorkerById,
            getWorkersByCategory,
            getFeaturedWorkers,
            bookings,
            addBooking,
            updateBookingStatus,
            searchQuery,
            setSearchQuery,
        }),
        [
            language,
            t,
            favoriteWorkers,
            toggleFavorite,
            isFavorite,
            workers,
            getWorkerById,
            getWorkersByCategory,
            getFeaturedWorkers,
            bookings,
            addBooking,
            updateBookingStatus,
            searchQuery,
        ]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
