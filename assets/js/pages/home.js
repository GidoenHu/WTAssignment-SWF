document.addEventListener('DOMContentLoaded', function() {
    // Hero Section Parallax Effect
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });

    // Lazy Loading for Featured Attraction Images
    const images = document.querySelectorAll('.card-img-top');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));

    // News Items Animation
    const newsItems = document.querySelectorAll('.news-item');
    const newsOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const newsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, newsOptions);

    newsItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        newsObserver.observe(item);
    });

    // Ticket CTA Click Tracking
    const ticketButton = document.querySelector('.cta .btn-primary');
    if (ticketButton) {
        ticketButton.addEventListener('click', function(e) {
            // In a real application, this would send analytics data
            console.log('Ticket CTA clicked');
        });
    }

    // Dynamic News Loading (Simulated)
    function loadMoreNews() {
        const newsContainer = document.querySelector('.latest-news .row');
        if (newsContainer) {
            // In a real application, this would fetch from an API
            const newNewsItem = document.createElement('div');
            newNewsItem.className = 'col-md-6 mb-4';
            newNewsItem.innerHTML = `
                <div class="news-item">
                    <div class="news-date">May 2024</div>
                    <h3>Conservation Success</h3>
                    <p>Our breeding program welcomes new endangered species offspring.</p>
                    <a href="#" class="btn btn-outline-primary">Read More</a>
                </div>
            `;
            newsContainer.appendChild(newNewsItem);
        }
    }

    // Auto-updating Visitor Counter (Simulated)
    let visitorCount = 1500;
    function updateVisitorCount() {
        const counter = document.getElementById('visitor-counter');
        if (counter) {
            visitorCount += Math.floor(Math.random() * 10);
            counter.textContent = visitorCount.toLocaleString();
        }
    }
    setInterval(updateVisitorCount, 5000);
});