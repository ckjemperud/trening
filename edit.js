import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = window.db;

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("rediger-btn")) {
    const btn = e.target;
    const økt = btn.closest(".økt");
    const id = økt.dataset.id;

    const datoEl = økt.querySelector(".dato");
    const varighetEl = økt.querySelector(".varighet");
    const kommentarEl = økt.querySelector(".kommentar");

    if (!btn.classList.contains("lagre")) {
      datoEl.innerHTML = `<input type="text" value="${datoEl.textContent}" />`;
      varighetEl.innerHTML = `<input type="text" value="${varighetEl.textContent}" />`;
      kommentarEl.innerHTML = `<textarea>${kommentarEl.textContent}</textarea>`;
      btn.textContent = "Lagre";
      btn.classList.add("lagre");
    } else {
      const nyDato = datoEl.querySelector("input").value;
      const nyVarighet = varighetEl.querySelector("input").value;
      const nyKommentar = kommentarEl.querySelector("textarea").value;

      await updateDoc(doc(db, "økter", id), {
        dato: nyDato,
        varighet: nyVarighet,
        kommentar: nyKommentar
      });

      // Ikke nødvendig å oppdatere DOM – onSnapshot gjør det for oss!
    }
  }
});
