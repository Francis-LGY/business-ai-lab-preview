(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  let lang = 'en';
  try { if (localStorage.getItem('bai-language') === 'zh') lang = 'zh'; } catch { /* Local storage is optional. */ }
  let filter = 'all';
  let selectedResearch = null;
  const dialog = $('#research-dialog');
  const svg = (body) => `<svg viewBox="0 0 280 180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  const art = {
    decisions: svg('<rect width="280" height="180" fill="#eee7e5"/><g fill="none" stroke="#c7b1b5" stroke-width=".8"><path d="M38 135H242M38 105H242M38 75H242M38 45H242M65 30V150M115 30V150M165 30V150M215 30V150"/></g><path d="M45 130L90 108L131 118L178 70L231 47" fill="none" stroke="#85223e" stroke-width="2"/><path d="M45 130L90 108L131 118L178 70L231 47V150H45Z" fill="#85223e" opacity=".07"/><g fill="#eee7e5" stroke="#85223e" stroke-width="2"><circle cx="45" cy="130" r="4"/><circle cx="90" cy="108" r="4"/><circle cx="131" cy="118" r="4"/><circle cx="178" cy="70" r="4"/><circle cx="231" cy="47" r="5"/></g><circle cx="231" cy="47" r="14" fill="none" stroke="#85223e" opacity=".3"/>'),
    organizations: svg('<rect width="280" height="180" fill="#e8e9e4"/><g stroke="#8d9b8e" fill="none"><path d="M140 50V85M65 125V85H215V125M140 85V125"/><path d="M65 125L140 50L215 125Z" stroke-dasharray="3 4" opacity=".4"/></g><g fill="#e8e9e4" stroke="#788b7a"><rect x="119" y="29" width="42" height="42" rx="2"/><rect x="48" y="110" width="34" height="34" rx="2"/><rect x="123" y="110" width="34" height="34" rx="2"/><rect x="198" y="110" width="34" height="34" rx="2"/></g><rect x="126" y="36" width="28" height="28" fill="#6d8072"/><circle cx="65" cy="127" r="4" fill="#a5b1a3"/><circle cx="140" cy="127" r="4" fill="#a5b1a3"/><circle cx="215" cy="127" r="4" fill="#a5b1a3"/>'),
    collaboration: svg('<rect width="280" height="180" fill="#ede7df"/><defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" stroke="#9d7d67" stroke-width=".6"/></pattern><clipPath id="circle-clip"><circle cx="108" cy="90" r="52"/></clipPath></defs><circle cx="108" cy="90" r="52" fill="none" stroke="#ad8e76" stroke-width="1.3"/><circle cx="170" cy="90" r="52" fill="none" stroke="#85223e" stroke-width="1.3"/><circle cx="170" cy="90" r="52" fill="url(#hatch)" clip-path="url(#circle-clip)"/><circle cx="108" cy="90" r="3" fill="#ad8e76"/><circle cx="170" cy="90" r="3" fill="#85223e"/><path d="M108 90H170" stroke="#85223e" stroke-width=".7" stroke-dasharray="3 4"/>'),
    responsibility: svg('<rect width="280" height="180" fill="#e7e7ed"/><g fill="none" stroke="#8d879f" stroke-width=".9"><circle cx="140" cy="90" r="59"/><ellipse cx="140" cy="90" rx="30" ry="59"/><ellipse cx="140" cy="90" rx="59" ry="23"/><path d="M81 90H199M140 31V149"/><path d="M90 60H190M90 120H190" stroke-opacity=".5"/></g><circle cx="140" cy="90" r="20" fill="#e7e7ed" stroke="#767186"/><path d="M132 90L138 96L150 83" fill="none" stroke="#767186" stroke-width="1.8"/><circle cx="140" cy="31" r="3" fill="#767186"/><circle cx="199" cy="90" r="3" fill="#767186"/>')
  };
  function setText(el, value) {
    el.replaceChildren();
    String(value).split('\n').forEach((line, i) => {
      if (i) el.append(document.createElement('br'));
      el.append(document.createTextNode(line));
    });
  }
  function setMenu(open, restoreFocus = false) {
    $('#main-nav').classList.toggle('open', open);
    $('#menu-toggle').setAttribute('aria-expanded', String(open));
    $('#menu-toggle').setAttribute('aria-label', window.LAB_CONTENT[lang][open ? 'menuClose' : 'menuOpen']);
    if (restoreFocus) $('#menu-toggle').focus();
  }
  function renderResearch() {
    const t = window.LAB_CONTENT[lang];
    const themes = window.LAB_RESEARCH.filter(item => filter === 'all' || item.category === filter);
    const grid = $('#research-grid');
    grid.replaceChildren();
    themes.forEach(item => {
      const copy = item[lang];
      const article = document.createElement('article');
      article.className = 'research-card';
      const drawing = document.createElement('div');
      drawing.className = 'research-art';
      drawing.setAttribute('aria-hidden', 'true');
      // These SVGs are authored locally above, never supplied by visitors.
      drawing.innerHTML = art[item.art];
      const index = document.createElement('span');
      index.className = 'art-index';
      index.textContent = `0${window.LAB_RESEARCH.indexOf(item) + 1} /`;
      drawing.append(index);
      const body = document.createElement('div');
      body.className = 'research-card-body';
      const category = document.createElement('span');
      category.className = 'category';
      category.textContent = t[item.category === 'business' ? 'businessCategory' : 'peopleCategory'];
      const title = document.createElement('h3');
      setText(title, copy.title);
      const description = document.createElement('p');
      description.textContent = copy.summary;
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.research = item.id;
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-label', `${t.readMore}: ${copy.title.replace('\n',' ')}`);
      const label = document.createElement('span');
      label.textContent = t.readMore;
      const arrow = document.createElement('span');
      arrow.textContent = '↗';
      arrow.setAttribute('aria-hidden','true');
      button.append(label, arrow);
      button.addEventListener('click', () => { selectedResearch = item; renderDialog(); dialog.showModal(); });
      body.append(category, title, description, button);
      article.append(drawing, body);
      grid.append(article);
    });
    $('#research-count').textContent = `${String(themes.length).padStart(2, '0')} ${t.themeCount}`;
  }
  function renderDialog() {
    if (!selectedResearch) return;
    const copy = selectedResearch[lang];
    setText($('#dialog-title'), copy.title);
    $('#dialog-description').textContent = copy.description;
    $('#dialog-questions').replaceChildren(...copy.questions.map(question => {
      const li = document.createElement('li'); li.textContent = question; return li;
    }));
  }
  function renderLanguage() {
    const t = window.LAB_CONTENT[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) setText(el, t[key]);
    });
    $('#language-toggle').innerHTML = lang === 'en' ? '中<span> / EN</span>' : 'EN<span> / 中</span>';
    $('#language-toggle').setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
    $('#dialog-close').setAttribute('aria-label', t.dialogClose);
    $('#main-nav').setAttribute('aria-label', lang === 'zh' ? '主导航' : 'Main navigation');
    $('.filters').setAttribute('aria-label', lang === 'zh' ? '筛选研究主题' : 'Filter research themes');
    $('.hero-visual img').alt = t.imageAlt;
    document.title = lang === 'zh' ? 'Business Artificial Inteligence Lab · 香港城市大学（东莞）' : 'Business Artificial Inteligence Lab · CityUHK (Dongguan)';
    setMenu(false); renderResearch(); renderDialog();
  }
  $('#language-toggle').addEventListener('click', () => {
    lang = lang === 'en' ? 'zh' : 'en';
    try { localStorage.setItem('bai-language', lang); } catch { /* The page still works without persistence. */ }
    renderLanguage();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    renderResearch();
  }));
  $('#menu-toggle').addEventListener('click', () => setMenu($('#menu-toggle').getAttribute('aria-expanded') !== 'true'));
  $('#main-nav').addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if(event.key === 'Escape' && $('#main-nav').classList.contains('open')) setMenu(false, true); });
  document.addEventListener('click', event => { if(!event.target.closest('.site-header')) setMenu(false); });
  window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if(event.matches) setMenu(false); });
  $('#dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if(event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close(); } });
  $('#dialog-contact').addEventListener('click', () => dialog.close());
  $('#year').textContent = '2026';
  renderLanguage();
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('#main-nav a').forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if(active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current');
        });
      });
    }, {rootMargin:'-15% 0px -65% 0px', threshold:0});
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
