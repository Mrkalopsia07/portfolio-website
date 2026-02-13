import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function GlowingStackCard({ href }) {
    return (
        <a
            href={href}
            className="group relative w-full aspect-[16/10] bg-[#050507] border border-transparent flex flex-col items-center justify-center overflow-hidden hover:border-white/30 transition-colors duration-500 cursor-pointer rounded-sm"
        >
            {/* 1. Background Grid Pattern (Reveals on Hover) */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{
                    backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            >
            </div>

            {/* 2. Content with Underline Animation */}
            <div className="relative z-10 flex flex-col items-center gap-6">

                {/* Main Text Link */}
                <div className="flex items-center gap-4">
                    <span className="relative font-['Work_Sans',sans-serif] text-xl md:text-3xl text-white font-light tracking-tight">
                        View All Projects
                        {/* The Sliding Underline */}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"></span>
                    </span>

                    {/* Subtle Arrow */}
                    <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-2" />
                </div>

                {/* Tech Label (Optional subtle detail) */}
                <span className="font-['JetBrains_Mono',monospace] text-[10px] text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] delay-100">
                    [ FULL_ARCHIVE ]
                </span>
            </div>
        </a>
    );
}
