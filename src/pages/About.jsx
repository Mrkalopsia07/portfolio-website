import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import BackgroundScene from '../components/BackgroundScene';
import { ArrowLeft, ChevronDown, Mail } from 'lucide-react';
import CTASection from '../components/CTASection';

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
                {/* Gradient Overlay - clean black fade only, no purple */}
                <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{
                    background: `
                        linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.8) 15%, #000 20%, #000 85%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0.3) 95%, transparent 100%)
                    `
                }}></div>
                <div className="absolute inset-0 z-0 pointer-events-none md:hidden" style={{
                    background: `
                        linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,0.8) 12%, #000 15%, #000 100%)
                    `
                }}></div>


                {/* Hero Section */}
                <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
                    <FadeIn>
                        <div className="text-center max-w-4xl mx-auto relative z-10">
                            {/* Unified Title with Mixed Typography - Matching CTASection font size */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white font-['Work_Sans',sans-serif] font-light mb-12 text-center">
                                Eashan Misra is <br />
                                <span className="font-['Playfair_Display',serif] italic text-white/90">Mr. Kalopsia</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-white/70 max-w-[480px] text-[16px] leading-relaxed mb-10 font-['Work_Sans',sans-serif] font-light mx-auto" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                Multi-disciplinary motion designer and 3D artist who's spent the last 8+ years turning creative curiosity into career-defining work.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                                {[
                                    { value: "160K+", label: "Global Followers" },
                                    { value: "8+", label: "Years Experience" }
                                ].map((stat, i) => (
                                    <div key={i} className="px-4">
                                        <div className="text-2xl md:text-4xl font-medium text-white mb-1">{stat.value}</div>
                                        <div className="text-[10px] font-jetbrains text-zinc-400 uppercase tracking-[0.2em]">{stat.label}</div>
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
                                My portfolio includes collaborations with <span className="text-white font-medium">Logan Paul, Gillette, Western Digital, Wilder World</span>, and recognition from <span className="text-white font-medium">Adobe, ViewSonic, and Ann Druyan</span> (co-creator of Cosmos). I've built a global audience, had my work exhibited across <span className="text-white font-medium">Paris</span>, and helped drive campaigns that generated <span className="text-white font-medium">millions of views</span>.
                            </p>
                            <p className="text-lg md:text-xl font-['Work_Sans',sans-serif] font-medium text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
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
                                <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-black order-2 md:order-1">
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
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">The Accidental Beginning</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl leading-tight text-white font-['Work_Sans',sans-serif] font-light tracking-tight">
                                        I wanted to be an <span className="font-['Playfair_Display',serif] italic text-zinc-200">astronaut.</span>
                                    </h2>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        When that wasn't in the cards, I found another way to explore the cosmos: through art. I taught myself Photoshop and started creating space-themed digital art under the name "Kalopsia," posting every single day on Instagram.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Not because I thought it would become a career, social media wasn't what it is today, but because <span className="text-white font-medium">I loved creating, and I wanted to share that with the world</span>.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Then something unexpected happened. <span className="text-white font-medium">Adobe featured my work</span> on their blog for International Day of Human Space Flight. Photoshop followed me as one of the first Indian artists on their official account. <span className="text-white font-medium">Ann Druyan herself</span> sent me a personal email saying my tribute to Carl Sagan moved her unlike any space art she'd encountered.
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
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="h-[1px] w-8 bg-zinc-600"></span>
                                    <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">The Defining Moment</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl leading-tight mb-8 text-white font-['Work_Sans',sans-serif] font-light tracking-tight" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    "Don't spread yourself <span className="font-['Playfair_Display',serif] italic text-zinc-200">too thin.</span>"
                                </h2>
                            </div>

                            <div className="space-y-6 text-left max-w-3xl" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    When I landed my first job at <span className="text-white font-medium">Inshorts</span> in 2017, I was one of 30 designers hired for a new product. My mentor, Utkarsh Mishra, saw potential in me and groomed my skills. But when I asked him about taking on freelance work alongside my daily art posts, he gave me honest advice.
                                </p>
                                <p className="text-xl md:text-2xl font-serif italic text-white py-4">
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
                                    The result? <span className="text-white font-medium">I hit the bullseye on all three fronts.</span>
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                    <div className="group p-6 rounded-md bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 text-left cursor-default">
                                        <div className="text-xl md:text-2xl font-['Work_Sans',sans-serif] font-medium text-white mb-2 transition-transform duration-500 group-hover:translate-x-1">Lead Designer</div>
                                        <p className="text-zinc-400 text-sm font-['Work_Sans',sans-serif] font-light transition-colors duration-300 group-hover:text-zinc-300">Promoted to manage a 30-person team</p>
                                    </div>
                                    <div className="group p-6 rounded-md bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 text-left cursor-default">
                                        <div className="text-xl md:text-2xl font-['Work_Sans',sans-serif] font-medium text-white mb-2 transition-transform duration-500 group-hover:translate-x-1">100K Followers</div>
                                        <p className="text-zinc-400 text-sm font-['Work_Sans',sans-serif] font-light transition-colors duration-300 group-hover:text-zinc-300">Kalopsia grew exponentially</p>
                                    </div>
                                    <div className="group p-6 rounded-md bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 text-left cursor-default">
                                        <div className="text-xl md:text-2xl font-['Work_Sans',sans-serif] font-medium text-white mb-2 transition-transform duration-500 group-hover:translate-x-1">Major Clients</div>
                                        <p className="text-zinc-400 text-sm font-['Work_Sans',sans-serif] font-light transition-colors duration-300 group-hover:text-zinc-300">Logan Paul, Gillette & more</p>
                                    </div>
                                </div>
                                <p className="text-left text-[16px] text-white/70 max-w-2xl font-light" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    That experience taught me something fundamental about who I am: <span className="text-white font-medium">I don't just dream, I execute</span>. And I don't stop until I've mastered what I set out to learn.
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
                                <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-black order-2 md:order-1">
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
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Evolution Through Experimentation</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl leading-tight text-white font-['Work_Sans',sans-serif] font-light tracking-tight">
                                        I get bored once I've <span className="font-['Playfair_Display',serif] italic text-zinc-200">mastered</span> a tool.
                                    </h2>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        What started as Photoshop art evolved into motion graphics, 3D animation, and immersive environments. I taught myself <span className="text-white font-medium">After Effects, Cinema 4D, Unreal Engine 5, Blender</span>. Not to be a jack of all trades, but because I crave the challenge of the unknown.
                                    </p>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        Someone in the industry once told me to keep my techniques secret. I took a different path, inspired by Utkarsh's philosophy: <span className="text-white font-medium">teach what you know</span>. When people caught up to my level, I simply learned something new.
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
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="h-[1px] w-8 bg-zinc-600"></span>
                                    <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Career Journey</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl leading-tight mb-8 text-white font-['Work_Sans',sans-serif] font-light tracking-tight" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    From Brand Partnerships to <span className="font-['Playfair_Display',serif] italic text-zinc-200">Career-Defining</span> Roles
                                </h2>
                            </div>

                            <div className="space-y-6 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    My work with <span className="text-white font-medium">Shara Senderoff at Raised In Space</span> taught me how to dream big and stay humble. For nearly five years, I translated complex investment theses into visual identities, created promotional content for major media properties, and art-directed campaigns for high-profile music artists.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    At <span className="text-white font-medium">Futureverse</span>, I designed strategic presentations that helped secure a <span className="text-white font-medium">$54M Series A</span> and built immersive Unreal Engine environments that defined their "Open Metaverse" vision.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    At <span className="text-white font-medium">Wilder World</span>, I led explainer videos from script to final render, driving massive organic reach, including a launch campaign that hit <span className="text-white font-medium">580k+ views</span> on X (Twitter), making it one of their most watched videos.
                                </p>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    Along the way, I sold out <span className="text-white font-medium">60 NFTs in under 3 minutes</span> during Crypto.com's launch and even caught the attention of Daryl Morey, President of the Philadelphia 76ers, who purchased my first NFT.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* ViewSonic - Image Left, Text Right - Smaller Container */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <FadeIn>
                            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                                <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-black w-full max-w-xs mx-auto md:mx-0">
                                    <img
                                        src="/assets/about/viewsonic.jpg"
                                        alt="ViewSonic ColorPro Awards Judge"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="space-y-4 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <h3 className="text-2xl md:text-3xl text-white font-['Work_Sans',sans-serif] font-light tracking-tight">ViewSonic <span className="font-['Playfair_Display',serif] italic text-zinc-200">ColorPro</span> Awards</h3>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        I became a <span className="text-white font-medium">judge for ViewSonic's ColorPro Awards</span> in 2024 and 2025, evaluating creative work from artists around the world.
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
                                    <h3 className="text-2xl md:text-3xl text-white font-['Work_Sans',sans-serif] font-light tracking-tight">Paris Art <span className="font-['Playfair_Display',serif] italic text-zinc-200">Installations</span></h3>
                                    <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                        My work was showcased in <span className="text-white font-medium">public installations across Paris</span>, bringing digital art to physical spaces through Artpoint.
                                    </p>
                                </div>
                                <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-black order-1 md:order-2 w-full max-w-xs mx-auto md:mx-0">
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
                                <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-black order-2 md:order-1">
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
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">The Journey Continues</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl leading-tight text-white font-['Work_Sans',sans-serif] font-light tracking-tight">
                                        The kid who <span className="font-['Playfair_Display',serif] italic text-zinc-200">never</span> grew up.
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
                                <div className="flex items-center space-x-3 mb-6">
                                    <span className="h-[1px] w-8 bg-zinc-600"></span>
                                    <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Looking Ahead</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl leading-tight mb-8 text-white font-['Work_Sans',sans-serif] font-light tracking-tight" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    What I Bring to the <span className="font-['Playfair_Display',serif] italic text-zinc-200">Table</span>
                                </h2>
                            </div>

                            <div className="space-y-6 text-left" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <p className="text-white/70 text-[16px] leading-relaxed font-light">
                                    <span className="text-white font-medium">At the end of the day, I'm still that kid who wanted to touch the stars.</span> I just found a different way to get there.
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

                {/* FOOTER — matches Home page */}
                <footer className="pt-16 md:pt-32 pb-0 relative z-20" id="contact">
                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 md:px-6">
                        <FadeIn>
                            <CTASection />
                        </FadeIn>
                    </div>
                    <div className="mt-12 md:mt-24 w-full bg-black border-t border-white/5 pt-12 md:pt-16 pb-12 md:pb-24">
                        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">

                            {/* LEFT: Operational Status & Copyright */}
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-[10px] md:text-xs font-sans font-medium text-zinc-500 uppercase tracking-widest">
                                <span className="flex items-center gap-2 text-zinc-400">
                                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    </span>
                                    Operational
                                </span>
                                <span className="hidden md:block text-zinc-800 select-none">|</span>
                                <span>© 2026 Mr. Kalopsia</span>
                            </div>

                            {/* RIGHT: Navigation Links */}
                            <nav className="flex items-center gap-4 md:gap-6 font-sans text-[10px] md:text-xs font-medium uppercase tracking-wider text-zinc-400">
                                <a href="https://instagram.com/mr.kalopsia/" target="_blank" rel="noopener noreferrer" className="group relative py-1 hover:text-white transition-colors duration-300" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    Instagram
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <span className="text-zinc-800 select-none">/</span>
                                <a href="https://www.linkedin.com/in/eashan-misra/" target="_blank" rel="noopener noreferrer" className="group relative py-1 hover:text-white transition-colors duration-300" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    LinkedIn
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <span className="text-zinc-800 select-none">/</span>
                                <a href="/Resume%20-%20Eashan%20Misra.docx" download className="group relative py-1 text-white hover:text-zinc-200 transition-colors duration-300" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    Resume
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
