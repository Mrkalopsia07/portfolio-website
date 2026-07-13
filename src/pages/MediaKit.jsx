import React, { memo, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import CustomCursor from '../components/CustomCursor';
import FadeIn from '../components/FadeIn';
import CTASection from '../components/CTASection';
import CenterFillButton from '../components/CenterFillButton';
import headshot from '../assets/media-kit/headshot.jpg';
import oldDp from '../assets/media-kit/old-dp.png';
import talkingHead from '../assets/media-kit/talking-head.jpg';
import meshyThumbnail from '../assets/media-kit/meshy-reel.jpg';
import {
    MEDIA_KIT_HERO_STATS,
    MEDIA_KIT_PROOF_CARDS,
    MEDIA_KIT_FORMATS,
    MEDIA_KIT_CASE_STUDY,
    MEDIA_KIT_AGE,
    MEDIA_KIT_GENDER,
    MEDIA_KIT_GEO,
    MEDIA_KIT_PACKAGES,
    MEDIA_KIT_CREDENTIALS,
    MEDIA_KIT_BRANDS,
    MEDIA_KIT_FAQ,
} from '../constants';

const prefersReduced = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Local-asset lookup for format cards (public paths pass through as-is).
const FORMAT_IMAGES = { 'talking-head': talkingHead, 'meshy-reel': meshyThumbnail };
const resolveImg = (key) => (key.startsWith('/') ? key : FORMAT_IMAGES[key]);

/* ── Building blocks ───────────────────────────────────────────────── */

function Eyebrow({ children }) {
    // No stroke: a small purple marker and sentence-case label.
    return (
        <p className="mb-4 flex items-center gap-2.5 text-[13px] font-medium text-zinc-400">
            <span className="inline-block size-1.5 rounded-full bg-purple-400" aria-hidden="true" />
            {children}
        </p>
    );
}

function SectionHeading({ eyebrow, children, description }) {
    return (
        <FadeIn>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="max-w-4xl text-balance font-sans text-3xl font-light leading-tight text-white md:text-5xl">
                {children}
            </h2>
            {description && (
                <p className="mt-6 max-w-2xl text-pretty text-[16px] font-light leading-relaxed text-white/70">
                    {description}
                </p>
            )}
        </FadeIn>
    );
}

// Solid card shell with a restrained cursor-following highlight.
function GlowCard({ className = '', children }) {
    const ref = useRef(null);
    const handleMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--gx', `${e.clientX - r.left}px`);
        el.style.setProperty('--gy', `${e.clientY - r.top}px`);
    };
    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            className={`group/glow relative overflow-hidden rounded-md border border-white/5 bg-[#101014] transition-colors duration-500 hover:border-purple-500/30 ${className}`}
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100"
                style={{
                    background:
                        'radial-gradient(300px circle at var(--gx, 50%) var(--gy, 50%), rgba(168,85,247,0.16), transparent 65%)',
                }}
            />
            <div className="relative z-10 flex h-full flex-col">{children}</div>
        </div>
    );
}

