document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // Get all images in both the hero marquee and portfolio gallery
  const galleryImages = document.querySelectorAll(".photo-card img, .gallery-item img");

  // Function to open Lightbox
  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Full size photograph";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    // Prevent background scrolling while viewing lightboxed photo
    document.body.style.overflow = "hidden";
  };

  // Function to close Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // Clear image source after fade animation finishes
    setTimeout(() => {
      if (!lightbox.classList.contains("active")) {
        lightboxImg.src = "";
      }
    }, 300);
  };

  // Attach click listener to each photo
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  // Close via the close button
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // Close when tapping anywhere on the dark backdrop outside the photo
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      closeLightbox();
    }
  });

  // Close using the ESC key on PC keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
});