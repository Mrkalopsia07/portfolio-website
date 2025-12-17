import { useEffect, useRef } from 'react';

export default function FloatingOrbs() {
    const orbsRef = useRef(null);

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
