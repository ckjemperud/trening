import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = window.db;

export function monitorsession() {
  const økterRef = collection(db, "økter");
  const container = document.querySelector(".økt-liste");

  onSnapshot(økterRef, (snapshot) => {
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
  });
}
