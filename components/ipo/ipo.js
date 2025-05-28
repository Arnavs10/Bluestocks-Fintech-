/**
 * BLUESTOCK IPO Page JavaScript
 * This file handles all interactive functionality for the IPO page components
 */

console.log('IPO.js loaded successfully');

// Function to initialize all IPO functionality
function initializeAllIpoFunctionality() {
    console.log('Initializing all IPO functionality');
    initializeIPOSlider();
    initializeNewlyListedSlider();
    initializeOngoingIPOSlider();
    initializeSearchFunctionality();
    initializeIPOCards();
    initializeNotifyButtons();
    handleDematCTAClick();
    handleViewAllIPOs();
    handleViewAllOngoingIPOs();
    handleViewAllNewlyListedIPOs();
    initializeFAQToggle();
}

// Initialize functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Give components time to load before initializing functionality
    setTimeout(initializeAllIpoFunctionality, 500);
});

// Also initialize when script is loaded (in case DOMContentLoaded already fired)
setTimeout(initializeAllIpoFunctionality, 500);

/**
 * Initialize search functionality for IPO search
 */
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.ipo-search');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

/**
 * Perform IPO search
 */
function performSearch(query) {
    if (!query.trim()) {
        alert('Please enter a search term');
        return;
    }
    
    console.log('Searching for IPOs:', query);
    // In a real implementation, this would fetch results from an API
    // For now, just log the search query
    
    // Highlight matching cards for demo purposes
    const ipoCards = document.querySelectorAll('.ipo-card');
    let matchFound = false;
    
    ipoCards.forEach(card => {
        const companyName = card.querySelector('.company-name').textContent.toLowerCase();
        
        if (companyName.includes(query.toLowerCase())) {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 10px 25px rgba(86, 64, 255, 0.2)';
            card.style.borderColor = '#5640ff';
            matchFound = true;
        } else {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        }
    });
    
    if (!matchFound) {
        alert('No IPOs found matching "' + query + '"');
    }
}

/**
 * Initialize interactive behavior for IPO cards
 */
function initializeIPOCards() {
    const ipoCards = document.querySelectorAll('.ipo-card');
    
    ipoCards.forEach(card => {
        // Enhance hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Handle apply buttons
        const applyBtn = card.querySelector('.apply-btn');
        if (applyBtn) {
            applyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const companyName = card.querySelector('.company-name').textContent;
                console.log('Apply clicked for:', companyName);
                alert('Application process started for ' + companyName);
            });
        }
        
        // Handle view details buttons
        const viewDetailsBtn = card.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const companyName = card.querySelector('.company-name').textContent;
                console.log('View details clicked for:', companyName);
                alert('Viewing details for ' + companyName);
            });
        }
    });
}

/**
 * Initialize notify buttons for upcoming IPOs
 */
function initializeNotifyButtons() {
    const notifyBtns = document.querySelectorAll('.notify-btn');
    
    notifyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const companyName = this.closest('.ipo-card').querySelector('.company-name').textContent;
            console.log('Notification requested for:', companyName);
            
            this.textContent = 'Notification Set';
            this.classList.add('notified');
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                alert('You will be notified when ' + companyName + ' IPO opens');
            }, 300);
        });
    });
}

/**
 * Initialize FAQ toggle functionality
 */
