import React from 'react';

export default function BrandTicker({ textEnter, textLeave }) {
    const brands = ['Logan Paul', 'Crypto', 'Futureverse', 'Gillette', 'Adobe', 'Rolling Stone', 'Wilder World', 'WD', 'eBay'];

    return (
        <div className="w-full">
            <div className="relative overflow-hidden">
                <div className="flex w-max animate-ticker hover:pause">
                    {/* Create 6 sets for seamless looping on large screens */}
                    {[...Array(6)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex items-center gap-8 md:gap-24 pr-8 md:pr-24 flex-shrink-0">
                            {brands.map((brand) => (
                                <div
                                    key={brand}
                                    className="h-3 md:h-6 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-none flex items-center"
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                >
                                    <img
                                        src={`/assets/logos/${brand.toLowerCase().replace(/ /g, '-')}.svg`}
                                        alt={brand}
                                        className="h-full w-auto object-contain brand-logo"
                                        loading="eager"
                                        decoding="async"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                        onLoad={(e) => {
                                            e.target.style.opacity = '1';
                                        }}
                                        style={{ opacity: 0, transition: 'opacity 0.3s' }}
                                    />
                                    <span className="hidden font-serif italic text-lg md:text-3xl text-zinc-300 whitespace-nowrap">
                                        {brand.charAt(0).toUpperCase() + brand.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes ticker {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(calc(-100% / 6), 0, 0); }
                }
                .animate-ticker {
                    animation: ticker 30s linear infinite;
                    will-change: transform;
                }
                .brand-logo {
                    image-rendering: -webkit-optimize-contrast;
                    image-rendering: crisp-edges;
                }
                /* Force SVG images to render with proper filtering */
                .brand-logo[src$=".svg"] {
                    filter: brightness(1);
                }
            `}</style>
        </div>
    );
}
