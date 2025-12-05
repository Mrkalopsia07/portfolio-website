import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

export default function VideoPlayer({ showReel, setShowReel, showPlay, textEnter, textLeave, setCursorVariant }) {
    const videoRef = useRef(null);
    const loopRef = useRef(null);
    const mobileVideoRef = useRef(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [videoProgress, setVideoProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-play when showReel becomes true (desktop only)
    useEffect(() => {
        if (!isMobile) {
            if (showReel && videoRef.current) {
                videoRef.current.play();
                setIsVideoPlaying(true);
                if (loopRef.current) loopRef.current.pause();
            } else if (!showReel && loopRef.current) {
                loopRef.current.play();
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }
        }
    }, [showReel, isMobile]);

    // Handle mobile modal
    useEffect(() => {
        if (showMobileModal && mobileVideoRef.current) {
            mobileVideoRef.current.play();
            setIsVideoPlaying(true);
        } else if (!showMobileModal && mobileVideoRef.current) {
            mobileVideoRef.current.pause();
            mobileVideoRef.current.currentTime = 0;
            setVideoProgress(0);
            setCurrentTime(0);
        }
    }, [showMobileModal]);

    // Lock scroll when mobile modal is open
    useEffect(() => {
        if (showMobileModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showMobileModal]);

    // Handle cursor state based on playing status
    useEffect(() => {
        if (showReel && isVideoPlaying) {
            setCursorVariant('default');
        }
    }, [showReel, isVideoPlaying, setCursorVariant]);

    const handleMouseEnter = () => {
        if (!showReel || !isVideoPlaying) {
            setCursorVariant('video');
        }
    };

    const handleMouseLeave = () => {
        setCursorVariant('default');
    };

    const handleVideoClick = () => {
        if (isMobile) {
            setShowMobileModal(true);
            return;
        }

        if (!showReel) {
            setShowReel(true);
            setCursorVariant('default');
        } else {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsVideoPlaying(true);
                setCursorVariant('default');
            } else {
                videoRef.current.pause();
                setIsVideoPlaying(false);
                setCursorVariant('video');
            }
        }
    };

    const closeMobileModal = () => {
        setShowMobileModal(false);
        setIsVideoPlaying(false);
    };

    return (
        <>
            {/* Desktop & Mobile Preview */}
            <section className="w-full flex justify-center py-6 md:py-12">
                <div
                    className={`relative w-full max-w-[85%] md:max-w-7xl mx-auto aspect-[4/5] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl ${!showReel || !isVideoPlaying ? 'cursor-none' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleVideoClick}
                >
                    {/* Loop Video (Background) - Always visible on mobile, conditional on desktop */}
                    <video
                        ref={loopRef}
                        src="/assets/showreel/showreel-loop.mp4"
                        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 ${!isMobile && showReel ? 'opacity-0' : 'opacity-100'}`}
                        autoPlay loop muted playsInline
                    />

                    {/* Play Button Overlay for Mobile */}
                    {isMobile && (
                        <div className="absolute inset-0 z-[2] flex items-center justify-center bg-black/40">
                            <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                <Play size={20} className="text-white fill-white" />
                                <span className="text-white font-medium text-lg">Play Showreel</span>
                            </div>
                        </div>
                    )}

                    {/* Full Showreel Video - Desktop only */}
                    {!isMobile && (
                        <video
                            ref={videoRef}
                            src="/assets/showreel/showreel-full.mp4"
                            className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-500 ${showReel ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                            onTimeUpdate={(e) => { setCurrentTime(e.target.currentTime); setVideoProgress((e.target.currentTime / e.target.duration) * 100); }}
                            onLoadedMetadata={(e) => setDuration(e.target.duration)}
                            muted={isMuted}
                        />
                    )}

                    {/* Desktop Controls */}
                    {!isMobile && (
                        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 ${showReel ? 'opacity-100' : 'opacity-100'}`} onMouseEnter={(e) => { e.stopPropagation(); setCursorVariant('default'); }} onMouseLeave={(e) => { e.stopPropagation(); if (!showReel || !isVideoPlaying) setCursorVariant('video'); }}>
                            <div className="bg-white/95 backdrop-blur-md rounded-full px-5 py-3 shadow-2xl flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!showReel) {
                                            setShowReel(true);
                                        } else {
                                            if (videoRef.current.paused) { videoRef.current.play(); setIsVideoPlaying(true); } else { videoRef.current.pause(); setIsVideoPlaying(false); }
                                        }
                                    }}
                                    className="p-1.5 hover:bg-black/5 rounded-full transition-colors flex-shrink-0"
                                >
                                    {showReel && isVideoPlaying ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black fill-black" />}
                                </button>

                                <div className="flex items-center gap-3 min-w-[250px]">
                                    <input
                                        type="range" min="0" max="100" value={videoProgress}
                                        onChange={(e) => { if (videoRef.current) { const newTime = (e.target.value / 100) * duration; videoRef.current.currentTime = newTime; setVideoProgress(e.target.value); } }}
                                        className="flex-1 h-1 bg-black/10 rounded-full appearance-none cursor-pointer"
                                        style={{ background: `linear-gradient(to right, #000 0%, #000 ${videoProgress}%, rgba(0,0,0,0.1) ${videoProgress}%, rgba(0,0,0,0.1) 100%)` }}
                                    />
                                    <div className="text-black/60 text-xs font-medium whitespace-nowrap">{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</div>
                                </div>

                                <button onClick={(e) => { e.stopPropagation(); if (videoRef.current) { setIsMuted(!isMuted); } }} className="p-1.5 hover:bg-black/5 rounded-full transition-colors flex-shrink-0">
                                    {isMuted ? <VolumeX size={18} className="text-black" /> : <Volume2 size={18} className="text-black" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Mobile Fullscreen Modal */}
            {isMobile && (
                <div
                    className={`fixed inset-0 z-[200] bg-black transition-all duration-300 ${showMobileModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                >
                    {/* Close Button - More prominent */}
                    <button
                        className="absolute top-4 right-4 z-[210] flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold text-sm shadow-lg"
                        onClick={closeMobileModal}
                    >
                        <X size={18} />
                        Close
                    </button>

                    {/* Video Container */}
                    <div className="h-full flex items-center justify-center p-4">
                        <video
                            ref={mobileVideoRef}
                            src="/assets/showreel/showreel-full.mp4"
                            className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
                            playsInline
                            controls
                            onTimeUpdate={(e) => { setCurrentTime(e.target.currentTime); setVideoProgress((e.target.currentTime / e.target.duration) * 100); }}
                            onLoadedMetadata={(e) => setDuration(e.target.duration)}
                            onEnded={closeMobileModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