function initializeFAQToggle() {
    console.log('Initializing FAQ toggle...');
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('No FAQ items found yet, will retry...');
        // If FAQ items are not loaded yet, try again after a short delay
        setTimeout(initializeFAQToggle, 500);
        return;
    }
    
    console.log(`Found ${faqItems.length} FAQ items`);
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.toggle-icon');
        
        if (!question || !answer) {
            console.error('FAQ item structure is incomplete:', item);
            return;
        }
        
        // Initially hide answers
        answer.style.display = 'none';
        
        question.addEventListener('click', () => {
            // Toggle open/closed state
            const isOpen = item.classList.toggle('open');
            
            // Update toggle icon if it exists
            if (toggleIcon) {
                toggleIcon.textContent = isOpen ? '-' : '+';
            }
            
            // Toggle visibility of answer
            answer.style.display = isOpen ? 'block' : 'none';
            
            // Close other open FAQ items (accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.toggle-icon');
                    
                    if (otherAnswer) otherAnswer.style.display = 'none';
                    if (otherIcon) otherIcon.textContent = '+';
                }
            });
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        const firstAnswer = firstItem.querySelector('.faq-answer');
        const firstIcon = firstItem.querySelector('.toggle-icon');
        
        firstItem.classList.add('open');
        if (firstAnswer) firstAnswer.style.display = 'block';
        if (firstIcon) firstIcon.textContent = '-';
    }
}

/**
 * Initialize slider functionality for upcoming IPOs
 */
