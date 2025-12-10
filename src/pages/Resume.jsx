import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import { Download, Mail, Phone, Globe, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';

export default function Resume() {
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

    // Parallax mouse effect for orbs (optimized with direct DOM manipulation)
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
        <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white md:cursor-none cursor-auto bg-black">
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
                            href="/Resume - Eashan Misra.docx"
                            download
                            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-purple-200 transition-all duration-300 whitespace-nowrap"
                            onMouseEnter={textEnter}
                            onMouseLeave={textLeave}
                        >
                            <Download size={18} />
                            <span>Download Resume</span>
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
                                    period="March 2025 - Present | Remote"
                                    points={[
                                        "Spearheaded the end-to-end production of high-impact explainer videos for core products (Wilder World, Zero Tech, Aura AI), handling the entire lifecycle from scriptwriting and storyboarding to final Unreal Engine/After Effects execution.",
                                        "Drove massive organic brand visibility through high-quality motion assets, highlighted by a product launch campaign that garnered over 580k+ views on X (Twitter), significantly outperforming company benchmarks.",
                                        "Translated complex Web3/AI technical specifications into clear, compelling motion graphics narratives, directly supporting go-to-market strategies for the Zero Tech ecosystem."
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={100}
                                />

                                <Job
                                    role="Founder & Art Director"
                                    company="Mr. Kalopsia"
                                    period="March 2016 - Present"
                                    points={[
                                        "Built an internationally recognized digital art brand specializing in 3D animation and immersive visual experiences. Grew audience to 160k+ followers on Instagram, becoming a reference point for space-themed emotional storytelling in the motion design community.",
                                        "Partnered with major brands including Gillette, Logan Paul, Western Digital, eBay, ViewSonic, Huion, Bira 91, and Chichibu Whiskey — delivering commercial art campaigns, product visualizations, and promotional content.",
                                        "Work has been featured by Adobe, exhibited publicly in Paris, and recognized by Ann Druyan (co-creator of Cosmos). This body of work directly led to full-time roles at Wilder World, Futureverse, and Raised In Space."
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={200}
                                />

                                <Job
                                    role="Senior Visual Designer"
                                    company="Futureverse"
                                    period="April 2023 - December 2024 | Remote"
                                    points={[
                                        "Designed strategic investor presentations and MVP visualizations that directly supported the company’s successful $54M Series A fundraising.",
                                        "Developed immersive 3D environments using Unreal Engine 5, creating the core marketing assets used to demonstrate the \"Open Metaverse\" vision to the public.",
                                        "Translated complex Web3 technical concepts into accessible visual narratives for high-stakes campaigns, working directly with the founding team to rapid-prototype new venture ideas."
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={300}
                                />

                                <Job
                                    role="Art Director"
                                    company="Raised In Space"
                                    period="September 2019 - March 2023 | Remote"
                                    points={[
                                        "Served as the primary creative partner to Founder Shara Senderoff, translating high-level investment theses into visual identities for a portfolio of music-tech startups.",
                                        "Developed high-fidelity concept art and key visuals for media properties, including the sci-fi aesthetic for Cynthia Frelund's \"Numbers Game\" and promotional content featuring industry figures like Scooter Braun.",
                                        "Managed and recruited freelance creative teams to execute complex campaigns, directing album art and promotional materials for artists like Johnny Yukon and Eddie Zuko."
                                    ]}
                                    textEnter={textEnter}
                                    textLeave={textLeave}
                                    delay={400}
                                />

                                <Job
                                    role="Co-Founder & Head of Design"
                                    company="Akapella"
                                    period="September 2020 - March 2022 | Remote"
                                    points={[
                                        "Architected the end-to-end User Interface (UI) and UX flows for the web app MVP, translating rough concepts into a production-ready design system.",
                                        "Built the cross-functional product team from scratch, personally interviewing and hiring key Designers and Front-End Developers to align creative vision with technical feasibility.",
                                        "Defined the comprehensive visual identity and brand strategy, ensuring a scalable design language for future product iterations."
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
                                        "Rapidly promoted to Lead Designer, taking charge of a 30-person creative team to drive visual strategy for India’s top news app (60M+ downloads).",
                                        "Established quality control workflows to produce 100+ daily editorial visuals, translating complex news stories into engaging, bite-sized infographics.",
                                        "Served as the strategic bridge between the Editorial and Design departments, translating breaking news narratives into clear creative briefs to ensure visual accuracy."
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
                                    Multi-disciplinary Design Lead with 8+ years of experience in 3D animation, motion graphics, and graphic design. Founder of Mr. Kalopsia, a globally recognized digital art brand with 160k+ followers. Work has been featured by Adobe, exhibited in Paris, recognized by Ann Druyan, and led to serving as a ViewSonic ColorPro Awards Judge in 2024 and 2025.
                                </p>
                                <p className="text-zinc-400 text-sm leading-relaxed mt-4">
                                    Experience includes collaborations with Logan Paul, Gillette, Western Digital, and senior creative roles at Wilder World, Futureverse, and Raised In Space.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Awards */}
                        <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <FadeIn delay={200}>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-6 text-white border-b border-white/10 pb-2">Awards & Recognition</h3>
                                <ul className="space-y-4">
                                    <ListItem title="ViewSonic ColorPro Award Judge" subtitle="(2024, 2025) Evaluated global generative art submissions." />
                                    <ListItem title="&quot;Life Of A Spaceman&quot; NFT Launch" subtitle="(2020) sold out in 2 minutes on Crypto.com." />
                                    <ListItem title="Notable Collectors" subtitle="Works acquired by high-profile figures including Daryl Morey." />
                                    <ListItem title="Artpoint Paris Exhibition" subtitle="(2024) Work showcased across public installations in Greater Paris." />
                                    <ListItem title="Ann Druyan Recognition" subtitle="(2021) Personal acclamation from the co-creator of Cosmos." />
                                </ul>
                            </FadeIn>
                        </section>

                        {/* Competencies */}
                        <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <FadeIn delay={300}>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-6 text-white border-b border-white/10 pb-2">Competencies</h3>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Leadership & Strategy</h4>
                                        <p className="text-zinc-500 text-sm">Creative Direction, Remote Team Leadership, Brand Development, Client Relations.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Creative Execution</h4>
                                        <p className="text-zinc-500 text-sm">3D Environment Design, Visual Storytelling, Advanced Motion Graphics.</p>
                                    </div>
                                </div>
                            </FadeIn>
                        </section>

                        {/* Skills */}
                        <section onMouseEnter={textEnter} onMouseLeave={textLeave}>
                            <FadeIn delay={400}>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-6 text-white border-b border-white/10 pb-2">Technical Skills</h3>
                                <div className="flex flex-col gap-4">
                                    <SkillGroup title="3D Animation" skills="Unreal Engine 5 (UE5), Cinema 4D (C4D), Blender (B3D)" />
                                    <SkillGroup title="Post-Production" skills="After Effects (AE), DaVinci Resolve, Premiere Pro (PR)" />
                                    <SkillGroup title="Design & Imaging" skills="Photoshop (PS), Illustrator (AI), Lightroom (LR)" />
                                    <SkillGroup title="AI & Emerging Tech" skills="ComfyUI, Kling, Nano Banana Pro" />
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
