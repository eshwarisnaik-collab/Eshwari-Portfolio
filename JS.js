document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DYNAMIC TIME-BASED GREETING
       ========================================================================== */
    const greetingElement = document.getElementById('dynamic-greeting');
    if (greetingElement) {
        const currentHour = new Date().getHours();
        let greetingText = "👋 Hello Everyone";
        
        if (currentHour < 12) {
            greetingText = "☀️ Good Morning! Welcome to my space";
        } else if (currentHour < 18) {
            greetingText = "🌤️ Good Afternoon! Welcome to my space";
        } else {
            greetingText = "👋 Welcome to my space";
        }
        
        greetingElement.textContent = greetingText;
    }

    /* ==========================================================================
       2. ACTIVE NAV LINK ON SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-0px',
        threshold: 0.4 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            sectionObserver.observe(section);
        }
    });

    /* ==========================================================================
       3. INTERACTIVE CONTACT FORM SUBMISSION (WITH EMAIL AUTOMATION)
       ========================================================================== */
    const contactForm = document.getElementById('portfolio-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page refresh
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // UI feedback while sending
            submitBtn.textContent = "Sending Message...";
            submitBtn.style.background = "#00f2fe";
            submitBtn.style.color = "#000";
            submitBtn.disabled = true;

            // Gather form data
            const formData = new FormData(contactForm);

            // Send data via AJAX to Formspree
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert("Thank you, Eshwari! The message has been sent directly to your email.");
                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            })
            .catch(error => {
                alert("Oops! Network error. Please check your connection and try again.");
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.style.background = "#fff";
                submitBtn.style.color = "#000";
                submitBtn.disabled = false;
            });
        });
    }

}); // This closing bracket and parenthesis on line 103 was what was missing!