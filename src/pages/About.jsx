import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import { ArrowLeft, Sparkles, Palette, Film, Layers, Globe, Star, Heart, Coffee, Rocket, Award } from 'lucide-react';

export default function About() {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [lenis, setLenis] = useState(null);
    const orbsRef = useRef(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });
        setLenis(lenisInstance);

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);

    // Parallax mouse effect (optimized with direct DOM manipulation)
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (orbsRef.current) {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                orbsRef.current.style.setProperty('--mouse-x', `${x}px`);
                orbsRef.current.style.setProperty('--mouse-y', `${y}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const textEnter = () => setCursorVariant("text");
    const textLeave = () => setCursorVariant("default");

    return (
        <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white md:cursor-none cursor-auto bg-black overflow-x-hidden">
            <CustomCursor cursorVariant={cursorVariant} />
            <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />

            {/* Floating Orbs Background */}
            <div ref={orbsRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}>
                <div
                    className="absolute w-96 h-96 rounded-full bg-purple-500/10 blur-[60px] animate-float-slow"
                    style={{
                        top: '10%',
                        left: '60%',
                        transform: 'translate(calc(var(--mouse-x) * 0.5), calc(var(--mouse-y) * 0.5))',
                        willChange: 'transform'
                    }}
                />
                <div
                    className="absolute w-64 h-64 rounded-full bg-pink-500/10 blur-[50px] animate-float-medium"
                    style={{
                        top: '50%',
                        left: '20%',
                        transform: 'translate(calc(var(--mouse-x) * -0.3), calc(var(--mouse-y) * -0.3))',
                        willChange: 'transform'
                    }}
                />
                <div
                    className="absolute w-48 h-48 rounded-full bg-blue-500/10 blur-[40px] animate-float-fast"
                    style={{
                        top: '70%',
                        right: '10%',
                        transform: 'translate(calc(var(--mouse-x) * 0.4), calc(var(--mouse-y) * 0.4))',
                        willChange: 'transform'
                    }}
                />
            </div>

            {/* Floating animation styles */}
            <style>{`
                @keyframes floatSlow {
                    0%, 100% { transform: translate(calc(var(--mouse-x, 0px) * 0.5), calc(var(--mouse-y, 0px) * 0.5)); }
                    25% { transform: translate(calc(var(--mouse-x, 0px) * 0.5 + 80px), calc(var(--mouse-y, 0px) * 0.5 - 60px)); }
                    50% { transform: translate(calc(var(--mouse-x, 0px) * 0.5 - 40px), calc(var(--mouse-y, 0px) * 0.5 + 90px)); }
                    75% { transform: translate(calc(var(--mouse-x, 0px) * 0.5 - 70px), calc(var(--mouse-y, 0px) * 0.5 - 30px)); }
                }
                @keyframes floatMedium {
                    0%, 100% { transform: translate(calc(var(--mouse-x, 0px) * -0.3), calc(var(--mouse-y, 0px) * -0.3)); }
                    25% { transform: translate(calc(var(--mouse-x, 0px) * -0.3 - 60px), calc(var(--mouse-y, 0px) * -0.3 + 50px)); }
                    50% { transform: translate(calc(var(--mouse-x, 0px) * -0.3 + 70px), calc(var(--mouse-y, 0px) * -0.3 + 80px)); }
                    75% { transform: translate(calc(var(--mouse-x, 0px) * -0.3 + 40px), calc(var(--mouse-y, 0px) * -0.3 - 70px)); }
                }
                @keyframes floatFast {
                    0%, 100% { transform: translate(calc(var(--mouse-x, 0px) * 0.4), calc(var(--mouse-y, 0px) * 0.4)); }
                    25% { transform: translate(calc(var(--mouse-x, 0px) * 0.4 + 50px), calc(var(--mouse-y, 0px) * 0.4 + 75px)); }
                    50% { transform: translate(calc(var(--mouse-x, 0px) * 0.4 - 65px), calc(var(--mouse-y, 0px) * 0.4 - 55px)); }
                    75% { transform: translate(calc(var(--mouse-x, 0px) * 0.4 - 80px), calc(var(--mouse-y, 0px) * 0.4 + 40px)); }
                }
                .animate-float-slow { animation: floatSlow 25s ease-in-out infinite; }
                .animate-float-medium { animation: floatMedium 30s ease-in-out infinite; }
                .animate-float-fast { animation: floatFast 22s ease-in-out infinite; }
            `}</style>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 relative">
                    {/* Floating Stars */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute animate-pulse"
                                style={{
                                    top: `${15 + i * 15}%`,
                                    left: `${10 + i * 15}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    opacity: 0.3
                                }}
                            >
                                <Star size={8 + i * 2} className="text-purple-400" fill="currentColor" />
                            </div>
                        ))}
                    </div>

                    <FadeIn>
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs tracking-widest uppercase mb-8">
                                <Sparkles size={14} />
                                The Story
                            </div>
                            <h1 className="font-serif italic text-5xl md:text-8xl mb-8 leading-tight">
                                Meet <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Kalopsia</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-2xl mx-auto" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <span className="text-white font-medium">ka·lop·si·a</span> — <em>the delusion of things being more beautiful than they are.</em>
                            </p>
                        </div>
                    </FadeIn>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 stroke-white">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </section>

                {/* The Story Section */}
                <section className="py-20 md:py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                                {/* Artistic Element */}
                                <div className="relative aspect-square flex items-center justify-center order-2 md:order-1">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-purple-500/20 animate-[spin_20s_linear_infinite]" />
                                        <div className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-pink-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                                        <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border border-blue-500/20 animate-[spin_10s_linear_infinite]" />
                                        <div className="absolute w-4 h-4 rounded-full bg-purple-500 animate-pulse" />
                                    </div>
                                    <span className="font-serif italic text-7xl md:text-9xl text-white/5 select-none">EM</span>
                                </div>

                                {/* Story Text */}
                                <div className="space-y-6 order-1 md:order-2" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <h2 className="font-serif italic text-3xl md:text-5xl mb-6 flex items-center gap-4">
                                        <span className="w-8 h-[1px] bg-purple-500/50"></span>
                                        The Man Behind
                                    </h2>
                                    <p className="text-zinc-400 text-lg leading-relaxed">
                                        I'm <span className="text-white font-medium">Eashan Misra</span>, a multi-disciplinary design lead from India, crafting visual stories that transcend the ordinary. For over 8 years, I've been on a mission to make the digital world a little more beautiful, a little more meaningful.
                                    </p>
                                    <p className="text-zinc-400 text-lg leading-relaxed">
                                        Under the alias <span className="text-purple-400 font-medium">Mr. Kalopsia</span>, I create cosmic dreamscapes and cinematic experiences—from the depths of space to the edges of imagination. My work has been featured by <span className="text-white">Adobe</span>, exhibited in <span className="text-white">Paris</span>, and recognized by <span className="text-white">Ann Druyan</span>, co-creator of Cosmos.
                                    </p>
                                    <p className="text-zinc-400 text-lg leading-relaxed">
                                        I believe great design isn't just seen—it's <em>felt</em>.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* What I Do Section */}
                <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
                    <div className="max-w-5xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <h2 className="font-serif italic text-4xl md:text-6xl mb-4">What I Do</h2>
                                <p className="text-zinc-400 text-lg">Crafting experiences across multiple dimensions</p>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FadeIn delay={100}>
                                <ServiceCard
                                    icon={<Film size={32} />}
                                    title="Motion Design"
                                    description="Bringing static visuals to life with cinematic motion graphics, explainer videos, and dynamic brand content."
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                />
                            </FadeIn>
                            <FadeIn delay={200}>
                                <ServiceCard
                                    icon={<Layers size={32} />}
                                    title="3D Animation"
                                    description="Creating immersive 3D worlds and characters using Cinema 4D, Blender, and Unreal Engine 5."
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                />
                            </FadeIn>
                            <FadeIn delay={300}>
                                <ServiceCard
                                    icon={<Palette size={32} />}
                                    title="Art Direction"
                                    description="Defining visual strategies and creative visions for brands, campaigns, and digital products."
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                />
                            </FadeIn>
                            <FadeIn delay={400}>
                                <ServiceCard
                                    icon={<Globe size={32} />}
                                    title="Visual Storytelling"
                                    description="Transforming complex ideas into compelling visual narratives that resonate and inspire."
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                />
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* The Journey Timeline */}
                <section className="py-20 md:py-32 px-6">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <h2 className="font-serif italic text-4xl md:text-6xl mb-4">The Journey</h2>
                                <p className="text-zinc-400 text-lg">Key milestones along the way</p>
                            </div>
                        </FadeIn>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50 transform md:-translate-x-1/2" />

                            {JOURNEY_MILESTONES.map((milestone, index) => (
                                <FadeIn key={index} delay={index * 150}>
                                    <TimelineItem
                                        {...milestone}
                                        isLeft={index % 2 === 0}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                    />
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fun Facts */}
                <section className="py-20 md:py-32 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <h2 className="font-serif italic text-4xl md:text-6xl mb-4">Beyond The Pixels</h2>
                                <p className="text-zinc-400 text-lg">A few things that fuel the creativity</p>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {FUN_FACTS.map((fact, index) => (
                                <FadeIn key={index} delay={index * 100}>
                                    <div
                                        className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center hover:bg-white/10 hover:border-purple-500/20 transition-all duration-500 group"
                                        onMouseEnter={textEnter}
                                        onMouseLeave={textLeave}
                                    >
                                        <div className="text-purple-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                                            {fact.icon}
                                        </div>
                                        <h4 className="text-white font-medium mb-1">{fact.title}</h4>
                                        <p className="text-zinc-500 text-sm">{fact.subtitle}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 md:py-32 px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <FadeIn>
                            <div className="p-10 md:p-16 rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-purple-500/20">
                                    <Star size={48} fill="currentColor" />
                                </div>
                                <h2 className="font-serif italic text-3xl md:text-5xl mb-6" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    Let's create something <span className="text-purple-400">extraordinary</span>
                                </h2>
                                <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    Whether it's a cosmic journey or a brand story, I'm always excited to bring bold ideas to life.
                                </p>
                                <a
                                    href="mailto:em@mrkalopsia.com"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-lg font-semibold hover:bg-purple-200 transition-all duration-300"
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                >
                                    Say Hello
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Footer */}
                <FadeIn>
                    <div className="py-12 border-t border-white/10 max-w-4xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <a href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                            </a>
                            <p className="text-zinc-600 text-sm">© 2025 Mr. Kalopsia. Eashan Misra.</p>
                        </div>
                    </div>
                </FadeIn>
            </main>
        </div>
    );
}

// Service Card Component
function ServiceCard({ icon, title, description, textEnter, textLeave }) {
    return (
        <div
            className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/20 transition-all duration-500 group h-full"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
        >
            <div className="text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-purple-400 transition-colors">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">{description}</p>
        </div>
    );
}

// Timeline Item Component
function TimelineItem({ year, title, description, isLeft, textEnter, textLeave }) {
    return (
        <div className={`relative flex items-center mb-12 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-purple-500 border-2 border-black transform -translate-x-1/2 z-10" />

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'}`}>
                <div
                    className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/20 transition-all duration-500"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                >
                    <span className="text-purple-400 text-sm font-mono">{year}</span>
                    <h4 className="text-xl font-serif text-white mt-1 mb-2">{title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

// Data
const JOURNEY_MILESTONES = [
    {
        year: "2016",
        title: "Mr. Kalopsia is Born",
        description: "Started my journey as a digital artist, creating cosmic dreamscapes that would define my visual identity."
    },
    {
        year: "2017",
        title: "First Industry Role",
        description: "Joined Inshorts as a designer, eventually leading a team of 30 creatives for India's top news app."
    },
    {
        year: "2019",
        title: "Adobe Feature",
        description: "Featured by Adobe Blog for International Day of Human Space Flight, marking global recognition."
    },
    {
        year: "2020",
        title: "NFT Pioneer",
        description: "\"Life Of A Spaceman\" NFT collection sold out in 2 minutes on Crypto.com."
    },
    {
        year: "2023",
        title: "Futureverse Era",
        description: "Joined Futureverse as Senior Visual Designer, helping secure their $54M Series A."
    },
    {
        year: "2024",
        title: "Paris Exhibition",
        description: "Work exhibited publicly across Paris through Artpoint, plus became ViewSonic ColorPro Awards Judge."
    },
    {
        year: "2025",
        title: "Wilder World",
        description: "Currently shaping the visual future of Web3 as Senior Motion Designer at Wilder World."
    }
];

const FUN_FACTS = [
    { icon: <Rocket size={28} />, title: "Space Nerd", subtitle: "Cosmos is life" },
    { icon: <Coffee size={28} />, title: "Night Owl", subtitle: "Best ideas at 2AM" },
    { icon: <Heart size={28} />, title: "Dog Person", subtitle: "100% good boys" },
    { icon: <Award size={28} />, title: "Film Buff", subtitle: "Nolan fan club" }
];
