document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const marqueeCards = document.querySelectorAll(".photo-card");
  
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxExif = document.getElementById("lightbox-exif");
  const closeBtn = document.querySelector(".lightbox-close");

  // ==========================================
  // 1. CATEGORY FILTERING (CMS EFFECT)
  // ==========================================
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  // ==========================================
  // 2. LIGHTBOX & EXIF METADATA DISPLAY
  // ==========================================
  const openLightbox = (src, title, exif) => {
    lightboxImg.src = src;
    lightboxTitle.textContent = title || "Untitled Photograph";
    lightboxExif.textContent = exif || "35mm Format Capture";
    
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Block body scroll
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Restore scroll
    
    setTimeout(() => {
      if (!lightbox.classList.contains("active")) {
        lightboxImg.src = "";
      }
    }, 300);
  };

  // Attach Lightbox triggers to Gallery Grid Items
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.getAttribute("data-title");
      const exif = item.getAttribute("data-exif");
      openLightbox(img.src, title, exif);
    });
  });

  // Attach Lightbox triggers to Hero Marquee Cards
  marqueeCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.getAttribute("data-title");
      const exif = card.getAttribute("data-exif");
      openLightbox(img.src, title, exif);
    });
  });

  // Close handlers
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-wrapper")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});