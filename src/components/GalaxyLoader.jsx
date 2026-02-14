import React, { useEffect, useRef } from 'react';

const GalaxyLoader = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    // Configuration
    const STAR_COUNT = 600;
    const CENTER_SAFE_ZONE = 0;

    // Star Object
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        // Random angle
        this.angle = Math.random() * Math.PI * 2;

        // Random radius
        const minRadius = CENTER_SAFE_ZONE;
        const maxRadius = Math.max(width, height) * 0.7;

        // DENSITY FIX: Use Math.sqrt() to distribute stars evenly by area.
        // Simple Math.random() clumps stars in the center (because the center has less area).
        // Math.sqrt pushes them outward for a uniform look.
        const distFactor = Math.sqrt(Math.random());
        this.radius = minRadius + distFactor * (maxRadius - minRadius);

        // Speed: Outer stars move slower, inner stars move faster
        // Using the same formula as your preferred variant
        this.angularSpeed = (0.005 + (Math.random() * 0.01)) * (minRadius + 100) / (this.radius + 100);

        // Random starting opacity and size
        this.opacity = Math.random() * 0.5 + 0.1;
        // Made thinner: 0.2 to 1.2 pixels
        this.size = Math.random() * 1.0 + 0.2;
      }

      update() {
        this.angle += this.angularSpeed;

        // Occasional shimmer
        if (Math.random() < 0.01) {
          this.opacity = Math.random() * 0.5 + 0.2;
        }
      }

      draw(ctx, centerX, centerY) {
        const x = centerX + Math.cos(this.angle) * this.radius;
        const y = centerY + Math.sin(this.angle) * this.radius;

        // Pure white color
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize stars
    let stars = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Don't reset stars on resize - just update canvas dimensions
    };

    const animate = () => {
      // Trail effect: Use a semi-transparent color that matches the darker part of the gradient
      // to keep the galactic feel while allowing the background gradient to show through.
      // We use clearRect followed by a semi-transparent fill to achieve a "ghosting" trail
      // without permanently opaque background.
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';

      const centerX = width / 2;
      const centerY = height / 2;

      stars.forEach(star => {
        star.update();
        star.draw(ctx, centerX, centerY);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block" />
    </div>
  );
};

export default GalaxyLoader;
