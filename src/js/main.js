// Main JavaScript for Camper Trip Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initSearch();
    initSmoothScrolling();
    initPrintFunctionality();
    initImageGallery();
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

    // Search data - comprehensive content index
    const searchData = [
        // Preparativos
        {
            title: "Vignette Crit'Air",
            content: "pegatina medioambiental obligatoria Francia ZFE zonas bajas emisiones Toulouse Montpellier certificat-air.gouv.fr",
            url: "pages/getting-started.html#vignette",
            category: "Preparativos"
        },
        {
            title: "Documentación del Vehículo",
            content: "permiso conducir categoría B autocaravana PTAC 3.5 toneladas carta verde seguro",
            url: "pages/getting-started.html#documentation",
            category: "Preparativos"
        },
        {
            title: "Estrategias para Agosto",
            content: "temporada alta reservas campings planificación antelación calor gestión ritmo infantil",
            url: "pages/getting-started.html#august-tips",
            category: "Preparativos"
        },
        
        // Itinerarios Ruta A
        {
            title: "Toulouse - La Ciudad Rosa",
            content: "Halle de La Machine Minotauro araña Kumo Quai des Savoirs Canal du Midi niños familias",
            url: "pages/itineraries.html#toulouse",
            category: "Itinerarios"
        },
        {
            title: "Albi - Valle del Tarn",
            content: "catedral Santa Cecilia ladrillo UNESCO Carrousel du Vigan tiovivo Cordes-sur-Ciel",
            url: "pages/itineraries.html#albi",
            category: "Itinerarios"
        },
        {
            title: "Gorges du Tarn",
            content: "cañón naturaleza piragüismo Roc des Hourtous buitres leonados Canoë La Cazelle Acroparc Millau",
            url: "pages/itineraries.html#gorges-tarn",
            category: "Itinerarios"
        },
        {
            title: "Carcassonne - Cité Medieval",
            content: "ciudadela medieval murallas castillo condal Parc Australien Lac de la Cavayère",
            url: "pages/itineraries.html#carcassonne-a",
            category: "Itinerarios"
        },
        
        // Itinerarios Ruta B
        {
            title: "Ariège - Pirineos",
            content: "Parc de la Préhistoire Tarascon cromañón Maison des Loups Orlu marmotas",
            url: "pages/itineraries.html#ariege",
            category: "Itinerarios"
        },
        {
            title: "Narbonne - Costa Mediterránea",
            content: "Canal de la Robine Horreum Romain Narbo Via museo romano Narbonne-Plage Gruissan",
            url: "pages/itineraries.html#narbonne",
            category: "Itinerarios"
        },
        {
            title: "Montpellier",
            content: "zoo gratuito Serre Amazonienne Planet Ocean acuario planetario P+Tram transporte",
            url: "pages/itineraries.html#montpellier",
            category: "Itinerarios"
        },
        
        // Alojamientos
        {
            title: "Camping Le Rupé - Toulouse",
            content: "camping base Toulouse 7km centro transporte público autobús metro parcelas",
            url: "pages/accommodations.html#le-rupe",
            category: "Alojamientos"
        },
        {
            title: "Albirondack Park - Albi",
            content: "camping alta gama piscina climatizada spa club infantil",
            url: "pages/accommodations.html#albirondack",
            category: "Alojamientos"
        },
        {
            title: "Camping de la Cité - Carcassonne",
            content: "camping proximidad ciudadela a pie ubicación privilegiada snack tienda",
            url: "pages/accommodations.html#carcassonne-camping",
            category: "Alojamientos"
        },
        {
            title: "Aires de Service",
            content: "áreas servicio autocaravanas agua vaciado aguas grises negras Camping-Car Park",
            url: "pages/accommodations.html#ecosystem",
            category: "Alojamientos"
        },
        
        // Lista de Equipaje
        {
            title: "Documentación Viaje",
            content: "DNI pasaportes permisos conducir carta verde tarjeta sanitaria europea reservas",
            url: "pages/checklist.html#documentation",
            category: "Equipaje"
        },
        {
            title: "Botiquín Salud",
            content: "termómetro crema solar protección repelente insectos medicamentos paracetamol tire-tiques",
            url: "pages/checklist.html#health",
            category: "Equipaje"
        },
        {
            title: "Ropa y Calzado",
            content: "ropa algodón pantalones sudadera impermeable bañadores toallas microfibra zapatillas sandalias",
            url: "pages/checklist.html#clothing",
            category: "Equipaje"
        },
        {
            title: "Entretenimiento Niños",
            content: "doudou peluche cuadernos dibujar colores cuentos tablet juegos playa cubo pala",
            url: "pages/checklist.html#entertainment",
            category: "Equipaje"
        },
        
        // Recursos
        {
            title: "Contactos Emergencia",
            content: "112 emergencias europeo policía 17 bomberos 18 SAMU 15 consulado España",
            url: "pages/resources.html#emergency",
            category: "Recursos"
        },
        {
            title: "Apps Recomendadas",
            content: "Park4Night Waze Météo-France Google Translate aplicaciones móviles útiles",
            url: "pages/resources.html#apps",
            category: "Recursos"
        },
        {
            title: "Frases Útiles Francés",
            content: "camping place camping-car sanitaires station-service médecin urgence francés básico",
            url: "pages/resources.html#useful-phrases",
            category: "Recursos"
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
            // Group results by category
            const groupedResults = results.reduce((groups, result) => {
                const category = result.category || 'Otros';
                if (!groups[category]) groups[category] = [];
                groups[category].push(result);
                return groups;
            }, {});

            let resultsHTML = '';
            
            Object.keys(groupedResults).forEach(category => {
                resultsHTML += `<div class="search-category">
                    <h5 class="search-category-title">${category}</h5>
                    ${groupedResults[category].map(result => `
                        <div class="search-result-item">
                            <a href="${result.url}">
                                <h4>${highlightQuery(result.title, searchInput.value)}</h4>
                                <p>${truncateText(result.content, 100)}</p>
                            </a>
                        </div>
                    `).join('')}
                </div>`;
            });
            
            searchResults.innerHTML = resultsHTML;
        }

        searchResults.style.display = 'block';
    }
    
    function highlightQuery(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
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

// Image Gallery functionality
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    if (galleryImages.length === 0) return;
    
    // Create modal if it doesn't exist
    if (!document.getElementById('gallery-modal')) {
        createGalleryModal();
    }
    
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('gallery-modal-image');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalDescription = document.getElementById('gallery-modal-description');
    const closeButton = document.getElementById('gallery-close');
    const prevButton = document.getElementById('gallery-prev');
    const nextButton = document.getElementById('gallery-next');
    
    let currentImageIndex = 0;
    let currentGalleryImages = [];
    
    // Add click event to all gallery images
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            // Get all images from the same gallery
            const gallery = this.closest('.image-gallery');
            currentGalleryImages = Array.from(gallery.querySelectorAll('.gallery-image'));
            currentImageIndex = currentGalleryImages.indexOf(this);
            
            showModal(currentImageIndex);
        });
    });
    
    // Modal navigation
    closeButton.addEventListener('click', hideModal);
    prevButton.addEventListener('click', () => showPrevImage());
    nextButton.addEventListener('click', () => showNextImage());
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                hideModal();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    function createGalleryModal() {
        const modalHTML = `
            <div id="gallery-modal" class="gallery-modal">
                <div class="gallery-modal-content">
                    <span id="gallery-close" class="gallery-close">&times;</span>
                    <button id="gallery-prev" class="gallery-nav prev">&lt;</button>
                    <button id="gallery-next" class="gallery-nav next">&gt;</button>
                    <img id="gallery-modal-image" class="gallery-modal-image" src="" alt="">
                    <div class="gallery-modal-info">
                        <div id="gallery-modal-title" class="gallery-modal-title"></div>
                        <div id="gallery-modal-description" class="gallery-modal-description"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    function showModal(index) {
        const img = currentGalleryImages[index];
        const modal = document.getElementById('gallery-modal');
        const modalImage = document.getElementById('gallery-modal-image');
        const modalTitle = document.getElementById('gallery-modal-title');
        const modalDescription = document.getElementById('gallery-modal-description');
        
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = img.dataset.title || img.alt;
        modalDescription.textContent = img.dataset.description || '';
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Update navigation buttons
        updateNavigationButtons();
    }
    
    function hideModal() {
        const modal = document.getElementById('gallery-modal');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        showModal(currentImageIndex);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
        showModal(currentImageIndex);
    }
    
    function updateNavigationButtons() {
        const prevButton = document.getElementById('gallery-prev');
        const nextButton = document.getElementById('gallery-next');
        
        // Hide navigation buttons if only one image
        if (currentGalleryImages.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block';
            nextButton.style.display = 'block';
        }
    }
}

// Export functions for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileNavigation,
        initSearch,
        initSmoothScrolling,
        initImageGallery,
        formatDate
    };
} 