import React, { memo, useRef, useEffect, useState } from 'react';
import { UnicornScene } from 'unicornstudio-react';

// Memoized inner component to prevent re-renders
const StableUnicornScene = memo(function StableUnicornScene() {
    return (
        <UnicornScene
            jsonFilePath="/scene-config.json"
            width="100%"
            height="100%"
            scale={1}
            dpi={1}
        />
    );
}, () => true); // Always return true to never re-render

export default function UnicornEmbed({ width = "100%", height = "100%" }) {
    const containerRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // Only mount once after initial render
    useEffect(() => {
        setMounted(true);
    }, []);

    // Force WebGL to recalculate by briefly changing container size
    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        const timer = setTimeout(() => {
            const container = containerRef.current;
            if (container) {
                // Briefly change the container size to force WebGL recalculation
                const originalHeight = container.style.height;
                container.style.height = 'calc(100% - 1px)';

                // Force reflow
                container.offsetHeight;

                // Restore and dispatch resize
                requestAnimationFrame(() => {
                    container.style.height = originalHeight || '100%';
                    window.dispatchEvent(new Event('resize'));
                });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [mounted]);

    return (
        <div ref={containerRef} style={{ width, height }}>
            {mounted && <StableUnicornScene />}
        </div>
    );
}
