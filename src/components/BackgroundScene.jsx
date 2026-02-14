import React, { memo, useRef, useEffect, useState, useCallback } from 'react';
import { UnicornScene } from 'unicornstudio-react';

export default React.memo(function BackgroundScene({ width = "100%", height = "100%" }) {
    return (
        <div style={{
            width,
            height,
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