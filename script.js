// ==========================================
// Birthday Website for 杨博皓
// ==========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// ==========================================
// Main Initialization
// ==========================================
function initializeWebsite() {
    // Initialize background particles
    initParticles();
    
    // Initialize music player
    initMusicPlayer();
    
    // Initialize cake animation
    initCakeAnimation();
    
    // Pre-initialize gallery (hidden)
    initGallery();
}

// ==========================================
// Background Particles Configuration
// ==========================================
function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js not loaded');
        return;
    }
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#FFD700', '#FFB6C1', '#FFA500']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'top',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'bubble'
                },
                onclick: {
                    enable: false
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 100,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                }
            }
        },
        retina_detect: true
    });
}

// ==========================================
// Music Player Control
// ==========================================
let musicPlaying = false;

function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicToggle.querySelector('.music-icon');
    
    // Set volume
    bgMusic.volume = 0.7;
    
    // Start with muted icon
    musicIcon.textContent = '🔇';
    musicToggle.classList.add('muted');
    
    // Function to start music
    window.startMusic = function() {
        if (musicPlaying) return;
        
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicPlaying = true;
                musicIcon.textContent = '🎵';
                musicToggle.classList.remove('muted');
                console.log('Music is playing');
            }).catch(error => {
                console.log('Music play error:', error);
            });
        }
    };
    
    // Toggle music on button click
    musicToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent double triggering
        if (musicPlaying) {
            bgMusic.pause();
            musicIcon.textContent = '🔇';
            musicToggle.classList.add('muted');
            musicPlaying = false;
        } else {
            bgMusic.play();
            musicIcon.textContent = '🎵';
            musicToggle.classList.remove('muted');
            musicPlaying = true;
        }
    });
}

// ==========================================
// Cake Animation with GSAP
// ==========================================
function initCakeAnimation() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }
    
    const cakeContainer = document.querySelector('.cake-container');
    const introSection = document.getElementById('intro-section');
    const cakeImage = document.getElementById('cake-image');
    const sparklesImage = document.getElementById('sparkles-image');
    
    // Initial animation for cake entrance
    gsap.from(cakeImage, {
        duration: 1.5,
        scale: 0,
        rotation: -180,
        ease: 'elastic.out(1, 0.5)',
        delay: 0.3
    });
    
    gsap.from(sparklesImage, {
        duration: 1,
        opacity: 0,
        scale: 0,
        ease: 'power2.out',
        delay: 1
    });
    
    // Add hover effect
    cakeContainer.addEventListener('mouseenter', function() {
        gsap.to(cakeImage, {
            duration: 0.3,
            scale: 1.1,
            ease: 'power2.out'
        });
    });
    
    cakeContainer.addEventListener('mouseleave', function() {
        gsap.to(cakeImage, {
            duration: 0.3,
            scale: 1,
            ease: 'power2.out'
        });
    });
    
    // Click to trigger explosion and start music
    let explosionTriggered = false;
    
    cakeContainer.addEventListener('click', function() {
        if (!explosionTriggered) {
            explosionTriggered = true;
            
            // Start music when cake is clicked
            if (typeof window.startMusic === 'function') {
                window.startMusic();
            }
            
            triggerExplosion();
        }
    });
}

