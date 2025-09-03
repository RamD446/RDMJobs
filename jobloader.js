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

  // Last Date to Apply (only if available)
  let lastDateHtml = "";
  if (job.lastDate) {
    const d = job.lastDate?.toDate ? job.lastDate.toDate() : new Date(job.lastDate);
    lastDateHtml = ` | <small class="text-danger">
      <i class="bi bi-calendar-x me-1"></i> Last Date: ${d.toLocaleDateString()}
    </small>`;
  }

  return `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <div>
        🔹 
        <a href="jobdetails.html?jobId=${job.id}" class="fw-semibold text-decoration-none text-primary">
          ${job.title || "Untitled Job"}
        </a> 
        || <small class="${time.color}">
          <i class="bi bi-clock me-1"></i>${time.text}
        </small>
        ${lastDateHtml}
      </div>
    </li>
  `;
}

// 🔹 Render Today, Yesterday/Previous & Latest Jobs
let latestVisibleCount = 15; // how many jobs visible initially

function renderJobsByDate() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (!allJobs.length) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  const now = new Date();

  // ✅ Today Jobs
  const todayJobs = allJobs.filter(j => {
    const d = j.postedAt?.toDate ? j.postedAt.toDate() : new Date(j.postedAt);
    return d.toDateString() === now.toDateString();
  }).slice(0, 5);

  // ✅ Yesterday Jobs
  let yesterdayJobs = [];
  let yesterdayTitle = "Yesterday’s Job Notifications";

  const yest = new Date(now);
  yest.setDate(yest.getDate() - 1);

  yesterdayJobs = allJobs.filter(j => {
    const d = j.postedAt?.toDate ? j.postedAt.toDate() : new Date(j.postedAt);
    return d.toDateString() === yest.toDateString();
  }).slice(0, 5);

  // ✅ If no actual yesterday jobs, fallback to previous 5 (after today’s jobs)
  if (yesterdayJobs.length === 0) {
    const todayIds = todayJobs.map(j => j.id);
    yesterdayJobs = allJobs.filter(j => !todayIds.includes(j.id)).slice(0, 5);
    yesterdayTitle = "Previous Job Notifications";
  }

  // ✅ Latest Jobs (all, but controlled display)
  const latestJobs = allJobs; 

  jobList.innerHTML = `
    <div class="row g-3 mb-4">
      <!-- Today's Jobs -->
      <div class="col-md-6" id="today-jobs">
        <div class="card border-success shadow-sm h-100">
          <div class="card-header bg-success text-white fw-bold">
            <i class="bi bi-calendar-event me-1"></i> Today’s Job Notifications
          </div>
          <ul class="list-group list-group-flush">
            ${todayJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No jobs posted today.</li>"}
          </ul>
        </div>
      </div>

      <!-- Yesterday / Previous Jobs -->
      <div class="col-md-6" id="previous-jobs">
        <div class="card border-warning shadow-sm h-100">
          <div class="card-header bg-warning text-dark fw-bold">
            <i class="bi bi-calendar-check me-1"></i> ${yesterdayTitle}
          </div>
          <ul class="list-group list-group-flush">
            ${yesterdayJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No jobs found.</li>"}
          </ul>
        </div>
      </div>
    </div>

    <!-- Latest Jobs -->
    <div class="card border-primary shadow-sm" id="latest-jobs">
      <div class="card-header bg-primary text-white fw-bold">
        <i class="bi bi-list-ul me-1"></i> Latest Job Notifications
      </div>
      <ul class="list-group list-group-flush" id="latest-jobs-list">
        ${latestJobs.slice(0, latestVisibleCount).map(renderJobListItem).join("")}
      </ul>
      <div class="card-footer text-center" id="load-more-container">
        ${latestVisibleCount < latestJobs.length ? 
          `<button class="btn btn-outline-primary btn-sm" id="loadMoreBtn">
            Load More Jobs
          </button>` 
        : ""}
      </div>
    </div>
  `;

  // Attach Load More event
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      latestVisibleCount += 15;
      renderJobsByDate(); // re-render with more jobs
    });
  }
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

    renderJobsByDate();

  } catch (error) {
    console.error("Error loading jobs:", error);
    jobList.innerHTML = "<p class='text-center text-danger'>Failed to load jobs. Please try again later.</p>";
  }
}

// 🔹 Auto Load
loadJobs();

// 🔹 Smooth Scroll to Sections
window.scrollToSection = function (id) {
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 70; // fixed header height
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });

    // 🔹 Close the offcanvas if open
    const offcanvasEl = document.querySelector("#mainMenu");
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) bsOffcanvas.hide();
    }
  }
};
