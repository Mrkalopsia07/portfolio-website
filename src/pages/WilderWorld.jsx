import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Play, Eye, Maximize, Clock, Users, Video } from 'lucide-react';
import Lenis from 'lenis';
import { Link } from 'react-router-dom';

const WilderWorld = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>
            </nav>

            {/* 1. HERO */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Background Video Placeholder */}
                <div className="absolute inset-0 z-0 bg-zinc-900">
                    {/* Replace with actual video/GIF */}
                    <video
                        className="w-full h-full object-cover opacity-60"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/assets/projects/wilder-world.jpg"
                    >
                        <source src="/assets/projects/wilder-world.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                    <h5 className="text-purple-400 font-bold tracking-widest uppercase mb-6 text-sm md:text-base animate-fade-in">Metropolis Launch</h5>
                    <h1 className="font-serif italic text-6xl md:text-8xl lg:text-9xl mb-8 leading-none animate-fade-in delay-100">Wilder World</h1>
                    <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-12 font-light animate-fade-in delay-200">
                        Cinematic 3D explainer bringing Web3's most ambitious virtual city to life
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs md:text-sm font-medium tracking-wider uppercase text-zinc-400 animate-fade-in-up delay-300">
                        <div className="flex items-center gap-3">
                            <Eye size={18} className="text-white" />
                            <span>580K+ Views</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock size={18} className="text-white" />
                            <span>90 Seconds</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users size={18} className="text-white" />
                            <span>1 Month Production</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE CHALLENGE */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                    <div className="relative aspect-[4/5] md:aspect-square bg-zinc-900 rounded-lg overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-zinc-600 font-serif italic text-4xl">Visual Placeholder: Glitch/Before</span>
                        </div>
                    </div>

                    <div className="space-y-16">
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">The Brief</h3>
                            <p className="text-2xl md:text-3xl font-serif italic leading-snug">
                                Create a 90-second cinematic experience that introduces Metropolis to a global audience while capturing its scale and ambition.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-zinc-500 mb-4">My Approach</h3>
                            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                                Treat the city as a character — guide viewers on an emotional journey from grand vistas to intimate details.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. VISUAL STRATEGY */}
            <section className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-4xl md:text-6xl font-serif italic mb-20 text-center">Visual Strategy</h2>

                    {/* Narrative Structure */}
                    <div className="mb-24">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-10 text-center">Narrative Structure</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "Act 1: The Reveal", icon: Maximize, desc: "Establish scale through atmospheric establishing shots" },
                                { title: "Act 2: The Details", icon: Eye, desc: "Descend to street level, reveal intricate design" },
                                { title: "Act 3: The Possibilities", icon: Users, desc: "Pull back to show endless exploration potential" }
                            ].map((item, i) => (
                                <div key={i} className="bg-zinc-900/50 p-8 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                                    <item.icon size={32} className="text-purple-400 mb-6" />
                                    <h4 className="text-xl font-medium mb-3">{item.title}</h4>
                                    <p className="text-zinc-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual Language */}
                    <div className="mb-24">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-10 text-center">Visual Language</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { label: "Scale", sub: "Vertical Architecture", color: "bg-blue-900/20" },
                                { label: "Atmosphere", sub: "Volumetric Lighting", color: "bg-purple-900/20" },
                                { label: "Motion", sub: "Cinematic Camera Work", color: "bg-pink-900/20" }
                            ].map((item, i) => (
                                <div key={i} className={`aspect-[3/4] ${item.color} rounded-xl relative overflow-hidden group border border-white/5`}>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <span className="text-2xl font-serif italic mb-2">{item.label}</span>
                                        <span className="text-xs uppercase tracking-wider text-zinc-400">{item.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color & Mood */}
                    <div className="text-center max-w-3xl mx-auto">
                        <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-10">Color & Mood Strategy</h3>
                        <div className="flex h-32 w-full rounded-2xl overflow-hidden mb-8">
                            <div className="flex-1 bg-[#FFD700]" title="Golden Hour" />
                            <div className="flex-1 bg-[#FFA500]" />
                            <div className="flex-1 bg-[#FF4500]" />
                            <div className="flex-1 bg-[#1a1a1a]" />
                        </div>
                        <p className="text-xl text-zinc-300">
                            <span className="text-yellow-500 font-medium">Golden hour warmth</span> → Aspirational, inviting tone. Avoiding cold cyberpunk clichés.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. STORYBOARD */}
            <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-serif italic mb-20 text-center">Storyboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="space-y-4">
                            <div className="aspect-video bg-zinc-900 rounded-lg border border-white/10 flex items-center justify-center">
                                <span className="text-zinc-600">Frame {num}</span>
                            </div>
                            <div className="flex justify-between items-start text-sm">
                                <p className="text-zinc-300 max-w-[80%]">Camera pans down to reveal city depth.</p>
                                <span className="text-zinc-500 font-mono text-xs">00:{(num * 5).toString().padStart(2, '0')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. PROCESS */}
            <section className="py-24 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-4xl md:text-6xl font-serif italic mb-20 text-center">Process</h2>

                    <div className="space-y-32">
                        {/* Environment */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-medium text-center">Environment Building</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-500">Blockout</div>
                                <div className="aspect-video bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500">Assets</div>
                                <div className="aspect-video bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-500">Final Render</div>
                            </div>
                        </div>

                        {/* Lighting */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-medium text-center">Lighting Development</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {["Morning", "Golden Hour", "Dusk", "Night"].map((time) => (
                                    <div key={time} className="space-y-2 text-center">
                                        <div className="aspect-[4/5] bg-zinc-900 rounded-lg border border-white/10" />
                                        <span className="text-sm text-zinc-400">{time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. KEY SCENES */}
            <section className="py-24 max-w-[1920px] mx-auto">
                <div className="space-y-24">
                    {[
                        { title: "The Opening Vista", desc: "Volumetric god rays create natural leading lines toward the city's core." },
                        { title: "Street Level Intimacy", desc: "Transition to ground perspective reveals architectural detail and scale." },
                        { title: "Vertical Reveal", desc: "Upward camera movement emphasizes impossible height." },
                        { title: "The Hero Moment", desc: "Final wide showcases Metropolis as a complete urban ecosystem." }
                    ].map((scene, i) => (
                        <div key={i} className="relative group">
                            <div className="aspect-[21/9] w-full bg-zinc-900 overflow-hidden relative">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                                <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-4xl">
                                    <h3 className="text-3xl md:text-5xl font-serif italic mb-4 text-white">{scene.title}</h3>
                                    <p className="text-lg md:text-xl text-zinc-300">{scene.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. FINAL RESULT */}
            <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-serif italic mb-12">The Impact</h2>

                <div className="aspect-video w-full bg-zinc-900 rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl shadow-purple-900/20 relative group">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                            <Play size={32} className="fill-white ml-2" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-4xl font-bold text-purple-400 mb-2">580K+</div>
                        <div className="text-sm uppercase tracking-wider text-zinc-400">Views on X</div>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-xl font-bold text-white mb-2">Most Successful</div>
                        <div className="text-sm uppercase tracking-wider text-zinc-400">Content Release</div>
                    </div>
                    <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                        <div className="text-xl font-bold text-white mb-2">Established Visuals</div>
                        <div className="text-sm uppercase tracking-wider text-zinc-400">For ongoing partnership</div>
                    </div>
                </div>

                <p className="text-zinc-500 uppercase tracking-widest text-sm">Client: Wilder World | Year: 2025</p>
            </section>

            {/* 8. TOOLS */}
            <section className="py-24 bg-zinc-950 text-center border-t border-white/5">
                <h3 className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-12">Tools Used</h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
                    {["Unreal Engine 5", "After Effects", "Premiere Pro", "DaVinci Resolve"].map((tool) => (
                        <span key={tool} className="text-xl md:text-2xl font-serif italic text-white">{tool}</span>
                    ))}
                </div>
            </section>

            {/* Next Project Footer */}
            <section className="h-[50vh] flex items-center justify-center bg-zinc-900 relative overflow-hidden group">
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-purple-900/20" />
                <Link to="/" className="relative z-10 text-center">
                    <span className="block text-sm uppercase tracking-widest text-zinc-400 mb-4">Next Project</span>
                    <h2 className="text-5xl md:text-8xl font-serif italic">Kalopsia</h2>
                </Link>
            </section>

            {/* Footer */}
            <div className="py-12 border-t border-white/10 max-w-7xl mx-auto px-6 bg-black z-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                    </Link>
                    <p className="text-zinc-600 text-sm">© 2025 Mr. Kalopsia. Eashan Misra.</p>
                </div>
            </div>
        </div>
    );
};

export default WilderWorld;
