document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxExif = document.getElementById("lightbox-exif");
  const closeBtn = document.querySelector(".lightbox-close-btn");

  const openLightbox = (src, title, exif) => {
    lightboxImg.src = src;
    lightboxTitle.textContent = title || "Untitled";
    lightboxExif.textContent = exif || "";
    
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    
    setTimeout(() => {
      if (!lightbox.classList.contains("active")) {
        lightboxImg.src = "";
      }
    }, 400);
  };

  // Bind click listeners to all hero filmstrip frames and archive cards
  const interactiveElements = document.querySelectorAll(".film-frame, .gallery-card");
  
  interactiveElements.forEach((el) => {
    el.addEventListener("click", () => {
      const img = el.querySelector("img");
      const title = el.getAttribute("data-title");
      const exif = el.getAttribute("data-exif");
      openLightbox(img.src, title, exif);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-container")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});