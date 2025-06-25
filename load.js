import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = window.db;

async function hentØkter() {
  const økterRef = collection(db, "økter");
  const snapshot = await getDocs(økterRef);

  const container = document.querySelector(".økt-liste");
  container.innerHTML = ""; // Tøm eksisterende

  snapshot.forEach(doc => {
    const data = doc.data();
    const html = `
      <article class="økt" data-id="${doc.id}">
        <h2>${data.tittel}</h2>
        <p><strong>Dato:</strong> <span class="dato">${data.dato}</span></p>
        <p><strong>Varighet:</strong> <span class="varighet">${data.varighet}</span></p>
        <p><strong>Kommentar:</strong> <span class="kommentar">${data.kommentar}</span></p>
        <button class="rediger-btn">Rediger</button>
      </article>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

hentØkter();
