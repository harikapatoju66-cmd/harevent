/* ---------- 1. MOBILE MENU ---------- */
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

/* ---------- 2. SAMPLE DATA ---------- */
const vendors = [
  { name: "Royal Palace Banquets", category: "Venues", city: "Hyderabad", events: ["Weddings", "Engagements", "Corporate Events"], image: "images/venue.jpg", rating: 4.8 },
  { name: "Grand Orchid Hall", category: "Venues", city: "Mumbai", events: ["Weddings", "Birthday Parties", "Other Events"], image: "images/venue.jpg", rating: 4.6 },
  { name: "Heritage Lawns", category: "Venues", city: "Jaipur", events: ["Weddings", "Engagements"], image: "images/venue.jpg", rating: 4.7 },
  { name: "Candid Moments Studio", category: "Photography", city: "Hyderabad", events: ["Weddings", "Engagements", "Baby Showers"], image: "images/photography.jpg", rating: 4.9 },
  { name: "Frame & Focus", category: "Photography", city: "Delhi", events: ["Weddings", "Corporate Events", "Birthday Parties"], image: "images/photography.jpg", rating: 4.5 },
  { name: "Lens Stories", category: "Photography", city: "Vijayawada", events: ["Weddings", "Baby Showers", "Other Events"], image: "images/photography.jpg", rating: 4.4 },
  { name: "Spice Route Caterers", category: "Catering", city: "Bengaluru", events: ["Weddings", "Corporate Events", "Birthday Parties"], image: "images/catering.jpg", rating: 4.7 },
  { name: "Annapurna Feasts", category: "Catering", city: "Vijayawada", events: ["Weddings", "Engagements", "Baby Showers"], image: "images/catering.jpg", rating: 4.6 },
  { name: "Royal Rasoi", category: "Catering", city: "Delhi", events: ["Weddings", "Other Events"], image: "images/catering.jpg", rating: 4.3 },
  { name: "Blooming Dreams Decor", category: "Decoration", city: "Mumbai", events: ["Weddings", "Engagements", "Birthday Parties"], image: "images/decoration.jpg", rating: 4.8 },
  { name: "Balloon Bliss", category: "Decoration", city: "Hyderabad", events: ["Birthday Parties", "Baby Showers"], image: "images/decoration.jpg", rating: 4.5 },
  { name: "Mandap Magic", category: "Decoration", city: "Jaipur", events: ["Weddings", "Engagements"], image: "images/decoration.jpg", rating: 4.7 },
  { name: "Glam by Anjali", category: "Makeup Artists", city: "Bengaluru", events: ["Weddings", "Engagements", "Other Events"], image: "images/makeup.jpg", rating: 4.9 },
  { name: "Bridal Touch Studio", category: "Makeup Artists", city: "Delhi", events: ["Weddings", "Engagements"], image: "images/makeup.jpg", rating: 4.6 },
  { name: "Henna by Riya", category: "Mehndi Artists", city: "Jaipur", events: ["Weddings", "Engagements", "Other Events"], image: "images/mehndi.jpg", rating: 4.8 },
  { name: "Mehndi Magic", category: "Mehndi Artists", city: "Hyderabad", events: ["Weddings", "Birthday Parties"], image: "images/mehndi.jpg", rating: 4.4 }
];

/* ---------- 3. SEARCH + FILTER ---------- */
const eventSelect = document.getElementById("eventSelect");
const categorySelect = document.getElementById("categorySelect");
const citySelect = document.getElementById("citySelect");
const resultsSection = document.getElementById("results");
const resultsGrid = document.getElementById("resultsGrid");
const resultsSummary = document.getElementById("resultsSummary");

function renderResults() {
  const event = eventSelect.value;
  const category = categorySelect.value;
  const city = citySelect.value;

  const filtered = vendors.filter(v =>
    (!event || v.events.includes(event)) &&
    (!category || v.category === category) &&
    (!city || v.city === city)
  );

  const parts = [event, category, city].filter(Boolean);
  resultsSummary.textContent = parts.length
    ? `${filtered.length} result(s) for: ${parts.join(" · ")}`
    : `Showing all ${filtered.length} vendors`;

  if (filtered.length === 0) {
    resultsGrid.innerHTML = `<div class="no-results"><h3>No vendors found</h3><p>Try changing or clearing your filters.</p></div>`;
  } else {
    resultsGrid.innerHTML = filtered.map(v => `
      <article class="vendor-card">
        <img src="${v.image}" alt="${v.name}" />
        <div class="vendor-info">
          <h3>${v.name}</h3>
          <p class="vendor-meta">${v.category} · ${v.city}</p>
          <p class="vendor-rating">★ ${v.rating}</p>
          <a class="btn btn-primary"
             href="https://wa.me/919876543210?text=${encodeURIComponent("Hi, I'm interested in " + v.name)}"
             target="_blank" rel="noopener">Contact</a>
        </div>
      </article>
    `).join("");
  }

  resultsSection.hidden = false;
  resultsSection.scrollIntoView({ behavior: "smooth" });
}

// Search form
document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  renderResults();
});

// Clear filters
document.getElementById("resetBtn").addEventListener("click", () => {
  eventSelect.value = "";
  categorySelect.value = "";
  citySelect.value = "";
  renderResults();
});

/* ---------- 4. CLICKABLE CARDS + VIEW ALL ---------- */
document.querySelectorAll("[data-category]").forEach(card => {
  card.addEventListener("click", () => {
    categorySelect.value = card.dataset.category;
    eventSelect.value = "";
    renderResults();
  });
});

document.querySelectorAll("[data-event]").forEach(card => {
  card.addEventListener("click", () => {
    eventSelect.value = card.dataset.event;
    categorySelect.value = "";
    renderResults();
  });
});

function showAll(e) {
  e.preventDefault();
  eventSelect.value = "";
  categorySelect.value = "";
  citySelect.value = "";
  renderResults();
}
document.getElementById("viewAllVendors").addEventListener("click", showAll);
document.getElementById("viewAllEvents").addEventListener("click", showAll);

/* ---------- 5. LOGIN MODAL ---------- */
const modal = document.getElementById("loginModal");
const modalTitle = document.getElementById("modalTitle");
const loginForm = document.getElementById("loginForm");
let loginType = "Customer";

function openModal(type) {
  loginType = type;
  modalTitle.textContent = `${type} Login`;
  modal.hidden = false;
  document.getElementById("loginEmail").focus();
}
function closeModal() {
  modal.hidden = true;
  loginForm.reset();
}

document.querySelectorAll("[data-login]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    nav.classList.remove("open");
    openModal(btn.dataset.login);
  });
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  alert(`${loginType} login successful (demo) for ${email}`);
  closeModal();
});