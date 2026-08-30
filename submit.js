import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqV8rhdlnx74m_XF311IaX_shNdS3Bntc",
  authDomain: "forum-b2b70.firebaseapp.com",
  projectId: "forum-b2b70",
  storageBucket: "forum-b2b70.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('submissionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    // 1. Gather Checked Topics
    const selectedTopics = Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(cb => cb.value);

await addDoc(collection(db, "submissions"), {
  fullName: document.getElementById('fullName').value,
  preferredName: document.getElementById('preferredName').value,
  school: document.getElementById('school').value || "",
  grade: document.getElementById('grade').value,
  currentCountry: document.getElementById('currentCountry').value,
  articleTitle: document.getElementById('articleTitle').value,
  articleText: document.getElementById('article').value || "",
  
  // Update this line:
  articleLink: document.getElementById('articleLink').value, 
  
  topics: selectedTopics,
  submittedAt: new Date()
});
    alert("Article submitted successfully!");
    document.getElementById('submissionForm').reset();

  } catch (error) {
    console.error("Error submitting form: ", error);
    alert("Error submitting article: " + error.message);
  }
});
