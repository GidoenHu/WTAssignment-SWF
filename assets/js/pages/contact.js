document.addEventListener('DOMContentLoaded', function() {
    // Booking Form Validation and Handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const today = new Date().toISOString().split('T')[0];
        document.querySelector('input[type="date"]').setAttribute('min', today);

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Calculate total
            const adults = parseInt(this.querySelector('input[placeholder="Adults"]').value) || 0;
            const children = parseInt(this.querySelector('input[placeholder="Children"]').value) || 0;
            const seniors = parseInt(this.querySelector('input[placeholder="Seniors"]').value) || 0;

            const total = calculateTotal(adults, children, seniors);
            showBookingSummary(adults, children, seniors, total);
        });
    }

    // Calculate ticket total
    function calculateTotal(adults, children, seniors) {
        const prices = {
            adult: 35,
            child: 23,
            senior: 17
        };

        return (adults * prices.adult) + 
               (children * prices.child) + 
               (seniors * prices.senior);
    }

    // Show booking summary
    function showBookingSummary(adults, children, seniors, total) {
        const summaryHTML = `
            <div class="booking-summary mt-4">
                <h4>Booking Summary</h4>
                <table class="table">
                    <tbody>
                        <tr>
                            <td>Adults (${adults})</td>
                            <td>$${adults * 35}</td>
                        </tr>
                        <tr>
                            <td>Children (${children})</td>
                            <td>$${children * 23}</td>
                        </tr>
                        <tr>
                            <td>Seniors (${seniors})</td>
                            <td>$${seniors * 17}</td>
                        </tr>
                        <tr class="table-active">
                            <th>Total</th>
                            <th>$${total}</th>
                        </tr>
                    </tbody>
                </table>
                <button class="btn btn-success w-100" onclick="proceedToPayment()">
                    Proceed to Payment
                </button>
            </div>
        `;

        const existingSummary = document.querySelector('.booking-summary');
        if (existingSummary) {
            existingSummary.remove();
        }

        bookingForm.insertAdjacentHTML('afterend', summaryHTML);
    }

    // Initialize FAQs
    const faqs = [
        {
            question: "What are your opening hours?",
            answer: "We are open daily from 8:30 AM to 6:00 PM, including public holidays. Last entry is at 5:00 PM."
        },
        {
            question: "Are outside food and drinks allowed?",
            answer: "Small snacks and water bottles are allowed. However, full meals are not permitted as we have several dining options within the park."
        },
        {
            question: "Is photography allowed?",
            answer: "Yes, photography is allowed throughout the park. However, flash photography is prohibited in certain animal enclosures."
        },
        {
            question: "Are strollers available for rent?",
            answer: "Yes, strollers are available for rent at the entrance. A refundable deposit is required."
        }
    ];

    function initializeFAQs() {
        const accordion = document.getElementById('faqAccordion');
        if (!accordion) return;

        faqs.forEach((faq, index) => {
            const itemHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button ${index === 0 ? '' : 'collapsed'}" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target="#collapse${index}">
                            ${faq.question}
                        </button>
                    </h2>
                    <div id="collapse${index}" 
                         class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" 
                         data-bs-parent="#faqAccordion">
                        <div class="accordion-body">
                            ${faq.answer}
                        </div>
                    </div>
                </div>
            `;
            accordion.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    initializeFAQs();

    // Smooth scroll for anchor links
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

    // // Map lazy loading
    // const mapIframe = document.querySelector('.map-container iframe');
    // if (mapIframe) {
    //     const mapObserver = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 const iframe = entry.target;
    //                 const src = iframe.getAttribute('data-src');
    //                 if (src) {
    //                     iframe.src = src;
    //                     mapObserver.unobserve(iframe);
    //                 }
    //             }
    //         });
    //     }, {
    //         threshold: 0.1
    //     });

    //     mapObserver.observe(mapIframe);
    // }
});

// Payment processing function (mock)
function proceedToPayment() {
    alert('This would redirect to a payment gateway in a real application.');
}