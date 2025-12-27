# Fix Logo Black Box Issue

## Problem
Some SVG files contain embedded base64 PNG/JPEG images instead of true vector paths. On fresh browser cache, these can appear as black boxes.

## Problematic Logos
- Adobe (adobe.svg) - ~186KB - embedded PNG
- Crypto (crypto.svg) - ~137KB - embedded PNG
- eBay (ebay.svg) - ~34KB - embedded PNG
- Gillette (gillette.svg) - ~68KB - embedded PNG
- WD (wd.svg) - ~30KB - embedded PNG
- Wilder World (wilder-world.svg) - ~23KB - embedded PNG

## Good Logos (True Vector)
- Logan Paul (logan-paul.svg) - ~2KB - pure SVG paths
- Futureverse (futureverse.svg) - ~16KB - pure SVG paths
- Rolling Stone (rolling-stone.svg) - ~91KB - pure SVG paths

## Solutions

### Option 1: Download Official Vector Logos
Visit brand resource pages:
- **Adobe**: https://www.adobe.com/about-adobe/brand-center.html
- **eBay**: https://www.ebayinc.com/company/brand-resources/
- **Gillette**: Search for "Gillette brand guidelines" or use logo services

### Option 2: Use Logo Services
- Brandfetch: https://brandfetch.com/
- Clearbit Logo API: https://logo.clearbit.com/
- Seeklogo: https://seeklogo.com/

### Option 3: Create Simple Text-Based Logos
For brands without easily accessible vector logos, create simple SVG text:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 50">
  <text x="10" y="35" font-family="Arial, sans-serif" font-size="32" fill="white">BRAND</text>
</svg>
```

### Option 4: Convert Using Online Tools
- https://convertio.co/png-svg/ (trace bitmap to vector)
- https://www.autotracer.org/ (bitmap to vector)

Note: Automated conversion quality varies. Manual recreation or official sources are best.

## Temporary Fix Applied
Added loading optimization and opacity transition to hide render issues:
- `loading="eager"` - prioritize loading
- `decoding="async"` - async image decode
- Opacity fade-in on load
- Better error handling

## Recommended Action
Replace the 6 problematic SVG files with true vector versions from official brand sources.
