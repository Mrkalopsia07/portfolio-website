// [uploaded file: mrkalopsia07/portfolio-website/portfolio-website-dcd06201a526ad5f111f6220273abccb01376cc0/src/App.jsx]
import React, { useEffect, useRef, useState, Suspense } from 'react';
import Lenis from 'lenis';
import { Play, Mail, Instagram, Linkedin, Download, Star, ArrowRight } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import VideoPlayer from './components/VideoPlayer';
import BrandTicker from './components/BrandTicker';
// Lazy load to keep initial load fast
const BackgroundScene = React.lazy(() => import('./components/BackgroundScene'));
import FadeIn from './components/FadeIn';
import Navbar from './components/Navbar';
import GlowingStackCard from './components/GlowingStackCard';
import { ROLES, PROJECTS, SPOTLIGHT_MOMENTS } from './constants';
import UnicornScene from "unicornstudio-react";
import CTASection from './components/CTASection';
import Typewriter from './components/Typewriter';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error("Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) return <div className="bg-charcoal text-white p-8">Something went wrong.</div>;
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}

function AppContent() {
  const [cursorVariant, setCursorVariant] = useState("default");

  // NOTE: 'isHeroVisible' performance logic removed to keep background persistent (Feedback #1 & #2)

  // Initialize Loading State
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("introShown"));
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem("introShown"));

  // Safety gate for WebGL context
  const [canMountBackground, setCanMountBackground] = useState(false);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const progressRef = useRef(0); // Track float value for smooth decay
  const [fadingOut, setFadingOut] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const [isGalaxyLoaded, setIsGalaxyLoaded] = useState(() => !!sessionStorage.getItem("introShown"));

  const heroRef = useRef(null);
  const showreelRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  // 1. Initialize Lenis (Smooth Scroll)
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.8,
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

  // 2. Optimized Scroll Listener (Parallax Only)
  useEffect(() => {
    if (!lenis) return;
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Hero Parallax Logic - Direct DOM manipulation for performance
      const shouldBeVisible = scrollY < windowHeight + 200;

      if (heroRef.current && shouldBeVisible) {
        const progress = Math.min(scrollY, windowHeight);
        const opacity = 1 - Math.min(progress / 500, 1);
        const translateY = progress * -0.4;
        heroRef.current.style.opacity = opacity;
        heroRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  // 2.1 Intersection Observer for Play Button Toggle (Optimization)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setShowPlayButton(entry.isIntersecting);
    }, {
      rootMargin: '-20% 0px 0px 0px',
      threshold: 0
    });

    if (showreelRef.current) observer.observe(showreelRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. REAL LOADER LOGIC (Two-Gear System)
  useEffect(() => {
    if (!loading || !isGalaxyLoaded) {
      if (!loading && !canMountBackground) {
        // Wait 200ms after loader finishes before asking GPU to render Main Scene
        const timer = setTimeout(() => setCanMountBackground(true), 200);
        return () => clearTimeout(timer);
      }
      return;
    }

    let animationFrameId;
    const progressTimers = [];

    const updateProgress = () => {
      let current = progressRef.current;
      const isComplete = document.readyState === 'complete';

      if (isComplete) {
        // If loaded, smoothly accelerate to 100%
        current += (100 - current) * 0.1;
        if (current > 99.5) current = 100;
      } else {
        // Gear 1: Fast (0% to 80%)
        if (current < 80) {
          current += (2 + Math.random()); // Add +2 to +3 per frame
        }
        // Gear 2: Decay (80% to 99%)
        else {
          // 'Ease-Out' formula: simulates slowing down
          current += (99 - current) * 0.05;
        }
      }

      // Hard clamp
      if (current > 100) current = 100;
      // Do not allow hitting 100 unless actually complete
      if (!isComplete && current > 99) current = 99;

      progressRef.current = current;
      setLoadingProgress(Math.floor(current));

      if (Math.floor(current) < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Load Complete
        setShowWelcome(true);

        const t1 = setTimeout(() => {
          setFadingOut(true);
          setLoading(false);
          sessionStorage.setItem("introShown", "true");

          const t2 = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            if (lenis) lenis.resize();
          }, 100);
          progressTimers.push(t2);

        }, 800);
        progressTimers.push(t1);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(animationFrameId);
      progressTimers.forEach(clearTimeout);
    };
  }, [loading, isGalaxyLoaded, lenis]);

  // Fallback: If galaxy fails to load, force proceed
  useEffect(() => {
    if (loading && !isGalaxyLoaded) {
      const timer = setTimeout(() => setIsGalaxyLoaded(true), 2500);
      return () => clearTimeout(timer);
    }
  }, [loading, isGalaxyLoaded]);

  // Cleanup loader from DOM
  useEffect(() => {
    if (!loading && showLoader) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        // Double check layout after full removal
        window.dispatchEvent(new Event('resize'));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, showLoader]);


  // Showreel Deep Link
  useEffect(() => {
    if (!loading && lenis) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('showreel') === 'true') {
        const scrollToReel = async () => {
          await new Promise(r => setTimeout(r, 500));
          setShowReel(true);
          lenis.scrollTo('#showreel', { offset: -window.innerHeight * 0.1, duration: 1.5 });
        };
        scrollToReel();
      }
    }
  }, [loading, lenis]);

  const textEnter = React.useCallback(() => setCursorVariant("text"), []);
  const textLeave = React.useCallback(() => setCursorVariant("default"), []);

  return (
    <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden md:cursor-none cursor-auto relative">

      {/* 1. LOADER */}
      {showLoader && (
        <div
          className="fixed inset-0 z-[10000] bg-charcoal flex flex-col items-center justify-center px-8"
          style={{
            transform: loading ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)'
          }}
          onTransitionEnd={(e) => {
            if (e.propertyName === 'transform' && !loading) {
              setShowLoader(false);
            }
          }}
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
            style={{ opacity: fadingOut ? 0 : 1, transition: 'opacity 1s ease-out', transform: 'scaleX(-1)' }}>
            {showLoader && (
              <UnicornScene
                jsonFilePath="/galaxy.json"
                scale={1}
                dpi={1} // Optimized for Intel HD
                className="w-full h-full object-cover"
                onLoad={() => setIsGalaxyLoaded(true)}
              />
            )}
          </div>

          <div className="relative z-10 flex flex-col items-center mt-24" style={{ opacity: fadingOut ? 0 : 1, transition: 'opacity 1s ease-out' }}>
            <div className="relative mb-8">
              <div className={`loader-orb ${showWelcome ? 'settled' : ''}`}>
                <div style={{ opacity: showWelcome ? 0 : 1, transform: showWelcome ? 'scale(0.8)' : 'scale(1)', transition: 'all 0.5s ease-out', position: 'absolute' }} className={showWelcome ? 'hidden' : 'block'}>
                  <span className="text-xs font-medium text-black/80">{loadingProgress}</span>
                </div>
                <div style={{ opacity: showWelcome ? 1 : 0, transform: showWelcome ? 'scale(1)' : 'scale(0.5)', transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', position: 'absolute' }} className={showWelcome ? 'block' : 'hidden'}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black/80">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <blockquote className="text-center max-w-md">
              <p className="italic text-white/80 text-sm md:text-base leading-relaxed mb-3" style={{ fontFamily: "'PT Serif', serif" }}>
                "Somewhere, something incredible is waiting to be known."
              </p>
              <cite className="text-white/40 text-xs tracking-widest uppercase not-italic">Carl Sagan</cite>
            </blockquote>
          </div>
        </div>
      )}

      <CustomCursor cursorVariant={cursorVariant} />
      <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />

      {/* 2. BACKGROUND SCENE (Lazy + Warmup) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          {/* Changed: Always render if 'canMountBackground' is true. No more scroll-based unmounting. */}
          {canMountBackground && <BackgroundScene />}
        </Suspense>
      </div>

      <main className="relative z-20">
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{
          background: `
            linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(5,5,7,0.1) 8%, rgba(5,5,7,0.3) 11%, rgba(5,5,7,0.6) 14%, rgba(5,5,7,0.85) 16%, #050507 18%, #050507 70%, rgba(5,5,7,0.9) 75%, rgba(5,5,7,0.7) 82%, rgba(5,5,7,0.4) 90%, rgba(5,5,7,0.1) 96%, transparent 100%)
          `
        }}></div>
        <div className="absolute inset-0 z-0 pointer-events-none md:hidden" style={{
          background: `
            linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(5,5,7,0.4) 8%, rgba(5,5,7,0.8) 12%, #050507 15%, #050507 100%)
          `
        }}></div>


        {/* HERO */}
        <section ref={heroRef} className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center py-24">
          <div className="flex flex-col items-center justify-center mb-5">
            <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <Typewriter roles={ROLES} />
            </span>
          </div>

          <h1 className="font-serif italic text-5xl md:text-[5.5rem] leading-none mb-5 w-full text-center tracking-[-0.02em]">Mr. Kalopsia</h1>

          <p className="text-white/70 max-w-[450px] text-[16px] leading-relaxed mb-10 font-['Work_Sans',sans-serif] font-normal text-center mx-auto">
            Multi-disciplinary Design Lead solving problems across <span className="font-['Playfair_Display',serif] italic font-medium text-white lining-nums">3D</span>, <span className="font-['Playfair_Display',serif] italic font-medium text-white lining-nums">Motion</span>, and <span className="font-['Playfair_Display',serif] italic font-medium text-white lining-nums">Video</span>.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-24">
            {/* Primary: Watch Reel */}
            <button
              onClick={() => {
                if (lenis) lenis.scrollTo(window.innerHeight, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
                setTimeout(() => setShowReel(true), 800);
              }}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="group relative flex items-center gap-3 font-['Work_Sans',sans-serif] text-[10px] md:text-xs font-medium uppercase tracking-widest text-white py-3 px-6 md:py-2 md:px-0 bg-white/5 md:bg-transparent rounded-full md:rounded-none border border-white/10 md:border-none"
            >
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                <Play
                  className="w-3 h-3 fill-current transform translate-x-[1px] transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="relative">
                Watch Reel
                {/* Underline Animation */}
                <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full group-hover:left-0"></span>
              </span>
            </button>

            {/* Secondary: About Me */}
            <a
              href="/about"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="group relative font-['Work_Sans',sans-serif] text-[10px] md:text-xs font-medium uppercase tracking-widest text-white transition-colors duration-300 py-3 px-6 md:py-2 md:px-0 bg-white/5 md:bg-transparent rounded-full md:rounded-none border border-white/10 md:border-none"
            >
              About Me
              {/* Underline Animation */}
              <span className="absolute bottom-1 right-0 w-0 h-[1px] bg-white opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full group-hover:left-0"></span>
            </a>
          </div>

          <div className="absolute bottom-24 left-0 right-0 overflow-hidden flex justify-center">
            <BrandTicker textEnter={textEnter} textLeave={textLeave} />
          </div>
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer animate-[gentleBounce_2s_ease-in-out_infinite]">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 stroke-white">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <style>{`@keyframes gentleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }`}</style>
        </section>

        <div id="showreel" ref={showreelRef}>
          <VideoPlayer showReel={showReel} setShowReel={setShowReel} showPlay={showPlayButton || showReel} textEnter={textEnter} textLeave={textLeave} setCursorVariant={setCursorVariant} />
        </div>

        {/* WORK */}
        <section className="py-16 px-6 relative z-20" id="work">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-20">
                <h2 className="font-serif italic text-4xl md:text-6xl mb-4">Featured Work</h2>
                <p className="text-zinc-400 text-[10px] md:text-xs font-jetbrains uppercase tracking-[0.2em]">Motion is worth a thousand words</p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {PROJECTS.map((project, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <div
                    className="group flex flex-col block"
                  >
                    {project.isViewAll ? (
                      <div
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                      >
                        <GlowingStackCard href={project.link} />
                      </div>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col block"
                        onMouseLeave={(e) => {
                          textLeave();
                          const container = e.currentTarget;
                          const video = container.querySelector('video');
                          if (video) {
                            const vTimer = setTimeout(() => {
                              if (!container.matches(':hover')) {
                                video.pause();
                                video.currentTime = 0;
                              }
                            }, 500);
                            // We don't have a component state/ref here easily per-item
                            // but we can attach it to the element if strictly needed.
                            // However, since this is a UI interaction, it's less likely 
                            // to leak long-term than the persistent typewriter loop.
                            // To be safe, we can clear it if the mouse enters again.
                            container._vTimer = vTimer;
                          }
                        }}
                        onMouseEnter={(e) => {
                          textEnter();
                          const container = e.currentTarget;
                          if (container._vTimer) clearTimeout(container._vTimer);
                          const video = container.querySelector('video');
                          if (video) {
                            video.currentTime = 0;
                            video.play().catch(err => console.log("Video play interrupted:", err));
                          }
                        }}
                      >
                        <div className="relative aspect-[16/10] rounded-sm overflow-hidden transition-all duration-500 bg-charcoal mb-4">
                          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                          <video
                            src={project.video}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </div>

                        <div className="flex items-center overflow-hidden h-10 px-1">
                          {/* Title: Slides slightly to the right */}
                          <h3 className="text-2xl font-normal tracking-tight text-white whitespace-nowrap transition-transform duration-500 group-hover:translate-x-2">
                            {project.title}
                          </h3>

                          {/* Hidden Details: Slide in from the left + Fade in */}
                          <div className="flex items-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ml-4 flex-1">
                            {/* The expanding line */}
                            <div className="h-[1px] bg-white w-8 mr-3"></div>
                            {/* The category text */}
                            <span className="text-zinc-500 text-sm font-normal tracking-wide whitespace-nowrap">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SPOTLIGHT */}
        <section className="pt-16 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10 md:mb-20">
                <h2 className="font-serif italic text-4xl md:text-6xl mb-3 md:mb-4">Spotlight Moments</h2>
                <p className="text-zinc-400 text-[10px] md:text-xs font-jetbrains uppercase tracking-[0.2em]">Recognition & Milestones</p>
              </div>
            </FadeIn>
            <div className="flex flex-col gap-4">
              {SPOTLIGHT_MOMENTS.map((moment, index) => (
                <FadeIn key={index} delay={index * 150}>
                  <a
                    href={moment.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full bg-charcoal/40 border border-white/5 hover:border-white/10 transition-colors duration-500 rounded-sm overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6 p-4 md:p-6 cursor-pointer"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    {/* Image Section - No Zoom Animation */}
                    <div className="relative overflow-hidden shrink-0 rounded-sm w-full h-48 md:w-48 md:h-28 bg-charcoal">
                      {/* Dark overlay that vanishes on hover */}
                      <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 flex flex-col justify-center relative w-full">
                      {/* The "Tag" - Eyebrow Style */}
                      <div className="flex items-center space-x-3 mb-2">
                        {/* The Line */}
                        <span className="h-[1px] w-4 bg-zinc-600 group-hover:w-8 group-hover:bg-white transition-all duration-500"></span>
                        {/* The Text */}
                        <span className="text-[11px] font-jetbrains uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors duration-300">
                          {moment.role}
                        </span>
                      </div>

                      {/* Title with Precision Slide */}
                      <div className="overflow-hidden">
                        <h3 className="text-xl md:text-2xl font-['Work_Sans'] text-white font-medium mb-1 transform transition-transform duration-500 group-hover:translate-x-1">
                          {moment.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-zinc-400 font-['Work_Sans'] text-sm md:text-base font-light leading-relaxed max-w-xl group-hover:text-zinc-300 transition-colors">
                        {moment.description}
                      </p>
                    </div>

                    {/* Right Arrow Interaction (Desktop only) */}
                    <div className="hidden md:flex items-center justify-center w-12 shrink-0 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                        <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / TESTIMONIAL */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative z-20" id="about">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="relative bg-[#050507] border border-white/5 rounded-md p-8 md:p-16 overflow-hidden" onMouseEnter={textEnter} onMouseLeave={textLeave}>

                {/* Decorative Background Quote Mark */}
                <div className="absolute top-8 left-8 text-zinc-500/20 font-serif text-[120px] leading-none -z-10 select-none pointer-events-none">
                  “
                </div>

                <div className="max-w-3xl mx-auto text-center space-y-10">
                  {/* The Quote - Using PT Serif Italic */}
                  <blockquote
                    className="text-2xl md:text-4xl italic font-normal text-zinc-200 leading-relaxed"
                    style={{ fontFamily: "'PT Serif', serif" }}
                  >
                    "Eashan is, without a doubt, one of the best creatives I've ever worked with—ever. He has vision most creatives don't, and a heart even fewer bring to the table."
                  </blockquote>

                  {/* Author Section */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-center">
                      <cite className="not-italic block text-lg font-sans font-medium text-white mb-1">
                        Shara Senderoff
                      </cite>
                      <span className="block text-sm font-sans text-zinc-500 font-light">
                        Co-Founder: Futureverse, Readyverse
                      </span>
                    </div>

                    {/* The Tech Tag */}
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="h-[1px] w-8 bg-zinc-700"></span>
                      <span className="text-[10px] font-jetbrains uppercase tracking-widest text-zinc-500">
                        5-Year Remote Partnership
                      </span>
                      <span className="h-[1px] w-8 bg-zinc-700"></span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-16 md:pt-32 pb-0 relative z-20" id="contact">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 md:px-6">
            <FadeIn>
              <CTASection />
            </FadeIn>
          </div>
          <div className="mt-12 md:mt-24 w-full bg-[#050507] border-t border-white/5 pt-12 md:pt-16 pb-12 md:pb-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-8">

              {/* LEFT: Operational Status & Copyright */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-[10px] md:text-xs font-sans font-medium text-zinc-500 uppercase tracking-widest">

                {/* Blinking Status */}
                <span className="flex items-center gap-2 text-zinc-400">
                  <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  </span>
                  Operational
                </span>

                {/* Divider */}
                <span className="hidden md:block text-zinc-800 select-none">|</span>

                {/* Copyright */}
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