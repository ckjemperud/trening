import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();

// Logg inn
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (err) {
    alert("Feil ved innlogging: " + err.message);
  }
});

// Logg ut
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});

// Vis/skjul basert på innlogging
onAuthStateChanged(auth, (user) => {
  const skjema = document.querySelector(".ny-økt");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (user) {
    skjema.style.display = "block";
    loginForm.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    skjema.style.display = "none";
    loginForm.style.display = "block";
    logoutBtn.style.display = "none";
  }
});
