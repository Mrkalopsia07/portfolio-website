import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
            <h1 className="font-serif italic text-8xl md:text-[12rem] mb-4 text-purple-400">404</h1>
            <h2 className="font-serif italic text-3xl md:text-5xl mb-6">Page Not Found</h2>
            <p className="text-zinc-400 text-lg max-w-md mb-10">
                This page is still under construction. Check back soon!
            </p>
            <a
                href="/"
                className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-purple-200 transition-all duration-300"
            >
                <ArrowLeft size={20} />
                Back to Home
            </a>
        </div>
    );
}
