// headerdeatilespage.js
document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <style>
      /* ===== Fixed Header ===== */
      .job-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 64px;
        background: linear-gradient(90deg, #1c1f23, #212529);
        z-index: 1030;
        box-shadow: 0 4px 14px rgba(0,0,0,0.35);
      }

      .job-header-inner {
        height: 100%;
        padding: 0 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* ===== Home Button ===== */
      .home-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, #ffc107, #ffca2c);
        border: none;
        padding: 7px 16px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.9rem;
        color: #212529;
        transition: all 0.2s ease;
        box-shadow: 0 3px 8px rgba(255,193,7,0.4);
      }

      .home-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 14px rgba(255,193,7,0.55);
      }

      /* ===== Brand Text ===== */
      .brand-title {
        font-weight: 800;
        font-size: 1.25rem;
        letter-spacing: 1px;
        background: linear-gradient(90deg, #ff5252, #ffc107, #4dd0e1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 1px 2px rgba(0,0,0,0.35);
        white-space: nowrap;
      }

      /* ===== Page offset ===== */
      body {
        padding-top: 64px;
      }

      /* ===== Mobile ===== */
      @media (max-width: 576px) {
        .home-btn {
          padding: 6px 12px;
          font-size: 0.85rem;
        }
        .brand-title {
          font-size: 1.05rem;
          letter-spacing: 0.6px;
        }
      }
    </style>

    <header class="job-header">
      <div class="job-header-inner">

        <!-- Left -->
        <button class="home-btn" onclick="window.location.href='index.html'">
          <i class="bi bi-house-door-fill"></i> Home
        </button>

        <!-- Right -->
        <div class="brand-title">RDM Jobs</div>

      </div>
    </header>
  `;
});
