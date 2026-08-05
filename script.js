/**
 * Rustic Furnishing - Complete E-Commerce Javascript
 * Handles Navigation, Product Filtering, UI interactions, and Dynamic Messaging.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Navbar Scroll Effect & Mobile Toggle
       ========================================================================== */
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Change navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle (Basic implementation for responsiveness)
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--clr-white)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = 'var(--shadow-md)';
            }
        });
    }

    /* ==========================================================================
       2. Search, Filter & Sort Functionality
       ========================================================================== */
    const productSearch = document.getElementById('product-search');
    const filterCategory = document.getElementById('filter-category');
    const filterMaterial = document.getElementById('filter-material');
    const sortPrice = document.getElementById('sort-price');
    const productGrid = document.getElementById('product-grid');
    const productCards = Array.from(document.querySelectorAll('.product-card')); // convert NodeList to Array for sorting

    const applyFilters = () => {
        const searchTerm = productSearch.value.toLowerCase();
        const categoryVal = filterCategory.value;
        const materialVal = filterMaterial.value;

        // Filter elements
        let filteredCards = productCards.filter(card => {
            const title = card.querySelector('.product-name').textContent.toLowerCase();
            const cardCat = card.dataset.category;
            const cardMat = card.dataset.material;

            const matchesSearch = title.includes(searchTerm);
            const matchesCat = categoryVal === 'all' || cardCat === categoryVal;
            const matchesMat = materialVal === 'all' || cardMat === materialVal;

            if (matchesSearch && matchesCat && matchesMat) {
                card.style.display = 'block';
                return true;
            } else {
                card.style.display = 'none';
                return false;
            }
        });

        // Sort elements
        const sortVal = sortPrice.value;
        if (sortVal !== 'default') {
            filteredCards.sort((a, b) => {
                const priceA = parseFloat(a.dataset.price);
                const priceB = parseFloat(b.dataset.price);

                if (sortVal === 'low-high') return priceA - priceB;
                if (sortVal === 'high-low') return priceB - priceA;
                return 0; 
            });
        }

        // Re-append sorted/filtered cards to grid to reflect visual order
        productGrid.innerHTML = '';
        filteredCards.forEach(card => productGrid.appendChild(card));

        // If no products found, show message
        if (filteredCards.length === 0) {
            productGrid.innerHTML = '<div class="empty-cart-msg" style="grid-column: 1/-1;">No products found matching your criteria.</div>';
        }
    };

    // Attach filter events
    if (productSearch) productSearch.addEventListener('input', applyFilters);
    if (filterCategory) filterCategory.addEventListener('change', applyFilters);
    if (filterMaterial) filterMaterial.addEventListener('change', applyFilters);
    if (sortPrice) sortPrice.addEventListener('change', applyFilters);

    /* ==========================================================================
       3. Contact Form Submission
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = 'var(--clr-success)';
            
            setTimeout(() => {
                alert('Thank you for contacting us. We will get back to you soon.');
                contactForm.reset();
                btn.textContent = 'Send Message';
                btn.style.backgroundColor = '';
            }, 1500);
        });
    }

    /* ==========================================================================
       4. Gallery & Product Lightbox
       ========================================================================== */
    // Expanded selector to include both product images and gallery images
    const popUpImages = document.querySelectorAll('.gallery-item img, .product-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    popUpImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeBox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (closeLightbox) closeLightbox.addEventListener('click', closeBox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeBox();
        }
    });

    /* ==========================================================================
       5. WhatsApp Integration (Dynamic Messaging)
       ========================================================================== */
    // Add dynamic whatsapp messages for product sharing/inquiries
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.offer-price').textContent;
            
            const message = encodeURIComponent(`Hello Rustic Furnishing, I am interested in the ${productName} priced at ${productPrice}. I will attach a screenshot shortly.`);
            const whatsappUrl = `https://wa.me/917005358860?text=${message}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });

});
// Remove URL fragment after clicking smooth scroll links
document.querySelectorAll('a[href="#hero"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        setTimeout(() => {
            history.replaceState(null, null, window.location.pathname);
        }, 5);
    });
});