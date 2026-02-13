import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import CTASection from '../components/CTASection';
import { Download } from 'lucide-react';

export default function Resume() {
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
        <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white md:cursor-none cursor-auto relative bg-black">
            <CustomCursor cursorVariant={cursorVariant} />
            <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />

            <main className="relative z-10">

                {/* ─── HERO ─── */}
                <section className="relative z-10 pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden">
                    <FadeIn>
                        <div className="relative z-10">
                            {/* Header Row: Title + Download Button */}
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
                                <div>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white font-['Work_Sans',sans-serif] font-light">
                                        Eashan Misra
                                    </h1>
                                    <p className="text-white/60 text-[16px] font-['Work_Sans',sans-serif] font-light mt-3">
                                        Multidisciplinary Design Lead
                                    </p>
                                </div>

                                {/* Download — text link style matching design system */}
                                <a
                                    href="/Resume%20-%20Eashan%20Misra.docx"
                                    download
                                    className="group relative inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-['Work_Sans',sans-serif] font-medium transition-colors duration-300 pb-1 shrink-0"
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                >
                                    <Download size={14} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                                    Download Resume
                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </div>

                            {/* Contact Row — JetBrains Mono */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-jetbrains uppercase tracking-[0.15em] text-zinc-500">
                                <a href="mailto:em@mrkalopsia.com" className="hover:text-white transition-colors" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    em@mrkalopsia.com
                                </a>
                                <span className="text-zinc-700 select-none">/</span>
                                <span>+91 9340304065</span>
                                <span className="text-zinc-700 select-none">/</span>
                                <a href="https://www.mrkalopsia.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    mrkalopsia.com
                                </a>
                                <span className="text-zinc-700 select-none">/</span>
                                <span>Remote</span>
                            </div>
                        </div>
                    </FadeIn>
                </section>


                {/* ─── MAIN CONTENT ─── */}
                <div className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">

                        {/* ─── LEFT: Experience ─── */}
                        <div className="md:col-span-8 flex flex-col gap-16">
                            <section>
                                <FadeIn>
                                    <div className="flex items-center space-x-3 mb-10">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Experience</span>
                                    </div>
                                </FadeIn>

                                <div className="flex flex-col gap-14">
                                    <Job
                                        role="Senior Motion Designer"
                                        company="Wilder World"
                                        period="March 2025 — Present · Remote, USA"
                                        points={[
                                            <span key="1">Spearheaded the end-to-end production of high-impact explainer videos for core products (<span className="text-white font-normal">Wilder World, Zero Tech, Aura AI</span>), handling the entire lifecycle from scriptwriting and storyboarding to final Unreal Engine/After Effects execution.</span>,
                                            <span key="2">Drove massive organic brand visibility through high-quality motion assets, highlighted by a product launch campaign that garnered over <span className="text-white font-normal">580k+ views on X</span>, significantly outperforming company benchmarks.</span>,
                                            <span key="3">Translated complex Web3/AI technical specifications into clear, compelling motion graphics narratives, directly supporting go-to-market strategies for the Zero Tech ecosystem.</span>
                                        ]}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                        delay={100}
                                    />

                                    <Job
                                        role="Founder & Art Director"
                                        company="Mr. Kalopsia"
                                        period="March 2016 — Present · Remote"
                                        points={[
                                            <span key="1">Built an internationally recognized digital art brand specializing in 3D animation and immersive visual experiences. Grew audience to <span className="text-white font-normal">160k+ followers</span> on Instagram and other social media platforms.</span>,
                                            <span key="2">Partnered with major brands including <span className="text-white font-normal">Gillette, Logan Paul, Western Digital, eBay, ViewSonic</span>, and executed independent NFT releases like "Life Of A Spaceman" which sold out in 2 minutes (acquired by collectors including <span className="text-white font-normal">Daryl Morey</span>).</span>,
                                            <span key="3">Appointed as a <span className="text-white font-normal">ViewSonic ColorPro Award Judge</span> for two consecutive years (2024–2025) and featured by <span className="text-white font-normal">Adobe</span>; work has been exhibited internationally in Paris.</span>,
                                            <span key="4">Body of work directly led to recruitment for senior roles at Wilder World, Futureverse, and Raised In Space.</span>
                                        ]}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                        delay={200}
                                    />

                                    <Job
                                        role="Senior Visual Designer"
                                        company="Futureverse"
                                        period="April 2023 — December 2024 · Remote, USA"
                                        points={[
                                            <span key="1">Designed strategic investor presentations and MVP visualizations that directly supported the company's successful <span className="text-white font-normal">$54M Series A fundraising</span>.</span>,
                                            <span key="2">Developed immersive 3D environments using Unreal Engine 5, creating the core marketing assets used to demonstrate the "Open Metaverse" vision to the public.</span>,
                                            <span key="3">Translated complex Web3 technical concepts into accessible visual narratives for high-stakes campaigns, working directly with the founding team to rapid-prototype new venture ideas.</span>
                                        ]}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                        delay={300}
                                    />

                                    <Job
                                        role="Art Director"
                                        company="Raised In Space"
                                        period="September 2019 — March 2023 · Remote, USA"
                                        points={[
                                            <span key="1">Served as the primary creative partner to Founder <span className="text-white font-normal">Shara Senderoff</span>, translating high-level investment theses into visual identities for a portfolio of music-tech startups.</span>,
                                            <span key="2">Developed high-fidelity concept art and key visuals for media properties, including the sci-fi aesthetic for <span className="text-white font-normal">Cynthia Frelund's</span> "Numbers Game" and promotional content featuring industry figures like Scooter Braun.</span>,
                                            <span key="3">Managed and recruited freelance creative teams to execute complex campaigns, directing album art and promotional materials for artists like Johnny Yukon and Eddie Zuko.</span>
                                        ]}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                        delay={400}
                                    />

                                    <Job
                                        role="Co-Founder & Head of Design"
                                        company="Akapella"
                                        period="September 2020 — March 2022 · Remote, USA"
                                        points={[
                                            <span key="1">Architected end-to-end UI/UX flows and comprehensive visual identity, establishing a scalable design system that translated rough concepts into a production-ready MVP.</span>,
                                            <span key="2">Built the cross-functional product team from scratch, personally interviewing and hiring key Designers and Front-End Developers to align creative vision with technical feasibility.</span>
                                        ]}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                        delay={500}
                                    />

                                    <Job
                                        role="Lead Designer"
                                        company="Inshorts (Inpix)"
                                        period="August 2017 — September 2019 · Noida, India"
                                        points={[
                                            <span key="1">Rapidly promoted to Lead Designer, taking charge of a 30-person creative team to drive visual strategy for India's top news app (<span className="text-white font-normal">60M+ downloads</span>).</span>,
                                            <span key="2">Established quality control workflows to produce <span className="text-white font-normal">100+ daily editorial visuals</span>.</span>
                                        ]}
                                        textEnter={textEnter}
                                        textLeave={textLeave}
                                        delay={600}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* ─── RIGHT: Sidebar ─── */}
                        <div className="md:col-span-4 flex flex-col gap-14">

                            {/* Summary */}
                            <FadeIn delay={100}>
                                <div onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Summary</span>
                                    </div>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">
                                        Multi-disciplinary Design Lead with <span className="text-white font-normal">8+ years of experience</span> in 3D animation, motion graphics, and graphic design. Founder of Mr. Kalopsia, a globally recognized digital art brand with <span className="text-white font-normal">160k+ followers</span>. Work has been featured by Adobe, exhibited in Paris, recognized by Ann Druyan, and led to serving as a ViewSonic ColorPro Awards Judge in 2024 and 2025.
                                    </p>
                                    <p className="text-zinc-400 text-sm leading-relaxed font-light mt-4">
                                        Experience includes collaborations with <span className="text-white font-normal">Logan Paul, Gillette, Western Digital, eBay</span> and senior creative roles at Wilder World, Futureverse, and Raised In Space.
                                    </p>
                                </div>
                            </FadeIn>

                            {/* Core Competencies */}
                            <FadeIn delay={200}>
                                <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Core Competencies</span>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <div>
                                            <h4 className="text-white font-['Work_Sans',sans-serif] font-medium text-sm mb-1">Leadership & Strategy</h4>
                                            <p className="text-zinc-500 text-sm font-light">Creative Direction, Remote Team Leadership, Brand Development, Client Relations, Project Management.</p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-['Work_Sans',sans-serif] font-medium text-sm mb-1">Creative Execution</h4>
                                            <p className="text-zinc-500 text-sm font-light">3D Environment Design, Visual Storytelling, Advanced Motion Graphics, Concept Development.</p>
                                        </div>
                                    </div>
                                </section>
                            </FadeIn>

                            {/* Technical Skills */}
                            <FadeIn delay={300}>
                                <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <div className="flex items-center space-x-3 mb-6">
                                        <span className="h-[1px] w-8 bg-zinc-600"></span>
                                        <span className="text-[10px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500">Technical Skills</span>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <SkillGroup title="3D Animation" skills="Unreal Engine 5 (UE5), Cinema 4D (C4D), Blender (B3D)" />
                                        <SkillGroup title="Post-Production" skills="After Effects (AE), DaVinci Resolve, Premiere Pro (PR)" />
                                        <SkillGroup title="Design & Imaging" skills="Photoshop (PS), Illustrator (AI), Lightroom (LR)" />
                                        <SkillGroup title="AI & Emerging Tech" skills="ComfyUI, Kling, Nano Banana Pro (Advanced AI pipelines)" />
                                    </div>
                                </section>
                            </FadeIn>
                        </div>
                    </div>
                </div>


                {/* ─── FOOTER — matches Home & About pages ─── */}
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

function Job({ role, company, period, points, textEnter, textLeave, delay }) {
    return (
        <FadeIn delay={delay}>
            <div className="group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                {/* Company & Period */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                    <h3 className="text-lg font-['Work_Sans',sans-serif] font-medium text-white">{company}</h3>
                    <span className="text-[10px] font-jetbrains uppercase tracking-[0.15em] text-zinc-500">{period}</span>
                </div>
                {/* Role */}
                <div className="text-sm text-zinc-400 font-['Work_Sans',sans-serif] font-light mb-4">{role}</div>
                {/* Bullet Points */}
                <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-400 leading-relaxed text-sm font-light marker:text-zinc-700">
                    {points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </div>
        </FadeIn>
    );
}

function SkillGroup({ title, skills }) {
    return (
        <div>
            <span className="text-[10px] font-jetbrains uppercase tracking-[0.15em] text-zinc-500 block mb-1">{title}</span>
            <span className="text-zinc-300 text-sm font-light">{skills}</span>
        </div>
    );
}
