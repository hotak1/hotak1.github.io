document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 2. Fetch and Render Dynamic Data from data.json
  async function loadDynamicContent() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('Failed to load data configuration.');
      const data = await response.json();

      // Render Portfolio Grid
      const portfolioGrid = document.getElementById('portfolio-grid');
      if (portfolioGrid && data.portfolio) {
        portfolioGrid.innerHTML = data.portfolio.map(item => `
          <article class="card">
            <div class="card-image">
              <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
              <span class="category">${item.category}</span>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          </article>
        `).join('');
      }

      // Render Gear List
      const gearList = document.getElementById('gear-list');
      if (gearList && data.gear) {
        gearList.innerHTML = data.gear.map(gearItem => `
          <li>${gearItem}</li>
        `).join('');
      }

    } catch (error) {
      console.error('Error loading dynamic content:', error);
    }
  }

  loadDynamicContent();

  // 3. Form Submission Handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      alert(`Thank you, ${name}. Your message has been submitted.`);
      contactForm.reset();
    });
  }
});