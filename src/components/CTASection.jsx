import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// --- HELPER COMPONENT: Email Link ---
const EmailLink = ({ email }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="group relative inline-flex items-center gap-3 mx-auto pb-1 cursor-pointer"
        >
            <span className="font-['Work_Sans',sans-serif] text-xl md:text-3xl text-zinc-300 group-hover:text-white transition-colors tracking-tight font-light">
                {email}
            </span>

            {/* Icon Switcher */}
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Copy
                    className={`absolute w-4 h-4 text-white transition-all duration-300 ${copied ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`}
                />
                <Check
                    className={`absolute w-4 h-4 text-green-400 transition-all duration-300 ${copied ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
                />
            </div>

            {/* Sliding Underline Animation */}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full"></span>

            {/* Floating Label on Hover */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-['JetBrains_Mono',monospace] text-white opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-widest whitespace-nowrap">
                {copied ? "Copied to Clipboard" : "Click to Copy"}
            </span>
        </button>
    );
}

// --- MAIN COMPONENT ---
const CTASection = () => {
    return (
        <section className="relative w-full py-32 px-6 flex flex-col items-center justify-center overflow-hidden">

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">

                {/* Headline: Mixed Typography */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white font-['Work_Sans',sans-serif] font-light">
                    Have an <span className="font-['Playfair_Display',serif] italic text-zinc-200">idea</span> that keeps <br className="hidden md:block" />
                    you up at night?
                </h2>

                {/* The Email Interaction */}
                <div className="pt-4">
                    <EmailLink email="em@mrkalopsia.com" />
                </div>

            </div>
        </section>
    );
};

export default CTASection;
