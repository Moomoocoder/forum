import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqV8rhdlnx74m_XF311IaX_shNdS3Bntc",
  authDomain: "forum-b2b70.firebaseapp.com",
  projectId: "forum-b2b70",
  storageBucket: "forum-b2b70.firebasestorage.app"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("submissionForm");

form.addEventListener("submit", async function(e) {e.preventDefault();

  const topics = [];

  document.querySelectorAll('input[name="topics"]:checked').forEach(function(box) {
    topics.push(box.value);});

  const origins = [];
  const originOptions = document.getElementById("origin").selectedOptions;

  for (let i = 0; i < originOptions.length; i++) {
    origins.push(originOptions[i].value);}

  const data = {
    fullName: document.getElementById("fullName").value,
    preferredName: document.getElementById("preferred").value,
    school: document.getElementById("school").value,
    grade: document.getElementById("grade").value,
    currentCountry: document.getElementById("currentCountry").value,
    origin: origins,
    howHeard: document.getElementById("howHeard").value,
    articleTitle: document.getElementById("Title").value,
    articleLink: document.getElementById("Link").value,
    articleText: document.getElementById("article").value,
    topics: topics,
    submittedAt: new Date()};

  try {
    await addDoc(collection(db, "submissions"), data);

    alert("Article submitted successfully!");
    form.reset();
  } catch (error) {
    console.log(error);
    alert("There was an error submitting the article.");
  }});
