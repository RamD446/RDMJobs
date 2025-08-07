// jobloader.js

// 🔹 Firebase Setup (No external firebase.js needed)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// 🔹 Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzXgI8kvqz9CEo9393W48yEZjUx6l_YNM",
  authDomain: "rdmjobs-78da3.firebaseapp.com",
  projectId: "rdmjobs-78da3",
  storageBucket: "rdmjobs-78da3.appspot.com",
  messagingSenderId: "850369074130",
  appId: "1:850369074130:web:c96133288fb6cabdd82e0b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Time Formatting
function getTimeAgo(postedAt) {
  const now = new Date();
  const postDate = new Date(postedAt);
  const diffMs = now - postDate;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return { text: "Just now", color: "text-success" };
  if (diffMin < 60) return { text: `${diffMin} min ago`, color: "text-success" };
  if (diffHour < 24) return { text: `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`, color: "text-warning" };
  return { text: `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`, color: "text-danger" };
}

// 🔹 Badge by Job Type
function getTypeBadge(type) {
  if (!type) return `<span class="badge bg-secondary">N/A</span>`;
  const t = type.toLowerCase();
  if (t.includes("government")) return `<span class="badge bg-primary">${type}</span>`;
  if (t.includes("private")) return `<span class="badge bg-info text-dark">${type}</span>`;
  return `<span class="badge bg-success">${type}</span>`;
}

// 🔹 Render Each Job Card
function renderJobCard(job) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = job.content || "";
  const shortContent = tempDiv.textContent.trim().slice(0, 200) + "...";
  const time = getTimeAgo(job.postedAt);

  return `
    <div class="col-md-6">
  <div class="card h-100 border border-warning shadow-sm"
       style="border-radius: 12px; overflow: hidden; transition: all 0.3s;">

    <!-- Header -->
    <div class="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
      <h6 class="fw-semibold text-primary mb-0" style="font-size: 1.05rem;">
        ${job.title || 'Untitled Job'}
      </h6>
    </div>

    <!-- Body -->
    <div class="card-body bg-white" style="font-size: 0.95rem;">
      <p class="text-muted small mb-2">${shortContent}</p>
      <p class="mb-1 text-dark"><strong>🏢 Company:</strong> <span class="text-secondary">${job.company || 'N/A'}</span></p>
      <p class="mb-1 text-dark"><strong>📅 Last Date:</strong> <span class="text-danger">${job.lastDate || 'N/A'}</span></p>
      <p class="mb-1 text-dark"><strong>👤 Posted by:</strong> <span class="text-muted">Yalla Ramana</span></p>
    </div>

    <!-- Footer -->
    <div class="bg-light px-3 py-2 d-flex justify-content-between align-items-center border-top">
      <span class="${time.color} small"><i class="bi bi-clock me-1"></i>${time.text}</span>
      <a href="job-details.html?jobId=${job.id}" class="btn btn-sm btn-outline-success">
        <i class="bi bi-eye-fill me-1"></i> Full Details
      </a>
    </div>

  </div>
</div>

  `;
}

// 🔹 Load Jobs from Firebase
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

    const allJobs = [];
    const governmentJobs = [];
    const privateJobs = [];

    snapshot.forEach((docSnap) => {
      const job = docSnap.data();
      const fullJob = { ...job, id: docSnap.id };
      allJobs.push(fullJob);

      if (job.type?.toLowerCase().includes("government")) {
        governmentJobs.push(fullJob);
      } else if (job.type?.toLowerCase().includes("private")) {
        privateJobs.push(fullJob);
      }
    });

    // 🟡 Latest Jobs
    const latestSection = document.createElement("div");
    latestSection.innerHTML = `
      <h5 class="fw-semibold text-warning mb-3">
        <i class="bi bi-broadcast-pin me-1"></i> Latest Job Updates
      </h5>
      <div class="row g-3">${allJobs.map(renderJobCard).join("")}</div>`;
    jobList.appendChild(latestSection);

    // 🔵 Government Jobs
    if (governmentJobs.length) {
      const govSection = document.createElement("div");
      govSection.className = "mt-5";
      govSection.innerHTML = `
        <h5 class="fw-semibold text-primary mb-3">
          <i class="bi bi-bank2 me-1"></i> Government Jobs
        </h5>
        <div class="row g-3">${governmentJobs.map(renderJobCard).join("")}</div>`;
      jobList.appendChild(govSection);
    }

    // 🔷 Private Jobs
    if (privateJobs.length) {
      const priSection = document.createElement("div");
      priSection.className = "mt-5";
      priSection.innerHTML = `
        <h5 class="fw-semibold text-info mb-3">
          <i class="bi bi-building-check me-1"></i> Private Jobs
        </h5>
        <div class="row g-3">${privateJobs.map(renderJobCard).join("")}</div>`;
      jobList.appendChild(priSection);
    }

  } catch (error) {
    console.error("Error loading jobs:", error);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs. Please try again later.</p>";
  }
}

// 🔹 Auto Load
loadJobs();

// 🔹 Optional Navigation Handler
window.navigateToType = function (type) {
  window.location.href = `jobinformation.html?type=${encodeURIComponent(type)}`;
};
