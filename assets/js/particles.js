/* ============================================
   PARTICLE SYSTEM
   Cosmic floating particles with connections
   ============================================ */
(function () {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, particles, mouse;

    const config = {
        particleCount: 80,
        maxDistance: 150,
        particleMinSize: 1,
        particleMaxSize: 2.5,
        speed: 0.3,
        colors: ['rgba(108, 92, 231,', 'rgba(162, 155, 254,', 'rgba(0, 206, 201,', 'rgba(255, 255, 255,'],
        mouseRadius: 200,
    };

    mouse = { x: null, y: null };

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(createParticle());
        }
        animate();
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticle() {
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * config.speed,
            vy: (Math.random() - 0.5) * config.speed,
            size: Math.random() * (config.particleMaxSize - config.particleMinSize) + config.particleMinSize,
            color: color,
            alpha: Math.random() * 0.5 + 0.2,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.01,
        };
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p, i) => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += p.pulseSpeed;

            // Wrap around edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            // Pulsing alpha
            const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + currentAlpha + ')';
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color + (currentAlpha * 0.1) + ')';
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.maxDistance) {
                    const opacity = (1 - dist / config.maxDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse interaction
            if (mouse.x !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < config.mouseRadius) {
                    const force = (config.mouseRadius - dist) / config.mouseRadius;
                    p.vx += (dx / dist) * force * 0.02;
                    p.vy += (dy / dist) * force * 0.02;

                    // Speed limit
                    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    if (speed > 1.5) {
                        p.vx = (p.vx / speed) * 1.5;
                        p.vy = (p.vy / speed) * 1.5;
                    }
                }
            }

            // Friction
            p.vx *= 0.999;
            p.vy *= 0.999;
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    init();
})();
