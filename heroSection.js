// heroSection.js

export function renderHeroSection() {
  return `
    <style>
      .hero-wrapper {
        background: linear-gradient(135deg, #e6f4ea, #f5fdfd);
        padding: 1.5rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        animation: fadeIn 1.2s ease-in-out;
      }

      .hero-glass {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 2rem;
        max-width: 1000px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        animation: slideUp 1s ease forwards;
        transform: translateY(30px);
        opacity: 0;
      }

      .hero-subtitle {
        font-size: 1.1rem;
        color: #555;
        margin-bottom: 1.5rem;
      }

      .hero-features .card {
        border: none;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        padding: 1rem;
      }

      .hero-features .card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(0,0,0,0.06);
      }

      .btn-custom-sm {
        font-weight: 600;
        padding: 0.4rem 1rem;
        border-radius: 999px;
        font-size: 0.875rem;
        transition: all 0.25s ease-in-out;
      }

      .btn-custom-sm:hover {
        background-color: #157347;
        transform: scale(1.03);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .hero-social i {
        font-size: 1.3rem;
        margin: 0 0.6rem;
        color: #333;
        transition: transform 0.2s;
      }

      .hero-social i:hover {
        transform: scale(1.2);
      }

      @keyframes slideUp {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @media (max-width: 576px) {
        .hero-subtitle { font-size: 1rem; }
        .hero-features .card div { font-size: 0.95rem; }
        .hero-features .card small { font-size: 0.75rem; }
        .btn-custom-sm { font-size: 0.85rem; padding: 0.35rem 0.8rem; }
      }
    </style>

    <section class="hero-wrapper">
      <div class="hero-glass">
        <p class="hero-subtitle">
          Get the latest <strong>Government</strong> and <strong>Private</strong> jobs, updated daily for your career success.
        </p>

        <!-- Category Highlights -->
        <div class="container">
          <div class="row hero-features mb-4">
            <div class="col-6 col-sm-3 mb-3">
              <div class="card text-center">
                <div class="fw-bold text-success">🏛️ Govt Jobs</div>
                <small class="text-muted">Updated Daily</small>
              </div>
            </div>
            <div class="col-6 col-sm-3 mb-3">
              <div class="card text-center">
                <div class="fw-bold text-primary">💻 Software Jobs</div>
                <small class="text-muted">Tech Roles</small>
              </div>
            </div>
            <div class="col-6 col-sm-3 mb-3">
              <div class="card text-center">
                <div class="fw-bold text-warning">🎓 Internships</div>
                <small class="text-muted">For Freshers</small>
              </div>
            </div>
            <div class="col-6 col-sm-3 mb-3">
              <div class="card text-center">
                <div class="fw-bold text-danger">🚶 Walk-in Drives</div>
                <small class="text-muted">Weekly Posts</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Button & Social Links -->
        <div class="hero-buttons d-flex flex-column align-items-center gap-3 mb-3">
          <button id="scrollToJobs" class="btn btn-success btn-custom-sm">
           See Jobs below
          </button>

          <div class="hero-social d-flex justify-content-center align-items-center mt-2">
            <a href="https://wa.me/your-number" target="_blank" title="WhatsApp">
              <i class="fab fa-whatsapp text-success"></i>
            </a>
            <a href="https://facebook.com/your-page" target="_blank" title="Facebook">
              <i class="fab fa-facebook-f text-primary"></i>
            </a>
            <a href="https://youtube.com/your-channel" target="_blank" title="YouTube">
              <i class="fab fa-youtube text-danger"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <script>
      document.addEventListener("DOMContentLoaded", function () {
        const scrollBtn = document.getElementById("scrollToJobs");
        const jobList = document.getElementById("jobList");
        if (scrollBtn && jobList) {
          scrollBtn.addEventListener("click", function () {
            jobList.scrollIntoView({ behavior: "smooth" });
          });
        }
      });
    </script>
  `;
}
