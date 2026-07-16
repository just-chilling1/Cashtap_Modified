"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, LogIn, ShieldAlert, Eye, EyeOff, Target, Star, Users, DollarSign, ShieldCheck } from "lucide-react";
import { AuthAnimatedBackground } from "@/components/auth/AuthAnimatedBackground";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                router.push("/dashboard");
            }
        };
        checkSession();
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Attempting login for:", email);
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error("Login error:", error);
                setError(error.message);
                setLoading(false);
            } else if (data.user) {
                // Use window.location.href for a hard redirect to ensure middleware picks up cookies
                window.location.href = "/dashboard";
            } else {
                setLoading(false);
            }
        } catch (err: any) {
            console.error("Unexpected login failure:", err);
            setError("An unexpected system error occurred.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-3 sm:p-4 relative overflow-x-hidden overflow-hidden">
            <AuthAnimatedBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10 min-w-0"
            >
                <div className="glass-card p-4 sm:p-7 flex flex-col gap-4 sm:gap-5 border-[#141414] shadow-2xl">
                    <div className="flex flex-col items-center gap-2.5 text-center">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent flex items-center justify-center rounded-xl shadow-gold">
                            <Target size={28} className="text-black" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="brand-font text-[24px] sm:text-[28px] text-text-primary leading-tight">CashTap AI</h1>
                            <p className="text-xs sm:text-sm text-text-secondary">Premium Earning Accelerator</p>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-3.5 sm:gap-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-500/10 border border-red-500/20 p-4 rounded-sm flex items-center gap-3 text-red-400 text-sm"
                            >
                                <ShieldAlert size={18} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#475569] ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@email.com"
                                    className="input-base w-full pl-12 py-2.5"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#475569] ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="input-base w-full pl-12 pr-12 py-2.5"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#D4AF37] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end -mt-1">
                            <Link
                                href="/forgot-password"
                                className="text-[11px] text-text-muted hover:text-accent transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full mt-1 py-2.5 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "Logging in..." : (
                                    <>
                                        Log In
                                        <LogIn size={18} />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="flex flex-col items-center gap-2.5 border-t border-[#141414] pt-4">
                        <p className="text-[#475569] text-xs">New here?</p>
                        <Link
                            href="/signup"
                            className="brand-font text-accent text-xs font-bold tracking-wide hover:text-white transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Social Proof on Login */}
                    <div className="flex flex-col gap-2.5 border-t border-[#141414] pt-4">
                        <div className="flex items-center gap-2 justify-center">
                            <div className="flex -space-x-2">
                                {["bg-pink-500", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500"].map((c, i) => (
                                    <div key={i} className={`w-7 h-7 ${c} rounded-full border-2 border-[#161618] flex items-center justify-center text-[8px] font-black text-white`}>
                                        {["SM", "JR", "ML", "DR", "AK"][i]}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[11px] text-text-secondary font-medium ml-1">
                                <strong className="text-green-400">2,847</strong> members active now
                            </span>
                        </div>
                        <div className="flex items-center gap-4 justify-center text-[10px] text-text-muted">
                            <div className="flex items-center gap-1">
                                <DollarSign size={10} className="text-green-400" />
                                <span>$47K+ earned this month</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star size={10} className="text-accent fill-accent" />
                                <span>4.9/5 rating</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-4 text-[10px] text-text-muted">
                        <div className="flex items-center gap-1">
                            <ShieldCheck size={10} className="text-green-400" />
                            <span>256-bit Encrypted</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users size={10} className="text-blue-400" />
                            <span>10,000+ users</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
