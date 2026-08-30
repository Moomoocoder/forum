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
    const selectedTopics = Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(function(cb) {
      return cb.value;
    });

    const selectedOrigins = Array.from(document.getElementById('origin').selectedOptions).map(function(opt) {
      return opt.value;
    });

    await addDoc(collection(db, "submissions"), {
      fullName: document.getElementById('fullName').value,
      preferredName: document.getElementById('preferred').value,
      school: document.getElementById('school').value || "",
      grade: document.getElementById('grade').value,
      currentCountry: document.getElementById('currentCountry').value,
      origin: selectedOrigins,
      howHeard: document.getElementById('howHeard').value || "",
      articleTitle: document.getElementById('Title').value,
      articleLink: document.getElementById('Link').value, 
      articleText: document.getElementById('article').value || "",
      topics: selectedTopics,
      submittedAt: new Date()
    });

    alert("Article submitted successfully!");
    document.getElementById('submissionForm').reset();

  } catch (error) {
    console.error("Error submitting form: ", error);
    alert("Something went wrong: " + error.message);
  }
});
