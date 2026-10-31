(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const language = () => document.documentElement.lang === 'zh-CN' ? 'zh' : 'en';
  let selected = null;
  const dialog = $('#sample-dialog');
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if(className) element.className = className;
    if(text !== undefined) element.textContent = text;
    return element;
  }
  function badge(text) { return node('span','demo-badge',text); }
  function action(item, type, label) {
    const button = node('button','sample-action',label);
    button.type = 'button';
    button.dataset.sampleId = item.id;
    button.setAttribute('aria-haspopup','dialog');
    const arrow = node('span','','↗'); arrow.setAttribute('aria-hidden','true');
    button.append(arrow);
    button.addEventListener('click',() => { selected={item,type}; renderDialog(); dialog.showModal(); });
    return button;
  }
  function renderDialog() {
    if(!selected) return;
    const lang=language(), t=window.LAB_CONTENT[lang], {item,type}=selected, copy=item[lang];
    $('#sample-type').textContent=t[type==='profile'?'profileDemo':type==='paper'?'publications':'events'];
    $('#sample-title').textContent=copy.name || copy.title;
    $('#sample-meta').textContent=copy.role || `${copy.meta} · ${copy.authors || copy.venue}`;
    $('#sample-description').textContent=copy.bio || copy.description;
    $('#sample-subheading').textContent=t[`${type}Details`];
    $('#sample-points').replaceChildren(...copy.points.map(text => node('li','',text)));
    $('#sample-disclaimer').textContent=t[`${type}Disclaimer`];
    dialog.querySelector('[data-i18n="sampleBadge"]').hidden=type==='profile';
  }
  function render() {
    const lang=language(), t=window.LAB_CONTENT[lang];
    $('#people-grid').replaceChildren(...window.LAB_DEMO.people.map(person => {
      const copy=person[lang], card=node('article',`team-card real-person ${person.tone}`);
      const portrait=node('div','team-portrait real-portrait');
      const photo=node('img');photo.src=person.photo;photo.alt=copy.name;photo.loading='lazy';photo.width=300;photo.height=400;portrait.append(photo);
      const body=node('div','team-body');
      body.append(node('h3','',copy.name),node('p','team-role',copy.role),node('p','team-affiliation',copy.affiliation),node('p','team-focus',copy.focus),node('p','team-bio',copy.bio),action(person,'profile',t.profileAction));
      card.append(portrait,body); return card;
    }));
    $('#papers-list').replaceChildren(...window.LAB_DEMO.papers.map((paper,index) => {
      const copy=paper[lang], card=node('article','paper-card');
      card.append(node('span','paper-number',`0${index+1}`),badge(t.sampleBadge),node('p','paper-meta',copy.meta),node('h4','',copy.title),node('p','paper-authors',copy.authors),action(paper,'paper',t.paperAction));
      return card;
    }));
    $('#events-list').replaceChildren(...window.LAB_DEMO.events.map(event => {
      const copy=event[lang], card=node('article','event-card');
      const date=node('div','event-date');
      date.append(node('span','date-month',lang==='zh'?(event.month==='NOV'?'11 月':'12 月'):event.month),node('strong','',event.day),node('span','date-demo',t.sampleDate));
      const body=node('div','event-body');
      body.append(badge(t.sampleBadge),node('h4','',copy.title),node('p','event-meta',copy.meta),node('p','event-meta',copy.venue),action(event,'event',t.eventAction));
      card.append(date,body);return card;
    }));
    $('#contact-fields').replaceChildren(...window.LAB_DEMO.contacts.map(contact => {
      const row=node('div','contact-field');
      const dt=node('dt','',t[contact.key]);dt.append(badge(t.revisionTag));
      row.append(dt,node('dd','',contact[lang]));return row;
    }));
    $('#sample-close').setAttribute('aria-label',t.sampleClose);
    renderDialog();
  }
  $('#sample-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => {
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  document.addEventListener('lab:languagechange',render);
  render();
})();
