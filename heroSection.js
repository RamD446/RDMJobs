// heroSection.js

export function renderHeroSection() {
  return `
    <style>
      .hero-wrapper {
        background: linear-gradient(135deg, #e6f4ea, #f5fdfd);
        min-height: 60vh;
        padding: 4rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .hero-glass {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 2rem;
        padding: 3rem 2.5rem;
        max-width: 900px;
        width: 100%;
        text-align: center;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        animation: fadeInUp 1s ease forwards;
        opacity: 0;
        transform: translateY(40px);
      }

      .hero-heading {
        font-size: 2.6rem;
        font-weight: 700;
        color: #212529;
        margin-bottom: 1rem;
      }

      .hero-heading .highlight {
        color: #157347;
      }

      .hero-subtitle {
        font-size: 1.15rem;
        color: #5c5c5c;
        margin-bottom: 2.2rem;
        line-height: 1.6;
      }

      .hero-buttons {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .hero-buttons button,
      .hero-buttons a {
        padding: 0.75rem 1.6rem;
        min-width: 160px;
        font-weight: 600;
        border-radius: 999px;
        transition: 0.3s ease;
      }

      .hero-buttons button:hover,
      .hero-buttons a:hover {
        transform: translateY(-2px);
        opacity: 0.95;
      }

      .hero-social {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1.2rem;
        font-size: 1.4rem;
      }

      .hero-social a {
        transition: transform 0.25s ease;
      }

      .hero-social a:hover {
        transform: scale(1.15);
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 576px) {
        .hero-glass {
          padding: 2rem 1.5rem;
          border-radius: 1rem;
        }

        .hero-heading {
          font-size: 1.9rem;
        }

        .hero-subtitle {
          font-size: 1rem;
        }

        .hero-buttons button,
        .hero-buttons a {
          min-width: 140px;
          font-size: 0.95rem;
        }
      }
    </style>

    <section class="hero-wrapper">
      <div class="hero-glass">
        <h1 class="hero-heading">
          Welcome to <span class="highlight">RDM JOBS</span> Portal
        </h1>
        <p class="hero-subtitle">
          Get the latest <strong>Government</strong> and <strong>Private sector</strong> jobs, updated daily to help you stay ahead.
        </p>

        <div class="hero-buttons">
          <button id="scrollToJobs" class="btn btn-success">🚀 See Jobs</button>
          <a  class="btn btn-outline-primary">🔔 Follow Updates</a>
        </div>

        <div class="hero-social">
          <span class="text-muted">Follow:</span>
          <a href="https://wa.me/your-number" target="_blank" class="text-success" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="https://facebook.com/your-page" target="_blank" class="text-primary" title="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://youtube.com/your-channel" target="_blank" class="text-danger" title="YouTube"><i class="fab fa-youtube"></i></a>
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
