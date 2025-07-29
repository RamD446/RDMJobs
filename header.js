document.addEventListener("DOMContentLoaded", function () {
  const headerHTML = `
  <header class="top-header sticky-top bg-white shadow-sm z-3">
    <div class="container-fluid px-3 py-2 d-flex justify-content-between align-items-center">
      <!-- Left: Logo -->
      <a href="index.html" class="navbar-brand d-flex align-items-center">
        <img src="assets/RDMjobslogo.png" alt="RDM Logo" class="logo-img me-2" />
        <div class="brand-text-wrap">
          <div class="brand-highlight fw-bold text-warning">RDM</div>
          <div class="brand-text fw-bold">JOBS</div>
        </div>
      </a>

      <!-- Right: Icons/Buttons -->
      <div class="header-buttons d-flex gap-2">
        <button title="All Jobs" onclick="location.href='index.html'" class="btn btn-light">
          <i class="bi bi-house-door-fill"></i>
          <span class="btn-label">All</span>
        </button>
        <button title="Govt" onclick="navigateToType('Government')" class="btn btn-light">
          <i class="bi bi-building"></i>
          <span class="btn-label">Govt</span>
        </button>
        <button title="Private" onclick="navigateToType('Private')" class="btn btn-light">
          <i class="bi bi-briefcase-fill"></i>
          <span class="btn-label">Private</span>
        </button>
        <button class="btn btn-light d-none">
          <i class="bi bi-card-text"></i>
          <span class="btn-label">Admit</span>
        </button>
        <!-- Create Job Button (Hidden until Admin login) -->
      <button class="btn btn-success d-none" id="createJobBtn" data-bs-toggle="modal" data-bs-target="#createJobModal">
  <i class="bi bi-plus-circle"></i>
  <span>Create Job</span>
</button>

        <!-- Admin Login Button -->
        <button title="Admin" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#adminLoginModal">
          <i class="bi bi-person-lock"></i>
          <span class="btn-label">Admin</span>
        </button>
      </div>
    </div>
  </header>
  `;

  const headerContainer = document.querySelector('.header-container');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML.trim();
  } else {
    console.warn("⚠️ .header-container not found in DOM.");
  }
});