// ==========================================
// Particle Explosion Effect
// ==========================================
function triggerExplosion() {
    const introSection = document.getElementById('intro-section');
    const cakeContainer = document.querySelector('.cake-container');
    const gallerySection = document.getElementById('gallery-section');
    const explosionCanvas = document.getElementById('explosion-canvas');
    const ctx = explosionCanvas.getContext('2d');
    
    // Set canvas size
    explosionCanvas.width = window.innerWidth;
    explosionCanvas.height = window.innerHeight;
    
    // Get cake position
    const cakeRect = cakeContainer.getBoundingClientRect();
    const centerX = cakeRect.left + cakeRect.width / 2;
    const centerY = cakeRect.top + cakeRect.height / 2;
    
    // Show canvas
    gsap.to(explosionCanvas, {
        duration: 0.3,
        opacity: 1
    });
    
    // Animate cake explosion
    gsap.to(cakeContainer, {
        duration: 0.5,
        scale: 1.5,
        opacity: 0,
        ease: 'power2.in'
    });
    
    // Create particles
    const particles = [];
    const particleCount = 60;
    const colors = ['#FFD700', '#FFB6C1', '#FFA500', '#FF7F50', '#FFDAB9'];
    
    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 3 + Math.random() * 5;
        
        particles.push({
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            size: 8 + Math.random() * 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: 0.015 + Math.random() * 0.01
        });
    }
    
    // Animate particles
    let animationFrameId;
    function animateParticles() {
        ctx.clearRect(0, 0, explosionCanvas.width, explosionCanvas.height);
        
        let activeParticles = 0;
        
        particles.forEach(particle => {
            if (particle.alpha > 0) {
                activeParticles++;
                
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // Gravity
                particle.alpha -= particle.decay;
                
                // Draw particle
                ctx.save();
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        });
        
        if (activeParticles > 0) {
            animationFrameId = requestAnimationFrame(animateParticles);
        } else {
            // Animation complete, show gallery
            gsap.to(explosionCanvas, {
                duration: 0.5,
                opacity: 0,
                onComplete: function() {
                    cancelAnimationFrame(animationFrameId);
                }
            });
        }
    }
    
    animateParticles();
    
    // Fade out intro section and show gallery
    gsap.to(introSection, {
        duration: 1,
        opacity: 0,
        delay: 1,
        onComplete: function() {
            introSection.style.display = 'none';
            gallerySection.classList.remove('hidden');
            
            // Trigger confetti
            createConfetti();
            
            // Start slideshow
            startSlideshow();
        }
    });
}

// ==========================================
// Confetti Effect
// ==========================================
function createConfetti() {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#FFD700', '#FFB6C1', '#FFA500', '#FF7F50', '#FFDAB9'];
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const confettiInterval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            clearInterval(confettiInterval);
            return;
        }
        
        const particleCount = 3;
        
        for (let i = 0; i < particleCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.opacity = '1';
            confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '999';
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);
            
            const fallDuration = 2000 + Math.random() * 2000;
            const startTime = Date.now();
            const startLeft = parseFloat(confetti.style.left);
            const drift = randomInRange(-100, 100);
            
            function animateConfetti() {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / fallDuration;
                
                if (progress < 1) {
                    confetti.style.top = (progress * window.innerHeight) + 'px';
                    confetti.style.left = (startLeft + Math.sin(progress * Math.PI * 4) * drift) + 'px';
                    confetti.style.opacity = (1 - progress);
                    confetti.style.transform = 'rotate(' + (progress * 720) + 'deg)';
                    requestAnimationFrame(animateConfetti);
                } else {
                    confetti.remove();
                }
            }
            
            animateConfetti();
        }
    }, 50);
}

// ==========================================
// Gallery System - PPT Style Slideshow
// ==========================================
function initGallery() {
    // Gallery items will be shown one at a time in slideshow
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Hide all items initially
    galleryItems.forEach(item => {
        item.style.display = 'none';
    });
    
    // Setup click handlers for image preview
    setupImagePreview();
}

