// Custom PC Builder Website JavaScript

//Handle include nav component
document.addEventListener('DOMContentLoaded', function() {
    fetch('./components/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading navigation:', error));

    fetch('./components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer',error));
});

// DOM elements
const homepageContent = document.getElementById('homepageContent');
const entryGamingPage = document.getElementById('entryGamingPage');
const performanceBeastPage = document.getElementById('performanceBeastPage');
const ultimateWorkstationPage = document.getElementById('ultimateWorkstationPage');
const contactForm = document.getElementById('contactForm');

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const sectionTop = section.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
    });
}

// Hamburger menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Toggle menu when hamburger is clicked
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Close menu when clicking nav links and handle navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close menu
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Navigate to section
            const targetId = this.getAttribute('href').substring(1);
            setTimeout(() => {
                scrollToSection(targetId);
            }, 300);
        });
    });
});

// Close menu with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Scroll to contact function
function scrollToContact() {
    // If not on homepage, go to homepage first
    if (currentPage !== 'homepage') {
        showHomepage();
        setTimeout(() => {
            scrollToSection('contact');
        }, 500);
    } else {
        scrollToSection('contact');
    }
}

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const budget = formData.get('budget');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    alert(`Thank you ${name}! Your message has been received. We'll get back to you within 24 hours.`);
    
    // Reset form
    this.reset();
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations when DOM loads
function initializeAnimations() {
    const animateElements = document.querySelectorAll('.service-card, .build-card, .testimonial-card, .why-choose-card, .build-config-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Re-initialize animations when switching pages
function reinitializeAnimations() {
    setTimeout(() => {
        initializeAnimations();
    }, 100);
}

//handle page navigation
function navigateToPage(pageUrl){
    window.location.href =pageUrl;
}