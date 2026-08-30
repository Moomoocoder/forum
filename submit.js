import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqV8rhdlnx74m_XF311IaX_shNdS3Bntc",
  authDomain: "forum-b2b70.firebaseapp.com",
  projectId: "forum-b2b70",
  storageBucket: "forum-b2b70.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.getElementById('submissionForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('articleFile');
  let fileUrl = "";

  try {
    // 1. Upload File to Storage (if a file was selected)
    if (fileInput && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const storageRef = ref(storage, 'articles/' + Date.now() + '_' + file.name);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    // 2. Gather Checked Topics
    const selectedTopics = Array.from(document.querySelectorAll('input[name="topics"]:checked')).map(cb => cb.value);

    // 3. Save matching HTML values into Firestore
    await addDoc(collection(db, "submissions"), {
      fullName: document.getElementById('fullName').value,
      preferredName: document.getElementById('preferredName').value,
      school: document.getElementById('school').value,
      grade: document.getElementById('grade').value,
      currentCountry: document.getElementById('currentCountry').value,
      articleTitle: document.getElementById('articleTitle').value,
      articleText: document.getElementById('article').value,
      topics: selectedTopics,
      fileUrl: fileUrl,
      submittedAt: new Date()
    });

    alert("Article submitted successfully!");
    document.getElementById('submissionForm').reset();

  } catch (error) {
    console.error("Error submitting form: ", error);
    alert("Error submitting article. Check browser console for details.");
  }
});