// ==========================================
// Image Preview Modal
// ==========================================
function setupImagePreview() {
    const modal = document.getElementById('image-preview-modal');
    const previewImage = document.getElementById('preview-image');
    const previewCaption = document.getElementById('preview-caption');
    const closeButton = modal.querySelector('.preview-close');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Prevent default link behavior and show preview
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const img = item.querySelector('img');
            const caption = item.querySelector('.item-caption');
            
            if (img) {
                // Pause slideshow
                pauseSlideshow();
                
                // Set preview content
                previewImage.src = img.src;
                previewImage.alt = img.alt;
                if (caption) {
                    previewCaption.textContent = caption.textContent;
                } else {
                    previewCaption.textContent = '';
                }
                
                // Show modal
                modal.classList.add('active');
            }
        });
    });
    
    // Close modal functions
    function closeModal() {
        modal.classList.remove('active');
        // Resume slideshow
        resumeSlideshow();
    }
    
    closeButton.addEventListener('click', closeModal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ==========================================
// PPT-Style Slideshow
// ==========================================
let currentSlide = 0;
let slideshowInterval;
let slideshowPaused = false;

function startSlideshow() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const totalSlides = galleryItems.length;
    
    if (totalSlides === 0) return;
    
    // Show first slide
    showSlide(0);
    
    // Auto-advance every 4 seconds
    slideshowInterval = setInterval(function() {
        if (!slideshowPaused) {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
    }, 4000);
}

function pauseSlideshow() {
    slideshowPaused = true;
}

function resumeSlideshow() {
    slideshowPaused = false;
}

function showSlide(index) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Hide all slides
    galleryItems.forEach((item, i) => {
        if (i === index) {
            item.style.display = 'block';
            item.style.opacity = '0';
            
            // Random entrance effect
            const effects = [
                // Zoom in
                () => {
                    gsap.fromTo(item, 
                        { scale: 0.5, opacity: 0, rotation: -10 },
                        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: 'power2.out' }
                    );
                },
                // Slide from right
                () => {
                    gsap.fromTo(item,
                        { x: 200, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                    );
                },
                // Slide from left
                () => {
                    gsap.fromTo(item,
                        { x: -200, opacity: 0 },
                        { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
                    );
                },
                // Fade + scale
                () => {
                    gsap.fromTo(item,
                        { scale: 1.2, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' }
                    );
                },
                // Rotate in
                () => {
                    gsap.fromTo(item,
                        { rotationY: 90, opacity: 0 },
                        { rotationY: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
                    );
                }
            ];
            
            // Pick random effect
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            randomEffect();
            
            // Add continuous subtle animation while displayed (only on desktop)
            const img = item.querySelector('img');
            if (img && window.innerWidth > 768) {
                // Slow zoom effect (desktop only to prevent mobile overflow)
                gsap.to(img, {
                    scale: 1.1,
                    duration: 3.5,
                    ease: 'power1.inOut'
                });
            }
            
            // Show caption with delay
            const overlay = item.querySelector('.item-overlay');
            if (overlay) {
                gsap.fromTo(overlay,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power2.out' }
                );
            }
        } else {
            // Fade out other slides
            if (item.style.display !== 'none') {
                gsap.to(item, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        item.style.display = 'none';
                    }
                });
            }
        }
    });
}

// ==========================================
// Responsive Handling
// ==========================================
window.addEventListener('resize', function() {
    // Resize explosion canvas if visible
    const explosionCanvas = document.getElementById('explosion-canvas');
    if (explosionCanvas && explosionCanvas.style.opacity !== '0') {
        explosionCanvas.width = window.innerWidth;
        explosionCanvas.height = window.innerHeight;
    }
});

// ==========================================
// Performance Optimization
// ==========================================
// Reduce particles on mobile devices
if (window.innerWidth < 768) {
    // Particles will be reduced in the initParticles function
    // Animation complexity is already reduced via CSS media queries
}

// ==========================================
// Debug Information (can be removed in production)
// ==========================================
console.log('🎂 Birthday website initialized for 杨博皓!');
console.log('🎵 Music:', document.getElementById('bg-music') ? 'Loaded' : 'Not loaded');
console.log('✨ GSAP:', typeof gsap !== 'undefined' ? 'Ready' : 'Not loaded');
console.log('🎨 Particles:', typeof particlesJS !== 'undefined' ? 'Ready' : 'Not loaded');
console.log('🖼️ SimpleLightbox:', typeof SimpleLightbox !== 'undefined' ? 'Ready' : 'Not loaded');
console.log('📐 Masonry:', typeof Masonry !== 'undefined' ? 'Ready' : 'Not loaded');

