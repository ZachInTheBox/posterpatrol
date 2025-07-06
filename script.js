// Poster Patrol Website JavaScript

// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToPricing() {
    scrollToSection('pricing');
}

// FAQ Toggle Functionality
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't already active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Pricing Calculations
function updateOneTimePrice() {
    const frameKit = document.getElementById('frameKit1');
    const total = document.getElementById('oneTimeTotal');
    const frameColors = document.getElementById('frameColors1');
    
    if (frameKit && total) {
        const basePrice = 39;
        const framePrice = frameKit.checked ? 34.99 : 0;
        const totalPrice = basePrice + framePrice;
        
        total.textContent = totalPrice.toFixed(2);
        
        // Show/hide frame color options
        if (frameColors) {
            frameColors.style.display = frameKit.checked ? 'block' : 'none';
        }
    }
}

function updateSubscriptionPrice() {
    const frameKit = document.getElementById('frameKit2');
    const total = document.getElementById('subscriptionTotal');
    const frameColors = document.getElementById('frameColors2');
    
    if (frameKit && total) {
        const basePrice = 99;
        const framePrice = frameKit.checked ? 34.99 : 0;
        const totalPrice = basePrice + framePrice;
        
        total.textContent = totalPrice.toFixed(2);
        
        // Show/hide frame color options
        if (frameColors) {
            frameColors.style.display = frameKit.checked ? 'block' : 'none';
        }
    }
}

// Checkout Process
function startCheckout(plan) {
    // Get selected options
    let includeFrameKit = false;
    let frameColor = 'black';
    let totalAmount = 0;
    
    if (plan === 'one-time') {
        const frameKit = document.getElementById('frameKit1');
        includeFrameKit = frameKit ? frameKit.checked : false;
        totalAmount = 39 + (includeFrameKit ? 34.99 : 0);
        
        if (includeFrameKit) {
            const selectedColor = document.querySelector('input[name="frameColor1"]:checked');
            frameColor = selectedColor ? selectedColor.value : 'black';
        }
    } else if (plan === 'subscription') {
        const frameKit = document.getElementById('frameKit2');
        includeFrameKit = frameKit ? frameKit.checked : false;
        totalAmount = 99 + (includeFrameKit ? 34.99 : 0);
        
        if (includeFrameKit) {
            const selectedColor = document.querySelector('input[name="frameColor2"]:checked');
            frameColor = selectedColor ? selectedColor.value : 'black';
        }
    }
    
    // Create order summary
    const orderDetails = {
        plan: plan,
        amount: totalAmount,
        includeFrameKit: includeFrameKit,
        frameColor: frameColor
    };
    
    // For demo purposes, show an alert with order details
    // In a real implementation, this would redirect to a checkout page
    showCheckoutModal(orderDetails);
}

// Show Checkout Modal (Demo)
function showCheckoutModal(orderDetails) {
    const modalHTML = `
        <div id="checkout-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Order Summary</h3>
                    <button onclick="closeCheckoutModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p><strong>Plan:</strong> ${orderDetails.plan === 'one-time' ? 'One-time Purchase' : 'Annual Subscription'}</p>
                    <p><strong>Base Price:</strong> $${orderDetails.plan === 'one-time' ? '39.00' : '99.00'}</p>
                    ${orderDetails.includeFrameKit ? `
                        <p><strong>Frame Kit:</strong> +$34.99 (${orderDetails.frameColor})</p>
                    ` : ''}
                    <hr>
                    <p><strong>Total:</strong> $${orderDetails.amount.toFixed(2)}</p>
                    
                    <div class="property-requirement">
                        <h4>Property Address Required</h4>
                        <p>To ensure we send the correct compliance posters, please provide your property address:</p>
                        
                        <form id="checkout-form">
                            <div class="form-group">
                                <label>Property Address *</label>
                                <input type="text" placeholder="123 Main St" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>City *</label>
                                    <input type="text" placeholder="Los Angeles" required>
                                </div>
                                <div class="form-group">
                                    <label>State *</label>
                                    <input type="text" value="CA" required>
                                </div>
                                <div class="form-group">
                                    <label>ZIP Code *</label>
                                    <input type="text" placeholder="90210" required>
                                </div>
                            </div>
                            
                            <h4>Contact Information</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>First Name *</label>
                                    <input type="text" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name *</label>
                                    <input type="text" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" required>
                            </div>
                            
                            <div class="checkout-actions">
                                <button type="button" onclick="closeCheckoutModal()" class="btn btn-secondary">Cancel</button>
                                <button type="submit" class="btn btn-primary">Proceed to Payment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: 1rem;
            max-width: 600px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .property-requirement {
            margin-top: 1.5rem;
            padding: 1.5rem;
            background-color: var(--background-light);
            border-radius: 0.5rem;
        }
        
        .property-requirement h4 {
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 1rem;
        }
        
        .checkout-actions {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
            justify-content: flex-end;
        }
        
        @media (max-width: 600px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .checkout-actions {
                flex-direction: column;
            }
        }
        </style>
    `;
    
    // Add modal to page
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Handle form submission
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCheckoutSubmit(orderDetails);
        });
    }
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.remove();
    }
    
    // Re-enable body scrolling
    document.body.style.overflow = '';
}

function handleCheckoutSubmit(orderDetails) {
    // In a real implementation, this would:
    // 1. Validate the form data
    // 2. Create a payment intent with Stripe
    // 3. Redirect to Stripe Checkout or use Stripe Elements
    // 4. Handle the payment completion
    
    // For demo purposes, show success message
    alert(`Thank you! Your ${orderDetails.plan === 'one-time' ? 'order' : 'subscription'} for $${orderDetails.amount.toFixed(2)} has been processed. You will receive an email confirmation shortly with delivery details.`);
    
    closeCheckoutModal();
}

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in real implementation, this would send to server)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage('Thank you for your message! We\'ll respond within 24 hours.', 'success');
    }, 2000);
}

// Message Display Function
function showMessage(text, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const message = document.createElement('div');
    message.className = `message ${type === 'error' ? 'error-message' : 'success-message'}`;
    message.textContent = text;
    
    // Add to contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.appendChild(message);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.1s';
                entry.target.style.animationFillMode = 'both';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.pricing-card, .faq-item, .contact-form');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Back to Top Button (optional enhancement)
function addBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', addBackToTopButton);

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateZipCode(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
}

// Initialize all functionality when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Poster Patrol website loaded successfully!');
    
    // Add event listeners for frame kit checkboxes
    const frameKit1 = document.getElementById('frameKit1');
    const frameKit2 = document.getElementById('frameKit2');
    
    if (frameKit1) {
        frameKit1.addEventListener('change', updateOneTimePrice);
    }
    
    if (frameKit2) {
        frameKit2.addEventListener('change', updateSubscriptionPrice);
    }
});

// Export functions for external use
window.PosterPatrol = {
    scrollToSection,
    scrollToPricing,
    toggleFaq,
    updateOneTimePrice,
    updateSubscriptionPrice,
    startCheckout,
    submitContactForm
};