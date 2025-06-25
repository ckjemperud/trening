import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = window.db;

document.getElementById("øktForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const tittel = document.getElementById("tittel").value;
  const dato = document.getElementById("dato").value;
  const varighet = document.getElementById("varighet").value;
  const kommentar = document.getElementById("kommentar").value;

  try {
    await addDoc(collection(db, "økter"), {
      tittel,
      dato,
      varighet,
      kommentar
    });

    // Tøm skjemaet
    e.target.reset();
  } catch (err) {
    console.error("Feil ved lagring:", err);
  }
});
