import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import BackgroundScene from '../components/BackgroundScene';
import FloatingOrbs from '../components/FloatingOrbs';
import { ArrowLeft, ChevronDown, Mail } from 'lucide-react';

export default function About() {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            autoRaf: true,
        });
        setLenis(lenisInstance);

        return () => {
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);



    const textEnter = () => setCursorVariant("text");
    const textLeave = () => setCursorVariant("default");

    return (
        <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white md:cursor-none cursor-auto bg-black overflow-x-hidden relative">
            <CustomCursor cursorVariant={cursorVariant} />
            <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />

            {/* Background Scene - same as home page */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <BackgroundScene />
            </div>

            <main className="relative z-20">
                {/* Gradient Overlay - exact copy from App.jsx */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.8) 15%, #000 20%, #000 85%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0.3) 95%, transparent 100%)'
                }}></div>
                <div className="absolute inset-0 z-0 pointer-events-none md:hidden" style={{
                    background: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,0.8) 12%, #000 15%, #000 100%)'
                }}></div>

                {/* Floating Gradient Orbs - exact copy from App.jsx */}
                <FloatingOrbs />

                {/* Hero Section */}
                <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
                    <FadeIn>
                        <div className="text-center max-w-4xl mx-auto relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium mb-8">
                                About Me
                            </div>

                            {/* Title - exact match with home page */}
                            <h1 className="font-serif italic text-5xl md:text-[5.5rem] leading-none mb-5 w-full text-center tracking-[-0.02em]">
                                <span className="block text-white/70 text-[16px] font-light tracking-wide mb-3 not-italic" style={{ fontFamily: 'inherit' }}>
                                    Eashan Misra is
                                </span>
                                Mr. Kalopsia
                            </h1>

                            {/* Subtitle - exact match with home page: text-[16px] */}
                            <p className="text-white/70 max-w-[480px] text-[16px] leading-relaxed mb-10 font-light mx-auto" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                A multi-disciplinary motion designer and 3D artist who's spent the last <span className="text-white font-normal">8+ years</span> turning creative curiosity into career-defining work.
                            </p>

                            {/* Stats - matching home page colors */}
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                                {[
                                    { value: "160K+", label: "Global Followers" },
                                    { value: "8+", label: "Years Experience" }
                                ].map((stat, i) => (
                                    <div key={i} className="px-4">
                                        <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs text-zinc-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                        <ChevronDown size={24} />
                    </div>
                </section>

                {/* Introduction - text-[16px] to match */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <p className="text-[16px] md:text-lg text-white/70 leading-relaxed mb-8 font-light" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                My portfolio includes collaborations with <span className="text-white font-normal">Logan Paul, Gillette, Western Digital, Wilder World</span>, and recognition from <span className="text-white font-normal">Adobe, ViewSonic, and Ann Druyan</span> (co-creator of Cosmos). I've built a global audience, had my work exhibited across <span className="text-white font-normal">Paris</span>, and helped drive campaigns that generated <span className="text-white font-normal">millions of views</span>.
                            </p>
                            <p className="text-xl md:text-2xl font-serif italic text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                But none of this was the plan.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* The Accidental Beginning */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                                {/* Adobe Feature Image - no shadow/stroke */}
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black order-2 md:order-1">
                                    <img
                                        src="/assets/about/adobe-feature.jpg"
                                        alt="Adobe Feature - Mr. Kalopsia"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex-col items-center justify-center text-zinc-600 hidden">
                                        <span className="text-sm text-zinc-500">adobe-feature.jpg</span>
                                    </div>
                                </div>

                                {/* Story Text */}
                                <div className="space-y-6 order-1 md:order-2 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium">
                                        The Accidental Beginning
                                    </div>
                                    <h2 className="font-serif italic text-3xl md:text-5xl leading-tight text-white">
                                        I wanted to be an astronaut.
                                    </h2>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        When that wasn't in the cards, I found another way to explore the cosmos: through art. I taught myself Photoshop and started creating space-themed digital art under the name "Kalopsia," posting every single day on Instagram.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Not because I thought it would become a career, social media wasn't what it is today, but because <span className="text-white font-normal">I loved creating, and I wanted to share that with the world</span>.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Then something unexpected happened. <span className="text-white font-normal">Adobe featured my work</span> on their blog for International Day of Human Space Flight. Photoshop followed me as one of the first Indian artists on their official account. <span className="text-white font-normal">Ann Druyan herself</span> sent me a personal email saying my tribute to Carl Sagan moved her unlike any space art she'd encountered.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* The Defining Moment */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="text-left mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium mb-6">
                                    The Defining Moment
                                </div>
                                <h2 className="font-serif italic text-3xl md:text-5xl leading-tight mb-8 text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    "Don't spread yourself too thin."
                                </h2>
                            </div>

                            <div className="space-y-6 text-left max-w-3xl" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    When I landed my first job at <span className="text-white font-normal">Inshorts</span> in 2017, I was one of 30 designers hired for a new product. My mentor, Utkarsh Mishra, saw potential in me and groomed my skills. But when I asked him about taking on freelance work alongside my daily art posts, he gave me honest advice.
                                </p>
                                <p className="text-xl md:text-2xl font-medium italic text-white py-4">
                                    I didn't listen.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    Instead, I made it a personal challenge. Could I give 100% to my job, 100% to Kalopsia, and 100% to freelance clients? For the next year and a half, I worked relentlessly. Late nights, early mornings, weekends that blurred together.
                                </p>
                            </div>
                        </FadeIn>

                        {/* The Result */}
                        <FadeIn delay={200}>
                            <div className="mt-8 md:mt-12">
                                <p className="text-left text-[16px] md:text-lg text-white/70 mb-12 font-light" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    The result? <span className="text-white font-normal">I hit the bullseye on all three fronts.</span>
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left">
                                        <div className="text-xl md:text-2xl font-serif italic text-white mb-2">Lead Designer</div>
                                        <p className="text-zinc-400 text-sm">Promoted to manage a 30-person team</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left">
                                        <div className="text-xl md:text-2xl font-serif italic text-white mb-2">100K Followers</div>
                                        <p className="text-zinc-400 text-sm">Kalopsia grew exponentially</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-left">
                                        <div className="text-xl md:text-2xl font-serif italic text-white mb-2">Major Clients</div>
                                        <p className="text-zinc-400 text-sm">Logan Paul, Gillette & more</p>
                                    </div>
                                </div>
                                <p className="text-left text-[16px] text-white/70 max-w-2xl font-light" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    That experience taught me something fundamental about who I am: <span className="text-white font-normal">I don't just dream, I execute</span>. And I don't stop until I've mastered what I set out to learn.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Evolution Through Experimentation */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                                {/* Image - no shadow/stroke */}
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black order-2 md:order-1">
                                    <img
                                        src="/assets/about/evolution.jpg"
                                        alt="Evolution Through Experimentation"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex-col items-center justify-center text-zinc-600 hidden">
                                        <span className="text-sm text-zinc-500">evolution.jpg</span>
                                    </div>
                                </div>

                                {/* Story Text */}
                                <div className="space-y-6 order-1 md:order-2 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium">
                                        Evolution Through Experimentation
                                    </div>
                                    <h2 className="font-serif italic text-3xl md:text-5xl leading-tight text-white">
                                        I get bored once I've mastered a tool.
                                    </h2>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        What started as Photoshop art evolved into motion graphics, 3D animation, and immersive environments. I taught myself <span className="text-white font-normal">After Effects, Cinema 4D, Unreal Engine 5, Blender</span>. Not to be a jack of all trades, but because I crave the challenge of the unknown.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Someone in the industry once told me to keep my techniques secret. I took a different path, inspired by Utkarsh's philosophy: <span className="text-white font-normal">teach what you know</span>. When people caught up to my level, I simply learned something new.
                                    </p>
                                    <div className="pt-4 border-t border-white/10">
                                        <p className="text-white/70 text-[16px] italic font-light">
                                            I don't see myself as just an artist. I'm a constant learner who likes breaking down visual problems and treating creativity like an ongoing exploration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* From Brand Partnerships to Career-Defining Roles */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="text-left mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium mb-6">
                                    Career Journey
                                </div>
                                <h2 className="font-serif italic text-3xl md:text-5xl leading-tight mb-8 text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    From Brand Partnerships to Career-Defining Roles
                                </h2>
                            </div>

                            <div className="space-y-6 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    My work with <span className="text-white font-normal">Shara Senderoff at Raised In Space</span> taught me how to dream big and stay humble. For nearly five years, I translated complex investment theses into visual identities, created promotional content for major media properties, and art-directed campaigns for high-profile music artists.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    At <span className="text-white font-normal">Futureverse</span>, I designed strategic presentations that helped secure a <span className="text-white font-normal">$54M Series A</span> and built immersive Unreal Engine environments that defined their "Open Metaverse" vision.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    At <span className="text-white font-normal">Wilder World</span>, I led explainer videos from script to final render, driving massive organic reach, including a launch campaign that hit <span className="text-white font-normal">580k+ views</span> on X (Twitter), making it one of their most watched videos.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    Along the way, I sold out <span className="text-white font-normal">60 NFTs in under 3 minutes</span> during Crypto.com's launch and even caught the attention of Daryl Morey, President of the Philadelphia 76ers, who purchased my first NFT.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* ViewSonic - Image Left, Text Right - Smaller Container */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black w-full max-w-xs mx-auto md:mx-0">
                                    <img
                                        src="/assets/about/viewsonic.jpg"
                                        alt="ViewSonic ColorPro Awards Judge"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-4 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <h3 className="font-serif italic text-2xl md:text-3xl text-white">ViewSonic ColorPro Awards</h3>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        I became a <span className="text-white font-normal">judge for ViewSonic's ColorPro Awards</span> in 2024 and 2025, evaluating creative work from artists around the world.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Paris - Text Left, Video Right - Smaller Container */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="space-y-4 text-left order-2 md:order-1" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <h3 className="font-serif italic text-2xl md:text-3xl text-white">Paris Art Installations</h3>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        My work was showcased in <span className="text-white font-normal">public installations across Paris</span>, bringing digital art to physical spaces through Artpoint.
                                    </p>
                                </div>
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black order-1 md:order-2 w-full max-w-xs mx-auto md:mx-0">
                                    <video
                                        src="/assets/about/paris.mp4"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* The Kid Who Never Grew Up */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                                {/* Image - no shadow/stroke */}
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black order-2 md:order-1">
                                    <img
                                        src="/assets/about/paris.jpg"
                                        alt="The Kid Who Never Grew Up"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="absolute inset-0 flex-col items-center justify-center text-zinc-600 hidden">
                                        <span className="text-sm text-zinc-500">paris.jpg</span>
                                    </div>
                                </div>

                                {/* Story Text - NO BOLD */}
                                <div className="space-y-6 order-1 md:order-2 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium">
                                        The Journey Continues
                                    </div>
                                    <h2 className="font-serif italic text-3xl md:text-5xl leading-tight text-white">
                                        The kid who never grew up.
                                    </h2>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        When we were kids, we all wanted to be astronauts. I like to consider myself as that kid who never grew up. I'm still exploring the universe, just through a different lens.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Space isn't just a theme in my work; it's a reminder of infinite possibility, of looking beyond what's in front of us, of curiosity that never stops asking "what if?"
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Whether I'm designing a product explainer, building a 3D environment, or crafting a brand identity, I approach every project like an explorer charting unknown territory. With rigor, with wonder, and with the determination to create something I've never seen before.
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* What I Bring to the Table */}
                <section className="py-16 md:py-24 px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="text-left mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium mb-6">
                                    Looking Ahead
                                </div>
                                <h2 className="font-serif italic text-3xl md:text-5xl leading-tight mb-8 text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    What I Bring to the Table
                                </h2>
                            </div>

                            <div className="space-y-6 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    <span className="text-white font-normal">At the end of the day, I'm still that kid who wanted to touch the stars.</span> I just found a different way to get there.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    Every project is a chance to build something I've never seen before. To learn a tool I don't know yet. To solve a problem that keeps me up at night in the best way possible.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    I'm not looking for just another job. I'm looking for work that makes me feel the way I did when I first opened Photoshop and realized I could create entire universes. Work that challenges me. Work that matters.
                                </p>
                                <p className="text-white font-medium text-[16px] leading-relaxed pt-4">
                                    If that sounds like what you're building, let's talk.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* CTA Section - exact match with home page footer */}
                <footer className="pt-16 md:pt-32 pb-0 relative z-20" id="contact">
                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 md:px-6">
                        <FadeIn>
                            <h2 className="font-serif italic text-4xl md:text-8xl mb-8 md:mb-12 opacity-90 leading-tight">Let's talk.</h2>
                            <a
                                href="mailto:em@mrkalopsia.com"
                                className="relative flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full bg-white text-black text-base md:text-lg font-semibold transition-all duration-300 group inline-flex overflow-hidden"
                                onMouseEnter={textEnter}
                                onMouseLeave={textLeave}
                            >
                                {/* Purple overlay - more prominent */}
                                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

                                {/* Glow effect */}
                                <span className="absolute inset-0 bg-purple-400 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></span>

                                <span className="relative flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
                                    <Mail size={20} className="md:w-6 md:h-6 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12 stroke-black group-hover:stroke-white" />
                                    <span>Say Hello</span>
                                </span>
                            </a>
                        </FadeIn>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 md:mt-24 w-full bg-black">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            <div className="flex flex-col items-center md:flex-row md:justify-between border-t border-white/10 pt-6 md:pt-8 pb-12 md:pb-32 gap-6 md:gap-8">
                                <a href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                                </a>
                                <p className="text-zinc-600 text-sm">© 2025 Mr. Kalopsia. Eashan Misra.</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
