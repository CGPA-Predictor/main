import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLudOEeKBZ-2DFpc7hNXahe5ekUQP3cUU",
  authDomain: "test-cgpa-calculator.firebaseapp.com",
  projectId: "test-cgpa-calculator",
  storageBucket: "test-cgpa-calculator.appspot.com",
  messagingSenderId: "480526974477",
  appId: "1:480526974477:web:3f3cb91dcd7e41570edf44",
  measurementId: "G-CH23LK98QX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

var cpy;
var name1;

onAuthStateChanged(auth, (user) => {
  if (user) {
    var uid = user.uid;
    cpy = uid;
    alert(uid.name);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${uid}`))
      .then((snapshot) => {
        const name = document.querySelector("#name");
        name1 = snapshot.child("name").val();
        name.innerHTML = snapshot.child("name").val();
        document.getElementById("regno").value = snapshot.child("regno").val();
        document.getElementById("email").value = snapshot.child("email").val();
        document.getElementById("cgpa").value = snapshot.child("cgpa").val();
        document.getElementById("branch").value = snapshot
          .child("branch")
          .val();
        document.getElementById("semester").value = snapshot
          .child("semester")
          .val();
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // User is signed out
    // ...
  }
});

const semesterInput = document.getElementById("semester");
const regNoInput = document.getElementById("regno");
const branchInput = document.getElementById("branch");
const cgpaInput = document.getElementById("cgpa");
const emailInput = document.getElementById("email");
const updateBtn = document.getElementById("update-btn");
const saveBtn = document.getElementById("save-btn");

semesterInput.setAttribute("disabled", true);
regNoInput.setAttribute("disabled", true);
branchInput.setAttribute("disabled", true);
cgpaInput.setAttribute("disabled", true);
emailInput.setAttribute("disabled", true);
updateBtn.removeAttribute("disabled");
saveBtn.setAttribute("disabled", true);

updateBtn.addEventListener("click", () => {
  alert(document.getElementById("regno").value);
  semesterInput.removeAttribute("disabled");
  regNoInput.removeAttribute("disabled");
  branchInput.removeAttribute("disabled");
  cgpaInput.removeAttribute("disabled");
  emailInput.removeAttribute("disabled");
  updateBtn.setAttribute("disabled", true);
  saveBtn.removeAttribute("disabled");
});

// Save updated values when save button is clicked
saveBtn.addEventListener("click", (e) => {
  semesterInput.setAttribute("disabled", true);
  regNoInput.setAttribute("disabled", true);
  branchInput.setAttribute("disabled", true);
  cgpaInput.setAttribute("disabled", true);
  emailInput.setAttribute("disabled", true);
  updateBtn.removeAttribute("disabled");
  saveBtn.setAttribute("disabled", true);
  const db = getDatabase();
  alert(name1);
  const postData = {
    name: name1,
    semester: document.getElementById("semester").value,
    regno: document.getElementById("regno").value,
    email: document.getElementById("email").value,
    cgpa: document.getElementById("cgpa").value,
    branch: document.getElementById("branch").value,
  };
  const updates = {};
  updates["users/" + cpy + "/"] = postData;
  return update(ref(db), updates);
});