function initializeIPOSlider() {
    console.log('Initializing IPO slider...');
    const sliderContainer = document.querySelector('.ipo-slider-container');
    if (!sliderContainer) {
        console.log('Slider container not found, will retry...');
        setTimeout(initializeIPOSlider, 500);
        return;
    }
    
    const cardsWrapper = sliderContainer.querySelector('.ipo-cards-wrapper');
    const cards = cardsWrapper.querySelectorAll('.ipo-card');
    const prevButton = sliderContainer.querySelector('.prev-arrow');
    const nextButton = sliderContainer.querySelector('.next-arrow');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (!cards.length) {
        console.log('No IPO cards found, will retry...');
        setTimeout(initializeIPOSlider, 500);
        return;
    }
    
    console.log(`Found ${cards.length} IPO cards`);
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = 20; // Gap between cards
    
    // Always slide 3 cards per slide on desktop or fewer on mobile
    let cardsPerSlide = 3;
    // On desktop, ensure we always move 3 cards at once
    let slideMoveAmount = 3; 
    const maxIndex = Math.max(0, cards.length - cardsPerSlide);
    
    // Generate pagination dots dynamically
    generatePaginationDots();
    
    // Set initial state
    updateSliderState();
    
    // Add event listeners
    prevButton.addEventListener('click', () => navigateSlider('prev'));
    nextButton.addEventListener('click', () => navigateSlider('next'));
    
    // Add dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Each dot represents one page of 3 cards
            const targetIndex = index * cardsPerSlide;
            scrollToIndex(Math.min(targetIndex, maxIndex));
        });
    });
    
    // Handle window resize and set cards per slide based on screen width
    let previousWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        // Only recalculate if crossing a breakpoint (480px or 993px)
        const currentWidth = window.innerWidth;
        const crossedBreakpoint = 
            (previousWidth < 480 && currentWidth >= 480) ||
            (previousWidth >= 480 && currentWidth < 480) ||
            (previousWidth < 993 && currentWidth >= 993) ||
            (previousWidth >= 993 && currentWidth < 993);
            
        if (crossedBreakpoint) {
            // Set cards per slide based on screen size
            if (currentWidth < 480) {
                // Small mobile: 1 card
                cardsPerSlide = 1;
                slideMoveAmount = 1;
            } else if (currentWidth <= 992) {
                // Tablet: exactly 2 cards at 768px
                cardsPerSlide = 2;
                slideMoveAmount = 2;
            } else {
                // Desktop: 3 cards visible and always slide 3 at a time
                cardsPerSlide = 3;
                slideMoveAmount = 3;
            }
            
            const newMaxIndex = Math.max(0, cards.length - cardsPerSlide);
            
            // Adjust current index if needed
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
                scrollToIndex(currentIndex);
            } else {
                // Recalculate scroll position for current index with new cards per slide
                scrollToIndex(Math.floor(currentIndex / cardsPerSlide) * cardsPerSlide);
            }
            
            // Regenerate dots when screen size changes
            generatePaginationDots();
            updateSliderState();
            
            // Update previous width
            previousWidth = currentWidth;
        }
    });
    
        // Mobile swipe functionality is handled by CSS scroll-snap
    // The arrow buttons will handle navigation
    
    // Add scroll event listener to update dots when scrolling manually
    cardsWrapper.addEventListener('scroll', () => {
        // Debounce the scroll event to avoid excessive calculations
        clearTimeout(cardsWrapper.scrollTimer);
        cardsWrapper.scrollTimer = setTimeout(() => {
            // Calculate which card is most visible
            const scrollPos = cardsWrapper.scrollLeft;
            const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(cards[0]).marginRight);
            const newIndex = Math.round(scrollPos / cardWidth);
            
            // Only update if the index has changed
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
                currentIndex = newIndex;
                updateSliderState();
                console.log('Scroll detected, updated to index:', currentIndex);
            }
        }, 100);
    });
    
    // When the window fully loads, make sure pagination is correct
    window.addEventListener('load', () => {
        // Reset and regenerate dots based on current screen size
        generatePaginationDots();
        updateSliderState();
    });
    
    // Initial check for screen size on load
    if (window.innerWidth < 480) {
        // Small mobile: 1 card
        cardsPerSlide = 1;
    } else if (window.innerWidth <= 992) {
        // Tablet: exactly 2 cards at 768px
        cardsPerSlide = 2;
    } else {
        // Desktop: 3 cards
        cardsPerSlide = 3;
    }
    
    // Update max index based on cards per slide
    const initialMaxIndex = Math.max(0, cards.length - cardsPerSlide);
    // Make sure currentIndex is valid
    if (currentIndex > initialMaxIndex) {
        currentIndex = initialMaxIndex;
    }
            
    // Functions
    function navigateSlider(direction) {
        // On desktop, we always want to move exactly 3 cards at a time
        const moveAmount = window.innerWidth >= 993 ? 3 : cardsPerSlide;
        
        if (direction === 'prev') {
            // Move back by moveAmount or to the beginning
            currentIndex = Math.max(0, currentIndex - moveAmount);
        } else {
            // Move forward by moveAmount or to the end
            currentIndex = Math.min(maxIndex, currentIndex + moveAmount);
        }
        
        scrollToIndex(currentIndex);
        console.log(`Navigated ${direction}, moved ${moveAmount} cards to index ${currentIndex}`);
    }
    
    function scrollToIndex(index) {
        // Direct scroll to the card at the given index
        if (cards[index]) {
            cards[index].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
            });
            
            // Update current index and state
            currentIndex = index;
            updateSliderState();
            
            // Force recalculation to ensure cards are properly positioned
            setTimeout(() => {
                updateSliderState();
            }, 300);
        }
    }
    
    function updateSliderState() {
        // Update button states
        prevButton.classList.toggle('disabled', currentIndex === 0);
        nextButton.classList.toggle('disabled', currentIndex >= maxIndex);
        
        // Force recalculation of max index
        const currentMaxIndex = Math.max(0, cards.length - cardsPerSlide);
        
        // Get current active card to ensure proper dot highlighting
        // This helps with both button navigation and manual scrolling
        let effectiveIndex = currentIndex;
        
        // If we're manually scrolling, determine which card is most visible
        if (!isNaN(cardsWrapper.scrollLeft) && cardsWrapper.scrollLeft > 0) {
            const scrollPosition = cardsWrapper.scrollLeft;
            const cardWidth = cards[0].offsetWidth;
            const cardWithGap = cardWidth + parseInt(window.getComputedStyle(cardsWrapper).columnGap || 20);
            effectiveIndex = Math.round(scrollPosition / cardWithGap);
            // Update currentIndex to match what's visible
            if (effectiveIndex >= 0 && effectiveIndex < cards.length) {
                currentIndex = effectiveIndex;
            }
        }
        
        // Update active dot based on effective index and cards per slide
        const activeDotIndex = Math.floor(currentIndex / cardsPerSlide);
        updateActiveDot(activeDotIndex);
    }
    
    function updateActiveDot(activeIndex) {
        // Get current dots
        const currentDots = document.querySelectorAll('.slider-dots .dot');
        if (!currentDots.length) return;
        
        // Calculate which dot should be active based on current index and cards per slide
        const activeDotIndex = Math.floor(currentIndex / cardsPerSlide);
        
        console.log('Updating active dot:', activeDotIndex, 'currentIndex:', currentIndex, 'cardsPerSlide:', cardsPerSlide);
        
        // Remove active class from all dots first
        currentDots.forEach(dot => dot.classList.remove('active'));
        
        // Then add active class to the correct dot
        if (currentDots[activeDotIndex]) {
            currentDots[activeDotIndex].classList.add('active');
        }
        
        // Force layout recalculation to ensure dots are visible
        document.querySelector('.slider-dots').style.display = 'flex';
    }
    
    function generatePaginationDots() {
        const dotsContainer = document.querySelector('.slider-dots');
        if (!dotsContainer) return;
        
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Get current viewport width to determine cards per view
        let effectiveCardsPerSlide = cardsPerSlide;
        
        // Make sure we're using the correct cards per slide based on current width
        if (window.innerWidth < 480) {
            effectiveCardsPerSlide = 1; // Mobile: 1 card
        } else if (window.innerWidth < 993) {
            effectiveCardsPerSlide = 2; // Tablet: 2 cards
        } else {
            effectiveCardsPerSlide = 3; // Desktop: 3 cards
        }
        
        // Calculate number of pages/slides based on effective cards per slide
        const totalPages = Math.ceil(cards.length / effectiveCardsPerSlide);
        
        // Generate dots based on number of pages
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            
            // Calculate if this dot should be active
            const dotStartIndex = i * effectiveCardsPerSlide;
            const dotEndIndex = dotStartIndex + effectiveCardsPerSlide - 1;
            const isActive = currentIndex >= dotStartIndex && currentIndex <= dotEndIndex;
            
            if (isActive) dot.classList.add('active');
            
            // Set data attributes for debugging and accessibility
            dot.setAttribute('data-page', i + 1);
            dot.setAttribute('data-start-index', dotStartIndex);
            dot.setAttribute('data-end-index', dotEndIndex);
            dot.setAttribute('aria-label', `Page ${i + 1}`);
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                scrollToIndex(dotStartIndex);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Add a data attribute to the container to show current layout
        dotsContainer.setAttribute('data-cards-per-view', effectiveCardsPerSlide);
        
        console.log(`Pagination updated: ${totalPages} pages with ${effectiveCardsPerSlide} cards per view`);
    }
}

