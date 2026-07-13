export const ROLES = ["Art Director", "Motion Designer", "3D Animator"];

export const PROJECTS = [
    { title: "Wilder World", category: "01 / Motion Graphics", image: "/assets/projects/wilder-world.jpg", video: "/assets/projects/wilder-world.mp4", link: "https://www.behance.net/gallery/240549387/Wilder-World-Metropolis" },
    { title: "Kalopsia", category: "02 / 3D Animation", image: "/assets/projects/kalopsia.jpg", video: "/assets/projects/kalopsia.mp4", link: "https://www.behance.net/gallery/58254853/Mr-Kalopsia-Art-Collection" },
    { title: "Aura AI", category: "03 / Motion Graphics", image: "/assets/projects/aura-ai.jpg", video: "/assets/projects/aura-ai.mp4", link: "https://www.behance.net/gallery/241022233/Aura-AI-Explainer-Video" },
    { title: "The Time Traveller's Mind", category: "04 / One-minute Short Film", image: "/assets/projects/time-traveller.jpg", video: "/assets/projects/time-traveller.mp4", link: "https://www.behance.net/gallery/181354191/The-Time-Travellers-Mind-One-Minute-Short-Film" },
    { title: "Numbers Game", category: "05 / Branding", image: "/assets/projects/numbers-game.jpg", video: "/assets/projects/numbers-game.mp4", link: "https://www.behance.net/gallery/181256079/Numbers-Game" },
    { title: "View All Projects", category: "Behance", image: "", video: "", link: "https://www.behance.net/kalopsialabs", isViewAll: true }
];

export const SPOTLIGHT_MOMENTS = [
    { title: "Adobe Blog", role: "Featured Artist", description: "Featured artist for Celebrate International Day of Human Space Flight", image: "/assets/spotlight/adobe-feature.jpg", link: "https://blog.adobe.com/en/publish/2019/04/12/celebrate-international-day-of-human-space-flight-with-mr-kalopsia" },
    { title: "ViewSonic ColorPro Awards", role: "Judge 2024 · 2025", description: "Jury for the Generative Art Category for 2 consecutive years", image: "/assets/spotlight/viewsonic-judge.jpg", link: "https://www.viewsonic.com/in/colorpro/event/colorproawards2024/judges" },
    { title: "Artpoint: Paris Exhibition", role: "Exhibitor", description: "Public exhibition across Paris, Courbevoie, and Saint-Ouen-sur-Seine", image: "/assets/spotlight/artpoint-exhibition.jpg", link: "https://www.linkedin.com/feed/update/urn:li:activity:7306952793716621312/" }
];

// --- MEDIA KIT ---
// Metrics verified against the supplied Instagram screenshots on 12 Jul 2026.
// Refresh dated audience figures monthly and keep organic / paid qualifiers attached.

export const MEDIA_KIT_HERO_STATS = [
    { value: "153K", label: "Instagram Followers", qualifier: "Jul 2026" },
    { value: "6.8M", label: "Top Reel", qualifier: "Organic" },
    { value: "2.5M+", label: "Brand Partnerships", qualifier: "Paid-Supported" },
];

export const MEDIA_KIT_PROOF_CARDS = [
    {
        value: "30K+ avg · up to 6.8M",
        label: "Artwork Era",
        qualifier: "Organic · 2016–2023",
        description: "Seven years of silent, cinematic 3D. Posts averaged 30K+ views, with multiple Reels passing 6M without ad spend.",
    },
    {
        value: "Since 2026",
        label: "Creator-Led Era",
        qualifier: "Current Format",
        description: "The account relaunched as face-to-camera storytelling on design, AI, and the industry. It uses the same production pipeline in a new format. Recent organic posts run 5–11K views.",
    },
    {
        value: "2.5M+",
        label: "Brand Partnerships",
        qualifier: "Paid-Supported",
        description: "A creator-led launch campaign amplified by a brand's paid team to 2.5M+ views, which continued into an ongoing partnership.",
    },
];

// image = imported in MediaKit.jsx (local assets) or public path.
export const MEDIA_KIT_FORMATS = [
    { title: "Talking-head editorial", image: "talking-head" },
    { title: "UGC & ad creative", image: "meshy-reel" },
    { title: "3D motion & VFX", image: "/assets/projects/wilder-world.jpg" },
    { title: "Premium product explainers", image: "/assets/projects/aura-ai.jpg" },
];

