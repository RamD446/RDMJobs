export function renderHeroSection() {
  return `
    <style>
      .hero-wrapper {
        background: linear-gradient(135deg, #ffecd2, #fcb69f);
        padding: 4rem 1rem 5rem;
        margin-top: 2rem;
        overflow: hidden;
        animation: fadeInBg 2s ease-in-out;
      }
      .hero-glass {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 2rem;
        max-width: 1000px;
        margin: 0 auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        text-align: center;
        animation: fireRise 1.5s ease-in-out;
      }
      .hero-title {
        font-size: 2rem;
        font-weight: 700;
        color: #d62828;
        text-shadow: 1px 1px #fcd5ce;
        margin-bottom: 0.5rem;
      }

      .hero-subtitle {
        font-size: 1.1rem;
        color: #444;
        margin-bottom: 2rem;
      }

      .card-sm {
        padding: 0.7rem;
        font-size: 0.85rem;
        border-radius: 0.6rem;
        color: #fff;
        cursor: pointer;
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        animation: fadeInCard 0.8s ease forwards;
        opacity: 0;
        transform: translateY(20px);
      }

      .card-sm:hover {
        transform: translateY(-5px) scale(1.03);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }

      .bg-govt { background-color: #14532d; }
      .bg-intern { background-color: #fde047; color: #111; }
      .bg-software { background-color: #1e3a8a; }
      .bg-medical { background-color: #991b1b; }

      .btn-flame {
        font-size: 0.95rem;
        font-weight: 600;
        background: linear-gradient(to right, #ff8800, #ff4500);
        border: none;
        color: white;
        padding: 0.5rem 1.2rem;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        margin-top: 1.5rem;
      }

      .btn-flame:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }

      .hero-social {
        margin-top: 2rem;
        font-size: 0.9rem;
      }

      .hero-social a {
        margin: 0 0.5rem;
        text-decoration: none;
        color: #d62828;
        font-weight: bold;
      }

      @keyframes fireRise {
        0% { transform: translateY(40px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }

      @keyframes fadeInBg {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeInCard {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 576px) {
        .hero-title { font-size: 1.5rem; }
        .hero-subtitle { font-size: 1rem; }
        .card-sm { font-size: 0.75rem; padding: 0.6rem; }
        .btn-flame { font-size: 0.85rem; }
      }
    </style>

    <section class="hero-wrapper">
      <div class="hero-glass">
        <div class="hero-subtitle">
           <strong>Get the hottest updates on Govt & Private Jobs</strong><br>
           <span class="text-success">Stay ahead in your career journey</span>.
        </div>

        <div class="container px-2">
          <div class="row g-3 justify-content-center">
            ${[
              { title: "🏛️ Govt & Private", class: "bg-govt", description: "Daily News" },
              { title: "🎓 Interns", class: "bg-intern", description: " For Students" },
              { title: "💻 IT Software Jobs", class: "bg-software", description: "Developer & Tech Roles" },
              { title: "🩺 Medical Jobs", class: "bg-medical", description: "Healthcare & Hospitals" }
            ].map(cat => `
              <div class="col-6 col-sm-3">
                <div class="card-sm ${cat.class}">
                  <div class="fw-bold">${cat.title}</div>
                  <small>${cat.description}</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <button id="scrollToJobs" class="btn btn-flame">
          See Jobs Below <i class="bi bi-arrow-down-circle ms-1"></i>
        </button>
         <div class="mb-2">
            <strong>Follow Us On Social Media:</strong>
            <div class="d-flex flex-wrap align-items-center gap-2 mt-2 justify-content-center">
              <a class="btn btn-sm btn-success d-flex align-items-center gap-1" href="#" target="_blank"><i class="bi bi-whatsapp"></i> WhatsApp</a>
              <a class="btn btn-sm btn-primary d-flex align-items-center gap-1" href="#" target="_blank"><i class="bi bi-facebook"></i> Facebook</a>
              <a class="btn btn-sm btn-info text-white d-flex align-items-center gap-1" href="#" target="_blank"><i class="bi bi-twitter-x"></i> X (Twitter)</a>
            </div>
          </div>
      </div>
    </section>
  `;
}