function Bar({ label, percent }) {
    return (
        <div className="group/bar">
            <div className="mb-2 flex items-center justify-between gap-6">
                <span className="text-sm font-light text-zinc-400 transition-colors duration-300 group-hover/bar:text-white">{label}</span>
                <span className="tabular-nums text-sm font-medium text-white">{percent}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-purple-500/70 transition-all duration-500 ease-out group-hover/bar:bg-purple-400" style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}

/* ── Brand logo ticker (hero) ──────────────────────────────────────── */

function TickerRow() {
    return (
        <div className="flex shrink-0 items-center gap-12 pr-12 md:gap-16 md:pr-16">
            {MEDIA_KIT_BRANDS.map((brand) => {
                const slug = brand.toLowerCase().replace(/\s+/g, '-');
                return (
                    <img
                        key={brand}
                        src={`/assets/logos/${slug}.svg`}
                        alt={brand}
                        draggable={false}
                        loading="lazy"
                        className="h-4 w-auto shrink-0 object-contain opacity-40 transition-opacity duration-500 ease-out hover:opacity-90 md:h-5 [filter:grayscale(1)_brightness(0)_invert(1)]"
                    />
                );
            })}
        </div>
    );
}

const BrandLogoTicker = memo(function BrandLogoTicker() {
    return (
        <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-charcoal to-transparent md:w-24" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-charcoal to-transparent md:w-24" />
            <div className="flex w-max animate-ticker">
                <TickerRow />
                <TickerRow />
            </div>
        </div>
    );
});

/* ── Proof card ────────────────────────────────────────────────────── */

function ProofCard({ card, index }) {
    return (
        <FadeIn delay={index * 100} className="h-full">
            <GlowCard className="h-full p-6 md:p-8">
                <div className="mb-10 flex items-center justify-between gap-4">
                    <span className="text-[11px] text-zinc-600">Proof {String(index + 1).padStart(2, '0')}</span>
                    <span className="inline-flex items-center gap-2 text-[11px] text-purple-300">
                        <span className="size-1.5 rounded-full bg-purple-400" aria-hidden="true" />
                        {card.qualifier}
                    </span>
                </div>
                <div className="tabular-nums text-balance text-3xl font-medium leading-tight text-white md:text-4xl">{card.value}</div>
                <div className="mt-3 text-[13px] font-medium text-purple-400">{card.label}</div>
                <p className="mt-5 text-pretty text-sm font-light leading-relaxed text-zinc-400">{card.description}</p>
            </GlowCard>
        </FadeIn>
    );
}

/* ── Credentials: synced list (loading-line) + image ───────────────── */

function Credentials({ items, textEnter, textLeave }) {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduce = prefersReduced();

    useEffect(() => {
        if (paused || reduce) return;
        const id = setTimeout(() => setActive((i) => (i + 1) % items.length), 4200);
        return () => clearTimeout(id);
    }, [active, paused, reduce, items.length]);

    const current = items[active];

    return (
        <div
            className="grid items-center gap-12 md:grid-cols-2 md:gap-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Left: list with a fill-line marking the active item */}
            <div>
                {items.map((item, i) => {
                    const isActive = i === active;
                    return (
                        <button
                            key={item.title}
                            type="button"
                            onClick={() => setActive(i)}
                            className="relative block w-full border-b border-white/5 py-6 pl-6 text-left first:pt-0"
                            onMouseEnter={textEnter}
                            onMouseLeave={textLeave}
                        >
                            {/* base track */}
                            <span className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full bg-white/10" aria-hidden="true" />
                            {/* animated fill (active only) */}
                            {isActive && (
                                <span
                                    key={active}
                                    aria-hidden="true"
                                    className="absolute bottom-0 left-0 top-0 w-0.5 origin-top rounded-full bg-purple-400"
                                    style={{
                                        animation: reduce ? 'none' : 'mkFill 4.2s linear forwards',
                                        animationPlayState: paused ? 'paused' : 'running',
                                        transform: reduce ? 'scaleY(1)' : undefined,
                                    }}
                                />
                            )}
                            <h3 className={`text-lg font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                                {item.title}
                            </h3>
                            <div className={`mt-1 text-[12px] transition-colors duration-300 ${isActive ? 'text-purple-400' : 'text-zinc-600'}`}>
                                {item.role}
                            </div>
                            <p className={`mt-2 text-pretty text-sm font-light leading-relaxed transition-colors duration-300 ${isActive ? 'text-zinc-400' : 'text-zinc-600'}`}>
                                {item.description}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Right: crossfading image, links out to the active credential */}
            <FadeIn delay={120}>
                <a
                    href={current.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mx-auto block aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-sm border border-white/5 bg-[#101014] transition-colors duration-500 hover:border-purple-500/30"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                    aria-label={`Open ${current.title}`}
                >
                    {items.map((item, i) => (
                        <img
                            key={item.title}
                            src={item.image}
                            alt={item.title}
                            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ease-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="text-sm font-medium text-white">{current.title}</div>
                        <div className="mt-1 flex items-center gap-1.5 text-[12px] text-purple-300">
                            {current.role}
                            <ArrowUpRight size={13} className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                        </div>
                    </div>
                </a>
            </FadeIn>
        </div>
    );
}

/* ── FAQ accordion ─────────────────────────────────────────────────── */

function FaqAccordion({ items }) {
    const [open, setOpen] = useState(0);
    return (
        <div className="border-t border-white/5">
            {items.map((item, i) => {
                const isOpen = open === i;
                return (
                    <div key={item.q} className="border-b border-white/5">
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? -1 : i)}
                            aria-expanded={isOpen}
                            className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                        >
                            <span className={`text-base font-medium transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                {item.q}
                            </span>
                            <ChevronDown size={18} className={`shrink-0 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} aria-hidden="true" />
                        </button>
                        <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <p className="max-w-2xl pb-5 text-pretty text-sm font-light leading-relaxed text-zinc-400">{item.a}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/* ── Footer ────────────────────────────────────────────────────────── */

function SiteFooter({ textEnter, textLeave }) {
    return (
        <div className="w-full border-t border-white/5 bg-[#050507] pb-12 pt-12 md:pb-24 md:pt-16">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 md:flex-row md:px-6">
                <div className="flex flex-col items-center gap-4 text-[10px] font-medium uppercase tracking-widest text-zinc-500 md:flex-row md:gap-6 md:text-xs">
                    <span className="flex items-center gap-2 text-zinc-400">
                        <span className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
                        </span>
                        Operational
                    </span>
                    <span className="hidden text-zinc-800 md:block">|</span>
                    <span>© 2026 Mr. Kalopsia</span>
                </div>
                <nav className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-wider text-zinc-400 md:gap-6 md:text-xs">
                    {[
                        ['Instagram', 'https://instagram.com/mr.kalopsia/'],
                        ['LinkedIn', 'https://www.linkedin.com/in/eashan-misra/'],
                    ].map(([label, href], index) => (
                        <React.Fragment key={label}>
                            {index > 0 && <span className="text-zinc-800">/</span>}
                            <a href={href} target="_blank" rel="noopener noreferrer" className="py-1 transition-colors hover:text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                {label}
                            </a>
                        </React.Fragment>
                    ))}
                    <span className="text-zinc-800">/</span>
                    <a href="/Resume%20-%20Eashan%20Misra.docx" download className="py-1 text-white transition-colors hover:text-zinc-200" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                        Resume
                    </a>
                </nav>
            </div>
        </div>
    );
}

/* ── Page ──────────────────────────────────────────────────────────── */

export default function MediaKit() {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [lenis, setLenis] = useState(null);
    const rootRef = useRef(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            autoRaf: true,
        });
        setLenis(lenisInstance);
        return () => lenisInstance.destroy();
    }, []);

    // Cursor position drives the dotted-grid spotlight.
    useEffect(() => {
        const onMove = (e) => {
            const el = rootRef.current;
            if (!el) return;
            el.style.setProperty('--mx', `${e.clientX}px`);
            el.style.setProperty('--my', `${e.clientY}px`);
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    const textEnter = () => setCursorVariant('text');
    const textLeave = () => setCursorVariant('default');

    return (
        <div ref={rootRef} className="relative min-h-screen bg-charcoal font-sans text-white selection:bg-purple-500 selection:text-white md:cursor-none">
            <style>{`@keyframes mkFill { from { transform: scaleY(0); } to { transform: scaleY(1); } }`}</style>

            {/* Interactive dotted-grid background */}
            <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.42) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                        maskImage: 'radial-gradient(circle 180px at var(--mx, -200px) var(--my, -200px), #000 0%, transparent 72%)',
                        WebkitMaskImage: 'radial-gradient(circle 180px at var(--mx, -200px) var(--my, -200px), #000 0%, transparent 72%)',
                    }}
                />
            </div>

            <CustomCursor cursorVariant={cursorVariant} />
            <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />

            <main className="relative z-10">
                {/* ── Hero ── */}
                <section className="mx-auto max-w-7xl px-6 pb-14 pt-32 md:pb-16">
                    <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
                        <div className="md:col-span-7">
                            <FadeIn>
                                <Eyebrow>Media kit · 2026</Eyebrow>
                                <h1 className="text-balance font-serif text-5xl italic text-white md:text-7xl">Mr. Kalopsia</h1>
                                <a
                                    href="https://instagram.com/mr.kalopsia/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-4 inline-flex items-center gap-2 text-[13px] text-purple-400 transition-colors hover:text-white"
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                >
                                    @mr.kalopsia · Instagram
                                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                </a>

                                <p className="mt-8 max-w-xl text-balance text-2xl font-light leading-snug text-white md:text-3xl">
                                    3D craft, now with a <span className="font-serif italic text-zinc-200">face and a voice.</span>
                                </p>
                                <p className="mt-6 max-w-xl text-pretty text-[16px] font-light leading-relaxed text-white/70">
                                    I write, direct, perform, and produce branded films for AI, design, and creative-technology brands, from concept to final edit. Everything is produced in-house. Partnerships run through @mr.kalopsia&apos;s 153K-follower audience, or as content built for your own channels.
                                </p>

                                <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
                                    <CenterFillButton href="mailto:em@mrkalopsia.com?subject=Partnership%20Inquiry" className="w-fit !px-8 !py-3.5 !text-[11px]" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                        Discuss a Partnership
                                        <ArrowRight size={14} aria-hidden="true" />
                                    </CenterFillButton>
                                    <a href="#rates" className="group relative w-fit text-[13px] font-medium text-white/70 transition-colors hover:text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                                        Ways to work together
                                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
                                    </a>
                                </div>

                                <div className="mt-14 grid border-t border-white/10 sm:grid-cols-3">
                                    {MEDIA_KIT_HERO_STATS.map((stat) => (
                                        <div key={stat.label} className="border-b border-white/10 py-5 sm:border-b-0 sm:border-r sm:pr-5 sm:last:border-r-0">
                                            <div className="tabular-nums text-2xl font-medium text-white md:text-3xl">{stat.value}</div>
                                            <div className="mt-1 text-[12px] text-zinc-500">
                                                {stat.label} · <span className="text-purple-400">{stat.qualifier}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>

                        <FadeIn delay={120} className="md:col-span-5">
                            <div className="group relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-white/5 bg-[#101014]">
                                <img src={headshot} alt="Eashan Misra, Mr. Kalopsia" className="absolute inset-0 h-full w-full scale-100 object-cover object-center transition-[opacity,transform] duration-200 ease-out group-hover:scale-[1.015] group-hover:opacity-0 motion-reduce:transition-none" />
                                <img src={oldDp} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none" />
                            </div>
                        </FadeIn>
                    </div>

                    <FadeIn delay={200}>
                        <div className="mt-14 border-t border-white/5 pt-8">
                            <Eyebrow>Selected brand work</Eyebrow>
                            <div className="mt-2">
                                <BrandLogoTicker />
                            </div>
                        </div>
                    </FadeIn>
                </section>

                {/* ── Performance in context: proof + formats ── */}
                <section className="px-6 py-16 md:py-24" id="proof">
                    <div className="mx-auto max-w-6xl">
                        <SectionHeading eyebrow="Performance in context">
                            One account, two formats, three kinds of <span className="font-serif italic text-zinc-200">proof.</span>
                        </SectionHeading>
                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {MEDIA_KIT_PROOF_CARDS.map((card, index) => (
                                <ProofCard key={card.label} card={card} index={index} />
                            ))}
                        </div>

                        {/* Formats: image + heading */}
                        <FadeIn delay={120}>
                            <div className="mt-16 border-t border-white/5 pt-12">
                                <Eyebrow>What a brand can commission</Eyebrow>
                                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {MEDIA_KIT_FORMATS.map((format, index) => (
                                        <FadeIn key={format.title} delay={index * 80} className="h-full">
                                            <div className="group relative aspect-[4/5] overflow-hidden rounded-md border border-white/5 transition-colors duration-500 hover:border-purple-500/40">
                                                <img src={resolveImg(format.image)} alt={format.title} className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${format.image === 'talking-head' ? 'object-top' : ''}`} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(circle at 50% 100%, rgba(168,85,247,0.25), transparent 60%)' }} />
                                                <h3 className="absolute inset-x-0 bottom-0 p-5 text-[15px] font-medium text-white">{format.title}</h3>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ── Case study ── */}
                <section className="px-6 py-16 md:py-24" id="case-study">
                    <div className="mx-auto max-w-6xl">
                        <SectionHeading eyebrow="Case study">
                            Meshy AI: from campaign production to ongoing <span className="font-serif italic text-zinc-200">partnership.</span>
                        </SectionHeading>

                        <div className="mt-12 grid items-start gap-12 md:grid-cols-12 md:gap-16">
                            <FadeIn className="md:col-span-8">
                                <div>
                                    {MEDIA_KIT_CASE_STUDY.rows.map((row) => (
                                        <div key={row.title} className="grid gap-3 border-b border-white/5 py-6 first:pt-0 md:grid-cols-[120px_1fr]">
                                            <div className="text-[13px] font-medium text-purple-400">{row.title}</div>
                                            <p className="text-pretty text-[15px] font-light leading-relaxed text-zinc-300">{row.body}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-6 text-[12px] font-light text-zinc-600">
                                    Total campaign views include paid amplification. No organic-only result is implied.
                                </p>
                            </FadeIn>

                            <FadeIn delay={120} className="md:col-span-4">
                                <a
                                    href={MEDIA_KIT_CASE_STUDY.reelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative mx-auto block aspect-[9/16] w-full max-w-[240px] overflow-hidden rounded-sm border border-white/5 transition-colors duration-500 hover:border-purple-500/30"
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                    aria-label="Open the Meshy AI campaign Reel on Instagram"
                                >
                                    <img src={meshyThumbnail} alt="Meshy AI campaign Reel cover" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-[11px] text-white">2.5M+ views · Paid-Supported</span>
                                    <span className="absolute right-3 top-3 flex size-8 translate-y-1 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        <ArrowUpRight size={15} aria-hidden="true" />
                                    </span>
                                </a>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* ── Audience ── */}
                <section className="px-6 py-16 md:py-24">
                    <div className="mx-auto max-w-6xl">
                        <SectionHeading
                            eyebrow="Audience"
                            description="An international audience built around design and 3D culture. All figures come directly from Instagram insights. Live screenshots are available on request."
                        >
                            Who&apos;s actually <span className="font-serif italic text-zinc-200">watching.</span>
                        </SectionHeading>

                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            <FadeIn>
                                <article className="h-full rounded-md border border-white/5 bg-[#101014] p-6 transition-colors duration-500 hover:border-purple-500/30 md:p-8">
                                    <div className="flex items-start justify-between gap-6">
                                        <h3 className="text-xl font-medium text-white">Age</h3>
                                        <div className="text-right">
                                            <div className="tabular-nums text-2xl font-medium text-white">76.6%</div>
                                            <div className="text-[12px] text-purple-400">Aged 25–44</div>
                                        </div>
                                    </div>
                                    <div className="mt-8 space-y-6">
                                        {MEDIA_KIT_AGE.map((row) => <Bar key={row.label} {...row} />)}
                                    </div>
                                    <div className="mt-8 flex gap-8 border-t border-white/5 pt-6">
                                        {MEDIA_KIT_GENDER.map((item) => (
                                            <div key={item.label}>
                                                <div className="tabular-nums text-xl font-medium text-white">{item.value}</div>
                                                <div className="mt-1 text-[12px] text-zinc-500">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            </FadeIn>

                            <FadeIn delay={120}>
                                <article className="h-full rounded-md border border-white/5 bg-[#101014] p-6 transition-colors duration-500 hover:border-purple-500/30 md:p-8">
                                    <h3 className="text-xl font-medium text-white">Top markets</h3>
                                    <div className="mt-6 divide-y divide-white/5">
                                        {MEDIA_KIT_GEO.map((item) => (
                                            <div key={item.country} className="group flex items-center justify-between py-3">
                                                <span className="text-sm font-light text-zinc-400 transition-colors duration-300 group-hover:text-white">{item.country}</span>
                                                <span className="tabular-nums text-sm text-white">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-pretty text-sm font-light leading-relaxed text-zinc-400">
                                        No single market accounts for more than 15% of followers. The United States is the second-largest market, while paid campaigns can target whichever geography the brand chooses.
                                    </p>
                                </article>
                            </FadeIn>
                        </div>

                        <FadeIn delay={180}>
                            <p className="mt-6 max-w-4xl rounded-md border border-white/5 bg-[#101014] p-6 text-pretty text-[15px] font-light leading-relaxed text-zinc-300">
                                Everyone here chose to follow a deep 3D-process account. It is an audience self-selected for craft. Designers, artists, and students arrived for the renders and stayed for the commentary.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* ── Partnerships / rates ── */}
                <section className="px-6 py-16 md:py-24" id="rates">
                    <div className="mx-auto max-w-6xl">
                        <SectionHeading eyebrow="Partnerships" description="Every engagement is scoped and quoted individually.">
                            Ways to work <span className="font-serif italic text-zinc-200">together.</span>
                        </SectionHeading>

                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            {MEDIA_KIT_PACKAGES.map((item, index) => (
                                <FadeIn key={item.number} delay={index * 80} className="h-full">
                                    <GlowCard className="h-full p-6 md:p-8">
                                        <span className="text-[13px] text-zinc-600">{item.number}</span>
                                        <h3 className="mt-8 text-balance text-xl font-medium text-white md:text-2xl">{item.title}</h3>
                                        <p className="mt-4 text-pretty text-sm font-light leading-relaxed text-zinc-400">{item.description}</p>
                                        <p className="mt-auto border-t border-white/5 pt-6 text-[12px] font-light leading-relaxed text-zinc-500">{item.terms}</p>
                                    </GlowCard>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn delay={200}>
                            <p className="mt-8 text-[13px] font-light text-zinc-400">Rates on request.</p>
                        </FadeIn>
                    </div>
                </section>

                {/* ── Credentials ── */}
                <section className="px-6 py-16 md:py-24" id="credentials">
                    <div className="mx-auto max-w-6xl">
                        <SectionHeading eyebrow="Credentials">
                            Credibility behind the <span className="font-serif italic text-zinc-200">work.</span>
                        </SectionHeading>

                        <div className="mt-12">
                            <Credentials items={MEDIA_KIT_CREDENTIALS} textEnter={textEnter} textLeave={textLeave} />
                        </div>

                    </div>
                </section>

                {/* ── Working terms (accordion) ── */}
                <section className="px-6 py-16 md:py-24">
                    <div className="mx-auto max-w-4xl">
                        <SectionHeading eyebrow="Working terms" description="Clear terms protect the creative, the production schedule, and the media plan.">
                            Parameters &amp; <span className="font-serif italic text-zinc-200">expectations.</span>
                        </SectionHeading>

                        <div className="mt-12">
                            <FaqAccordion items={MEDIA_KIT_FAQ} />
                        </div>
                        <FadeIn delay={220}>
                            <p className="mt-8 text-[12px] font-light leading-relaxed text-zinc-500">
                                Sponsored content uses platform paid-partnership tools and follows applicable FTC and ASCI disclosure requirements.
                            </p>
                        </FadeIn>
                    </div>
                </section>

                <footer className="relative z-20 pt-16 md:pt-24" id="contact">
                    <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
                        <FadeIn>
                            <CTASection
                                headline={(
                                    <>
                                        Your product deserves more than a <span className="font-['Playfair_Display',serif] italic text-zinc-200">placement.</span>
                                    </>
                                )}
                                description="Send the product, the problem it solves, and the moment it needs to own. I’ll return with the right format, production scope, and distribution plan."
                            />
                        </FadeIn>
                    </div>
                    <SiteFooter textEnter={textEnter} textLeave={textLeave} />
                </footer>
            </main>
        </div>
    );
}
