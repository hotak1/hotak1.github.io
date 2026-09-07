document.addEventListener("DOMContentLoaded", () => {
  // Category Filter Functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const masonryItems = document.querySelectorAll(".masonry-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      masonryItems.forEach((item) => {
        const itemCat = item.getAttribute("data-category");
        if (category === "all" || category === itemCat) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Lightbox Functionality
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxClient = document.getElementById("lightbox-client");
  const lightboxExif = document.getElementById("lightbox-exif");
  const closeBtn = document.querySelector(".lightbox-close");

  const openLightbox = (src, title, client, exif) => {
    lightboxImg.src = src;
    lightboxTitle.textContent = title || "Untitled Project";
    lightboxClient.textContent = client ? `CLIENT // ${client.toUpperCase()}` : "";
    lightboxExif.textContent = exif ? `EXIF // ${exif}` : "";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Bind Lightbox to Masonry Items and Hero Frame
  const clickableItems = document.querySelectorAll(".masonry-item, .featured-frame");
  clickableItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.getAttribute("data-title");
      const client = item.getAttribute("data-client");
      const exif = item.getAttribute("data-exif");
      openLightbox(img.src, title, client, exif);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Form Handling
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you. Your inquiry has been submitted successfully.");
    form.reset();
  });
});