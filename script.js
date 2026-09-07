document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
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

  // Fetch and Render Dynamic Content
  async function loadDynamicContent() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('Failed to load data configuration.');
      const data = await response.json();

      // 1. Render Availability Badge
      if (data.availability) {
        const statusText = document.querySelector('.status-text');
        const statusBadge = document.getElementById('status-badge');
        if (statusText) statusText.textContent = data.availability.status;
        if (statusBadge && !data.availability.active) {
          statusBadge.classList.add('unavailable');
        }
      }

      // 2. Render Portfolio Cards & Filters
      const portfolioGrid = document.getElementById('portfolio-grid');
      const filterContainer = document.getElementById('filter-container');

      if (portfolioGrid && data.portfolio) {
        // Build portfolio items
        const renderCards = (items) => {
          portfolioGrid.innerHTML = items.map(item => `
            <article class="card" data-category="${item.filter}">
              <div class="card-image" data-img="${item.image}">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="zoom-overlay"><span>🔍 Click to Expand</span></div>
              </div>
              <div class="card-content">
                <span class="category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
            </article>
          `).join('');

          // Attach lightbox triggers to new images
          attachLightboxEvents();
        };

        renderCards(data.portfolio);

        // Build dynamic category filters
        if (filterContainer) {
          const categories = ['all', ...new Set(data.portfolio.map(item => item.filter))];
          
          filterContainer.innerHTML = categories.map(cat => `
            <button class="filter-btn ${cat === 'all' ? 'active' : ''}" data-filter="${cat}">
              ${cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          `).join('');

          // Filter button event listeners
          filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              filterContainer.querySelector('.active').classList.remove('active');
              e.target.classList.add('active');

              const selectedFilter = e.target.getAttribute('data-filter');
              const cards = portfolioGrid.querySelectorAll('.card');

              cards.forEach(card => {
                if (selectedFilter === 'all' || card.getAttribute('data-category') === selectedFilter) {
                  card.style.display = 'flex';
                } else {
                  card.style.display = 'none';
                }
              });
            });
          });
        }
      }

      // 3. Render Gear List
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

  // 4. Image Lightbox Modal Logic
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  function attachLightboxEvents() {
    document.querySelectorAll('.card-image').forEach(container => {
      container.addEventListener('click', () => {
        const imgSrc = container.getAttribute('data-img');
        if (modal && modalImg) {
          modalImg.src = imgSrc;
          modal.classList.add('open');
        }
      });
    });
  }

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // 5. Form Submission Handler with Feedback State
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
});