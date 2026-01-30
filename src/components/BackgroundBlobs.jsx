import { useEffect, useRef } from 'react';

export default function BackgroundBlobs() {
    const mainRef = useRef(null);
    const pulserRefs = useRef([]);
    const animationFrameRef = useRef(null);
    const pulserDataRef = useRef([]);

    const mouseRef = useRef({
        x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
        smoothX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
        smoothY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    });

    const stateRef = useRef({
        isAttracting: false,
        interactionStrength: 120,
    });

    useEffect(() => {
        const pulsers = pulserRefs.current;

        // Initialize pulser data
        pulserDataRef.current = pulsers.map((p, i) => {
            const scaleStart = 0.3 + Math.random() * 0.5;
            const scaleEnd = 0.3 + Math.random() * 0.5;
            const duration = 15000 + Math.random() * 15000;

            return {
                element: p,
                index: i,
                scaleStart,
                scaleEnd,
                duration,
                offsetX: 0,
                offsetY: 0,
                velocityX: 0,
                velocityY: 0,
            };
        });

        // Start base animations
        pulserDataRef.current.forEach((data) => {
            if (data.element) {
                data.element.animate([
                    { transform: `scale(${data.scaleStart}) translate3d(0,0,0) rotate(0deg)` },
                    { transform: `scale(${data.scaleEnd}) translate3d(0,0,0) rotate(360deg)` }
                ], {
                    duration: data.duration,
                    iterations: Infinity,
                    direction: 'alternate',
                    easing: 'ease-in-out'
                });

                data.element.style.animationDelay = (-20000 * data.index / pulsers.length) + 'ms';
            }
        });

        // Mouse move handler
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        // Click handler
        const handleClick = () => {
            stateRef.current.isAttracting = !stateRef.current.isAttracting;
            stateRef.current.interactionStrength = stateRef.current.isAttracting ? 80 : 120;
        };

        // Touch handlers
        const handleTouchMove = (e) => {
            const touch = e.touches[0];
            mouseRef.current.x = touch.clientX;
            mouseRef.current.y = touch.clientY;
        };

        const handleTouchStart = () => {
            stateRef.current.isAttracting = !stateRef.current.isAttracting;
            stateRef.current.interactionStrength = stateRef.current.isAttracting ? 80 : 120;
        };

        // Animation loop - throttled to reduce CPU usage
        let lastTime = 0;
        const targetFPS = 30; // Reduce from 60fps to 30fps for background effect
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime) => {
            animationFrameRef.current = requestAnimationFrame(animate);

            const elapsed = currentTime - lastTime;
            if (elapsed < frameInterval) return;
            lastTime = currentTime - (elapsed % frameInterval);

            const mouseLerp = 0.03;
            mouseRef.current.smoothX += (mouseRef.current.x - mouseRef.current.smoothX) * mouseLerp;
            mouseRef.current.smoothY += (mouseRef.current.y - mouseRef.current.smoothY) * mouseLerp;

            if (mainRef.current) {
                const mainRect = mainRef.current.getBoundingClientRect();
                const centerX = mainRect.left + mainRect.width / 2;
                const centerY = mainRect.top + mainRect.height / 2;

                pulserDataRef.current.forEach((data, i) => {
                    const dx = mouseRef.current.smoothX - centerX;
                    const dy = mouseRef.current.smoothY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = Math.max(window.innerWidth, window.innerHeight) / 2;
                    const normalizedDistance = Math.min(distance / maxDistance, 1);
                    const effectStrength = Math.pow(1 - normalizedDistance, 1.5) * stateRef.current.interactionStrength;

                    const individualFactor = 0.4 + (i / pulsers.length) * 0.8;
                    const direction = stateRef.current.isAttracting ? 1 : -1;

                    let targetX = 0;
                    let targetY = 0;

                    if (distance > 1) {
                        targetX = (dx / distance) * effectStrength * individualFactor * direction;
                        targetY = (dy / distance) * effectStrength * individualFactor * direction;
                    }

                    const springStrength = 0.015;
                    const damping = 0.85;

                    const forceX = (targetX - data.offsetX) * springStrength;
                    const forceY = (targetY - data.offsetY) * springStrength;

                    data.velocityX += forceX;
                    data.velocityY += forceY;

                    data.velocityX *= damping;
                    data.velocityY *= damping;

                    data.offsetX += data.velocityX;
                    data.offsetY += data.velocityY;

                    if (data.element) {
                        data.element.style.left = data.offsetX + 'px';
                        data.element.style.top = data.offsetY + 'px';
                    }
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchstart', handleTouchStart);

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchstart', handleTouchStart);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none backdrop-blur-[40px]">
            <div
                ref={mainRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ width: '90vmin', height: '90vmin' }}
            >
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        ref={(el) => (pulserRefs.current[i] = el)}
                        className="pulser"
                        style={{
                            width: '90vmin',
                            height: '90vmin',
                            borderRadius: '50%',
                            mixBlendMode: 'screen',
                            background: '#d84578',
                            position: 'absolute',
                            transformOrigin: '42vmin 48vmin',
                            animation: 'filtered 20000ms 0ms infinite alternate linear',
                            willChange: 'filter, transform, left, top',
                        }}
                    />
                ))}
            </div>

            <style>{`
        @keyframes filtered {
          0% {
            filter: hue-rotate(0deg) ;
          }
          100% {
            filter: hue-rotate(360deg) ;
          }
        }
      `}</style>
        </div>
    );
}
