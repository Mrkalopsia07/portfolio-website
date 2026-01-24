import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import FloatingOrbs from '../components/FloatingOrbs';
import { Download, Mail, Phone, Globe, MapPin, ArrowLeft } from 'lucide-react';

export default function Resume() {
    const [cursorVariant, setCursorVariant] = useState("default");
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            autoRaf: true, // Let Lenis manage its own RAF loop efficiently
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
        <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white md:cursor-none cursor-auto bg-black">
            <CustomCursor cursorVariant={cursorVariant} />
            <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />

            <FloatingOrbs />

            <main className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <FadeIn>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-12 gap-8">
                        <div>
                            <h1 className="font-serif italic text-5xl md:text-7xl mb-4">Eashan Misra</h1>
                            <p className="text-xl md:text-2xl text-purple-400 font-medium mb-6">Multidisciplinary Design Lead</p>

                            <div className="flex flex-wrap gap-4 text-zinc-400 text-sm md:text-base">
                                <a href="mailto:em@mrkalopsia.com" className="flex items-center gap-2 hover:text-white transition-colors" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <Mail size={16} /> em@mrkalopsia.com
                                </a>
                                <span className="hidden md:block text-zinc-700">|</span>
                                <span className="flex items-center gap-2">
                                    <Phone size={16} /> +91 9340304065
                                </span>
                                <span className="hidden md:block text-zinc-700">|</span>
                                <a href="https://www.mrkalopsia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                    <Globe size={16} /> www.mrkalopsia.com
                                </a>
                                <span className="hidden md:block text-zinc-700">|</span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} /> Remote
                                </span>
                            </div>
                        </div>

                        <a
                            href="/Resume - Eashan Misra.pdf"
                            download
                            className="relative group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-semibold transition-all duration-300 whitespace-nowrap overflow-hidden"
                            onMouseEnter={textEnter}
                            onMouseLeave={textLeave}
                        >
                            {/* Purple overlay */}
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

                            {/* Glow effect */}
                            <span className="absolute inset-0 bg-purple-400 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></span>

                            <span className="relative flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
                                <Download size={18} className="transition-all duration-300 group-hover:scale-110 group-hover:translate-y-1 stroke-black group-hover:stroke-white" />
                                <span>Download Resume</span>
                            </span>
                        </a>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
                    {/* Main Content */}
                    <div className="md:col-span-8 flex flex-col gap-16">

                        {/* Experience */}
                        <section>
                            <FadeIn>
                                <h2 className="font-serif italic text-3xl md:text-4xl mb-8 flex items-center gap-4 text-white/90">
                                    <span className="w-8 h-[1px] bg-purple-500/50"></span>
                                    Professional Experience
                                </h2>
                            </FadeIn>

                            <div className="flex flex-col gap-12">
                                <Job
                                    role="Senior Motion Designer"
                                    company="Wilder World"
                                    period="March 2025 - Present | Remote - USA"
                                    points={[
                                        <span key="1">Spearheaded the end-to-end production of high-impact explainer videos for core products (<strong>Wilder World, Zero Tech, Aura AI</strong>), handling the entire lifecycle from scriptwriting and storyboarding to final <strong>Unreal Engine/After Effects</strong> execution.</span>,
                                        <span key="2">Drove massive organic brand visibility through high-quality motion assets, highlighted by a product launch campaign that garnered over <strong>580k+ views on X (Twitter)</strong>, significantly outperforming company benchmarks.</span>,
                                        <span key="3">Translated complex <strong>Web3/AI technical specifications</strong> into clear, compelling motion graphics narratives, directly supporting go-to-market strategies for the Zero Tech ecosystem.</span>
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={100}
                                />

                                <Job
                                    role="Founder & Art Director"
                                    company="Mr. Kalopsia"
                                    period="March 2016 - Present | Remote"
                                    points={[
                                        <span key="1">Built an internationally recognized digital art brand specializing in 3D animation and immersive visual experiences. Grew audience to <strong>160k+ followers</strong> on Instagram and other social media platforms.</span>,
                                        <span key="2">Partnered with major brands including <strong>Gillette, Logan Paul, Western Digital, eBay, ViewSonic, Huion, Bira 91, Wilder World</strong>, and <strong>Chichibu Whiskey</strong>, and executed independent NFT releases like "Life Of A Spaceman" which <strong>sold out in 2 minutes</strong> (acquired by collectors including <strong>Daryl Morey</strong>).</span>,
                                        <span key="3">Appointed as a <strong>ViewSonic ColorPro Award Judge</strong> for two consecutive years (2024–2025) and featured by <strong>Adobe</strong>; work has been exhibited internationally in <strong>Paris</strong>.</span>,
                                        <span key="4">Body of work directly led to recruitment for senior roles at Wilder World, Futureverse, and Raised In Space.</span>
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={200}
                                />

                                <Job
                                    role="Senior Visual Designer"
                                    company="Futureverse"
                                    period="April 2023 - December 2024 | Remote - USA"
                                    points={[
                                        <span key="1">Designed strategic investor presentations and MVP visualizations that directly supported the company’s successful <strong>$54M Series A fundraising</strong>.</span>,
                                        <span key="2">Developed immersive 3D environments using <strong>Unreal Engine 5</strong>, creating the core marketing assets used to demonstrate the "<strong>Open Metaverse</strong>" vision to the public.</span>,
                                        <span key="3">Translated complex <strong>Web3 technical concepts</strong> into accessible visual narratives for high-stakes campaigns, working directly with the founding team to rapid-prototype new venture ideas.</span>
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={300}
                                />

                                <Job
                                    role="Art Director"
                                    company="Raised In Space"
                                    period="September 2019 - March 2023 | Remote - USA"
                                    points={[
                                        <span key="1">Served as the primary creative partner to Founder <strong>Shara Senderoff</strong>, translating high-level investment theses into visual identities for a portfolio of music-tech startups.</span>,
                                        <span key="2">Developed high-fidelity concept art and key visuals for media properties, including the sci-fi aesthetic for <strong>Cynthia Frelund's</strong> "Numbers Game" and promotional content featuring industry figures like <strong>Scooter Braun</strong>.</span>,
                                        <span key="3">Managed and recruited <strong>freelance creative teams</strong> to execute complex campaigns, directing album art and promotional materials for artists like Johnny Yukon and Eddie Zuko.</span>
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={400}
                                />

                                <Job
                                    role="Co-Founder & Head of Design"
                                    company="Akapella"
                                    period="September 2020 - March 2022 | Remote - USA"
                                    points={[
                                        <span key="1">Architected end-to-end UI/UX flows and comprehensive visual identity, establishing a scalable design system that translated rough concepts into a <strong>production-ready MVP</strong>.</span>,
                                        <span key="2">Built the <strong>cross-functional product team</strong> from scratch, personally interviewing and hiring key Designers and Front-End Developers to align creative vision with technical feasibility.</span>
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={500}
                                />

                                <Job
                                    role="Lead Designer"
                                    company="Inshorts (Inpix)"
                                    period="August 2017 - September 2019 | Noida, India"
                                    points={[
                                        <span key="1">Rapidly promoted to <strong>Lead Designer</strong>, taking charge of a 30-person creative team to drive visual strategy for India’s top news app (<strong>60M+ downloads</strong>).</span>,
                                        <span key="2">Established quality control workflows to produce <strong>100+ daily editorial visuals</strong>.</span>
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={600}
                                />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-4 flex flex-col gap-12">

                        {/* Summary */}
                        <FadeIn delay={100}>
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                <h3 className="text-xl font-serif italic mb-4 text-purple-300">Professional Summary</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Multi-disciplinary Design Lead with <strong>8+ years of experience</strong> in 3D animation, motion graphics, and graphic design. Founder of Mr. Kalopsia, a globally recognized digital art brand with <strong>160k+ followers</strong>. Work has been featured by <strong>Adobe</strong>, exhibited in <strong>Paris</strong>, recognized by <strong>Ann Druyan</strong>, and led to serving as a <strong>ViewSonic ColorPro Awards Judge</strong> in 2024 and 2025.
                                </p>
                                <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                                    Experience includes collaborations with <strong>Logan Paul, Gillette, Western Digital, eBay</strong> and senior creative roles at Wilder World, Futureverse, and Raised In Space.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Core Competencies */}
                        <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <FadeIn delay={200}>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-6 text-white border-b border-white/10 pb-2">Core Competencies</h3>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Leadership & Strategy</h4>
                                        <p className="text-zinc-500 text-sm">Creative Direction, Remote Team Leadership, Brand Development, Client Relations, Project Management.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Creative Execution</h4>
                                        <p className="text-zinc-500 text-sm">3D Environment Design, Visual Storytelling, Advanced Motion Graphics, Concept Development.</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </section>

                        {/* Skills */}
                        <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <FadeIn delay={300}>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-6 text-white border-b border-white/10 pb-2">Technical Skills</h3>
                                <div className="flex flex-col gap-4">
                                    <SkillGroup title="3D Animation" skills="Unreal Engine 5 (UE5), Cinema 4D (C4D), Blender (B3D)" />
                                    <SkillGroup title="Post-Production" skills="After Effects (AE), DaVinci Resolve, Premiere Pro (PR)" />
                                    <SkillGroup title="Design & Imaging" skills="Photoshop (PS), Illustrator (AI), Lightroom (LR)" />
                                    <SkillGroup title="AI & Emerging Tech" skills="ComfyUI, Kling, Nano Banana Pro (Advanced AI pipelines)" />
                                </div>
                            </FadeIn>
                        </section>
                    </div>
                </div>

                {/* Footer Link */}
                <FadeIn delay={600}>
                    <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
                        <a href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
                        </a>
                        <p className="text-zinc-600 text-sm">© 2025 Mr. Kalopsia</p>
                    </div>
                </FadeIn>

            </main>
        </div>
    );
}

function Job({ role, company, period, points, textEnter, textLeave, delay }) {
    return (
        <FadeIn delay={delay}>
            <div className="group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-2xl font-serif text-white group-hover:text-purple-400 transition-colors">{company}</h3>
                    <span className="text-zinc-500 text-sm font-mono">{period}</span>
                </div>
                <div className="text-lg text-purple-300 mb-4 font-medium">{role}</div>
                <ul className="list-disc list-outside ml-4 space-y-2 text-zinc-400 leading-relaxed text-sm md:text-base marker:text-zinc-600">
                    {points.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            </div>
        </FadeIn>
    );
}

function ListItem({ title, subtitle }) {
    return (
        <li className="flex flex-col">
            <span className="text-zinc-200 font-medium">{title}</span>
            <span className="text-zinc-500 text-sm">{subtitle}</span>
        </li>
    );
}

function SkillGroup({ title, skills }) {
    return (
        <div>
            <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">{title}</span>
            <span className="text-zinc-300 text-sm">{skills}</span>
        </div>
    );
}
