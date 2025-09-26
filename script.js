

document.addEventListener('DOMContentLoaded', () => {
  
  const tutorials = [
    {
      title: 'Como criar um gmail',
      url: 'tutorialCriarEmail.html',
      description: 'Aprenda passo a passo como criar seu gmail gratuitamente.'
    },
    {
      title: 'Como usar o Google Documentos',
      url: 'tutorialDocs.html',
      description: 'Explicação de como usar as ferramentas do google docs.'
    },
  ];


  const listContainer = document.getElementById('tutorial-list');
  if (listContainer) {
    listContainer.innerHTML = '';
    tutorials.forEach(t => {
      const card = document.createElement('div');
      card.className = 'tutorial-card';
      card.setAttribute('data-title', t.title.toLowerCase());
      card.innerHTML = `
        <h3><a href="${t.url}">${t.title}</a></h3>
        <p>${t.description}</p>
      `;
      listContainer.appendChild(card);
    });
  }
  const input = document.getElementById('searchInput');
  const btn = document.getElementById('searchBtn');
  function filterOnMain(query) {
    query = (query || '').trim().toLowerCase();
    const cards = document.querySelectorAll('.tutorial-card');
    let found = 0;
    cards.forEach(card => {
      const title = card.getAttribute('data-title') || '';
      if (query === '' || title.includes(query)) {
        card.style.display = 'block';
        found++;
      } else {
        card.style.display = 'none';
      }
    });
    const resultEl = document.getElementById('search-result');
    if (resultEl) {
      resultEl.textContent = query === '' ? '' : `${found} resultado(s) para "${query}"`;
    }
  }
  const params = new URLSearchParams(window.location.search);
  const qParam = params.get('q');
  if (qParam && window.location.pathname.includes('index.html')) {
    if (input) input.value = qParam;
    filterOnMain(qParam);
  }
  if (btn && input) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (window.location.pathname.includes('index.html')) {
        filterOnMain(query);
      } else {
        window.location.href = `index.html?q=${encodeURIComponent(query)}`;
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btn.click();
      }
    });
  }
  if (window.location.pathname.includes('index.html') && !input) {
    filterOnMain('');
  }
});
