import { useEffect, useRef, forwardRef } from 'react';

const FloatingOrbs = forwardRef(({ className, style }, ref) => {
    const containerRef = useRef(null);

    // Sync external ref
    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') {
            ref(containerRef.current);
        } else {
            ref.current = containerRef.current;
        }
    }, [ref]);

    useEffect(() => {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let animationFrameId = null;
        let isAnimating = false;

        const animate = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
                isAnimating = false;
                return;
            }

            // Smooth interpolation
            currentX += dx * 0.05;
            currentY += dy * 0.05;

            if (containerRef.current) {
                containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
                containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            // Normalized coordinates (-10 to 10 range)
            targetX = (e.clientX / window.innerWidth - 0.5) * 20;
            targetY = (e.clientY / window.innerHeight - 0.5) * 20;

            if (!isAnimating) {
                isAnimating = true;
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`fixed inset-0 z-[0] pointer-events-none overflow-hidden ${className || ''}`}
            style={{ '--mouse-x': '0px', '--mouse-y': '0px', ...style }}
        >
            {/* Orb 1: Purple - Top Left */}
            <Orb
                position="top-[-20%] left-[-20%]"
                size="w-[120vw] h-[120vw] md:w-[1500px] md:h-[1500px]"
                gradient="radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0) 65%)"
                parallaxFactor={0.2}
                animationClass="animate-float-slow"
            />

            {/* Orb 2: Violet - Top Right */}
            <Orb
                position="top-[-10%] right-[-20%]"
                size="w-[100vw] h-[100vw] md:w-[1400px] md:h-[1400px]"
                gradient="radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(139, 92, 246, 0) 65%)"
                parallaxFactor={0.5}
                animationClass="animate-float-slow"
                delay="-2s"
            />

            {/* Orb 3: Pink - Middle Left */}
            <Orb
                position="top-[30%] left-[-20%]"
                size="w-[90vw] h-[90vw] md:w-[1300px] md:h-[1300px]"
                gradient="radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0) 65%)"
                parallaxFactor={-0.3}
                animationClass="animate-float-medium"
                delay="-4s"
            />

            {/* Orb 4: Blue - Bottom Right */}
            <Orb
                position="bottom-[-20%] right-[-10%]"
                size="w-[80vw] h-[80vw] md:w-[1200px] md:h-[1200px]"
                gradient="radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 65%)"
                parallaxFactor={0.4}
                animationClass="animate-float-fast"
                delay="-1s"
            />
        </div>
    );
});

export default FloatingOrbs;

function Orb({ position, size, gradient, parallaxFactor, animationClass, delay = '0s' }) {
    return (
        <div
            className={`absolute ${position}`}
            style={{
                transform: `translate(calc(var(--mouse-x) * ${parallaxFactor}), calc(var(--mouse-y) * ${parallaxFactor}))`,
                transition: 'transform 0.1s linear'
            }}
        >
            <div
                className={`${size} ${animationClass}`}
                style={{
                    background: gradient,
                    animationDelay: delay
                }}
            />
        </div>
    );
}
