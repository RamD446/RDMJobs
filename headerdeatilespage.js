// headerdeatilespage.js
document.addEventListener("DOMContentLoaded", () => {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <style>
      /* Short header to match index.html */
      header.short-header {
        position: fixed;
        top: 0;
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
      body { padding-top: 55px; }

      @media (max-width: 576px) {
        header.short-header .brand { font-size: 1.05rem; }
        header.short-header .contact-btn { font-size: 0.75rem; }
      }
    </style>

    <header class="short-header" onclick="window.location.href='index.html'" role="button" aria-label="Go to Home">
      <div class="brand">RDM Jobs</div>
    </header>
  `;
});
