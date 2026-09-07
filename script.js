document.addEventListener("DOMContentLoaded", () => {
  // 1. Live Broadcast Timecode Generator (HH:MM:SS:FF)
  const timecodeEl = document.getElementById("timecode");
  let frames = 0;
  let seconds = 14;
  let minutes = 22;
  let hours = 0;

  setInterval(() => {
    frames++;
    if (frames >= 24) {
      frames = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }

    const pad = (num) => String(num).padStart(2, "0");
    timecodeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
  }, 1000 / 24); // 24 FPS calculation

  // 2. Category Filter Functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const shotCards = document.querySelectorAll(".shot-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      shotCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || category === cardCat) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 3. Viewfinder Lightbox Modal
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCam = document.getElementById("lightbox-cam");
  const lightboxLens = document.getElementById("lightbox-lens");
  const lightboxExif = document.getElementById("lightbox-exif");
  const closeBtn = document.querySelector(".lightbox-close");

  const openLightbox = (src, title, camera, lens, exif) => {
    lightboxImg.src = src;
    lightboxTitle.textContent = title || "SHOT SPECIFICATION";
    lightboxCam.textContent = `CAMERA // ${camera || "ARRI ALEXA MINI LF"}`;
    lightboxLens.textContent = `OPTICS // ${lens || "35mm PRIMES"}`;
    lightboxExif.textContent = `EXIF // ${exif || "T1.5 · 1/1000s · ISO 800"}`;

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  shotCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      const title = card.getAttribute("data-title");
      const camera = card.getAttribute("data-camera");
      const lens = card.getAttribute("data-lens");
      const exif = card.getAttribute("data-exif");
      openLightbox(img.src, title, camera, lens, exif);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // 4. Form Transmit Confirmation
  const form = document.getElementById("bookingForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("PRODUCTION INQUIRY TRANSMITTED SUCCESSFULY. CONFIRMATION SENT TO EMAIL.");
    form.reset();
  });
});