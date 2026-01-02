document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="footer bg-dark text-white pt-4 border-top">
      <div class="container">
        <div class="row text-center text-lg-start">
          
          <!-- Column 1: Branding -->
          <div class="col-lg-4 mb-3">
            <h6 class="fw-bold text-warning">RDM Jobs</h6>
            <p class="small mb-1">© 2025 RDM Jobs. All rights reserved.</p>
            <p class="small">Made with ❤️ in India</p>
          </div>
          
          <!-- Column 2: Links -->
          <div class="col-lg-4 mb-3">
            <h6 class="fw-semibold text-warning">Quick Links</h6>
            <ul class="list-unstyled small">
              <li><a href="privacy.html" class="text-white text-decoration-none">Privacy Policy</a></li>
              <li><a href="disclaimer.html" class="text-white text-decoration-none">Disclaimer</a></li>
              <li><a href="about.html" class="text-white text-decoration-none">About Us</a></li>
            </ul>
          </div>
          
          <!-- Column 3: Contact -->
          <div class="col-lg-4 mb-3">
            <h6 class="fw-semibold text-warning">Support</h6>
            <p class="small mb-1">Ramana9000r@gmail.com</p>
            <p class="small mb-0"><strong>Note:</strong> All job information is shared for public benefit. Please verify before applying.</p>
          </div>

        </div>
      </div>
    </footer>
  `;

  const footerContainer = document.querySelector('.footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML.trim(); // Clean HTML
  } else {
    console.warn("⚠️ .footer-container not found in DOM.");
  }
});
