
document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) {
    console.error("Header container not found!");
    return;
  }

  headerContainer.innerHTML = `
    <style>
      /* Brand button */
      .custom-rdm-btn {
        background: linear-gradient(to right, #ff4d4d, #dc3545);
        color: #fff;
        border: none;
        font-weight: bold;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 1px;
        padding: 5px 12px;
        font-size: 0.88rem;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        line-height: 1.25;
      }
      .custom-rdm-btn:hover {
        transform: scale(1.03);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25);
      }

      /* Global red button style */
      .btn-red {
        background-color: #dc3545;
        color: #fff !important;
        border: none;
        transition: all 0.2s;
        font-size: 0.82rem !important;
        padding: 0.45rem 0.85rem !important;
        line-height: 1.25 !important;
      }
      .btn-red i {
        color: #fff !important;
      }
      .btn-red:hover {
        background-color: #bb2d3b;
        transform: translateY(-2px);
        box-shadow: 0 3px 6px rgba(0,0,0,0.25);
      }

      /* Header spacing */
      header.top-header .container-fluid {
        padding-top: 0.8rem !important;
        padding-bottom: 0.8rem !important;
      }

      /* Offcanvas styles */
      .offcanvas-body {
        padding: 1rem 1rem 0.5rem 1rem;
      }
      .offcanvas-header {
        padding: 0.5rem 1rem;
      }
      .offcanvas .btn {
        font-size: 0.82rem !important;
        padding: 0.4rem 0.6rem !important;
      }
      .offcanvas-footer {
        font-size: 0.75rem;
        color: #ccc;
        padding: 0.75rem 1rem 0.5rem;
        border-top: 1px solid #555;
        text-align: center;
      }

      /* Responsive Offcanvas width */
      @media (max-width: 768px) {
        #mainMenu {
          width: 50% !important;
        }
      }
      @media (min-width: 769px) {
        #mainMenu {
          width: 20% !important;
        }
      }
    </style>

    <!-- Header -->
    <header class="top-header position-fixed top-0 start-0 end-0 shadow-sm"
      style="background: linear-gradient(to right, #343a40, #212529); color: #fff; z-index: 1030;">
      <div class="container-fluid d-flex justify-content-between align-items-center px-3">
        
        <!-- Brand -->
        <div class="brand-title fw-bold">
          <button type="button" class="btn custom-rdm-btn" onclick="location.href='index.html'">
            𝓡𝓭𝓶jobs.𝓬𝓸𝓶
          </button>
        </div>

        <!-- Mobile toggle -->
        <button class="btn btn-red d-md-none" type="button" data-bs-toggle="offcanvas"
          data-bs-target="#mainMenu" aria-controls="mainMenu"
          style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">
          <i class="bi bi-list"></i>
        </button>

        <!-- Desktop buttons -->
        <div class="d-none d-md-flex gap-2 align-items-center">

          <!-- 🔹 Menu button also red -->
          <button class="btn btn-red ms-2" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#mainMenu" aria-controls="mainMenu">
            <i class="bi bi-sliders"></i> Menu
          </button>
        </div>
      </div>
    </header>

    <!-- Offcanvas Menu -->
    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="mainMenu">
      <div class="offcanvas-header border-bottom border-secondary">
        <h1 style="font-size: 1.25rem; color: #ffc107; margin: 0;">𝓡𝓭𝓶𝓳𝓸𝓫𝓼.𝓬𝓸𝓶</h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column">
        <div class="d-grid gap-2 mb-3">
          <button class="btn btn-red text-start w-100" onclick="location.href='index.html'">
            <i class="bi bi-house-door-fill me-2"></i> All Jobs
          </button>
          <button class="btn btn-red text-start w-100" onclick="location.href='government.html'">
            <i class="bi bi-bank me-2"></i> Government Jobs
          </button>
          <button class="btn btn-red text-start w-100" onclick="location.href='private.html'">
            <i class="bi bi-briefcase-fill me-2"></i> Private Jobs
          </button>
          <button class="btn btn-red text-start w-100" onclick="location.href='admin.html'">
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
//test

