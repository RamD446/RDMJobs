// headerdetails.js
document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) {
    console.error("Header container not found!");
    return;
  }

  headerContainer.innerHTML = `
    <style>
      /* Brand button */
      .custom-brand-btn {
        background: linear-gradient(to right, #ff4d4d, #dc3545);
        color: #fff;
        border: none;
        font-weight: bold;
        font-family: 'Orbitron', sans-serif;
        letter-spacing: 1px;
        padding: 6px 14px;
        font-size: 0.95rem;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        line-height: 1.25;
      }
      .custom-brand-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25);
      }

      /* Home button */
      .custom-home-btn {
        background-color: #dc3545;
        color: #fff;
        border: none;
        padding: 6px 14px;
        font-size: 0.9rem;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease-in-out;
      }
      .custom-home-btn:hover {
        background-color: #bb2d3b;
        transform: translateY(-2px);
        box-shadow: 0 3px 6px rgba(0,0,0,0.25);
      }

      /* Header spacing */
      header.top-header .container-fluid {
        padding-top: 0.7rem !important;
        padding-bottom: 0.7rem !important;
      }
    </style>

    <!-- Header -->
    <header class="top-header position-fixed top-0 start-0 end-0 shadow-sm"
      style="background: linear-gradient(to right, #343a40, #212529); color: #fff; z-index: 1030;">
      <div class="container-fluid d-flex justify-content-between align-items-center px-3">
        
        <!-- Left: Brand button -->
        <button type="button" class="custom-brand-btn" onclick="window.location.href='https://www.rdmjobs.com'">
          𝓡𝓭𝓶jobs.𝓬𝓸𝓶
        </button>

      

      </div>
    </header>
  `;
});
