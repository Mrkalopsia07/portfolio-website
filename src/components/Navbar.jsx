import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

export default function Navbar({ lenis, textEnter, textLeave }) {
    const [showNavbar, setShowNavbar] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    // Auto-hide logic specific to Navbar
    useEffect(() => {
        if (!lenis) return;
        let lastScrollY = 0;

        const onScroll = ({ scroll }) => {
            if (scroll < 100) {
                setShowNavbar(true);
            } else {
                const diff = scroll - lastScrollY;
                if (Math.abs(diff) > 10) {
                    setShowNavbar(diff < 0);
                }
            }
            lastScrollY = scroll;
        };

        lenis.on('scroll', onScroll);
        return () => lenis.off('scroll', onScroll);
    }, [lenis]);

    const handleScrollTo = (id) => {
        setMobileMenuOpen(false);
        const target = document.getElementById(id);
        if (target && lenis) {
            lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
        }
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-30 px-4 md:px-6 py-4 md:py-6 transition-transform duration-300 flex justify-center ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                        <img src={profileImg} alt="Mr. Kalopsia" className="w-full h-full object-cover" />
                    </div>

                    <div className="hidden md:flex items-center pl-3">
                        {['Work', 'About', 'Resume'].map((item) => {
                            const isResume = item === 'Resume';
                            const isAbout = item === 'About';
                            const href = isResume ? '/resume' : isAbout ? '/about' : (isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`);

                            return (
                                <a
                                    key={item}
                                    href={href}
                                    onClick={(e) => {
                                        if (isResume || isAbout) return;
                                        if (isHome) {
                                            e.preventDefault();
                                            handleScrollTo(item.toLowerCase());
                                        }
                                    }}
                                    className={`text-white/70 hover:text-white hover:bg-white/5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${(location.pathname === '/resume' && isResume) || (location.pathname === '/about' && isAbout) ? 'text-white bg-white/10' : ''}`}
                                    onMouseEnter={textEnter} onMouseLeave={textLeave}
                                >
                                    {item}
                                </a>
                            );
                        })}
                        <a
                            href={isHome ? "#contact" : "/#contact"}
                            onClick={(e) => {
                                if (isHome) {
                                    e.preventDefault();
                                    handleScrollTo('contact');
                                }
                            }}
                            className="ml-2 bg-purple-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-purple-400 transition-all"
                            onMouseEnter={textEnter}
                            onMouseLeave={textLeave}
                        >
                            Contact
                        </a>
                    </div>

                    <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 bg-black/95 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <button className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-300" onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>

                <div className="h-full flex flex-col items-center justify-center gap-8">
                    {['Work', 'About', 'Resume', 'Contact'].map((item, index) => {
                        const isResume = item === 'Resume';
                        const isAbout = item === 'About';
                        const href = isResume ? '/resume' : isAbout ? '/about' : (isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`);

                        return (
                            <a
                                key={item}
                                href={href}
                                onClick={(e) => {
                                    if (isResume || isAbout) {
                                        setMobileMenuOpen(false);
                                        return;
                                    }
                                    if (isHome) {
                                        e.preventDefault();
                                        handleScrollTo(item.toLowerCase());
                                    } else {
                                        setMobileMenuOpen(false);
                                    }
                                }}
                                className={`text-4xl font-serif italic text-white/80 hover:text-white transition-all duration-500 transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${(location.pathname === '/resume' && isResume) || (location.pathname === '/about' && isAbout) ? 'text-white' : ''}`}
                                style={{ transitionDelay: `${index * 100 + 200}ms` }}
                            >
                                {item}
                            </a>
                        );
                    })}

                    {/* Social Links */}
                    <div
                        className={`flex items-center gap-6 mt-8 transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <a href="https://instagram.com/mr.kalopsia/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/eashan-misra/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
