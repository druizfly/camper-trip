// Main JavaScript for Camper Trip Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSearch();
    initSmoothScrolling();
    initPrintFunctionality();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                bar.style.transform = navMenu.classList.contains('active') 
                    ? getBarTransform(index) 
                    : 'none';
            });
        });

        // Close mobile menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                });
            }
        });
    }
}

function getBarTransform(index) {
    switch(index) {
        case 0:
            return 'rotate(-45deg) translate(-5px, 6px)';
        case 1:
            return 'opacity(0)';
        case 2:
            return 'rotate(45deg) translate(-5px, -6px)';
        default:
            return 'none';
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;

    // Search data - this would normally come from a JSON file or API
    const searchData = [
        {
            title: "Vignette Crit'Air",
            content: "pegatina medioambiental obligatoria Francia ZFE",
            url: "pages/getting-started.html#vignette"
        },
        {
            title: "Itinerario Toulouse",
            content: "Ciudad Rosa Halle de La Machine Quai des Savoirs",
            url: "pages/itineraries.html#toulouse"
        },
        {
            title: "Camping Le Rupé",
            content: "camping Toulouse transporte público",
            url: "pages/accommodations.html#le-rupe"
        },
        {
            title: "Albi Catedral",
            content: "catedral ladrillo UNESCO Carrousel du Vigan",
            url: "pages/itineraries.html#albi"
        },
        {
            title: "Gorges du Tarn",
            content: "cañón piragüismo familia naturaleza buitres",
            url: "pages/itineraries.html#gorges-tarn"
        },
        {
            title: "Carcassonne",
            content: "ciudadela medieval fortaleza cuento hadas",
            url: "pages/itineraries.html#carcassonne"
        },
        {
            title: "Lista de Equipaje",
            content: "checklist botiquín ropa cocina documentación",
            url: "pages/checklist.html"
        }
    ];

    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            hideSearchResults();
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query, searchData);
        }, 300);
    });

    function performSearch(query, data) {
        const results = data.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.content.toLowerCase().includes(query);
        });

        displaySearchResults(results);
    }

    function displaySearchResults(results) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No se encontraron resultados</div>';
        } else {
            const resultsHTML = results.map(result => `
                <div class="search-result-item">
                    <a href="${result.url}">
                        <h4>${result.title}</h4>
                        <p>${result.content}</p>
                    </a>
                </div>
            `).join('');
            
            searchResults.innerHTML = resultsHTML;
        }

        searchResults.style.display = 'block';
    }

    function hideSearchResults() {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            hideSearchResults();
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Print functionality
function initPrintFunctionality() {
    const printButtons = document.querySelectorAll('.print-btn');
    
    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });
}

// Utility function to show loading spinner
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    }
}

// Utility function to hide loading spinner
function hideLoading(element, content) {
    if (element) {
        element.innerHTML = content;
    }
}

// Utility function to format dates
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        locale: 'es-ES'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize analytics (placeholder for future implementation)
function initAnalytics() {
    // Google Analytics or other tracking code would go here
    console.log('Analytics initialized');
}

// Export functions for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileNavigation,
        initSearch,
        initSmoothScrolling,
        formatDate
    };
} 