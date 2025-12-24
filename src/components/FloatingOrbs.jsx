import { useEffect, useRef } from 'react';

export default function FloatingOrbs() {
    const orbsRef = useRef(null);

    useEffect(() => {
        let targetX = 0, targetY = 0;
        let currentX = 0, currentY = 0;
        let animationFrameId = null;
        let isAnimating = false;

        const animate = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            // Stop animating when close enough
            if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
                isAnimating = false;
                return;
            }

            // Smooth interpolation
            currentX += dx * 0.05;
            currentY += dy * 0.05;

            if (orbsRef.current) {
                orbsRef.current.style.setProperty('--mouse-x', `${currentX}px`);
                orbsRef.current.style.setProperty('--mouse-y', `${currentY}px`);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
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
        <div ref={orbsRef} className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}>
            {/* Orb 1: Big soft orb - top left */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full bg-purple-400/[0.10] blur-[200px] animate-float-slow"
                style={{
                    top: '-10%',
                    left: '-10%',
                    transform: 'translate(calc(var(--mouse-x) * 0.2), calc(var(--mouse-y) * 0.2))',
                    willChange: 'transform'
                }}
            />

            {/* Orb 2: Top right */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full bg-purple-500/[0.12] blur-[160px] animate-float-slow"
                style={{
                    top: '5%',
                    right: '10%',
                    transform: 'translate(calc(var(--mouse-x) * 0.5), calc(var(--mouse-y) * 0.5))',
                    willChange: 'transform'
                }}
            />

            {/* Orb 3: Middle left */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full bg-pink-500/[0.12] blur-[140px] animate-float-medium"
                style={{
                    top: '40%',
                    left: '5%',
                    transform: 'translate(calc(var(--mouse-x) * -0.3), calc(var(--mouse-y) * -0.3))',
                    willChange: 'transform'
                }}
            />

            {/* Orb 4: Bottom right */}
            <div
                className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/[0.12] blur-[120px] animate-float-fast"
                style={{
                    bottom: '20%',
                    right: '20%',
                    transform: 'translate(calc(var(--mouse-x) * 0.4), calc(var(--mouse-y) * 0.4))',
                    willChange: 'transform'
                }}
            />
        </div>
    );
}