/**
 * Handle Demat account CTA button click
 */
function handleDematCTAClick() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) {
        console.log('CTA button not found, will retry...');
        setTimeout(handleDematCTAClick, 500);
        return;
    }
    
    ctaButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Opening Demat account application page');
        // In a real implementation, this would redirect to the Demat account page
        alert('Redirecting to Demat account application page');
        // window.location.href = '/open-demat-account';
    });
}

/**
 * Handle View All button for upcoming IPOs
 */
function handleViewAllIPOs() {
    const viewAllBtn = document.querySelector('.upcoming-header .view-all-btn');
    if (!viewAllBtn) {
        console.log('View All button not found, will retry...');
        setTimeout(handleViewAllIPOs, 500);
        return;
    }
    
    const upcomingSection = document.querySelector('.upcoming-ipos-section');
    const sliderContainer = upcomingSection.querySelector('.ipo-slider-container');
    const cardsWrapper = upcomingSection.querySelector('.ipo-cards-wrapper');
    const sliderDots = upcomingSection.querySelector('.slider-dots');
    
    viewAllBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Toggle between expanded and slider view
        const isExpanded = upcomingSection.classList.toggle('expanded-view');
        
        if (isExpanded) {
            // Change to expanded view
            viewAllBtn.textContent = 'Show Less';
            cardsWrapper.style.flexWrap = 'wrap';
            cardsWrapper.style.overflow = 'visible';
            cardsWrapper.style.justifyContent = 'center';
            sliderDots.style.display = 'none';
            
            // Hide slider arrows when expanded
            const arrows = sliderContainer.querySelectorAll('.slider-arrow');
            arrows.forEach(arrow => arrow.style.display = 'none');
        } else {
            // Revert to slider view
            viewAllBtn.textContent = 'View All';
            cardsWrapper.style.flexWrap = 'nowrap';
            cardsWrapper.style.overflow = 'auto';
            cardsWrapper.style.justifyContent = 'flex-start';
            sliderDots.style.display = 'flex';
            
            // Show slider arrows
            const arrows = sliderContainer.querySelectorAll('.slider-arrow');
            arrows.forEach(arrow => arrow.style.display = 'flex');
            
            // Reset scroll position
            cardsWrapper.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Handle View All button for ongoing IPOs
 */
function handleViewAllOngoingIPOs() {
    const viewAllBtn = document.querySelector('.ongoing-header .view-all-btn');
    if (!viewAllBtn) {
        console.log('Ongoing View All button not found, will retry...');
        setTimeout(handleViewAllOngoingIPOs, 500);
        return;
    }
    
    const ongoingSection = document.querySelector('.ongoing-ipos-section');
    const sliderContainer = ongoingSection.querySelector('.ipo-slider-container');
    const cardsWrapper = ongoingSection.querySelector('.ipo-cards-wrapper');
    const sliderDots = ongoingSection.querySelector('.slider-dots');
    
    viewAllBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Toggle between expanded and slider view
        const isExpanded = ongoingSection.classList.toggle('expanded-view');
        
        if (isExpanded) {
            // Change to expanded view
            viewAllBtn.textContent = 'Show Less';
            cardsWrapper.style.flexWrap = 'wrap';
            cardsWrapper.style.overflow = 'visible';
            cardsWrapper.style.justifyContent = 'center';
            sliderDots.style.display = 'none';
            
            // Hide slider arrows when expanded
            const arrows = sliderContainer.querySelectorAll('.slider-arrow');
            arrows.forEach(arrow => arrow.style.display = 'none');
        } else {
            // Revert to slider view
            viewAllBtn.textContent = 'View All';
            cardsWrapper.style.flexWrap = 'nowrap';
            cardsWrapper.style.overflow = 'auto';
            cardsWrapper.style.justifyContent = 'flex-start';
            sliderDots.style.display = 'flex';
            
            // Show slider arrows
            const arrows = sliderContainer.querySelectorAll('.slider-arrow');
            arrows.forEach(arrow => arrow.style.display = 'flex');
            
            // Reset scroll position
            cardsWrapper.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Initialize slider functionality for ongoing IPOs
 */
function initializeOngoingIPOSlider() {
    console.log('Initializing ongoing IPO slider...');
    const sliderContainer = document.querySelector('.ongoing-ipos-section .ipo-slider-container');
    const cardsWrapper = document.querySelector('.ongoing-ipos-section .ipo-cards-wrapper');
    const prevButton = document.querySelector('.ongoing-ipos-section .prev-arrow');
    const nextButton = document.querySelector('.ongoing-ipos-section .next-arrow');
    const dotsContainer = document.querySelector('.ongoing-ipos-section .slider-dots');
    
    if (!sliderContainer || !cardsWrapper || !prevButton || !nextButton || !dotsContainer) {
        console.log('Ongoing IPO slider elements not found, will retry...');
        setTimeout(initializeOngoingIPOSlider, 500);
        return;
    }
    
    // Get all the cards
    const cards = Array.from(cardsWrapper.querySelectorAll('.ipo-card'));
    let currentIndex = 0;
    let isTouchStart = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Determine cards per slide based on screen width
    let cardsPerSlide;
    let cardWidth;
    let cardGap = 25; // Gap between cards in pixels (from CSS)
    
    // Function to update slider state based on current viewport size
    function updateSliderState() {
        // Get current width of the cards wrapper
        const containerWidth = cardsWrapper.offsetWidth;
        
        // Determine cards per slide based on container width
        if (containerWidth >= 1200) {
            cardsPerSlide = 3; // Desktop: 3 cards per slide
        } else if (containerWidth >= 768) {
            cardsPerSlide = 2; // Tablet: 2 cards per slide
        } else {
            cardsPerSlide = 1; // Mobile: 1 card per slide
        }
        
        // Measure card width based on first card if available
        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth;
        }
        
        // Re-generate pagination dots to match current layout
        generatePaginationDots();
        
        console.log(`Ongoing Slider state updated: ${cardsPerSlide} cards per slide`);
    }
    
    // Function to navigate the slider
    function navigateSlider(direction) {
        const totalCards = cards.length;
        
        if (direction === 'next') {
            currentIndex = Math.min(currentIndex + cardsPerSlide, totalCards - cardsPerSlide);
        } else {
            currentIndex = Math.max(currentIndex - cardsPerSlide, 0);
        }
        
        // Scroll to the current index
        scrollToIndex(currentIndex);
    }
    
    // Function to scroll to a specific index
    function scrollToIndex(index) {
        currentIndex = index;
        
        // Calculate scroll position
        const scrollPosition = index * (cardWidth + cardGap);
        
        // Scroll the cards wrapper
        cardsWrapper.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        updateActiveDot(currentIndex);
    }
    
    // Function to update the active pagination dot
    function updateActiveDot(activeIndex) {
        const dots = dotsContainer.querySelectorAll('.dot');
        
        dots.forEach((dot, i) => {
            const dotStartIndex = parseInt(dot.getAttribute('data-start-index'));
            const dotEndIndex = parseInt(dot.getAttribute('data-end-index'));
            
            if (activeIndex >= dotStartIndex && activeIndex <= dotEndIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Function to generate pagination dots
    function generatePaginationDots() {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const totalCards = cards.length;
        
        // If we have no cards or only one card per slide, don't show pagination
        if (totalCards <= cardsPerSlide) {
            return;
        }
        
        // Consider partial pages. If there are 5 cards and we show 3 per slide,
        // we need 2 pages, not 1.67 rounded to 2.
        const effectiveCardsPerSlide = cardsPerSlide;
        const totalPages = Math.ceil((totalCards - effectiveCardsPerSlide + 1) / effectiveCardsPerSlide);
        
        // Create dots
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            
            // Calculate if this dot should be active
            const dotStartIndex = i * effectiveCardsPerSlide;
            const dotEndIndex = dotStartIndex + effectiveCardsPerSlide - 1;
            const isActive = currentIndex >= dotStartIndex && currentIndex <= dotEndIndex;
            
            if (isActive) dot.classList.add('active');
            
            // Set data attributes for debugging and accessibility
            dot.setAttribute('data-page', i + 1);
            dot.setAttribute('data-start-index', dotStartIndex);
            dot.setAttribute('data-end-index', dotEndIndex);
            dot.setAttribute('aria-label', `Page ${i + 1}`);
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                scrollToIndex(dotStartIndex);
            });
            
            dotsContainer.appendChild(dot);
        }
        
        // Add a data attribute to the container to show current layout
        dotsContainer.setAttribute('data-cards-per-view', effectiveCardsPerSlide);
        
        console.log(`Ongoing pagination updated: ${totalPages} pages with ${effectiveCardsPerSlide} cards per view`);
    }
    
    // Set up event listeners
    prevButton.addEventListener('click', () => navigateSlider('prev'));
    nextButton.addEventListener('click', () => navigateSlider('next'));
    
    // Touch event listeners for swipe functionality
    cardsWrapper.addEventListener('touchstart', (e) => {
        isTouchStart = true;
        touchStartX = e.changedTouches[0].screenX;
    });
    
    cardsWrapper.addEventListener('touchend', (e) => {
        if (!isTouchStart) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const touchDiff = touchStartX - touchEndX;
        
        // Minimum swipe distance: 50px
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0) {
                navigateSlider('next');
            } else {
                navigateSlider('prev');
            }
        }
        
        isTouchStart = false;
    });
    
    // View All button is now handled by the separate handleViewAllOngoingIPOs function
    
    // Initialize slider on load
    updateSliderState();
    
    // Update slider on window resize
    window.addEventListener('resize', updateSliderState);
    
    console.log('Ongoing IPO slider initialized successfully');
}

/**
 * Initialize slider functionality for newly listed IPOs
 */
function initializeNewlyListedSlider() {
    console.log('Initializing newly listed IPO slider...');
    const sliderContainer = document.querySelector('.newly-listed-section .ipo-slider-container');
    const cardsWrapper = document.querySelector('.newly-listed-section .ipo-cards-wrapper');
    const prevButton = document.querySelector('.newly-listed-section .prev-arrow');
    const nextButton = document.querySelector('.newly-listed-section .next-arrow');
    const dotsContainer = document.querySelector('.newly-listed-section .slider-dots');
    
    if (!sliderContainer || !cardsWrapper || !prevButton || !nextButton || !dotsContainer) {
        console.log('Newly listed IPO slider elements not found, will retry...');
        setTimeout(initializeNewlyListedSlider, 500);
        return;
    }
    
    // Get all the cards
    const cards = Array.from(cardsWrapper.querySelectorAll('.ipo-card'));
    let currentIndex = 0;
    let isTouchStart = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Determine cards per slide based on screen width
    let cardsPerSlide;
    let cardWidth;
    let cardGap = 25; // Gap between cards in pixels (from CSS)
    
    // Function to update slider state based on current viewport size
    function updateSliderState() {
        // Get current width of the cards wrapper
        const containerWidth = cardsWrapper.offsetWidth;
        
        // Determine cards per slide based on container width
        if (containerWidth >= 1200) {
            cardsPerSlide = 3; // Desktop: 3 cards per slide
        } else if (containerWidth >= 768) {
            cardsPerSlide = 2; // Tablet: 2 cards per slide
        } else {
            cardsPerSlide = 1; // Mobile: 1 card per slide
        }
        
        // Measure card width based on first card if available
        if (cards.length > 0) {
            cardWidth = cards[0].offsetWidth;
        }
        
        // Re-generate pagination dots to match current layout
        generatePaginationDots();
        
        console.log(`Newly Listed Slider state updated: ${cardsPerSlide} cards per slide`);
    }
    
    // Function to navigate the slider
    function navigateSlider(direction) {
        const totalCards = cards.length;
        
        if (direction === 'next') {
            currentIndex = Math.min(currentIndex + cardsPerSlide, totalCards - cardsPerSlide);
        } else {
            currentIndex = Math.max(currentIndex - cardsPerSlide, 0);
        }
        
        // Scroll to the current index
        scrollToIndex(currentIndex);
    }
    
    // Function to scroll to a specific index
    function scrollToIndex(index) {
        currentIndex = index;
        
        // Calculate scroll position
        const scrollPosition = index * (cardWidth + cardGap);
        
        // Scroll the cards wrapper
        cardsWrapper.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        updateActiveDot(currentIndex);
    }
    
    // Function to update the active pagination dot
    function updateActiveDot(activeIndex) {
        const dots = dotsContainer.querySelectorAll('.dot');
        
        dots.forEach((dot, i) => {
            const dotStartIndex = parseInt(dot.getAttribute('data-start-index'));
            const dotEndIndex = parseInt(dot.getAttribute('data-end-index'));
            
            if (activeIndex >= dotStartIndex && activeIndex <= dotEndIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Function to generate pagination dots
    function generatePaginationDots() {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        const totalCards = cards.length;
        
        // If we have no cards or only one card per slide, don't show pagination
        if (totalCards <= cardsPerSlide) {
            return;
        }
        
        // Consider partial pages
        const effectiveCardsPerSlide = cardsPerSlide;
        const totalPages = Math.ceil((totalCards - effectiveCardsPerSlide + 1) / effectiveCardsPerSlide);
        
        // Create dots
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            
            // Calculate if this dot should be active
            const dotStartIndex = i * effectiveCardsPerSlide;
            const dotEndIndex = dotStartIndex + effectiveCardsPerSlide - 1;
            const isActive = currentIndex >= dotStartIndex && currentIndex <= dotEndIndex;
            
            if (isActive) dot.classList.add('active');
            
            // Set data attributes for debugging and accessibility
            dot.setAttribute('data-page', i + 1);
            dot.setAttribute('data-start-index', dotStartIndex);
            dot.setAttribute('data-end-index', dotEndIndex);
            dot.setAttribute('aria-label', `Page ${i + 1}`);
            
            // Add click event to each dot
            dot.addEventListener('click', () => {
                scrollToIndex(dotStartIndex);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    // Set up event listeners
    prevButton.addEventListener('click', () => navigateSlider('prev'));
    nextButton.addEventListener('click', () => navigateSlider('next'));
    
    // Touch event listeners for swipe functionality
    cardsWrapper.addEventListener('touchstart', (e) => {
        isTouchStart = true;
        touchStartX = e.changedTouches[0].screenX;
    });
    
    cardsWrapper.addEventListener('touchend', (e) => {
        if (!isTouchStart) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const touchDiff = touchStartX - touchEndX;
        
        // Minimum swipe distance: 50px
        if (Math.abs(touchDiff) > 50) {
            if (touchDiff > 0) {
                navigateSlider('next');
            } else {
                navigateSlider('prev');
            }
        }
        
        isTouchStart = false;
    });
    
    // Initialize slider on load
    updateSliderState();
    
    // Update slider on window resize
    window.addEventListener('resize', updateSliderState);
    
    console.log('Newly listed IPO slider initialized successfully');
}

/**
 * Handle View All button for newly listed IPOs
 */
function handleViewAllNewlyListedIPOs() {
    const viewAllBtn = document.querySelector('.newly-listed-header .view-all-btn');
    if (!viewAllBtn) {
        console.log('Newly listed View All button not found, will retry...');
        setTimeout(handleViewAllNewlyListedIPOs, 500);
        return;
    }
    
    const newlyListedSection = document.querySelector('.newly-listed-section');
    const sliderContainer = newlyListedSection.querySelector('.ipo-slider-container');
    const cardsWrapper = newlyListedSection.querySelector('.ipo-cards-wrapper');
    const sliderDots = newlyListedSection.querySelector('.slider-dots');
    
    viewAllBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Toggle between expanded and slider view
        const isExpanded = newlyListedSection.classList.toggle('expanded-view');
        
        if (isExpanded) {
            // Change to expanded view
            viewAllBtn.textContent = 'Show Less';
            cardsWrapper.style.flexWrap = 'wrap';
            cardsWrapper.style.overflow = 'visible';
            cardsWrapper.style.justifyContent = 'center';
            sliderDots.style.display = 'none';
            
            // Hide slider arrows when expanded
            const arrows = sliderContainer.querySelectorAll('.slider-arrow');
            arrows.forEach(arrow => arrow.style.display = 'none');
        } else {
            // Revert to slider view
            viewAllBtn.textContent = 'View All';
            cardsWrapper.style.flexWrap = 'nowrap';
            cardsWrapper.style.overflow = 'auto';
            cardsWrapper.style.justifyContent = 'flex-start';
            sliderDots.style.display = 'flex';
            
            // Show slider arrows
            const arrows = sliderContainer.querySelectorAll('.slider-arrow');
            arrows.forEach(arrow => arrow.style.display = 'flex');
            
            // Reset scroll position
            cardsWrapper.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });
}
