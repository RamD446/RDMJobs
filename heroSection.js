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
        padding: 1.5rem;
        max-width: 1000px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        animation: slideUp 1s ease forwards;
        transform: translateY(30px);
        opacity: 0;
      }

      .hero-subtitle {
        font-size: 1rem;
        color: #ccc;
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .card-sm {
        padding: 0.75rem;
        font-size: 0.75rem;
        min-height: 100%;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        border-radius: 0.5rem;
        color: #fff;
      }

      .card-sm:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .bg-govt { background-color: #14532d; }
      .bg-software { background-color: #1e3a8a; }
      .bg-intern { background-color: #fde047; color: #111; }
      .bg-walkin { background-color: #991b1b; }

      .btn-custom-sm {
        font-weight: 600;
        padding: 0.3rem 0.8rem;
        border-radius: 999px;
        font-size: 0.75rem;
        background-color: #198754;
        border: none;
        color: #fff;
        transition: all 0.25s ease-in-out;
      }

      .btn-custom-sm:hover {
        background-color: #146c43;
        transform: scale(1.03);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .hero-social i {
        font-size: 1.1rem;
        margin: 0 0.4rem;
        color: #aaa;
        transition: transform 0.2s, color 0.2s;
      }

      .hero-social i:hover {
        transform: scale(1.2);
        color: #fff;
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
        .hero-subtitle { font-size: 0.95rem; }
        .btn-custom-sm { font-size: 0.7rem; padding: 0.25rem 0.7rem; }
        .card-sm div { font-size: 0.75rem; }
        .card-sm small { font-size: 0.65rem; }
      }
    </style>

    <section class="hero-wrapper">
      <div class="hero-glass">
        <p class="hero-subtitle">
          <strong class="text-success">Get The Latest Government</strong>
          <span class="text-primary"> And </span>
          <strong class="text-warning">Private Jobs ,</strong>
          <span class="text-danger"> Updated Daily</span>
          <span class="text-info"> For Your Career Success.</span>
        </p>

        <!-- Category Highlights -->
        <div class="container px-2">
          <div class="row g-2 justify-content-center mb-3">
            <div class="col-6 col-sm-3">
              <div class="card-sm text-center bg-govt">
                <div class="fw-bold">🏛️ Govt Jobs</div>
                <small>Updated Daily</small>
              </div>
            </div>
            <div class="col-6 col-sm-3">
              <div class="card-sm text-center bg-software">
                <div class="fw-bold">💻 Software</div>
                <small>Tech Roles</small>
              </div>
            </div>
            <div class="col-6 col-sm-3">
              <div class="card-sm text-center bg-intern">
                <div class="fw-bold">🎓 Internships</div>
                <small>For Freshers</small>
              </div>
            </div>
            <div class="col-6 col-sm-3">
              <div class="card-sm text-center bg-walkin">
                <div class="fw-bold">🚶 Walk-ins</div>
                <small>Weekly Posts</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Button & Share Links -->
        <div class="hero-buttons d-flex flex-column align-items-center gap-3 mb-3">
          <button id="scrollToJobs" class="btn btn-custom-sm">
            See Jobs Below
          </button>

          <div class="mb-3">
           <strong>Follow Us On Social Media:</strong>
            <div class="d-flex flex-wrap align-items-center gap-2 mt-2">
              <a  class="btn btn-sm btn-success d-flex align-items-center gap-1" target="_blank">
                <i class="bi bi-whatsapp"></i> WhatsApp
              </a>
              <a  class="btn btn-sm btn-primary d-flex align-items-center gap-1" target="_blank">
                <i class="bi bi-facebook"></i> Facebook
              </a>
              <a  class="btn btn-sm btn-info text-white d-flex align-items-center gap-1" target="_blank">
                <i class="bi bi-twitter-x"></i> X (Twitter)
              </a>
             
            </div>
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
