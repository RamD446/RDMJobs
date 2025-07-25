// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
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
  appId: "1:850369074130:web:c96133288fb6cabdd82e0b",
  measurementId: "G-YM22P63R3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const createdDateInput = document.getElementById("createdDate");
const createModalEl = document.getElementById("createJobModal");
const createJobBtn = document.getElementById("createJobBtn");

// Initialize Quill Editor
const quill = new Quill("#quillEditor", {
  theme: "snow",
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "link"],
      [{ list: "ordered" }, { list: "bullet" }]
    ]
  }
});

// Auto-set today's date when modal opens
createModalEl.addEventListener("show.bs.modal", () => {
  const today = new Date().toISOString().split("T")[0];
  createdDateInput.value = today;
});




// Submit Job Form
jobForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const job = {
    title: document.getElementById("jobTitle").value,
    type: document.getElementById("jobType").value,
    content: quill.root.innerHTML,
    createdBy: "Yalla Ramana",
    email: "rdm409446@gmail.com",
    createdDate: createdDateInput.value,
    lastDate: document.getElementById("lastDate").value,
    postedAt: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "jobs"), job);
    jobForm.reset();
    quill.setText("");
    bootstrap.Modal.getInstance(createModalEl).hide();
    loadJobs();
  } catch (error) {
    console.error("Error saving job:", error);
    alert("Failed to save job.");
  }
});

let scrollInterval;

async function loadTrendingJobs() {
  const wrapper = document.getElementById("trendingJobsWrapper");
  wrapper.innerHTML = `
    <div class="text-center py-3">
      <div class="spinner-border text-success" role="status"></div><br>
      Loading trending jobs...
    </div>
  `;

  const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
  const snapshot = await getDocs(q);

  const jobs = [];
  snapshot.forEach((doc) => {
    const job = doc.data();
    if (job.title && job.content && jobs.length < 45) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = job.content;
      const firstImg = tempDiv.querySelector("img");
      const imageUrl = firstImg?.src || "assets/RDMjobslogo.png";

      jobs.push({
        id: doc.id,
        title: job.title.length > 80 ? job.title.slice(0, 80) + "..." : job.title,
        imageUrl,
        lastDate: job.lastDate || "N/A",
        content: job.content.replace(/<[^>]+>/g, '').slice(0, 100) + "..."
      });
    }
  });

  if (jobs.length === 0) {
    wrapper.innerHTML = `<p class="text-muted text-center">No trending jobs found.</p>`;
    return;
  }

  wrapper.innerHTML = `
    <div id="singleTrendingJob" class="single-job-display mb-4"></div>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3" id="relatedJobsFooter"></div>
  `;

  const displayBox = document.getElementById("singleTrendingJob");
  const relatedFooter = document.getElementById("relatedJobsFooter");

  let index = 0;

  function renderJob(i) {
    const job = jobs[i];
    displayBox.innerHTML = `
      <a href="job-details.html?jobId=${job.id}" class="d-flex align-items-start gap-3 text-decoration-none p-3 trending-single-card">
        <div class="flex-shrink-0">
          <img src="${job.imageUrl}" alt="${job.title}" class="rounded" style="width: 100px; height: 110px; object-fit: cover;">
        </div>
        <div class="text-body">
          <h6 class="fw-bold text-dark mb-1">${job.title}</h6>
          <p class="mb-1 text-muted small">${job.content}</p>
          <small class="text-muted">📅 Last Date: ${job.lastDate}</small>
        </div>
      </a>
    `;

   
  }

  function startSingleJobScroll() {
    renderJob(index);
    scrollInterval = setInterval(() => {
      index = (index + 1) % jobs.length;
      renderJob(index);
    }, 4000);
  }

  displayBox.addEventListener("mouseenter", () => clearInterval(scrollInterval));
  displayBox.addEventListener("mouseleave", () => startSingleJobScroll());

  startSingleJobScroll();
}
loadTrendingJobs();








