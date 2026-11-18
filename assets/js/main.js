/* ============================================
   MAIN JAVASCRIPT
   Interactions, animations, and functionality
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

    // ---- Cursor Glow ----
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        });
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    // ---- Navbar Scroll ----
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ---- Mobile Nav Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ---- Typewriter Effect ----
    const typewriterEl = document.getElementById('typewriter');
    const roles = [
        'IT Student',
        'OJT Candidate',
        'Network Enthusiast',
        'Technical Support',
        'Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    if (typewriterEl) {
        setTimeout(typeWriter, 1000);
    }

    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            }

            updateCounter();
        });
    }

    // ---- Scroll Reveal Animation ----
    function revealElements() {
        // Skill cards
        document.querySelectorAll('.skill-card').forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 100);
            }
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach((item, i) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, i * 200);
            }
        });

        // Education card
        document.querySelectorAll('.education-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                card.classList.add('visible');
            }
        });

        // Contact cards
        document.querySelectorAll('.contact-card').forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 100);
            }
        });

        // Contact form
        document.querySelectorAll('.contact-form-wrapper').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('visible');
            }
        });

        // Skill progress bars
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });

        // Counters
        if (!countersStarted) {
            const heroSection = document.querySelector('.hero-stats');
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    countersStarted = true;
                    animateCounters();
                }
            }
        }
    }

    window.addEventListener('scroll', revealElements);
    revealElements(); // Check on load

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
                btn.style.background = 'linear-gradient(135deg, #00e676, #00cec9)';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- Tilt effect on skill cards (desktop only) ----
    if (window.innerWidth > 768) {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;

                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
});
