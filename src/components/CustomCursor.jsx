import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

export default function CustomCursor({ cursorVariant }) {
    const cursorRef = useRef(null);
    const cursorDotRef = useRef(null);
    const variantRef = useRef(cursorVariant);

    useEffect(() => {
        variantRef.current = cursorVariant;
    }, [cursorVariant]);

    const [isVisible, setIsVisible] = useState(false);
    const hasMoved = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        // Use a ref for isMobile to access it in the animation loop without re-binding
        const isMobileRef = { current: window.matchMedia('(max-width: 768px)').matches };

        const handleResize = () => {
            isMobileRef.current = window.matchMedia('(max-width: 768px)').matches;
        };

        window.addEventListener('resize', handleResize);

        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

        const moveCursor = (e) => {
            if (isMobileRef.current) return;

            // Show cursor on first move
            if (!hasMoved.current) {
                hasMoved.current = true;
                setIsVisible(true);
            }

            mouseX = e.clientX;
            mouseY = e.clientY;
            if (cursorDot) {
                cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            }
        };

        const animateCursor = () => {
            if (isMobileRef.current) {
                // Hide on mobile
                if (cursor) cursor.style.opacity = '0';
                if (cursorDot) cursorDot.style.opacity = '0';
                requestAnimationFrame(animateCursor);
                return;
            }

            // On desktop, we let React state/classes handle opacity mostly,
            // but we need to clear manual opacity overrides from the mobile check above
            if (cursor && cursor.style.opacity === '0') cursor.style.opacity = '';
            if (cursorDot && cursorDot.style.opacity === '0') cursorDot.style.opacity = '';

            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            if (cursor) {
                // Only update position, offset is handled by inner div CSS
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            }
            requestAnimationFrame(animateCursor);
        };

        window.addEventListener('mousemove', moveCursor);
        const animationFrame = requestAnimationFrame(animateCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <>
            {/* Wrapper for mouse tracking - purely positioning */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            >
                {/* Inner cursor - handles shape, size, and offset transitions */}
                <div
                    className={`flex items-center justify-center rounded-full border
            ${!isVisible ? 'opacity-0' : ''}
            ${cursorVariant === 'default' ? 'w-10 h-10 bg-white/10 border-white/40 backdrop-blur-sm' : ''}
            ${cursorVariant === 'text' ? 'w-14 h-14 border-white/60 bg-transparent' : ''}
            ${cursorVariant === 'video' ? 'w-40 h-12 border-transparent' : ''}
          `}
                    style={{
                        transform: cursorVariant === 'video' ? 'translate(-20px, -50%)' : 'translate(-50%, -50%)',
                        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        ...(cursorVariant === 'video' ? {
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7, #7c3aed)',
                            backgroundSize: '300% 300%',
                            animation: 'gradientShift 4s ease infinite'
                        } : {})
                    }}
                >
                    {/* Video cursor content */}
                    <div
                        className="flex items-center gap-2.5 text-white px-3"
                        style={{
                            opacity: cursorVariant === 'video' ? 1 : 0,
                            transform: cursorVariant === 'video' ? 'scale(1)' : 'scale(0.8)',
                            transition: cursorVariant === 'video'
                                ? 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0.2s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                                : 'opacity 0.15s ease-out, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <Play size={14} className="fill-current" />
                        <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">Play Showreel</span>
                    </div>
                </div>
            </div>
            <div
                ref={cursorDotRef}
                className={`fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-white hidden md:block
          ${!isVisible ? 'opacity-0' : (cursorVariant === 'default' || cursorVariant === 'text' ? 'opacity-100' : 'opacity-0')}
        `}
                style={{ transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <style>{`
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </>
    );
}
