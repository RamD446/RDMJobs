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

// 🔹 Render Each Job Card (Job Type inside body)
function renderJobCard(job) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = job.content || "";
  const shortContent = tempDiv.textContent.trim().slice(0, 200) + "...";
  const time = getTimeAgo(job.postedAt);

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 border border-warning shadow-sm" style="border-radius: 12px; overflow: hidden;">
        <div class="bg-light px-3 py-2 border-bottom">
          <h6 class="fw-bold text-primary mb-0" style="font-size: .9rem;">
            ${job.title || 'Untitled Job'}
          </h6>
        </div>
        <div class="card-body bg-white" style="font-size: 0.95rem;">
          <p class="text-muted small mb-2">${shortContent}</p>
          <p class="mb-1 text-dark"><strong>🏢 Company:</strong> <span class="text-secondary">${job.company || 'N/A'}</span></p>
          <p class="mb-1 text-dark"><strong>📅 Last Date:</strong> <span class="text-danger">${job.lastDate || 'N/A'}</span></p>
          <p class="mb-1 text-dark"><strong>🎓 Qualification:</strong> <span class="text-muted">Any Graduate</span></p>
          <p class="mb-1 text-dark"><strong>📌 Job Type:</strong> 
            <span class="${job.type?.toLowerCase() === "government" ? "text-success fw-bold" : "text-info fw-bold"}">
              ${job.type || "Other"}
            </span>
          </p>
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

// 🔹 Global for pagination
let allJobs = [];
let currentPage = 1;
const jobsPerPage = 12;

// 🔹 Render Paginated Jobs
function renderPaginatedJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (!allJobs.length) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  const start = (currentPage - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const jobsToShow = allJobs.slice(start, end);

  const jobCardsHTML = jobsToShow.map(renderJobCard).join("");
  jobList.innerHTML = `
    <h5 class="fw-semibold text-warning mb-3">
      <i class="bi bi-broadcast-pin me-1"></i> Latest Job Updates
    </h5>
    <div class="row g-3">${jobCardsHTML}</div>
    <div class="d-flex justify-content-center mt-4">
      ${renderPaginationControls()}
    </div>
  `;
}

// 🔹 Pagination Controls
function renderPaginationControls() {
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  let buttons = "";
  for (let i = 1; i <= totalPages; i++) {
    buttons += `
      <button class="btn btn-sm ${i === currentPage ? "btn-success" : "btn-outline-success"} mx-1"
              onclick="changePage(${i})">${i}</button>
    `;
  }

  return buttons;
}

// 🔹 Change Page
window.changePage = function (page) {
  currentPage = page;
  renderPaginatedJobs();
};

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

    allJobs = [];
    snapshot.forEach((docSnap) => {
      const job = docSnap.data();
      const fullJob = { ...job, id: docSnap.id };
      allJobs.push(fullJob);
    });

    renderPaginatedJobs();

  } catch (error) {
    console.error("Error loading jobs:", error);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs. Please try again later.</p>";
  }
}

// 🔹 Auto Load
loadJobs();
