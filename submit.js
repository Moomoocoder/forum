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
    
    const file = document.getElementById('articleFile').files[0];
    const storageRef = ref(storage, 'articles/' + Date.now() + '_' + file.name);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "submissions"), {
        authorName: document.getElementById('authorName').value,
        authorEmail: document.getElementById('authorEmail').value,
        title: document.getElementById('title').value,
        abstract: document.getElementById('abstract').value,
        fileUrl: fileUrl,
        submittedAt: new Date()
      });

      alert("Article submitted successfully!");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  });