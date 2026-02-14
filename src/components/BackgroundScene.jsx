import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { UnicornScene } from 'unicornstudio-react';

export default React.memo(function BackgroundScene({ width = "100%", height = "100%" }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Quick fade-in to mask initialization
        const timer = setTimeout(() => setVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            width,
            height,
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease-out'
        }}>
            <UnicornScene
                jsonFilePath="/scene-config.json"
                width="100%"
                height="100%"
                scale={0.9} // OPTIMIZATION: 0.9 scale reduces GPU load by ~20% without visible quality loss
                dpi={1}     // OPTIMIZATION: Strict DPI 1 for stability on Intel HD
                interactivity={false}
            />
        </div>
    );
});