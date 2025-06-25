<script>
function saveProgress(id) {
  const checkbox = document.getElementById('cb-' + id);
  const comment = document.getElementById('comment-' + id);
  localStorage.setItem('cb-' + id, checkbox.checked);
  localStorage.setItem('comment-' + id, comment.value);
  document.getElementById('label-' + id).classList.toggle('completed', checkbox.checked);
}

function loadProgress() {
  let firstUnchecked = null;
  document.querySelectorAll('input[type=checkbox]').forEach(cb => {
    const id = cb.id.slice(3);
    const checked = localStorage.getItem('cb-' + id) === 'true';
    cb.checked = checked;
  if (!cb.checked && !firstUnchecked) firstUnchecked = cb;
    document.getElementById('label-' + id).classList.toggle('completed', checked);
  if (firstUnchecked) firstUnchecked.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  document.querySelectorAll('textarea').forEach(area => {
    const id = area.id.slice(8);
    area.value = localStorage.getItem('comment-' + id) || '';
  });
}
// Koble til Firebase
window.onload = loadProgress;
</script>

<!--ny config for å hoppe til neste økt-->
<script>
  const firebaseConfig = {
    apiKey: "AIzaSyDlC7rzEfEprDgJrjnNVqASaAhhjqbFASs",
    authDomain: "trening-92895.firebaseapp.com",
    databaseURL: "https://trening-92895-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "trening-92895",
    storageBucket: "trening-92895.firebasestorage.app",
    messagingSenderId: "781948442599",
    appId: "1:781948442599:web:4dc7d7f575b49147fe4f42",
    measurementId: "G-6ZQTDKQ3B4",
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  function saveProgress(id) {
    const checkbox = document.getElementById('cb-' + id);
    const comment = document.getElementById('comment-' + id);
    const data = {
      checked: checkbox.checked,
      comment: comment.value
    };
    db.ref('progress/' + id).set(data);
    document.getElementById('label-' + id).classList.toggle('completed', checkbox.checked);
  }

  function loadProgress() {
    db.ref('progress').once('value').then(snapshot => {
      const data = snapshot.val() || {};
      let firstUnchecked = null;

      Object.keys(data).forEach(id => {
        const session = data[id];
        const checkbox = document.getElementById('cb-' + id);
        const comment = document.getElementById('comment-' + id);
        const label = document.getElementById('label-' + id);

        if (checkbox) {
          checkbox.checked = session.checked;
          if (!session.checked && !firstUnchecked) {
            firstUnchecked = checkbox;
          }
        }

        if (comment) comment.value = session.comment || '';
        if (label) label.classList.toggle('completed', session.checked);
      });

      // Scroll til første ufullførte økt
      if (firstUnchecked) {
        firstUnchecked.closest('.session').scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  window.onload = loadProgress;
</script>
<script>
  window.addEventListener('load', () => {
    const sessions = document.querySelectorAll('.session');
    for (const session of sessions) {
      const checkbox = session.querySelector('input[type="checkbox"]');
      if (checkbox && !checkbox.checked) {
        session.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  });
</script>