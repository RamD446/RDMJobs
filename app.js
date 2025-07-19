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

// Admin Login Handler
document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value.trim();
  const adminError = document.getElementById("adminError");

  if (email === "446" && password === "446") {
    createJobBtn.classList.remove("d-none");
    adminError.classList.add("d-none");
    bootstrap.Modal.getInstance(document.getElementById("adminLoginModal")).hide();
    alert("Admin access granted");
  } else {
    adminError.classList.remove("d-none");
  }
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
    if (job.title && job.content && jobs.length < 10) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = job.content;
      const firstImg = tempDiv.querySelector("img");
      const imageUrl = firstImg ? firstImg.src : "assets/RDMjobslogo.png";

      jobs.push({
        id: doc.id,
        title: job.title.length > 70 ? job.title.slice(0, 70) + "..." : job.title,
        imageUrl,
      });
    }
  });

  if (jobs.length === 0) {
    wrapper.innerHTML = `<p class="text-muted">No trending jobs found.</p>`;
    return;
  }

  const carouselId = "trendingCarousel";
  const slides = jobs.map((job, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <a href="job-details.html?jobId=${job.id}" class="d-block text-decoration-none text-center">
        <img src="${job.imageUrl}" class="trending-carousel-img mx-auto" alt="${job.title}">
        <div class="trending-carousel-title mt-2">${job.title}</div>
      </a>
    </div>
  `).join("");

  wrapper.innerHTML = `
    <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="hover">
      <div class="carousel-inner">
        ${slides}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
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

  // Group jobs safely by type (preventing crash on missing job.type)
  snapshot.forEach((doc) => {
    const job = doc.data();
    const jobId = doc.id;

    if (!job.type || typeof job.type !== 'string') {
      console.warn(`Skipping job ${jobId} due to missing or invalid 'type'`);
      return;
    }

    const typeKey = job.type.replace(/\s+/g, "");
    if (jobGroups[typeKey] && jobGroups[typeKey].length < 5) {
      jobGroups[typeKey].push({ ...job, id: jobId });
    }
  });

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength).trim() + "" : text;
  }

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
          <h5 class="mb-3 text-success">${type.replace(/([A-Z])/g, ' $1').trim()} Jobs</h5>
          <div class="text-muted small">No ${type.replace(/([A-Z])/g, ' $1').trim()} jobs found.</div>
        `;
        row.appendChild(col);
        return;
      }

      contentAdded = true;

      const heading = `<h5 class="mb-3 text-success">${type.replace(/([A-Z])/g, ' $1').trim()} Jobs</h5>`;
      const moreBtn = `
        <div class="text-end mt-3">
          <a href="jobinformation.html?type=${encodeURIComponent(type)}" class="btn btn-sm btn-outline-success">More ${type.replace(/([A-Z])/g, ' $1').trim()} Jobs</a>
        </div>
      `;

      const cards = jobs.map((job) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = job.content;
        const firstImg = tempDiv.querySelector("img");
        const imageUrl = firstImg ? firstImg.src : "assets/RDMjobslogo.png";

        return `
          <a href="job-details.html?jobId=${job.id}" class="text-decoration-none text-dark d-block mb-3">
            <div class="border rounded shadow-sm p-2 position-relative" style="min-height: 80px;">
              <i class="bi bi-heart-fill text-danger position-absolute top-0 end-0 m-2" style="font-size: 0.8rem;"></i>
              <div class="d-flex gap-2 align-items-start">
                <img src="${imageUrl}" class="rounded" style="width: 70px; height: 70px; object-fit: cover;" alt="${job.title}" />
                <div class="flex-grow-1">
                  <span class="badge bg-primary mb-1">${job.type}</span>
                  <h6 class="mb-1" style="font-size: 0.9rem;">${truncateText(job.title, 80)}</h6>
                  <div class="text-muted small">Posted By: <strong>${job.createdBy}</strong></div>
                </div>
              </div>
            </div>
          </a>
        `;
      }).join("");

      col.innerHTML = heading + cards + moreBtn;
      row.appendChild(col);
    });

    jobList.appendChild(row);
  }

  // If nothing rendered
  if (!contentAdded) {
    jobList.innerHTML = "<p class='text-center text-muted'>No categorized jobs found to display.</p>";
  }
}


loadJobs();

