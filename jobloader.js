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
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = job.content || '';
  const text = (tempDiv.textContent || '').trim();
  const snippet = text.length > 200 ? text.slice(0, 200) + '...' : text;
  const timeClass = 'job-time';

  return `
    <li class="list-group-item list-group-item-action clickable-card">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center" onclick="window.location='jobdetails.html?jobId=${job.id}'" style="cursor:pointer;">
        <div style="flex:1; min-width:0;">
          <div class="d-flex align-items-baseline gap-2">
            <span class="fw-semibold text-primary">${job.title || "Untitled Job"}</span>
          </div>
          <div class="job-snippet text-muted mt-2">${snippet}</div>
          <small class="${timeClass} d-block mt-2"><i class="bi bi-clock me-1"></i>${time.text}</small>
        </div>
        <div class="mt-2 mt-md-0 ms-md-3 text-md-end">
          <button class="btn btn-sm btn-outline-primary continue-btn" onclick="event.stopPropagation(); window.location='jobdetails.html?jobId=${job.id}'">Continue reading</button>
        </div>
      </div>
    </li>
  `;
}

// 🔹 Render Jobs By Date with Popular Job Card
let latestVisibleCount = 10; // show top 10 by default
let allJobs = [];
let currentFilter = 'All';

function renderJobsByDate() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  if (!allJobs.length) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  // Apply filter
  const filteredJobs = currentFilter === 'All' ? allJobs : allJobs.filter(j => j.type === currentFilter);

  // Popular Job (preferred from filtered set)
  const popularJob = filteredJobs.find(j => j.type === "Popular Job") || filteredJobs[0] || allJobs[0] || null;
  let popularHtml = "";

  if (popularJob) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = popularJob.content || "";
    const imgEl = tempDiv.querySelector("img");
    const imgHtml = imgEl ? `<img src="${imgEl.src}" class="popular-image" alt="${popularJob.title}">` : "";
    const snippetText = tempDiv.textContent || "";
    const snippet = snippetText.length > 200 ? snippetText.slice(0, 200) + "..." : snippetText;
    const popularTime = getTimeAgo(popularJob.postedAt);

    const popularTimeClass = 'job-time';

    popularHtml = `
      <div class="card shadow-sm mb-3 popular-card clickable-card border-primary hover-card"
           onclick="window.location='jobdetails.html?jobId=${popularJob.id}'">
        ${imgHtml}
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-primary fw-bold">${popularJob.title}</h5>
          <p class="card-text mt-2 mb-2 popular-snippet">${snippet}</p>
          <small class="${popularTimeClass} mt-auto"><i class="bi bi-clock me-1"></i>${popularTime.text}</small>
          <div class="text-end mt-2">
            <button class="btn btn-sm btn-outline-primary"
              onclick="event.stopPropagation(); window.location='jobdetails.html?jobId=${popularJob.id}'">More Details »</button>
          </div>
        </div>
      </div>`;
  }

  // Today's top 5 (for right column)
  const now = new Date();
  const todayJobs = allJobs.filter(j => {
    const d = j.postedAt?.toDate ? j.postedAt.toDate() : new Date(j.postedAt);
    return d.toDateString() === now.toDateString();
  }).slice(0, 5);

  // Filter select HTML (moved into header)
  const filterOptions = `
    <option value="All">All Jobs</option>
    <option value="Popular Job">Popular Job</option>
    <option value="Government Job">Government Job</option>
    <option value="Private Job">Private Job</option>
    <option value="Work From Home">Work From Home</option>
  `;

  // Latest jobs list (from filtered set)
  jobList.innerHTML = `
    <div class="row g-3">

      <!-- Right column: popular + today's top 5 -->
      <div class="col-lg-4">
        ${popularHtml}

        <div class="card shadow-sm border-success mt-3">
          <div class="card-header bg-success text-white fw-bold">
            <i class="bi bi-calendar-event me-1"></i> Today's Top 5
          </div>
          <ul class="list-group list-group-flush">
            ${todayJobs.map(renderJobListItem).join("") || "<li class='list-group-item text-muted'>No jobs today.</li>"}
          </ul>
        </div>
      </div>

      <!-- Left/center column: filter in header + latest jobs -->
      <div class="col-lg-8">
        <div class="card border-primary shadow-sm">
          <div class="card-header bg-primary text-white fw-bold d-flex align-items-center gap-3">
            <select id="jobFilter" class="form-select form-select-sm" style="width:220px;">
              ${filterOptions}
            </select>
            <div class="flex-grow-1"><i class="bi bi-list-ul me-1"></i> Latest Jobs</div>
            <small class="text-white-50">${currentFilter === 'All' ? '' : currentFilter}</small>
          </div>

          <ul class="list-group list-group-flush" id="latest-jobs-list">
            ${filteredJobs.slice(0, latestVisibleCount).map(renderJobListItem).join("") || '<li class="list-group-item text-muted">No jobs found for this filter.</li>'}
          </ul>

          <div class="card-footer text-center" id="latest-footer">
            ${latestVisibleCount < filteredJobs.length ? `<button class="btn btn-outline-primary btn-sm" id="loadMoreBtn">Load More Jobs</button>` : ''}
          </div>
        </div>
      </div>

    </div>
  `;

  // Set filter select value and handler
  const jobFilterEl = document.getElementById('jobFilter');
  if (jobFilterEl) {
    jobFilterEl.value = currentFilter;
    jobFilterEl.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      latestVisibleCount = 10; // reset
      renderJobsByDate();
    });
  }

  // Load More Button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", (e) => {
      latestVisibleCount += 10;
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