export const MEDIA_KIT_CASE_STUDY = {
    brand: "Meshy AI",
    reelUrl: "https://www.instagram.com/reel/DZFoTbYMtQb/",
    rows: [
        {
            title: "Brief",
            body: "Launch content for Meshy 6, a creator-led film built for social publishing and paid distribution, aimed at working 3D artists.",
        },
        {
            title: "Work",
            body: "Concept, script, on-camera performance, direction, production, and edit completed in-house, with partnership-ad permissions for Meshy’s paid team.",
        },
        {
            title: "Format",
            body: "The film was face-to-camera, the same format the account publishes today. The current era is the era that delivered this campaign.",
        },
        {
            title: "Result",
            body: "2.5M+ total views, including paid amplification. The collaboration grew into a continued partnership.",
        },
    ],
};

export const MEDIA_KIT_AGE = [
    { label: "25–34", percent: 49.5 },
    { label: "35–44", percent: 27.1 },
    { label: "18–24", percent: 10.6 },
];

export const MEDIA_KIT_GENDER = [
    { label: "Men", value: "75.9%" },
    { label: "Women", value: "24.1%" },
];

export const MEDIA_KIT_GEO = [
    { country: "India", value: "14.1%" },
    { country: "United States", value: "10.6%" },
    { country: "Mexico", value: "7.3%" },
    { country: "Brazil", value: "6.4%" },
    { country: "Iran", value: "4.1%" },
];

export const MEDIA_KIT_PACKAGES = [
    {
        number: "01",
        title: "Creator-Led Reel",
        description: "Concept, script, on-camera performance, production, and edit, published organically on @mr.kalopsia.",
        terms: "2 revision rounds · brand reposting, paid usage, and exclusivity licensed separately",
    },
    {
        number: "02",
        title: "Brand-Owned Campaign Creative",
        description: "A creator-led vertical asset for your channels, never posted to my feed. Built for your ads manager at studio production quality.",
        terms: "creation fee + usage licence quoted separately",
    },
    {
        number: "03",
        title: "Creator + Paid Amplification",
        description: "The organic Reel plus time-limited partnership-ad permissions for your paid team.",
        terms: "territory, platforms, duration, and spend cap agreed upfront · organic and paid results reported separately",
    },
    {
        number: "04",
        title: "Ongoing Creative Partnership",
        description: "A monthly campaign cadence with creative direction and priority scheduling.",
        terms: "three-month minimum · usage and exclusivity priced separately",
    },
];

export const MEDIA_KIT_CREDENTIALS = [
    {
        title: "Adobe",
        role: "Featured artist",
        description: "Featured for International Day of Human Space Flight.",
        image: "/assets/about/adobe-feature.jpg",
        link: "https://blog.adobe.com/en/publish/2019/04/12/celebrate-international-day-of-human-space-flight-with-mr-kalopsia",
    },
    {
        title: "ViewSonic ColorPro Awards",
        role: "Judge · 2024–2025",
        description: "Jury member for the Generative Art category for two consecutive years.",
        image: "/assets/about/viewsonic.jpg",
        link: "https://www.viewsonic.com/in/colorpro/event/colorproawards2024/judges",
    },
    {
        title: "Artpoint Paris",
        role: "Exhibitor",
        description: "Work exhibited across Paris, Courbevoie, and Saint-Ouen-sur-Seine.",
        image: "/assets/spotlight/artpoint-exhibition.jpg",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7306952793716621312/",
    },
];

// Ticker logos live in /public/assets/logos/ as <slug>.svg (slug = lowercased, spaces→dashes).
// eBay/Gillette/WD are official raster logos; the rest are monochrome wordmark placeholders. Swap in official vector logos when available.
export const MEDIA_KIT_BRANDS = [
    "Gillette",
    "WD",
    "eBay",
    "Squarespace",
    "Huion",
    "Skillshare",
    "Meshy AI",
];

export const MEDIA_KIT_FAQ = [
    {
        q: "What do you need to get started?",
        a: "A useful brief includes the product, the audience, required claims, deliverables, usage, and target date. Once the scope, contract, and product access are confirmed, production can begin.",
    },
    {
        q: "How are revisions handled?",
        a: "Every asset includes two revision rounds before delivery or publication. Additional changes are billed at the relevant production rate.",
    },
    {
        q: "What usage and licensing terms are included?",
        a: "Usage is scoped by platform, territory, duration, and media spend. Paid usage and partnership-ad permissions are time-limited and renewed as separate line items.",
    },
    {
        q: "Can brands provide a script?",
        a: "Brands provide product facts, required claims, and campaign guidance. Final creator-facing language stays native to the Mr. Kalopsia voice.",
    },
    {
        q: "How fast do you deliver?",
        a: "Most single-video projects are delivered within 10 to 14 business days once the brief, contract, and product access are confirmed. Multi-asset campaigns and 3D-heavy work are scoped around the required production time. Rush delivery is available for an additional fee.",
    },
];
