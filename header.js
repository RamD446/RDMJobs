document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) {
    console.error("Header container not found!");
    return;
  }

  headerContainer.innerHTML = `
    <style>
      /* Brand title font */
      .brand-title button {
        font-family: 'Orbitron', sans-serif;
        font-weight: 700;
        letter-spacing: 0.5px;
      }

      /* Offcanvas footer */
      .offcanvas-footer {
        font-size: 0.8rem;
        color: #aaa;
        padding: 0.75rem 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
      }

      /* Responsive Offcanvas width */
      @media (max-width: 768px) {
        #mainMenu {
          width: 75% !important;
        }
      }
      @media (min-width: 769px) {
        #mainMenu {
          width: 25% !important;
        }
      }
    </style>

    <!-- Header -->
    <header class="top-header position-fixed top-0 start-0 end-0 shadow-sm bg-dark bg-gradient"
      style="z-index: 1030;">
      <div class="container-fluid d-flex justify-content-between align-items-center px-3 py-2">
        
        <!-- Brand -->
        <div class="brand-title">
          <button type="button" class="btn btn-danger fw-bold rounded-pill px-3 py-1 text-white"
            onclick="location.href='index.html'">
            𝓡𝓭𝓶jobs.𝓬𝓸𝓶
          </button>
        </div>

        <!-- Mobile toggle -->
        <button class="btn btn-danger d-md-none rounded-circle p-2 text-white" type="button" 
          data-bs-toggle="offcanvas" data-bs-target="#mainMenu" aria-controls="mainMenu">
          <i class="bi bi-list fs-5"></i>
        </button>

        <!-- Desktop buttons -->
        <div class="d-none d-md-flex gap-2 align-items-center">
          <button class="btn btn-danger d-flex align-items-center gap-1 fw-semibold text-white" type="button"
            data-bs-toggle="offcanvas" data-bs-target="#mainMenu" aria-controls="mainMenu">
            <i class="bi bi-sliders"></i> Menu
          </button>
        </div>
      </div>
    </header>

    <!-- Offcanvas Menu -->
    <div class="offcanvas offcanvas-end bg-dark text-white" tabindex="-1" id="mainMenu">
      <div class="offcanvas-header border-bottom border-secondary">
        <h1 class="fs-5 text-warning m-0">𝓡𝓭𝓶𝓳𝓸𝓫𝓼.𝓬𝓸𝓶</h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column">
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-danger text-white text-start w-100" onclick="location.href='index.html'">
            <i class="bi bi-house-door-fill me-2"></i> All Jobs
          </button>
          <button class="btn btn-danger text-white text-start w-100" onclick="location.href='government.html'">
            <i class="bi bi-bank me-2"></i> Government Jobs
          </button>
          <button class="btn btn-danger text-white text-start w-100" onclick="location.href='private.html'">
            <i class="bi bi-briefcase-fill me-2"></i> Private Jobs
          </button>
          <button class="btn btn-danger text-white text-start w-100" onclick="location.href='admin.html'">
            <i class="bi bi-lock-fill me-2"></i> Login
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="offcanvas-footer">
        🛠️ Developed by<br> <strong class="text-warning">Yalla Ramana</strong>
      </div>
    </div>
  `;
});
