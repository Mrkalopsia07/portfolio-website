import React, { memo, useRef, useEffect, useState } from 'react';
import { UnicornScene } from 'unicornstudio-react';

// Memoized inner component to prevent re-renders
const StableUnicornScene = memo(function StableUnicornScene() {
    return (
        <UnicornScene
            jsonFilePath="/genesis.json"
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
    }, []);

    return (
        <div style={{ width, height }}>
            {mounted && <StableUnicornScene />}
        </div>
    );
}
