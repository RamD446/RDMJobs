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



loadJobs();
