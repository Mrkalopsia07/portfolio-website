import React, { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function GlowingStackCard({ href }) {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <a href={href}
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="group relative w-full aspect-[16/10] perspective-1000 block"
        >
            <div className="relative w-full h-full transition-transform duration-500 ease-out">

                {/* Card 3 (Bottom Stack) */}
                <div className="absolute inset-0 bg-[#161420] rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:translate-x-6 group-hover:translate-y-4 group-hover:rotate-6 group-hover:opacity-40 opacity-0 scale-95 origin-bottom-right" />

                {/* Card 2 (Middle Stack) */}
                <div className="absolute inset-0 bg-[#161420] rounded-2xl border border-white/5 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] delay-75 group-hover:translate-x-3 group-hover:translate-y-2 group-hover:rotate-3 group-hover:opacity-60 opacity-0 scale-95 origin-bottom-right" />

                {/* Card 1 (Top/Main Card) */}
                <div className="absolute inset-0 bg-[#161420] rounded-2xl border border-white/10 flex flex-col items-center justify-center transition-all duration-300 ease-out shadow-[0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden group-hover:shadow-[0_20px_50px_-12px_rgba(100,20,150,0.5)]">

                    {/* Subtle Grid Pattern */}
                    <div className="absolute inset-0"
                        style={{ backgroundImage: 'linear-gradient(#262333 1px, transparent 1px), linear-gradient(90deg, #262333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

                    {/* Mouse Spotlight Overlay (Soft Glow) */}
                    <div className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                        style={{
                            opacity: opacity,
                            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(168, 85, 247, 0.15), transparent 40%)`
                        }}
                    />

                    {/* Border Spotlight (Sharp Glowing Line) */}
                    <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
                        style={{
                            opacity: opacity,
                            border: '1px solid rgba(168, 85, 247, 0.6)',
                            maskImage: `radial-gradient(200px circle at ${position.x}px ${position.y}px, black, transparent)`
                        }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-3">
                        <span className="text-lg font-medium text-white/90 tracking-wide group-hover:text-white transition-colors">
                            View All Projects
                        </span>
                        <div className="bg-white/10 p-2 rounded-full transition-all duration-300 group-hover:bg-white group-hover:text-[#240046] group-hover:translate-x-2">
                            <ArrowRight size={20} />
                        </div>
                    </div>

                </div>
            </div>
        </a>
    );
}
