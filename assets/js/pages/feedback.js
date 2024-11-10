/*
 * @Author: hujiangjian hujjx19996@gmail.com
 * @Date: 2024-11-10 22:28:06
 * @LastEditors: hujiangjian hujjx19996@gmail.com
 * @LastEditTime: 2024-11-10 22:30:17
 * @FilePath: \singapore-wildlife\assets\js\pages\feedback.js
 * @Description: 
 * 
 * Copyright (c) 2024 by hujiangjian, All Rights Reserved. 
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    const feedbackForm = document.getElementById('feedbackForm');
    const ratings = {
        overall: 0,
        service: 0,
        cleanliness: 0
    };

    // Star Rating System
    document.querySelectorAll('.star-rating').forEach(ratingGroup => {
        const stars = ratingGroup.querySelectorAll('i');
        const ratingType = ratingGroup.dataset.rating;

        stars.forEach(star => {
            // Hover effect
            star.addEventListener('mouseover', () => {
                const value = parseInt(star.dataset.value);
                highlightStars(stars, value);
            });

            // Mouse leave - reset to selected rating
            star.addEventListener('mouseleave', () => {
                highlightStars(stars, ratings[ratingType]);
            });

            // Click to set rating
            star.addEventListener('click', () => {
                const value = parseInt(star.dataset.value);
                ratings[ratingType] = value;
                highlightStars(stars, value);
            });
        });
    });

    // Function to highlight stars
    function highlightStars(stars, count) {
        stars.forEach(star => {
            const value = parseInt(star.dataset.value);
            star.classList.remove('bi-star', 'bi-star-fill');
            star.classList.add(value <= count ? 'bi-star-fill' : 'bi-star');
            star.classList.toggle('active', value <= count);
        });
    }

    // Form Validation and Submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Check if ratings are provided
            if (Object.values(ratings).some(rating => rating === 0)) {
                alert('Please provide ratings for all categories');
                return;
            }

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                visitDate: document.getElementById('visitDate').value,
                visitType: document.getElementById('visitType').value,
                ratings: ratings,
                highlights: document.getElementById('highlights').value,
                improvements: document.getElementById('improvements').value,
                newsletter: document.getElementById('newsletter').checked
            };

            // Show success modal
            const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
            modal.show();

            // Reset form after submission
            this.reset();
            Object.keys(ratings).forEach(key => {
                ratings[key] = 0;
                const stars = document.querySelector(`[data-rating="${key}"]`).querySelectorAll('i');
                highlightStars(stars, 0);
            });
            this.classList.remove('was-validated');
        });
    }

    // Initialize Testimonials
    const testimonials = [
        {
            name: "Sarah Chen",
            date: "March 2024",
            rating: 5,
            comment: "Amazing experience! The merger has made the wildlife park even better.",
            avatar: "assets/images/testimonials/avatar1.jpg"
        },
        {
            name: "John Smith",
            date: "February 2024",
            rating: 4,
            comment: "Great facilities and knowledgeable staff. Would definitely visit again!",
            avatar: "assets/images/testimonials/avatar2.jpg"
        }
    ];

    function initializeTestimonials() {
        const carousel = document.querySelector('.testimonial-carousel');
        if (!carousel) return;

        testimonials.forEach(testimonial => {
            const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            const testimonialHtml = `
                <div class="col-md-6 mb-4">
                    <div class="testimonial-card">
                        <div class="testimonial-header">
                            <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                            <div>
                                <h4 class="testimonial-name">${testimonial.name}</h4>
                                <div class="testimonial-date">${testimonial.date}</div>
                            </div>
                        </div>
                        <div class="testimonial-rating">${stars}</div>
                        <p class="testimonial-comment">${testimonial.comment}</p>
                    </div>
                </div>
            `;
            carousel.insertAdjacentHTML('beforeend', testimonialHtml);
        });
    }

    initializeTestimonials();
});