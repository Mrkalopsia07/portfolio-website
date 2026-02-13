import React, { useState, useEffect } from 'react';

const Typewriter = ({ roles, typingSpeedNormal = 80, typingSpeedDeleting = 20, pauseTime = 800 }) => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(typingSpeedNormal);

    useEffect(() => {
        let timer;
        const handleTyping = () => {
            const i = loopNum % roles.length;
            const fullText = roles[i];

            const nextText = isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1);

            setText(nextText);
            setTypingSpeed(isDeleting ? typingSpeedDeleting : typingSpeedNormal);

            if (!isDeleting && nextText === fullText) {
                timer = setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && nextText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const typingTimer = setTimeout(handleTyping, typingSpeed);
        return () => {
            clearTimeout(typingTimer);
            if (timer) clearTimeout(timer);
        };
    }, [text, isDeleting, loopNum, typingSpeed, roles, typingSpeedNormal, typingSpeedDeleting, pauseTime]);

    return (
        <span>
            {text}
            <span className="animate-pulse text-white">|</span>
        </span>
    );
};

export default React.memo(Typewriter);
