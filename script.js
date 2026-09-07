document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // Open Lightbox when clicking any image in hero or gallery
  const allImages = document.querySelectorAll(".photo-card img, .gallery-item img");

  allImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  // Close Lightbox when clicking X
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  // Close Lightbox when clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) {
      lightbox.style.display = "none";
    }
  });
});