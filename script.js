document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("gallery-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Only run portfolio fetch if the gallery grid exists on the current page
  if (gallery) {
    loadPortfolioData();
  }

  async function loadPortfolioData() {
    try {
      const response = await fetch("data.json");
      const data = await response.json();
      renderGallery(data);
      setupFilters(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      gallery.innerHTML = "<p>Error loading portfolio assets. Ensure you are running a local server.</p>";
    }
  }

  function renderGallery(items) {
    gallery.innerHTML = items.map(item => `
      <div class="photo-card">
        <div class="photo-wrapper">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="photo-details">
          <h3>${item.title}</h3>
          <p>${item.camera} — ${item.lens}</p>
          <p style="font-size:0.7rem; opacity:0.6; margin-top:4px;">${item.specs}</p>
        </div>
      </div>
    `).join("");
  }

  function setupFilters(data) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        // Handle Active Button State
        filterBtns.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        // Filter Array
        const category = e.target.getAttribute("data-filter");
        if (category === "all") {
          renderGallery(data);
        } else {
          const filteredData = data.filter(item => item.category === category);
          renderGallery(filteredData);
        }
      });
    });
  }
});