document.addEventListener('DOMContentLoaded', function() {
    // Standard form submission handler
    const contactForm = document.querySelector('.standard-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Grabbing standard form values
            const name = document.getElementById('name').value;
            
            alert(`Thank you, ${name}. Your message has been sent successfully.`);
            contactForm.reset();
        });
    }
});