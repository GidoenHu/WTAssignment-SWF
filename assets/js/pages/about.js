document.addEventListener('DOMContentLoaded', function() {
    // Scroll Animation for Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, timelineOptions);

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        timelineObserver.observe(item);
    });

    // Video Lazy Loading
    const video = document.querySelector('.video-container video');
    if (video) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const source = video.querySelector('source');
                    const src = source.getAttribute('data-src');
                    if (src) {
                        source.src = src;
                        source.removeAttribute('data-src');
                        video.load();
                    }
                    videoObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        videoObserver.observe(video);
    }

    // Awards Carousel
    const awards = [
        {
            year: '2023',
            title: 'Best Conservation Program',
            organization: 'World Zoo Association'
        },
        {
            year: '2022',
            title: 'Excellence in Wildlife Care',
            organization: 'Asian Zoo Alliance'
        },
        {
            year: '2021',
            title: 'Environmental Education Award',
            organization: 'Global Wildlife Foundation'
        }
    ];

    function initAwardsCarousel() {
        const carousel = document.querySelector('.awards-carousel');
        if (!carousel) return;

        let html = '<div class="row">';
        awards.forEach(award => {
            html += `
                <div class="col-md-4 mb-4">
                    <div class="award-card">
                        <div class="award-year">${award.year}</div>
                        <h3 class="award-title">${award.title}</h3>
                        <p class="award-org">${award.organization}</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        carousel.innerHTML = html;
    }

    initAwardsCarousel();

    // Team Member Hover Effect
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('img').style.transform = 'scale(1.1)';
            member.querySelector('.position').style.color = 'var(--secondary-color)';
        });

        member.addEventListener('mouseleave', () => {
            member.querySelector('img').style.transform = 'scale(1)';
            member.querySelector('.position').style.color = 'var(--primary-color)';
        });
    });

    // Conservation Focus Cards Animation
    const focusCards = document.querySelectorAll('.focus-card');
    const focusOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const focusObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, focusOptions);

    focusCards.forEach(card => {
        focusObserver.observe(card);
    });

    // Mission & Vision Cards Interaction
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            contentCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
        });
    });

    // Smooth Scroll for Navigation Links
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

    // Update Timeline Position on Scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const timeline = document.querySelector('.merger-timeline');
        if (!timeline) return;

        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Scrolling down
            timeline.style.transform = 'translateX(-5px)';
        } else {
            // Scrolling up
            timeline.style.transform = 'translateX(0)';
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
});