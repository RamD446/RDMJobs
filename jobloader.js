import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAzXgI8kvqz9CEo9393W48yEZjUx6l_YNM",
  authDomain: "rdmjobs-78da3.firebaseapp.com",
  projectId: "rdmjobs-78da3",
  storageBucket: "rdmjobs-78da3.appspot.com",
  messagingSenderId: "850369074130",
  appId: "1:850369074130:web:c96133288fb6cabdd82e0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Utility: Format Date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return "";
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Render Full Job Card
function renderJobCard(job) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = job.content || "";
  const firstImg = tempDiv.querySelector("img");
  const imageUrl = firstImg ? firstImg.src : "assets/RDMjobslogo.png";

  return `
    <a href="job-details.html?jobId=${job.id}" class="text-decoration-none text-dark">
      <div class="job-card shadow-sm p-2 mb-2 rounded" style="transition: background-color 0.3s ease; cursor: pointer;"
        onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='white'">
        <img src="${imageUrl}" alt="${job.title}" class="job-card-img" />
        <div class="job-info mt-2">
          <div style="color: #0d6efd;">${job.title}</div>
          <div style="color: #198754;">${job.company}</div>
          <div style="color: #dc3545;">${job.lastDate}</div>
        </div>
      </div>
    </a>
  `;
}

// Render Simple Job Link
function renderSimpleJobCard(job) {
  return `
    <div class="mb-1">
      <a href="job-details.html?jobId=${job.id}" class="text-decoration-none" style="color:#0d6efd;">
        🔹 ${job.title}
      </a>
    </div>
  `;
}

// Load Jobs Function
export async function loadJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = `
    <div class="text-center text-muted py-5">
      <div class="spinner-border text-success mb-3" role="status"></div><br>
      Loading jobs...
    </div>
  `;

  try {
    const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
    const snapshot = await getDocs(q);
    jobList.innerHTML = "";

    if (snapshot.empty) {
      jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
      return;
    }

    const jobGroups = { Government: [], Private: [] };
    const allJobs = [];

    snapshot.forEach((docSnap) => {
      const job = docSnap.data();
      const fullJob = { ...job, id: docSnap.id };
      allJobs.push(fullJob);

      if (job.type && typeof job.type === "string") {
        const key = job.type.replace(/\s+/g, "");
        if (jobGroups[key] && jobGroups[key].length < 5) {
          jobGroups[key].push(fullJob);
        }
      }
    });

    // Latest Jobs Section
    if (allJobs.length > 0) {
      const section = document.createElement("div");
      section.className = "mb-4";
      section.innerHTML = `
        <div class="section-label"
          style="display:inline-block;font-size:0.85rem;font-weight:600;color:#0f172a;background-color:#d1fae5;padding:0.35rem 0.9rem;border-radius:0.5rem;margin-bottom:0.75rem;">
          🆕 Latest Job Updates
        </div>
        <div class="row g-3"></div>
      `;
      const row = section.querySelector(".row");
      allJobs.slice(0, 1000).forEach((job) => {
        const col = document.createElement("div");
        col.className = "col-12 col-md-6";
        col.innerHTML = renderJobCard(job);
        row.appendChild(col);
      });
      jobList.appendChild(section);
    }

    // Categorized Jobs
    const types = ["Government", "Private"];
    const categoryTitles = {
      Government: "🏛 Government Jobs",
      Private: "🏢 Private Jobs"
    };

    let contentAdded = false;

    for (let i = 0; i < types.length; i += 2) {
      const row = document.createElement("div");
      row.className = "row";

      [types[i], types[i + 1]].forEach((type) => {
        if (!type) return;
        const jobs = jobGroups[type] || [];

        const col = document.createElement("div");
        col.className = "col-12 col-md-6";

        const wrapper = document.createElement("div");
        wrapper.className = "job-category-wrapper";

        const header = `
          <div class="job-category-header d-flex justify-content-between align-items-center mb-2">
            <span style="font-weight:600;">${categoryTitles[type]}</span>
            <a href="jobinformation.html?type=${encodeURIComponent(type)}" title="See All">
              <i class="bi bi-box-arrow-up-right"></i>
            </a>
          </div>
        `;

        let content = "";

        if (jobs.length === 0) {
          content = `<p class="text-muted">No ${categoryTitles[type]} found.</p>`;
        } else {
          const cards = jobs.map(renderSimpleJobCard).join("");
          content = `<div class="job-category-cards">${cards}</div>`;
          contentAdded = true;
        }

        wrapper.innerHTML = header + content;
        col.appendChild(wrapper);
        row.appendChild(col);
      });

      jobList.appendChild(row);
    }

    if (!contentAdded) {
      jobList.innerHTML += "<p class='text-center text-muted'>No categorized jobs found to display.</p>";
    }

  } catch (error) {
    console.error("Error loading jobs:", error);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs. Please try again later.</p>";
  }
}

// Call loadJobs (optional if importing only)
loadJobs();

// Export navigateToType globally
window.navigateToType = function(type) {
  window.location.href = `jobinformation.html?type=${encodeURIComponent(type)}`;
};
