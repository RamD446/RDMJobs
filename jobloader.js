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

// 🔹 Render Job List Item
function renderJobListItem(job) {
  const time = getTimeAgo(job.postedAt);
  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        🔹 
        <a href="job-details.html?jobId=${job.id}" class="fw-semibold text-decoration-none text-primary">
          ${job.title || "Untitled Job"}
        </a> || <small class="${time.color}">
        <i class="bi bi-clock me-1"></i>${time.text}
      </small>
      </div>
      
    </li>
  `;
}

// 🔹 Render Split View (Govt & Private Jobs)
function renderSplitJobLists() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (!allJobs.length) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  // Separate jobs into govt & private
  const govtJobs = allJobs.filter(j => (j.type || "").toLowerCase().includes("gov")).slice(0, 20);
  const privateJobs = allJobs.filter(j => (j.type || "").toLowerCase().includes("private")).slice(0, 20);

  // Build HTML
  jobList.innerHTML = `
    <div class="row g-3">
      <!-- Government Jobs -->
      <div class="col-md-6">
        <div class="card border-success shadow-sm h-100">
          <div class="card-header bg-success text-white fw-bold d-flex justify-content-between align-items-center">
            <span><i class="bi bi-bank me-1"></i> Government Job Stories</span>
            <button class="btn btn-sm btn-light" onclick="location.href='government.html'">
              More <i class="bi bi-arrow-right-circle ms-1"></i>
            </button>
          </div>
          <ul class="list-group list-group-flush">
            ${govtJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No government jobs found.</li>"}
          </ul>
        </div>
      </div>

      <!-- Private Jobs -->
      <div class="col-md-6">
        <div class="card border-warning shadow-sm h-100">
          <div class="card-header bg-warning text-dark fw-bold d-flex justify-content-between align-items-center">
            <span><i class="bi bi-briefcase-fill me-1"></i> Private Job Stories</span>
            <button class="btn btn-sm btn-dark" onclick="location.href='private.html'">
              More <i class="bi bi-arrow-right-circle ms-1"></i>
            </button>
          </div>
          <ul class="list-group list-group-flush">
            ${privateJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No private jobs found.</li>"}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// 🔹 Global Jobs
let allJobs = [];

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

    renderSplitJobLists();

  } catch (error) {
    console.error("Error loading jobs:", error);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs. Please try again later.</p>";
  }
}

// 🔹 Auto Load
loadJobs();
