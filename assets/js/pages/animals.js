document.addEventListener('DOMContentLoaded', function() {
    // Animal data
    const animals = [
        {
            id: 1,
            name: "Sumatran Orangutan",
            species: "Pongo abelii",
            category: "mammals",
            image: "assets/images/animals/mammals/orangutan.jpg",
            status: "Critically Endangered",
            description: "Native to Sumatra's rainforests, these intelligent primates are known for their distinctive red fur and remarkable cognitive abilities.",
            facts: [
                "Can live up to 50 years in captivity",
                "Shares 97% of DNA with humans",
                "Spends most time in trees"
            ]
        },
        {
            id: 2,
            name: "White-bellied Sea Eagle",
            species: "Haliaeetus leucogaster",
            category: "birds",
            image: "assets/images/animals/birds/sea-eagle.jpg",
            status: "Least Concern",
            description: "A majestic coastal bird of prey found throughout Southeast Asia.",
            facts: [
                "Wingspan up to 2.2 meters",
                "Mates for life",
                "Expert fisher"
            ]
        },
        // More animals would be added here...
    ];

    // Initialize animal grid
    function initializeAnimalGrid() {
        const allGrid = document.getElementById('allAnimalsGrid');
        const mammalsGrid = document.getElementById('mammalsGrid');
        const birdsGrid = document.getElementById('birdsGrid');
        const reptilesGrid = document.getElementById('reptilesGrid');

        // Clear existing content
        [allGrid, mammalsGrid, birdsGrid, reptilesGrid].forEach(grid => {
            if (grid) grid.innerHTML = '';
        });

        // Create animal cards
        animals.forEach(animal => {
            const card = createAnimalCard(animal);
            
            // Add to appropriate grids
            if (allGrid) allGrid.appendChild(card.cloneNode(true));
            
            switch(animal.category) {
                case 'mammals':
                    if (mammalsGrid) mammalsGrid.appendChild(card.cloneNode(true));
                    break;
                case 'birds':
                    if (birdsGrid) birdsGrid.appendChild(card.cloneNode(true));
                    break;
                case 'reptiles':
                    if (reptilesGrid) reptilesGrid.appendChild(card.cloneNode(true));
                    break;
            }
        });

        // Initialize click handlers for animal cards
        document.querySelectorAll('.animal-card').forEach(card => {
            card.addEventListener('click', () => {
                const animalId = card.getAttribute('data-animal-id');
                showAnimalDetails(animalId);
            });
        });
    }

    // Create animal card element
    function createAnimalCard(animal) {
        const div = document.createElement('div');
        div.className = 'col-md-4 mb-4';
        div.innerHTML = `
            <div class="animal-card" data-animal-id="${animal.id}">
                <div class="position-relative">
                    <img src="${animal.image}" alt="${animal.name}" class="img-fluid">
                    <span class="conservation-status">${animal.status}</span>
                </div>
                <div class="card-body">
                    <h3>${animal.name}</h3>
                    <p class="species">${animal.species}</p>
                    <p class="description">${animal.description.substring(0, 100)}...</p>
                    <button class="btn btn-primary btn-sm">Learn More</button>
                </div>
            </div>
        `;
        return div;
    }

    // Search functionality
    const searchInput = document.getElementById('animalSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterAnimals(searchTerm);
        }, 300));
    }

    function filterAnimals(searchTerm) {
        const cards = document.querySelectorAll('.animal-card');
        cards.forEach(card => {
            const name = card.querySelector('h3').textContent.toLowerCase();
            const species = card.querySelector('.species').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || 
                species.includes(searchTerm) || 
                description.includes(searchTerm)) {
                card.closest('.col-md-4').style.display = 'block';
            } else {
                card.closest('.col-md-4').style.display = 'none';
            }
        });
    }

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Show animal details in modal
    function showAnimalDetails(animalId) {
        const animal = animals.find(a => a.id === parseInt(animalId));
        if (!animal) return;

        const modalBody = document.querySelector('.modal-body');
        if (!modalBody) return;

        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${animal.image}" alt="${animal.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-6">
                    <h4>${animal.name}</h4>
                    <p class="species">${animal.species}</p>
                    <p class="status-badge ${animal.status.toLowerCase().replace(' ', '-')}">
                        ${animal.status}
                    </p>
                    <p>${animal.description}</p>
                    <h5>Interesting Facts:</h5>
                    <ul>
                        ${animal.facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('featuredModal'));
        modal.show();
    }

    // Conservation status counter animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // Adjust for animation speed
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.round(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 30);
    }

    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.counter');
                const target = parseInt(counter.textContent);
                counter.textContent = '0';
                animateCounter(counter, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.status-card').forEach(card => {
        counterObserver.observe(card);
    });

    // Animal facts carousel
    const facts = [
        "Our orangutans use iPads for cognitive enrichment",
        "White Tigers are not actually a separate subspecies",
        "Komodo Dragons can detect food from up to 7.5 kilometers away",
        "Flamingos get their pink color from the food they eat"
    ];

    function initFactCarousel() {
        const carousel = document.querySelector('.fact-carousel');
        if (!carousel) return;

        let html = '<div class="fact-slides">';
        facts.forEach(fact => {
            html += `
                <div class="fact-slide">
                    <i class="bi bi-lightbulb"></i>
                    <p>${fact}</p>
                </div>
            `;
        });
        html += '</div>';
        
        carousel.innerHTML = html;
    }

    // Initialize everything
    initializeAnimalGrid();
    initFactCarousel();
});