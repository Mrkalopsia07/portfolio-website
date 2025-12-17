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
            if (mobileVideoRef.current) {
                const video = mobileVideoRef.current;

                // Native mobile behavior
                video.controls = true;
                video.removeAttribute('playsinline'); // Force fullscreen on iOS

                // Play and attempt fullscreen
                video.play().then(() => {
                    const requestFullscreen = async () => {
                        try {
                            if (video.requestFullscreen) {
                                await video.requestFullscreen();
                            } else if (video.webkitRequestFullscreen) {
                                await video.webkitRequestFullscreen(); // iOS Safari / older WebKit
                            } else if (video.mozRequestFullScreen) {
                                await video.mozRequestFullScreen(); // Firefox
                            } else if (video.msRequestFullscreen) {
                                await video.msRequestFullscreen(); // IE/Edge
                            } else if (video.webkitEnterFullscreen) {
                                video.webkitEnterFullscreen(); // iOS native player
                            }
                        } catch (err) {
                            // Fullscreen may fail due to user gesture requirements or browser restrictions
                        }
                    };
                    requestFullscreen();
                }).catch(() => {
                    // Video play may fail due to autoplay restrictions
                });
            }
            return;
        }

        if (!showReel) {
            setShowReel(true);
            setCursorVariant('default');
        } else {
            if (videoRef.current?.paused) {
                videoRef.current.play();
                setIsVideoPlaying(true);
                setCursorVariant('default');
            } else if (videoRef.current) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
                setCursorVariant('video');
            }
        }
    };

    return (
        <>
            {/* Desktop & Mobile Preview */}
            <section className="w-full flex justify-center py-6 md:py-12">
                <div
                    className={`relative w-full max-w-[85%] md:max-w-7xl mx-auto aspect-[4/5] md:aspect-[21/9] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl z-20 ${!showReel || !isVideoPlaying ? 'cursor-none' : ''}`}
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
                                            if (videoRef.current?.paused) { videoRef.current.play(); setIsVideoPlaying(true); } else if (videoRef.current) { videoRef.current.pause(); setIsVideoPlaying(false); }
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

            {/* Hidden Mobile Video Element */}
            {isMobile && (
                <video
                    ref={mobileVideoRef}
                    src="/assets/showreel/showreel-full.mp4"
                    className="hidden" // Kept in DOM but invisible
                    // No playsinline here to encourage automatic Fullscreen on iOS
                    onEnded={() => {
                        if (document.exitFullscreen) document.exitFullscreen();
                        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                    }}
                />
            )}
        </>
    );
}
