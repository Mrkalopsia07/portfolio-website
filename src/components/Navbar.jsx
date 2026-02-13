import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

// 1. Centralized Configuration
const NAV_ITEMS = [
    { label: 'About', href: '/about', type: 'route' },
    { label: 'Resume', href: '/resume', type: 'route' },
    // If you want a scroll link in the future, add: { label: 'Work', href: 'work', type: 'scroll' }
];

const SOCIALS = [
    { icon: Instagram, href: 'https://instagram.com/mr.kalopsia/' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/eashan-misra/' },
];

export default function Navbar({ lenis, textEnter, textLeave }) {
    const [isVisible, setIsVisible] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    // 2. Scroll Handling Logic
    useEffect(() => {
        if (!lenis) return;
        let lastScrollY = 0;

        const onScroll = ({ scroll }) => {
            if (scroll < 100) {
                setIsVisible(true);
            } else {
                const diff = scroll - lastScrollY;
                if (Math.abs(diff) > 10) {
                    setIsVisible(diff < 0);
                }
            }
            lastScrollY = scroll;
        };

        lenis.on('scroll', onScroll);
        return () => lenis.off('scroll', onScroll);
    }, [lenis]);

    // 3. Anchor Scroll Handler
    const handleScrollTo = useCallback((id) => {
        setMobileMenuOpen(false);
        if (!lenis) return;

        const target = document.getElementById(id);
        if (target) {
            lenis.scrollTo(target, {
                duration: 1.5,
                easing: (t) => 1 - Math.pow(1 - t, 4)
            });
        }
    }, [lenis]);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-30 px-4 md:px-6 py-4 md:py-6 transition-transform duration-300 flex justify-center ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">

                    {/* Profile Image with Glow Effect */}
                    <ProfileGlow
                        textEnter={textEnter}
                        textLeave={textLeave}
                    />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center pl-3">
                        {NAV_ITEMS.map((item) => (
                            <DesktopLink
                                key={item.label}
                                item={item}
                                isActive={location.pathname === item.href}
                                isHome={isHome}
                                onScroll={() => handleScrollTo(item.href)}
                                textEnter={textEnter}
                                textLeave={textLeave}
                            />
                        ))}

                        <ContactLink
                            textEnter={textEnter}
                            textLeave={textLeave}
                        />
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300 text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                setIsOpen={setMobileMenuOpen}
                navItems={NAV_ITEMS}
                currentPath={location.pathname}
                isHome={isHome}
                handleScrollTo={handleScrollTo}
            />
        </>
    );
}

// --- Sub-Components ---

const ProfileGlow = ({ textEnter, textLeave }) => {
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <Link
            to="/"
            className="w-10 h-10 relative group bg-transparent overflow-hidden rounded-full"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            onMouseMove={handleMouseMove}
            style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
        >
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover rounded-full relative z-10" />
            <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
                style={{
                    background: `radial-gradient(circle 50px at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.8) 0%, rgba(147, 51, 234, 0.4) 40%, transparent 70%)`,
                }}
            />
        </Link>
    );
};

const DesktopLink = ({ item, isActive, isHome, onScroll, textEnter, textLeave }) => {
    // Determine href: if type is scroll, determine if we are home (anchor) or away (slash + anchor)
    let href = item.href;
    if (item.type === 'scroll') {
        href = isHome ? `#${item.href}` : `/#${item.href}`;
    }

    const handleClick = (e) => {
        if (item.type === 'scroll' && isHome) {
            e.preventDefault();
            onScroll();
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            className={`group relative font-['Work_Sans',sans-serif] text-[10px] md:text-xs font-medium uppercase tracking-widest px-5 py-2.5 transition-all duration-300 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
        >
            <span className="relative">
                {item.label}
                <span className={`absolute -bottom-1 right-0 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full group-hover:left-0 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'w-full left-0 opacity-100' : 'w-0'}`}></span>
            </span>
        </a>
    );
};

const ContactLink = ({ textEnter, textLeave }) => (
    <a
        href="mailto:em@mrkalopsia.com"
        className="group relative font-['Work_Sans',sans-serif] text-[10px] md:text-xs font-medium uppercase tracking-widest text-white/70 hover:text-white px-5 py-2.5 transition-all duration-300"
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
    >
        <span className="relative">
            Contact
            <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full group-hover:left-0"></span>
        </span>
    </a>
);

const MobileMenu = ({ isOpen, setIsOpen, navItems, currentPath, isHome, handleScrollTo }) => {
    return (
        <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 bg-black/95 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <button
                className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-300 text-white"
                onClick={() => setIsOpen(false)}
            >
                <X size={24} />
            </button>

            <div className="h-full flex flex-col items-center justify-center gap-8">
                {navItems.map((item, index) => {
                    const isActive = currentPath === item.href;
                    let href = item.href;
                    if (item.type === 'scroll') href = isHome ? `#${item.href}` : `/#${item.href}`;

                    return (
                        <a
                            key={item.label}
                            href={href}
                            onClick={(e) => {
                                if (item.type === 'scroll' && isHome) {
                                    e.preventDefault();
                                    handleScrollTo(item.href);
                                } else {
                                    setIsOpen(false);
                                }
                            }}
                            className={`text-4xl font-serif italic transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`}
                            style={{ transitionDelay: `${index * 100 + 200}ms` }}
                        >
                            {item.label}
                        </a>
                    );
                })}

                <a
                    href="mailto:em@mrkalopsia.com"
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-serif italic text-white/80 hover:text-white transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: `${navItems.length * 100 + 200}ms` }}
                >
                    Contact
                </a>

                <div
                    className={`flex items-center gap-6 mt-8 transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: `${navItems.length * 100 + 300}ms` }}
                >
                    {SOCIALS.map((social, i) => (
                        <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                            <social.icon size={24} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};