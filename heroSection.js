export function renderHeroSection() {
  return `
    <style>
      .hero-wrapper {
        background: linear-gradient(135deg, #ffecd2, #fcb69f);
        padding: 2rem 1rem 3rem;
        margin-top: 2rem;
        overflow: hidden;
        animation: fadeInBg 2s ease-in-out;
      }

      .hero-glass {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 1rem;
        padding: 1rem;
        max-width: 1000px;
        margin: 0 auto;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        text-align: center;
        animation: fireRise 1.5s ease-in-out;
      }

      .hero-subtitle {
        font-size: 1.1rem;
        color: #444;
        margin-bottom: 2rem;
      }

      .card-sm {
        padding: 0.9rem;
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

      .card-sm img {
        width: 40px;
        height: 40px;
        margin-bottom: 0.4rem;
      }

      .card-sm:hover {
        transform: translateY(-5px) scale(1.03);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      }

      .bg-govt { background-color: #14532d; }
      .bg-intern { background-color: #fde047; color: #111; }
      .bg-software { background-color: #1e3a8a; }
      .bg-medical { background-color: #991b1b; }

      .scroll-down-icon {
        font-size: 2.4rem;
        margin-top: 2.5rem;
        animation: bounceDown 1.5s infinite;
        color: #ff5722;
        cursor: pointer;
      }

      @keyframes bounceDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(10px); }
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
        .hero-subtitle { font-size: 1rem; }
        .card-sm { font-size: 0.75rem; padding: 0.6rem; }
        .card-sm img { width: 30px; height: 30px; }
        .scroll-down-icon { font-size: 2rem; }
      }
    </style>

    <section class="hero-wrapper">
      <div class="hero-glass">
        <div class="container px-2">
          <div class="row g-3 justify-content-center">
            ${[
              { title: "Govt & Private", class: "bg-govt", description: "Daily News", gif: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif" },
              { title: "Interns", class: "bg-intern", description: "For Students", gif: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" },
              { title: "IT Software Jobs", class: "bg-software", description: "Developer & Tech Roles", gif: "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif" },
              { title: "Medical Jobs", class: "bg-medical", description: "Healthcare & Hospitals", gif: "https://media.giphy.com/media/3o7abB06u9bNzA8lu8/giphy.gif" }
            ].map(cat => `
              <div class="col-6 col-sm-3">
                <div class="card-sm ${cat.class}">
                  <img src="${cat.gif}" alt="${cat.title}">
                  <div class="fw-bold">${cat.title}</div>
                  <small>${cat.description}</small>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}
