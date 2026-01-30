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
    const handleLoad = useCallback(() => {
        // Even when Unicorn says "loaded", older GPUs (Intel 4th Gen) are still
        // uploading textures. We wait 800ms to let it render ~40 frames in secret.
        // This ensures when we fade it in, it's 100% stable with no missing textures.
        setTimeout(() => {
            setLoaded(true);
            
            // Trigger layout recalculations to ensure it fits perfectly
            window.dispatchEvent(new Event('resize'));
        }, 800); 
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