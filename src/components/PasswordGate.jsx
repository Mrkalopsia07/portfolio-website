import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

const CORRECT_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || '';

export default function PasswordGate({ onAuthenticated }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    React.useEffect(() => {
        sessionStorage.removeItem("introShown");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            onAuthenticated();
        } else {
            setError(true);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Lock Icon */}
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <Lock size={32} className="text-purple-400" />
                </div>

                {/* Title */}
                <h1 className="font-serif italic text-4xl md:text-5xl mb-3 text-center">Preview Access</h1>
                <p className="text-zinc-400 text-center mb-10">
                    This site is currently under construction.<br />
                    Enter the password to continue.
                </p>

                {/* Password Form */}
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className={`relative mb-4 ${isShaking ? 'animate-shake' : ''}`}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Enter password"
                            className={`w-64 px-6 py-4 rounded-full bg-white/5 border ${error ? 'border-red-500' : 'border-white/10'} text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-center text-lg`}
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center mb-4">
                            Incorrect password. Please try again.
                        </p>
                    )}

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-purple-200 transition-all duration-300 text-lg"
                    >
                        <span>Enter Site</span>
                        <ArrowRight size={20} />
                    </button>
                </form>
            </div>

            {/* Custom shake animation style */}
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}
