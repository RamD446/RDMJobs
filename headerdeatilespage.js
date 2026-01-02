// headerdeatilespage.js
document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <style>
      /* Mini header strip (fixed, blue bg) */
      .mini-header { position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(90deg,#0d6efd,#0056b3); height:36px; z-index: 1040; display:flex; align-items:center; padding:0 .75rem; font-size: 0.85rem; }
      .mini-header .bi { font-size: 1rem; color: #fff; }
      .mini-header .text-white-50 { color: rgba(255,255,255,0.85) !important; }

      /* Short header to match index.html (shifted) */
      header.short-header {
        position: fixed;
        top: 36px;
        left: 0;
        right: 0;
        z-index: 1030;
        background-color: #212529;
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        cursor: pointer;
      }
      header.short-header .brand { color: #ffc107; font-weight: bold; font-size: 1.25rem; }
      header.short-header .contact-btn { background-color: #ffc107; color: #212529; font-weight: bold; font-size: 0.8rem; border: none; padding: 0.25rem 0.6rem; border-radius: 5px; }
      body { padding-top: 92px; }

      @media (max-width: 576px) {
        header.short-header .brand { font-size: 1.05rem; }
        header.short-header .contact-btn { font-size: 0.75rem; }
      }
    </style>

    <div class="mini-header position-fixed top-0 start-0 end-0 bg-primary text-white">
      <div id="miniDateTime" class="text-white-50 small"></div>
      <div class="ms-auto d-flex gap-2 align-items-center">
        <a href="#" class="text-white small text-decoration-none" target="_blank" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
        <a href="#" class="text-white small text-decoration-none" target="_blank" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
        <a href="#" class="text-white small text-decoration-none" target="_blank" aria-label="Telegram"><i class="bi bi-telegram"></i></a>
      </div>
    </div>

    <header class="short-header" onclick="window.location.href='index.html'" role="button" aria-label="Go to Home">
      <div class="brand">RDM Jobs</div>
    </header>

    <script>
      function updateMiniDateTime() {
        const el = document.getElementById('miniDateTime');
        if (!el) return;
        const now = new Date();
        const opts = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
        el.textContent = now.toLocaleString(undefined, opts);
      }
      updateMiniDateTime();
      setInterval(updateMiniDateTime, 60 * 1000);
    </script>
  `;
});
