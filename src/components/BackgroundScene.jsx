import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { UnicornScene } from 'unicornstudio-react';

export default function BackgroundScene({ width = "100%", height = "100%" }) {
    const [mounted, setMounted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Only mount once after initial render to avoid React double-mount issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // CRITICAL FIX: The "Warmup" Handler
    useEffect(() => {
        let timer;
        if (loaded === false && mounted) {
            // We'll trigger the load logic here if needed, 
            // but the original code used a callback from UnicornScene.
            // Let's refactor handleLoad to store the timer in a ref.
        }
    }, [loaded, mounted]);

    const warmupTimer = useRef(null);

    const handleLoad = useCallback(() => {
        if (warmupTimer.current) clearTimeout(warmupTimer.current);
        warmupTimer.current = setTimeout(() => {
            setLoaded(true);
            window.dispatchEvent(new Event('resize'));
        }, 800);
    }, []);

    useEffect(() => {
        return () => {
            if (warmupTimer.current) clearTimeout(warmupTimer.current);
        };
    }, []);

    return (
        <div style={{
            width,
            height,
            // Keep opacity 0 until the "warmup" is complete
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.5s ease-out'
        }}>
            {mounted && (
                <UnicornScene
                    jsonFilePath="/scene-config.json"
                    width="100%"
                    height="100%"
                    scale={0.9} // OPTIMIZATION: 0.9 scale reduces GPU load by ~20% without visible quality loss
                    dpi={1}     // OPTIMIZATION: Strict DPI 1 for stability on Intel HD
                    interactivity={false}
                    onLoad={handleLoad}
                />
            )}
        </div>
    );
}