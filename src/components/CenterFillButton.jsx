import React, { useState } from 'react';

export default function CenterFillButton({ children, onClick, href, className = '', onMouseEnter, onMouseLeave }) {
    const [isHovered, setIsHovered] = useState(false);

    const Component = href ? 'a' : 'button';

    const handleMouseEnter = (e) => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e) => {
        setIsHovered(false);
        if (onMouseLeave) onMouseLeave(e);
    };

    return (
        <Component
            href={href}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative px-14 py-5 text-sm font-medium tracking-[1.5px] uppercase border-2 border-white rounded-full overflow-hidden cursor-pointer ${className}`}
            style={{
                color: isHovered ? '#0a0a0a' : '#fff',
                backgroundColor: 'transparent',
                transition: 'color 0.4s ease 0.1s'
            }}
        >
            <span className="relative z-10 flex items-center gap-3">{children}</span>

            {/* Center Fill Circle */}
            <div
                className="absolute top-1/2 left-1/2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    width: isHovered ? '220%' : '0%', // Increased to ensure full coverage for wider buttons
                    paddingBottom: isHovered ? '220%' : '0%',
                    zIndex: 1,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            />
        </Component>
    );
}
