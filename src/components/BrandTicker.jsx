import React, { useEffect, useRef, useState, useMemo } from 'react';

/**
 * High-Performance Ticker — Jitter-free, seamless.
 * Uses requestAnimationFrame with direct DOM manipulation to avoid React scheduling lag.
 */
const Ticker = ({ speed = 1.2, children }) => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const contentRef = useRef(null);
    const posRef = useRef(0);
    const [contentWidth, setContentWidth] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

    // Measure widths reliably with ResizeObserver
    useEffect(() => {
        const obs = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === contentRef.current) {
                    setContentWidth(entry.contentRect.width);
                } else if (entry.target === containerRef.current) {
                    setContainerWidth(entry.contentRect.width);
                }
            }
        });

        if (contentRef.current) obs.observe(contentRef.current);
        if (containerRef.current) obs.observe(containerRef.current);

        return () => obs.disconnect();
    }, [children]);

    // Perfectly smooth animation loop
    useEffect(() => {
        if (!contentWidth || !trackRef.current) return;

        let frameId;
        const animate = () => {
            posRef.current -= speed;
            if (Math.abs(posRef.current) >= contentWidth) {
                posRef.current = 0;
            }
            if (trackRef.current) {
                trackRef.current.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
            }
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [contentWidth, speed]);

    // Calculate how many copies needed to fill the screen
    const copies = useMemo(() => {
        if (!contentWidth || !containerWidth) return [0, 1];
        const count = Math.ceil(containerWidth / contentWidth) + 1;
        return Array.from({ length: count + 1 }, (_, i) => i);
    }, [contentWidth, containerWidth]);

    return (
        <div ref={containerRef} className="w-full relative overflow-hidden h-14 flex items-center select-none">
            <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
                {/* Measuring element (hidden) */}
                <div ref={contentRef} className="flex items-center absolute invisible pointer-events-none">
                    {children}
                </div>
                {/* Render enough copies for seamlessness */}
                {copies.map((i) => (
                    <div key={i} className="flex items-center shrink-0">
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
};

const brands = [
    'Logan Paul',
    'Crypto',
    'Futureverse',
    'Gillette',
    'Adobe',
    'Rolling Stone',
    'Wilder World',
    'WD',
    'eBay',
];

export default function BrandTicker({ textEnter, textLeave }) {
    return (
        <Ticker speed={0.8}>
            <div className="flex items-center">
                {brands.map((brand) => (
                    <div
                        key={brand}
                        className="flex items-center justify-center px-8 md:px-14 opacity-50 hover:opacity-100 transition-all duration-300 cursor-none"
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                    >
                        <img
                            src={`/assets/logos/${brand.toLowerCase().replace(/ /g, '-')}.svg`}
                            alt={brand}
                            className="h-4 md:h-6 w-auto object-contain pointer-events-none"
                            loading="eager"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </Ticker>
    );
}
