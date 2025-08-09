// jobloader.js

// 🔹 Firebase Setup
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
  const postDate = postedAt?.toDate ? postedAt.toDate() : new Date(postedAt);
  const diffMs = now - postDate;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) return { text: "Just now", color: "text-success" };
  if (diffMin < 60) return { text: `${diffMin} min ago`, color: "text-success" };
  if (diffHour < 24) return { text: `${diffHour} hour${diffHour !== 1 ? "s" : ""} ago`, color: "text-warning" };
  return { text: `${diffDay} day${diffDay !== 1 ? "s" : ""} ago`, color: "text-danger" };
}

// 🔹 Render Each Job Card
function renderJobCard(job) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = job.content || "";
  const shortContent = tempDiv.textContent.trim().slice(0, 200) + "...";
  const time = getTimeAgo(job.postedAt);

  return `
    <div class="col-md-6">
      <div class="card h-100 border border-warning shadow-sm" style="border-radius: 12px; overflow: hidden;">
        <div class="bg-light px-3 py-2 border-bottom d-flex justify-content-between align-items-center">
          <h6 class="fw-semibold text-primary mb-0" style="font-size: 1.05rem;">
            ${job.title || 'Untitled Job'}
          </h6>
        </div>
        <div class="card-body bg-white" style="font-size: 0.95rem;">
          <p class="text-muted small mb-2">${shortContent}</p>
          <p class="mb-1 text-dark"><strong>🏢 Company:</strong> <span class="text-secondary">${job.company || 'N/A'}</span></p>
          <p class="mb-1 text-dark"><strong>📅 Last Date:</strong> <span class="text-danger">${job.lastDate || 'N/A'}</span></p>
          <p class="mb-1 text-dark"><strong>🎓 Qualification:</strong> <span class="text-muted">Any Graduate</span></p>
        </div>
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

// 🔹 Render Title-Only List with Time Ago & Custom Colors
function renderTitleList(jobs, type) {
  let borderColor = type === "Government" ? "#28a745" : "#fd7e14";
  let buttonBgColor = borderColor;

  return `
    <div class="p-3 border rounded mb-4" style="border-color:${borderColor} !important;">
      <h5 class="fw-bold mb-3" style="color:${borderColor};">
        ${type} Jobs
      </h5>
      <ul class="list-unstyled mb-0">
        ${jobs.slice(0, 20).map(job => {
          const time = getTimeAgo(job.postedAt);
          return `
            <li class="mb-2">
              <a href="job-details.html?jobId=${job.id}" 
                 class="text-decoration-none fw-medium text-primary">
                🔹 ${job.title || 'Untitled Job'}
              </a>
              <span class="ms-2 small ${time.color}">
                ${time.text}
              </span>
            </li>
          `;
        }).join("")}
        <li class="mt-3">
          <a href="jobinformation.html?type=${encodeURIComponent(type)}" 
             class="fw-semibold text-white px-3 py-1 rounded-pill d-inline-block text-decoration-none"
             style="background-color:${buttonBgColor};">
            <i class="bi bi-box-arrow-up-right me-1"></i> See more ${type} jobs
          </a>
        </li>
      </ul>
    </div>
  `;
}

// 🔹 Fetch & Render Government + Private Jobs
function renderGovAndPrivateJobs(allJobs) {
  let governmentJobs = allJobs.filter(job => job.type === "Government");
  let privateJobs = allJobs.filter(job => job.type === "Private");

  let govHTML = renderTitleList(governmentJobs, "Government");
  let privateHTML = renderTitleList(privateJobs, "Private");

  document.getElementById("govPrivateJobsSection").innerHTML = `
    ${govHTML}
    ${privateHTML}
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
      <div class="row g-3">${allJobs.map(renderJobCard).join("")}</div>
    `;
    jobList.appendChild(latestSection);

    // 🟦 Government + Private Jobs
    if (governmentJobs.length || privateJobs.length) {
      const twoColSection = document.createElement("div");
      twoColSection.className = "mt-5";
      twoColSection.innerHTML = `
        <div class="row">
          <div class="col-md-6">
            ${governmentJobs.length ? renderTitleList(governmentJobs, "Government") : "<p class='text-muted'>No government jobs</p>"}
          </div>
          <div class="col-md-6">
            ${privateJobs.length ? renderTitleList(privateJobs, "Private") : "<p class='text-muted'>No private jobs</p>"}
          </div>
        </div>
      `;
      jobList.appendChild(twoColSection);
    }

  } catch (error) {
    console.error("Error loading jobs:", error);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs. Please try again later.</p>";
  }
}

// 🔹 Auto Load
loadJobs();

// 🔹 Navigation Handler
window.navigateToType = function (type) {
  window.location.href = `jobinformation.html?type=${encodeURIComponent(type)}`;
};
