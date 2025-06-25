document.querySelectorAll('.rediger-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const økt = btn.closest('.økt');

    const datoEl = økt.querySelector('.dato');
    const varighetEl = økt.querySelector('.varighet');
    const kommentarEl = økt.querySelector('.kommentar');

    datoEl.innerHTML = `<input type="text" value="${datoEl.textContent}" />`;
    varighetEl.innerHTML = `<input type="text" value="${varighetEl.textContent}" />`;
    kommentarEl.innerHTML = `<textarea>${kommentarEl.textContent}</textarea>`;

    btn.textContent = 'Lagre';
    btn.classList.add('lagre');

    btn.addEventListener('click', () => {
      if (btn.classList.contains('lagre')) {
        datoEl.textContent = datoEl.querySelector('input').value;
        varighetEl.textContent = varighetEl.querySelector('input').value;
        kommentarEl.textContent = kommentarEl.querySelector('textarea').value;
        btn.textContent = 'Rediger';
        btn.classList.remove('lagre');

        // Her kan du legge til Firebase-lagring senere
      }
    }, { once: true });
  });
});
