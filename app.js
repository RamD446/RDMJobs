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
  };

  // Collect top 5 jobs for each type
  snapshot.forEach((doc) => {
    const job = doc.data();
    const jobId = doc.id;
    if (job.type === "Government" && jobGroups.Government.length < 5) {
      jobGroups.Government.push({ ...job, id: jobId });
    } else if (job.type === "Private" && jobGroups.Private.length < 5) {
      jobGroups.Private.push({ ...job, id: jobId });
    }
  });

  const section = document.createElement("div");
  section.className = "row";

  // Helper to truncate text
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
  }

  // Create one column for each type
  ["Government", "Private"].forEach((type) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 mb-4";

    const heading = `<h5 class="mb-3 text-success">${type} Jobs</h5>`;
    const moreBtn = `
      <div class="text-end mt-3">
        <a href="jobinformation.html?type=${encodeURIComponent(type)}" class="btn btn-sm btn-outline-success">More ${type} Jobs</a>
      </div>
    `;

    const cards = jobGroups[type].map((job) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = job.content;
      const firstImg = tempDiv.querySelector("img");
      const imageUrl = firstImg ? firstImg.src : "assets/RDMjobslogo.png";

      return `
        <a href="job-details.html?jobId=${job.id}" class="text-decoration-none text-dark d-block mb-3">
          <div class="border rounded shadow-sm p-3">
            <div class="row g-2">
              <div class="col-4">
                <img src="${imageUrl}" class="img-fluid rounded w-100" alt="${job.title}" />
              </div>
              <div class="col-8">
                <span class="badge bg-primary mb-1">${job.type}</span>
                <h6 class="mb-1">${truncateText(job.title, 70)}</h6>
                <div class="text-muted small">By <strong>${job.createdBy}</strong></div>
              </div>
            </div>
          </div>
        </a>
      `;
    }).join("");

    col.innerHTML = heading + cards + moreBtn;
    section.appendChild(col);
  });

  jobList.appendChild(section);
}





loadJobs();
