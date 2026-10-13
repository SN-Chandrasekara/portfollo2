document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. STICKY HEADER & SCROLL EFFECTS
       ========================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. MOBILE NAVIGATION HAMBURGER MENU
       ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    /* =========================================
       3. ACTIVE NAVIGATION LINK HIGHLIGHTING
       ========================================= */
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       4. FEATURED SHOWREEL PLAY BUTTON
       ========================================= */
    const featuredVideo = document.getElementById('featuredShowreel');
    const playShowreelBtn = document.getElementById('playShowreelBtn');

    if (playShowreelBtn && featuredVideo) {
        playShowreelBtn.addEventListener('click', () => {
            if (featuredVideo.paused) {
                featuredVideo.play();
                playShowreelBtn.classList.add('hidden');
            }
        });

        featuredVideo.addEventListener('pause', () => {
            playShowreelBtn.classList.remove('hidden');
        });

        featuredVideo.addEventListener('play', () => {
            playShowreelBtn.classList.add('hidden');
        });
    }

    /* =========================================
       5. PORTFOLIO FILTERING
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* =========================================
       6. VIDEO MODAL POPUP INTERACTION
       ========================================= */
    const videoModal = document.getElementById('videoModal');
    const modalVideoElement = document.getElementById('modalVideoElement');
    const closeModal = document.getElementById('closeModal');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectDesc = document.getElementById('modalProjectDesc');

    portfolioCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoUrl = card.getAttribute('data-video');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            modalVideoElement.src = videoUrl;
            modalProjectTitle.textContent = title;
            modalProjectDesc.textContent = desc;

            videoModal.classList.add('active');
            modalVideoElement.play();
        });
    });

    const closeVideoModal = () => {
        videoModal.classList.remove('active');
        modalVideoElement.pause();
        modalVideoElement.currentTime = 0;
    };

    closeModal.addEventListener('click', closeVideoModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    /* =========================================
       7. ANIMATED STATISTICS COUNTERS
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; // Adjust speed here

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Trigger counters on scroll into view
    const aboutSection = document.getElementById('about');
    window.addEventListener('scroll', () => {
        if (!aboutSection) return;
        const sectionPos = aboutSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos && !animated) {
            runCounters();
            animated = true;
        }
    });

    /* =========================================
       8. TESTIMONIAL SLIDER
       ========================================= */
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextTestimonial');
    const prevBtn = document.getElementById('prevTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');
    let currentIndex = 0;

    // Create pagination dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const updateSlider = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateSlider(currentIndex);
    };

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider(currentIndex);
    });

    // Auto slide every 6 seconds
    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
    }, 6000);

    track.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    track.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider(currentIndex);
        }, 6000);
    });

    /* =========================================
       9. CONTACT FORM VALIDATION
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Reset errors
            [nameInput, emailInput, messageInput].forEach(input => {
                input.parentElement.classList.remove('error');
            });

            // Name validation
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('error');
                isValid = false;
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                messageInput.parentElement.classList.add('error');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                formSuccess.classList.remove('hidden');
                contactForm.reset();
                
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 8000);
            }
        });
    }

    /* =========================================
       10. FOOTER COPYRIGHT YEAR & BACK TO TOP
       ========================================= */
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});