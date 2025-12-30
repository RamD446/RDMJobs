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

// 🔹 Render Job List Item (for Today/Yesterday/Latest)
function renderJobListItem(job) {
  const time = getTimeAgo(job.postedAt);

  let lastDateHtml = "";
  if (job.lastDate) {
    const d = job.lastDate?.toDate ? job.lastDate.toDate() : new Date(job.lastDate);
    lastDateHtml = ` | <small class="text-danger">
      <i class="bi bi-calendar-x me-1"></i> Last Date: ${d.toLocaleDateString()}
    </small>`;
  }

  return `
    <li class="list-group-item d-flex justify-content-between align-items-center list-group-item-action clickable-card" 
        onclick="window.location='jobdetails.html?jobId=${job.id}'">
      <div>
        🔹 
        <span class="fw-semibold text-primary">${job.title || "Untitled Job"}</span>
        || <small class="${time.color}">
          <i class="bi bi-clock me-1"></i>${time.text}
        </small>
        ${lastDateHtml}
      </div>
    </li>
  `;
}

// 🔹 Render Jobs By Date with Popular Job Card
let latestVisibleCount = 15;
let allJobs = [];

function renderJobsByDate() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (!allJobs.length) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  const now = new Date();

  // ✅ Popular Job (first of type "Popular Job")
  const popularJob = allJobs.find(j => j.type === "Popular Job") || allJobs[0] || null;
  let popularHtml = "";

 if (popularJob) {
  // Extract first image from Quill content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = popularJob.content || "";
  const imgEl = tempDiv.querySelector("img");
  const imgHtml = imgEl ? `<img src="${imgEl.src}" class="img-fluid rounded-top mt-2 mb-2" alt="${popularJob.title}">` : "";

  // Extract first 200 chars of text
  const snippetText = tempDiv.textContent || "";
  const snippet = snippetText.length > 200 ? snippetText.slice(0, 200) + "..." : snippetText;

  popularHtml = `
   <div class="card shadow-sm mb-3 clickable-card border-primary h-100 hover-card"
     onclick="window.location='jobdetails.html?jobId=${popularJob.id}'">
  <div class="card-body">
    <span class="badge bg-primary mb-2">${popularJob.type || "Popular Job"}</span>

    <h5 class="card-title text-primary fw-bold">
      ${popularJob.title}
    </h5>

    ${imgHtml}

    <p class="card-text mt-2">
      ${snippet}
    </p>

    <!-- ✅ More Details Button -->
    <div class="text-end mt-2">
      <button class="btn btn-sm btn-outline-primary"
        onclick="event.stopPropagation(); window.location='jobdetails.html?jobId=${popularJob.id}'">
        More Details »
      </button>
    </div>
  </div>
</div>

  `;
}


  // ✅ Today Jobs
  const todayJobs = allJobs.filter(j => {
    const d = j.postedAt?.toDate ? j.postedAt.toDate() : new Date(j.postedAt);
    return d.toDateString() === now.toDateString();
  }).slice(0, 5);

  // ✅ Yesterday/Previous Jobs
  let yesterdayJobs = [];
  let yesterdayTitle = "Yesterday’s Job Notifications";
  const yest = new Date(now);
  yest.setDate(yest.getDate() - 1);

  yesterdayJobs = allJobs.filter(j => {
    const d = j.postedAt?.toDate ? j.postedAt.toDate() : new Date(j.postedAt);
    return d.toDateString() === yest.toDateString();
  }).slice(0, 5);

  if (yesterdayJobs.length === 0) {
    const todayIds = todayJobs.map(j => j.id);
    yesterdayJobs = allJobs.filter(j => !todayIds.includes(j.id)).slice(0, 5);
    yesterdayTitle = "Previous Job Notifications";
  }

  // ✅ Row with 3 equal columns
  jobList.innerHTML = `
    <div class="row g-3">
      <!-- Popular Job -->
      <div class="col-md-4">
        ${popularHtml}
      </div>

      <!-- Today Jobs -->
      <div class="col-md-4">
        <div class="card shadow-sm border-success h-100 hover-card">
          <div class="card-header bg-success text-white fw-bold">
            <i class="bi bi-calendar-event me-1"></i> Today’s Jobs
          </div>
          <ul class="list-group list-group-flush">
            ${todayJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No jobs today.</li>"}
          </ul>
        </div>
      </div>

      <!-- Yesterday/Previous Jobs -->
      <div class="col-md-4">
        <div class="card shadow-sm border-warning h-100 hover-card">
          <div class="card-header bg-warning text-dark fw-bold">
            <i class="bi bi-calendar-check me-1"></i> ${yesterdayTitle}
          </div>
          <ul class="list-group list-group-flush">
            ${yesterdayJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No previous jobs.</li>"}
          </ul>
        </div>
      </div>
    </div>

    <!-- Latest Jobs -->
    <div class="card border-primary shadow-sm mt-4">
      <div class="card-header bg-primary text-white fw-bold">
        <i class="bi bi-list-ul me-1"></i> Latest Jobs
      </div>
      <ul class="list-group list-group-flush" id="latest-jobs-list">
        ${allJobs.slice(0, latestVisibleCount).map(renderJobListItem).join("")}
      </ul>
      <div class="card-footer text-center">
        ${latestVisibleCount < allJobs.length ? 
          `<button class="btn btn-outline-primary btn-sm" id="loadMoreBtn">Load More Jobs</button>` : ""}
      </div>
    </div>
  `;

  // Load More Button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      latestVisibleCount += 15;
      renderJobsByDate();
    });
  }
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

    allJobs = [];
    snapshot.forEach(docSnap => {
      allJobs.push({ id: docSnap.id, ...docSnap.data() });
    });

    renderJobsByDate();
  } catch (err) {
    console.error("Error loading jobs:", err);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs.</p>";
  }
}

// 🔹 Auto Load
loadJobs();

// 🔹 Smooth Scroll
window.scrollToSection = function(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 70;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  }
};
