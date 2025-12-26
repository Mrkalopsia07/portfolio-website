import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { UnicornScene } from 'unicornstudio-react';

export default function BackgroundScene({ width = "100%", height = "100%" }) {
    const [mounted, setMounted] = useState(false);

    // Only mount once after initial render
    useEffect(() => {
        setMounted(true);
    }, []);

    // Trigger resize when UnicornScene finishes loading
    const handleLoad = useCallback(() => {
        // Small delay to ensure WebGL is fully ready
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }, []);

    return (
        <div style={{ width, height }}>
            {mounted && (
                <UnicornScene
                    jsonFilePath="/scene-config.json"
                    width="100%"
                    height="100%"
                    scale={1}
                    dpi={1}
                    onLoad={handleLoad}
                />
            )}
        </div>
    );
}
