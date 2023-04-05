import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLudOEeKBZ-2DFpc7hNXahe5ekUQP3cUU",
  authDomain: "test-cgpa-calculator.firebaseapp.com",
  projectId: "test-cgpa-calculator",
  storageBucket: "test-cgpa-calculator.appspot.com",
  messagingSenderId: "480526974477",
  appId: "1:480526974477:web:3f3cb91dcd7e41570edf44",
  measurementId: "G-CH23LK98QX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase(app);
console.log(app);

//----- New Registration code start
document.getElementById("SignUp").addEventListener("click", function () {
  var name = document.getElementById("name").value;
  var regno = document.getElementById("regno").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  //For new registration
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      set(ref(database, "users/" + user.uid), {
        name: name,
        regno: regno,
        //year: year,
        email: email,
        password: password,
      });
      alert("Registration successfully!!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
      alert(error);
    });
});
//----- End

//----- Login code start
document.getElementById("LogIn").addEventListener("click", function () {
  var email = document.getElementById("login_email").value;
  var password = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      alert(user.email + " Login successfully!!!");
      window.location.replace("home.html");
      //document.getElementById("logout").style.display = "block";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});

document.getElementById("forgot").addEventListener("click", function () {
  var email = document.getElementById("login_email").value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });

  document.getElementById("logout").addEventListener("click", function () {
    signOut(auth)
      .then(() => {
        alert("Sign-out successful.");
        window.location.replace("index.html");
      })
      .catch((error) => {
        // An error happened.
        console.log("An error happened.");
      });
  });
});
