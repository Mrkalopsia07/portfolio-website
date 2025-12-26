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
    const [mounted, setMounted] = useState(false);

    // Only mount once after initial render
    useEffect(() => {
        setMounted(true);

        // Force a resize event after mount to fix WebGL resolution issues
        // This mimics what happens when you open DevTools or resize the window
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ width, height }}>
            {mounted && <StableUnicornScene />}
        </div>
    );
}
