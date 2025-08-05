// heroSection.js
export function renderHeroSection() {
  return `
    <style>
      .hero-wrapper {
        background: linear-gradient(135deg, #e6f4ea, #f5fdfd);
        padding: 1rem 1rem 1.5rem;
        margin-top: 3.5rem; /* space from header */
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
        padding: 1.25rem;
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
        color: #334155;
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .card-sm {
        padding: 0.65rem;
        font-size: 0.75rem;
        border-radius: 0.5rem;
        color: #fff;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
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
        .hero-subtitle { font-size: 0.9rem; }
        .btn-custom-sm { font-size: 0.7rem; padding: 0.25rem 0.7rem; }
        .card-sm div { font-size: 0.75rem; }
        .card-sm small { font-size: 0.65rem; }
        .hero-wrapper { margin-top: 3.8rem; }
      }
    </style>

    <section class="hero-wrapper">
      <div class="hero-glass">
        <p class="hero-subtitle">
          <strong class="text-success">Get The Latest Government And Private Jobs</strong>,
          <span class="text-danger">Updated Daily</span>
          <span class="text-info">For Your Career Success.</span>
        </p>

        <div class="container px-2">
          <div class="row g-2 justify-content-center mb-3">
            ${[
              { title: "🏛️ Govt & Private", color: "bg-govt", description: "Daily Employment News" },
              { title: "🎓 Interns & Freshers", color: "bg-intern", description: "Opportunities For Students" },
              { title: "💻 IT Software Jobs", color: "bg-secondary", description: "Developer & Tech Roles" },
              { title: "🩺 Medical Jobs", color: "bg-danger", description: "Healthcare & Hospitals" }
            ].map(cat => `
              <div class="col-6 col-sm-3">
                <div class="card-sm text-center ${cat.color}">
                  <div class="fw-bold">${cat.title}</div>
                  <small>${cat.description}</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="hero-buttons d-flex flex-column align-items-center gap-3 mb-3">
          <button id="scrollToJobs" class="btn btn-outline-warning">See Jobs Below</button>
          <div class="mb-2">
            <strong>Follow Us On Social Media:</strong>
            <div class="d-flex flex-wrap align-items-center gap-2 mt-2 justify-content-center">
              <a class="btn btn-sm btn-success d-flex align-items-center gap-1" href="#" target="_blank"><i class="bi bi-whatsapp"></i> WhatsApp</a>
              <a class="btn btn-sm btn-primary d-flex align-items-center gap-1" href="#" target="_blank"><i class="bi bi-facebook"></i> Facebook</a>
              <a class="btn btn-sm btn-info text-white d-flex align-items-center gap-1" href="#" target="_blank"><i class="bi bi-twitter-x"></i> X (Twitter)</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
