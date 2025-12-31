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

// 🔹 Render Job List Item (❌ lastDate REMOVED)
function renderJobListItem(job) {
  const time = getTimeAgo(job.postedAt);

  return `
    <li class="list-group-item list-group-item-action clickable-card"
        onclick="window.location='jobdetails.html?jobId=${job.id}'">
      🔹 
      <span class="fw-semibold text-primary">${job.title || "Untitled Job"}</span>
      <small class="${time.color} ms-2">
        <i class="bi bi-clock me-1"></i>${time.text}
      </small>
    </li>
  `;
}

// 🔹 Render Jobs
let latestVisibleCount = 15;
let allJobs = [];

function renderJobsByDate() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (!allJobs.length) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  // ✅ Popular Job (same logic)
  const popularJob = allJobs.find(j => j.type === "Popular Job") || allJobs[0];
  let popularHtml = "";

  if (popularJob) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = popularJob.content || "";
    const imgEl = tempDiv.querySelector("img");
    const imgHtml = imgEl
      ? `<img src="${imgEl.src}" class="img-fluid rounded mt-2 mb-2">`
      : "";

    const text = tempDiv.textContent || "";
    const snippet = text.length > 200 ? text.slice(0, 200) + "..." : text;

    popularHtml = `
      <div class="card shadow-sm border-primary h-100 clickable-card"
           onclick="window.location='jobdetails.html?jobId=${popularJob.id}'">
        <div class="card-body">
          <h5 class="fw-bold text-primary">${popularJob.title}</h5>
          ${imgHtml}
          <p class="mt-2">${snippet}</p>
          <div class="text-end">
            <button class="btn btn-sm btn-outline-primary"
              onclick="event.stopPropagation();window.location='jobdetails.html?jobId=${popularJob.id}'">
              More Details »
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ✅ TOP 5 LATEST JOBS (NO DATE FILTER)
  const todayJobs = allJobs.slice(0, 5);

  jobList.innerHTML = `
    <div class="row g-3">
      <div class="col-md-4">
        ${popularHtml}
      </div>

      <div class="col-md-8">
        <div class="card shadow-sm border-success">
          <div class="card-header bg-success text-white fw-bold">
            <i class="bi bi-lightning me-1"></i> Top 5 Latest Jobs
          </div>
          <ul class="list-group list-group-flush">
            ${todayJobs.map(renderJobListItem).join("")}
          </ul>
        </div>
      </div>
    </div>

    <!-- Latest Jobs -->
    <div class="card border-primary shadow-sm mt-4">
      <div class="card-header bg-primary text-white fw-bold">
        <i class="bi bi-list-ul me-1"></i> Latest all Jobs
      </div>
      <ul class="list-group list-group-flush">
        ${allJobs.slice(0, latestVisibleCount).map(renderJobListItem).join("")}
      </ul>
      <div class="card-footer text-center">
        ${
          latestVisibleCount < allJobs.length
            ? `<button class="btn btn-outline-primary btn-sm" id="loadMoreBtn">Load More Jobs</button>`
            : ""
        }
      </div>
    </div>
  `;

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.onclick = () => {
      latestVisibleCount += 15;
      renderJobsByDate();
    };
  }
}

// 🔹 Load Jobs
export async function loadJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-success"></div>
      <p class="mt-2">Loading jobs...</p>
    </div>
  `;

  try {
    const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
    const snapshot = await getDocs(q);

    allJobs = [];
    snapshot.forEach(doc => {
      allJobs.push({ id: doc.id, ...doc.data() });
    });

    renderJobsByDate();
  } catch (e) {
    console.error(e);
    jobList.innerHTML = "<p class='text-danger text-center'>Failed to load jobs.</p>";
  }
}

// 🔹 Auto Load
loadJobs();