async function loadJobs() {
  jobList.innerHTML = `
    <div class="text-center text-muted py-5">
      <div class="spinner-border text-success mb-3" role="status"></div><br>
      Loading jobs...
    </div>
  `;

  const q = query(collection(db, "jobs"), orderBy("postedAt", "desc"));
  const snapshot = await getDocs(q);
  jobList.innerHTML = "";

  if (snapshot.empty) {
    jobList.innerHTML = "<p class='text-center'>No jobs posted yet.</p>";
    return;
  }

  const jobGroups = {
    Government: [],
    Private: [],
    Software: [],
    AdmitCard: [],
    Result: [],
    UpcomingNotification: [],
  };

  const allJobs = [];

  snapshot.forEach((doc) => {
    const job = doc.data();
    const jobId = doc.id;
    allJobs.push({ ...job, id: jobId });

    if (!job.type || typeof job.type !== "string") return;

    const typeKey = job.type.replace(/\s+/g, "");
    if (jobGroups[typeKey] && jobGroups[typeKey].length < 5) {
      jobGroups[typeKey].push({ ...job, id: jobId });
    }
  });

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;

  const renderJobCard = (job) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = job.content;
    const firstImg = tempDiv.querySelector("img");
    const imageUrl = firstImg ? firstImg.src : "assets/RDMjobslogo.png";

    return `
      <a href="job-details.html?jobId=${job.id}" class="text-decoration-none text-dark d-block">
        <div class="d-flex align-items-center rounded bg-white shadow-sm p-2 mb-2 job-card" style="gap: 8px; min-height: auto;">
          <img src="${imageUrl}" alt="${job.title}" style="width: 115px; height: 70px; object-fit: cover; border-radius: 4px;" />
          <div class="flex-grow-1">
            
            <div class="fw-semibold text-dark" style="font-size: 0.75rem;">${truncateText(job.title, 60)}</div>
            <div class="badge bg-success mb-1" style="font-size: 0.65rem; padding: 3px 6px;">${job.type}</div>
          </div>
        </div>
      </a>
    `;
  };

  // ✅ "All Latest Information"
  const top20Jobs = allJobs.slice(0, 20);
  if (top20Jobs.length > 0) {
    const section = document.createElement("div");
    section.className = "mb-4";
    section.innerHTML = `<h5 class="mb-3 text-success">All Latest Information</h5><div class="row g-3"></div>`;

    const row = section.querySelector(".row");
    top20Jobs.forEach((job) => {
      const col = document.createElement("div");
      col.className = "col-12 col-md-6";
      col.innerHTML = renderJobCard(job);
      row.appendChild(col);
    });

    jobList.appendChild(section);
  }

  // ✅ Categorized Sections
  const types = ["Government", "Private", "Software", "AdmitCard", "Result", "UpcomingNotification"];
  let contentAdded = false;

  for (let i = 0; i < types.length; i += 2) {
    const row = document.createElement("div");
    row.className = "row";

    [types[i], types[i + 1]].forEach((type) => {
      const jobs = jobGroups[type] || [];
      const col = document.createElement("div");
      col.className = "col-12 col-md-6 mb-4";

      if (jobs.length === 0) {
        col.innerHTML = `
          <div class="bg-light rounded p-3 shadow-sm">
            <h6 class="text-success mb-2">${type.replace(/([A-Z])/g, " $1").trim()} Jobs</h6>
            <p class="text-muted small">No ${type.replace(/([A-Z])/g, " $1").trim()} jobs found.</p>
          </div>
        `;
        row.appendChild(col);
        return;
      }

      contentAdded = true;

const categoryTitles = {
  Government: "Government Jobs",
  Private: "Private Jobs",
  Software: "Software Jobs",
  AdmitCard: "Admit Card",
  Result: "All Job Results",
  UpcomingNotification: "All Upcoming Notifications",
};

const heading = `<h6 class="text-success mb-2">${categoryTitles[type] || type}</h6>`;

      const cardsHTML = heading + jobs.map(renderJobCard).join("");
      const moreBtn = `
        <div class="text-end mt-2">
          <a href="jobinformation.html?type=${encodeURIComponent(type)}" class="btn btn-sm btn-outline-success px-2 py-1" title="See All">
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </div>
      `;

      col.innerHTML = cardsHTML + moreBtn;
      row.appendChild(col);
    });

    jobList.appendChild(row);
  }

  if (!contentAdded) {
    jobList.innerHTML += "<p class='text-center text-muted'>No categorized jobs found to display.</p>";
  }
}

loadJobs();





