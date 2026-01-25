import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Play, Mail, Instagram, Linkedin, Download, Cpu, Globe, MessageSquare, Star, Menu, X, ArrowRight } from 'lucide-react';
import CenterFillButton from './components/CenterFillButton';
import CustomCursor from './components/CustomCursor';
import VideoPlayer from './components/VideoPlayer';
import BrandTicker from './components/BrandTicker';
import BackgroundScene from './components/BackgroundScene';
import FloatingOrbs from './components/FloatingOrbs';
import FadeIn from './components/FadeIn';
import Navbar from './components/Navbar';
import { ROLES, PROJECTS, SPOTLIGHT_MOMENTS } from './constants';
import UnicornScene from "unicornstudio-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong.</h1>
          <pre className="bg-zinc-900 p-4 rounded text-sm text-zinc-300 overflow-auto max-w-full">
            {this.state.error && this.state.error.toString()}
          </pre>
        </div>
      );
    }

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

  const [loading, setLoading] = useState(() => !sessionStorage.getItem("introShown"));
  const [showLoader, setShowLoader] = useState(() => !sessionStorage.getItem("introShown"));
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showReel, setShowReel] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [isGalaxyLoaded, setIsGalaxyLoaded] = useState(() => !!sessionStorage.getItem("introShown"));


  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const heroRef = useRef(null);
  const orbsRef = useRef(null);

  // 1. USE STATE FOR LENIS
  const [lenis, setLenis] = useState(null);
  const snapTimeout = useRef(null);

  // Smooth scroll with Lenis - optimized to only run when needed
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.8,
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

  // 2. MASTER SCROLL LISTENER (Hero + Navbar + PlayButton) - throttled for performance
  useEffect(() => {
    if (!lenis) return;

    let ticking = false;
    let lastScrollY = 0;

    const updateScroll = () => {
      const scrollY = lastScrollY;
      const windowHeight = window.innerHeight;

      // --- A. HERO ANIMATION (Direct DOM - High Perf) ---
      if (heroRef.current) {
        const progress = Math.min(scrollY, windowHeight);
        const opacity = 1 - Math.min(progress / 500, 1);
        const translateY = progress * -0.4;
        heroRef.current.style.opacity = opacity;
        heroRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }

      // --- NEW: ORB FADE IN (Matches background gradient) ---
      if (orbsRef.current) {
        const orbOpacity = Math.min(scrollY / windowHeight, 1);
        orbsRef.current.style.opacity = orbOpacity;
      }

      // --- B. PLAY BUTTON TOGGLE (Smart State) ---
      const playThreshold = windowHeight * 0.4;
      const shouldShowPlay = scrollY > playThreshold;
      setShowPlayButton(prev => (prev !== shouldShowPlay ? shouldShowPlay : prev));

      ticking = false;
    };

    const onScroll = (e) => {
      lastScrollY = e.scroll || window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    lenis.on('scroll', onScroll);
    onScroll({ scroll: window.scrollY }); // Initial check

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  // Fallback: If galaxy doesn't load in 2.5s, proceed anyway
  useEffect(() => {
    if (loading && !isGalaxyLoaded) {
      const timer = setTimeout(() => {
        console.warn("Galaxy load timed out, forcing progress...");
        setIsGalaxyLoaded(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loading, isGalaxyLoaded]);

  // --- SNAP BACK LOGIC REMOVED ---

  // Loader with progress counter
  useEffect(() => {
    if (!loading || !isGalaxyLoaded) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      // Gentle ease-out curve: starts visible, slows naturally
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2); // Quadratic ease-out
      const progress = easedProgress * 100;
      setLoadingProgress(Math.floor(progress));

      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Show "Welcome" first
        setShowWelcome(true);
        // After a brief pause, trigger exit
        setTimeout(() => {
          setFadingOut(true);
          setLoading(false);
          sessionStorage.setItem("introShown", "true");
        }, 800);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [loading, isGalaxyLoaded]);

  // Fallback: ensure loader unmounts even if onTransitionEnd doesn't fire
  useEffect(() => {
    if (!loading && showLoader) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        window.dispatchEvent(new Event('resize'));
      }, 1500); // 1s transition + 500ms buffer
      return () => clearTimeout(timer);
    }
  }, [loading, showLoader]);

  // Typewriter
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % ROLES.length;
      const fullText = ROLES[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 20 : 80);
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 800);
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);




  // Showreel Deep Link Logic
  useEffect(() => {
    if (!loading && lenis) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('showreel') === 'true') {
        const scrollToReel = async () => {
          // Small delay to ensure layout stability
          await new Promise(r => setTimeout(r, 500));

          setShowReel(true);
          lenis.scrollTo('#showreel', {
            offset: -window.innerHeight * 0.1, // Center it a bit
            duration: 1.5
          });
        };
        scrollToReel();
      }
    }
  }, [loading, lenis]);

  const textEnter = React.useCallback(() => setCursorVariant("text"), []);
  const textLeave = React.useCallback(() => setCursorVariant("default"), []);

  return (
    <div className="text-white min-h-screen font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden md:cursor-none cursor-auto relative">

      {/* Loader */}
      {showLoader && (
        <div
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center px-8"
          style={{
            transform: loading ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)'
          }}
          onTransitionEnd={(e) => {
            // Only trigger on transform (slide-up), not on inner opacity transitions
            if (e.propertyName === 'transform' && !loading) {
              setShowLoader(false);
              // Trigger resize after loader unmounts to fix BackgroundScene WebGL
              setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
            }
          }}
        >
          {/* Cosmic animation - Unicorn Studio Galaxy Background */}
          <div
            className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
            style={{
              opacity: fadingOut ? 0 : (isGalaxyLoaded ? 1 : 0),
              transition: 'opacity 1s ease-out',
              transform: 'scaleX(-1)'
            }}
          >
            <UnicornScene
              jsonFilePath="/galaxy.json"
              scale={1}
              dpi={1.5}
              className="w-full h-full object-cover"
              onLoad={() => setIsGalaxyLoaded(true)}
            />
          </div>

          {/* Content Overlay */}
          <div
            className="relative z-10 flex flex-col items-center mt-24"
            style={{
              opacity: fadingOut ? 0 : 1,
              transition: 'opacity 1s ease-out'
            }}
          >
            {/* Fancy 3D Rotating Loader */}
            <div className="relative mb-8">
              <div className={`loader-orb ${showWelcome ? 'settled' : ''}`}>
                {/* Counter */}
                <div
                  style={{
                    opacity: showWelcome ? 0 : 1,
                    transform: showWelcome ? 'scale(0.8)' : 'scale(1)',
                    transition: 'all 0.5s ease-out',
                    position: 'absolute'
                  }}
                  className={showWelcome ? 'hidden' : 'block'}
                >
                  <span
                    className="text-xs font-medium text-black/80"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {loadingProgress}
                  </span>
                </div>

                {/* Checkmark on complete */}
                <div
                  style={{
                    opacity: showWelcome ? 1 : 0,
                    transform: showWelcome ? 'scale(1)' : 'scale(0.5)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    position: 'absolute'
                  }}
                  className={showWelcome ? 'block' : 'hidden'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black/80">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="text-center max-w-md">
              <p className="italic text-white/80 text-sm md:text-base leading-relaxed mb-3" style={{ fontFamily: "'PT Serif', serif" }}>
                "Somewhere, something incredible is waiting to be known."
              </p>
              <cite className="text-white/40 text-xs tracking-widest uppercase not-italic">Carl Sagan</cite>
            </blockquote>
          </div>
        </div>
      )}

      {/* Custom Cursor */}
      <CustomCursor cursorVariant={cursorVariant} />

      {/* Navbar */}
      <Navbar lenis={lenis} textEnter={textEnter} textLeave={textLeave} />


      {/* Background Scene - Only mount after loader galaxy is ready to prevent WebGL contention */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {isGalaxyLoaded && <BackgroundScene />}
      </div>

      <main className="relative z-20">
        {/* Gradient Overlay - smooth transition to dark, then back to transparent for footer */}
        {/* Mobile: keep black until 95%, Desktop: fade at 85% for unicorn visibility in footer */}
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.4) 10%, rgba(0,0,0,0.8) 15%, #000 20%, #000 85%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0.3) 95%, transparent 100%)'
        }}></div>
        <div className="absolute inset-0 z-0 pointer-events-none md:hidden" style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 5%, rgba(0,0,0,0.4) 8%, rgba(0,0,0,0.8) 12%, #000 15%, #000 100%)'
        }}></div>

        {/* Floating Gradient Orbs */}
        <FloatingOrbs ref={orbsRef} />
        {/* HERO */}
        <section ref={heroRef} className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center py-24">

          {/* Role Badge */}
          <div className="flex flex-col items-center justify-center mb-5">
            <span className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl text-white text-[11px] tracking-[0.05em] uppercase font-medium gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>{text}<span className="animate-pulse text-white">|</span></span>
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif italic text-5xl md:text-[5.5rem] leading-none mb-5 w-full text-center tracking-[-0.02em]">Mr. Kalopsia</h1>

          {/* Subtitle */}
          <p className="text-white/70 max-w-[420px] text-[16px] leading-relaxed mb-10 font-light">
            A Multi-disciplinary Design Lead solving problems across <span className="text-white font-normal">3D</span>, <span className="text-white font-normal">Motion</span>, and <span className="text-white font-normal">Video</span>.
          </p>

          {/* Dual CTAs */}
          <div className="flex items-center gap-4 mb-24">
            <button
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo(window.innerHeight, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
                }
                setTimeout(() => setShowReel(true), 800);
              }}
              className="relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-black text-sm font-semibold transition-all duration-300 group overflow-hidden"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              {/* Purple overlay - more prominent */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

              {/* Glow effect */}
              <span className="absolute inset-0 bg-purple-400 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></span>

              <span className="relative flex items-center gap-2.5 transition-colors duration-300 group-hover:text-white">
                <Play size={14} className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-90 fill-black group-hover:fill-white stroke-black group-hover:stroke-white" />
                Play Showreel
              </span>
            </button>
            <a
              href="/about"
              className="relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-transparent text-white/70 border border-white/15 text-sm font-semibold transition-all duration-300 group overflow-hidden"
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
            >
              {/* Purple overlay - more prominent */}
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

              {/* Glow effect */}
              <span className="absolute inset-0 bg-purple-400 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></span>

              <span className="relative flex items-center gap-2.5 transition-colors duration-300 group-hover:text-white">
                About
                <ArrowRight size={16} className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 stroke-white/70 group-hover:stroke-white" />
              </span>
            </a>
          </div>

          {/* Brand Marquee */}
          <div className="absolute bottom-24 left-0 right-0 overflow-hidden flex justify-center">
            <BrandTicker textEnter={textEnter} textLeave={textLeave} />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 opacity-40 hover:opacity-80 transition-opacity duration-300 cursor-pointer animate-[gentleBounce_2s_ease-in-out_infinite]">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 stroke-white">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <style>{`@keyframes gentleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }`}</style>
        </section>

        {/* Video Player Section */}
        {/* Conditional h-screen prevents bottom gap when video is active */}
        {/* Video Player Section */}
        {/* Video Player Section */}
        <div id="showreel">
          <VideoPlayer
            showReel={showReel}
            setShowReel={setShowReel}
            showPlay={showPlayButton || showReel}
            textEnter={textEnter}
            textLeave={textLeave}
            setCursorVariant={setCursorVariant}
          />
        </div>



        {/* Work */}
        <section className="py-16 px-6 relative z-20" id="work">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-20"><h2 className="font-serif italic text-4xl md:text-6xl mb-4">Featured Work</h2><p className="text-zinc-400 text-lg">A selection of projects that define my creative journey</p></div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {PROJECTS.map((project, index) => (
                <FadeIn key={index} delay={index * 100}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-6 block"
                    onMouseEnter={(e) => {
                      textEnter();
                      if (!project.isViewAll) {
                        const video = e.currentTarget.querySelector('video');
                        if (video) {
                          video.currentTime = 0;
                          const playPromise = video.play();
                          if (playPromise !== undefined) {
                            playPromise.catch((error) => {
                              console.log("Video play interrupted/failed:", error);
                            });
                          }
                        }
                      }
                    }}
                    onMouseLeave={(e) => {
                      textLeave();
                      if (!project.isViewAll) {
                        const container = e.currentTarget;
                        const video = container.querySelector('video');
                        if (video) {
                          setTimeout(() => {
                            if (!container.matches(':hover')) {
                              video.pause();
                              video.currentTime = 0;
                            }
                          }, 500);
                        }
                      }
                    }}
                  >
                    <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden transition-all duration-500 ${project.isViewAll ? 'bg-gradient-to-br from-purple-500/10 to-purple-900/20 border border-purple-500/20 group-hover:border-purple-500/40' : 'bg-zinc-900'}`}>
                      {project.isViewAll ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center gap-3 text-purple-300 group-hover:text-purple-200 transition-colors">
                            <span className="text-xl font-medium tracking-wide">View All Projects</span>
                            <ArrowRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                          <video
                            src={project.video}
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                        </>
                      )}
                    </div>
                    {!project.isViewAll && (
                      <div className="flex flex-col px-2"><h3 className="text-2xl font-medium tracking-tight text-white mb-1 group-hover:text-purple-400 transition-colors duration-300" style={{ fontFamily: "'PT Serif', serif" }}>{project.title}</h3><p className="text-zinc-500 text-sm font-medium uppercase tracking-wide">{project.category}</p></div>
                    )}
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Spotlight */}
        <section className="pt-16 md:pt-32 pb-8 md:pb-16 px-4 md:px-6 relative z-20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10 md:mb-20">
                <h2 className="font-serif italic text-4xl md:text-6xl mb-3 md:mb-4">Spotlight Moments</h2>
                <p className="text-zinc-400 text-base md:text-lg">Recognition & Milestones</p>
              </div>
            </FadeIn>
            <div className="flex flex-col gap-4 md:gap-6">
              {SPOTLIGHT_MOMENTS.map((moment, index) => (
                <FadeIn key={index} delay={index * 150}>
                  <a href={moment.link} target="_blank" rel="noopener noreferrer" className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                    {/* Landscape Thumbnail */}
                    <div className="relative w-full md:w-48 h-48 md:h-28 flex-shrink-0 rounded-lg md:rounded-xl overflow-hidden transition-colors bg-zinc-900">
                      <img src={moment.image} alt={moment.title} className="w-full h-full object-cover" />
                      {/* Mobile role badge on image */}
                      <span className="md:hidden absolute bottom-2 left-2 text-purple-300 text-[10px] font-semibold uppercase tracking-wider bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 px-2 py-1 rounded-full">{moment.role}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white group-hover:text-purple-400 transition-colors duration-300 truncate" style={{ fontFamily: "'PT Serif', serif" }}>{moment.title}</h3>
                        <span className="hidden md:inline-flex items-center justify-center text-purple-400 text-xs font-semibold uppercase tracking-wider border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 rounded-full whitespace-nowrap">{moment.role}</span>
                      </div>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors line-clamp-2">{moment.description}</p>
                    </div>

                    <div className="hidden md:flex w-10 h-10 rounded-full items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* About Info */}
        <section className="pt-8 md:pt-16 pb-16 md:pb-32 px-4 md:px-6 relative z-20" id="about">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="relative p-6 md:p-20 rounded-2xl md:rounded-3xl bg-white/5 border border-white/5 text-center mb-12 md:mb-24" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                <div className="hidden md:block absolute top-10 left-10 text-purple-500/20"><Star size={64} fill="currentColor" /></div>
                <blockquote className="italic text-xl md:text-5xl leading-snug md:leading-tight mb-6 md:mb-10 text-zinc-100" style={{ fontFamily: "'PT Serif', serif" }}>"Eashan is, without a doubt, one of the best creatives I've ever worked with—ever. He has vision most creatives don't, and a heart even fewer bring to the table."</blockquote>
                <div className="flex flex-col items-center">
                  <h4 className="text-base md:text-xl font-bold tracking-wide uppercase text-white mb-1 md:mb-2">Shara Senderoff</h4>
                  <p className="text-zinc-400 text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4">Co-Founder: Futureverse, Readyverse</p>
                  <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] md:text-xs font-bold tracking-wider uppercase border border-purple-500/20">5-Year Remote Partnership</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>



        {/* Footer */}
        <footer className="pt-16 md:pt-32 pb-0 relative z-20" id="contact">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center px-4 md:px-6">
            <FadeIn>
              <h2 className="font-serif italic text-4xl md:text-8xl mb-8 md:mb-12 opacity-90 leading-tight">Ready to build<br />something iconic?</h2>
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
          <div className="mt-12 md:mt-24 w-full bg-black">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center md:flex-row md:justify-between border-t border-white/10 pt-6 md:pt-8 pb-12 md:pb-32 gap-6 md:gap-8">
                <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest order-last md:order-first">© 2025 Mr. Kalopsia. Eashan Misra.</p>
                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                  <a href="https://instagram.com/mr.kalopsia/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-wider" onMouseEnter={textEnter} onMouseLeave={textLeave}><Instagram size={16} className="md:w-[18px] md:h-[18px]" /> Instagram</a>
                  <a href="https://www.linkedin.com/in/eashan-misra/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-wider" onMouseEnter={textEnter} onMouseLeave={textLeave}><Linkedin size={16} className="md:w-[18px] md:h-[18px]" /> LinkedIn</a>
                  <a href="/Resume%20-%20Eashan%20Misra.docx" download className="relative flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-xs md:text-sm font-bold uppercase tracking-wider border border-purple-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:bg-purple-500/10 group overflow-hidden" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                    {/* Purple overlay */}
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>

                    {/* Glow effect */}
                    <span className="absolute inset-0 bg-purple-400 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></span>

                    <span className="relative flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
                      <Download size={16} className="md:w-[18px] md:h-[18px] transition-all duration-300 group-hover:scale-110 group-hover:translate-y-1" />
                      <span>Resume</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div >
  );
}