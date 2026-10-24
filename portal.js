(() => {
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const isHome=!!$('#hero-title');
  const lang=()=>document.documentElement.lang==='zh-CN'?'zh':'en';
  const txt=(en,zh)=>lang()==='zh'?zh:en;
  const node=(tag,text,cls)=>{const el=document.createElement(tag);if(text!==undefined)el.textContent=text;if(cls)el.className=cls;return el;};
  if(!isHome){
    let currentLanguage='en';try{if(localStorage.getItem('bai-language')==='zh')currentLanguage='zh';}catch{}
    function language(){
      const language=currentLanguage;
      document.documentElement.lang=language==='zh'?'zh-CN':'en';
      const t=window.LAB_CONTENT[language];
      $$('[data-i18n]').forEach(el=>{if(t[el.dataset.i18n]!==undefined)el.textContent=t[el.dataset.i18n];});
      $('#language-toggle').textContent=language==='en'?'中 / EN':'EN / 中';
      $('#language-toggle').setAttribute('aria-label',language==='en'?'切换到中文':'Switch to English');
      document.dispatchEvent(new Event('lab:languagechange'));
    }
    language();
    $('#language-toggle').addEventListener('click',()=>{currentLanguage=lang()==='en'?'zh':'en';try{localStorage.setItem('bai-language',currentLanguage);}catch{}language();});
    const toggle=$('#menu-toggle'),nav=$('#main-nav');
    function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',txt('Open navigation','打开导航'));}
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?txt('Close navigation','关闭导航'):txt('Open navigation','打开导航'));});
    document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();if(e.target.closest('#main-nav a'))closeMenu();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
    matchMedia('(min-width:1001px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  }
  $$('.nav-group').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)$$('.nav-group').forEach(other=>{if(other!==detail)other.open=false;});}));
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-group'))$$('.nav-group').forEach(x=>x.open=false);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.nav-group[open]').forEach(x=>{x.open=false;x.querySelector('summary').focus();});});
  const root=new URL($('meta[name="site-root"]').content,location.href);
  $$('#main-nav a').forEach(a=>{if(new URL(a.href).pathname===location.pathname)a.setAttribute('aria-current','page');});
  // Homepage cards also expose actual detail pages; modal previews remain available.
  function enhanceHome(){if(!isHome)return;
    $$('.team-card').forEach(card=>{const button=card.querySelector('[data-sample-id]');if(!button||card.querySelector('.full-page-link'))return;const a=node('a',txt('Full profile →','查看独立个人页 →'),'full-page-link');a.href=new URL('people/'+button.dataset.sampleId+'/',root);button.before(a);});
    $$('#papers-list [data-sample-id],#events-list [data-sample-id]').forEach(button=>{if(button.parentElement.querySelector('.full-page-link'))return;const isPaper=button.closest('#papers-list');const a=node('a',txt('Full page →','查看独立详情页 →'),'full-page-link');a.href=new URL((isPaper?'resources/reports/':'events/')+button.dataset.sampleId+'/',root);button.before(a);});
    for(const [section,url]of [['#people','people/'],['#resources','resources/']]){const el=$(section+' .container');if(el&&!el.querySelector('.section-all-link')){const a=node('a',txt('Explore the full section →','浏览完整栏目 →'),'text-link section-all-link');a.href=new URL(url,root);el.append(a);}}
  }
  enhanceHome();document.addEventListener('lab:languagechange',enhanceHome);
  const norm=s=>String(s||'').normalize('NFKC').toLowerCase().trim();
  $$('[data-collection]').forEach(collection=>{
    const form=collection.querySelector('[data-filter-form]'),items=[...collection.querySelector('[data-list-items]').children],size=Number(collection.dataset.pageSize)||6;
    const inputs={q:form.querySelector('[data-list-search]'),theme:form.querySelector('[data-list-theme]'),year:form.querySelector('[data-list-year]'),type:form.querySelector('[data-list-type]')};
    const state={q:'',theme:'all',year:'all',type:'all',group:'all',state:'all',topic:'all',page:1,limit:size,expanded:false};
    function read(){const params=new URLSearchParams(location.search);for(const k of ['q','theme','year','type','group','state','topic'])state[k]=params.get(k)||(k==='q'?'':'all');state.page=Math.max(1,Math.floor(Number(params.get('page')))||1);state.expanded=false;state.limit=size;for(const [k,input]of Object.entries(inputs)){if(input){input.value=state[k];if(input.tagName==='SELECT'&&!input.value){input.value='all';state[k]='all';}}}}
    function save(replace=false){const url=new URL(location.href);url.search='';for(const k of ['q','theme','year','type','group','state','topic'])if(state[k]&&state[k]!=='all')url.searchParams.set(k,state[k]);if(state.page>1)url.searchParams.set('page',String(state.page));history[replace?'replaceState':'pushState'](null,'',url);}
    function filter(){return items.filter(item=>{
      if(state.q&&!norm(item.dataset.search||item.textContent).includes(norm(state.q)))return false;
      for(const k of ['theme','year','type','state','topic'])if(state[k]!=='all'&&String(item.dataset[k])!==state[k])return false;
      return state.group==='all'||(item.dataset.groups||'').split(' ').includes(state.group);
    });}
    function render(){
      const matches=filter(),pages=Math.max(1,Math.ceil(matches.length/size));state.page=Math.min(state.page,pages);
      const start=state.expanded?0:(state.page-1)*size,end=state.expanded?state.limit:start+size,visible=matches.slice(start,end),visibleSet=new Set(visible);
      items.forEach(item=>item.hidden=!visibleSet.has(item));
      collection.querySelector('.empty-results').hidden=matches.length>0;
      collection.querySelector('.list-status').textContent=txt(`Showing ${matches.length?start+1:0}–${Math.min(end,matches.length)} of ${matches.length} results`,`显示 ${matches.length?start+1:0}–${Math.min(end,matches.length)} 条，共 ${matches.length} 条`);
      const pagination=collection.querySelector('.pagination');pagination.replaceChildren();
      function button(label,page,disabled,current=false){const el=node('button',label);el.type='button';el.disabled=disabled;if(current)el.setAttribute('aria-current','page');el.setAttribute('aria-label',txt(`Page ${page}`,`第 ${page} 页`));el.addEventListener('click',()=>{state.page=page;state.expanded=false;save();render();collection.scrollIntoView({block:'start'});});return el;}
      if(matches.length>size){pagination.append(button(txt('Previous','上一页'),Math.max(1,state.page-1),state.page===1));let previous=0;for(let n=1;n<=pages;n++){if(n!==1&&n!==pages&&Math.abs(n-state.page)>2)continue;if(previous&&n>previous+1)pagination.append(node('span','…'));pagination.append(button(String(n),n,false,n===state.page));previous=n;}pagination.append(button(txt('Next','下一页'),Math.min(pages,state.page+1),state.page===pages));}
      collection.querySelectorAll('[data-group],[data-state]').forEach(el=>{const key=el.dataset.group!==undefined?'group':'state',active=state[key]===el.dataset[key];el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
      $$('[data-library-topic]').forEach(el=>{const active=state.topic===el.dataset.libraryTopic;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
      const more=collection.querySelector('[data-load-more]');if(more){more.hidden=matches.length<=size;more.disabled=state.expanded?end>=matches.length:state.page===pages;}
    }
    form.addEventListener('submit',e=>{e.preventDefault();state.page=1;save();render();});
    for(const [key,input]of Object.entries(inputs))if(input)input.addEventListener(key==='q'?'input':'change',()=>{state[key]=input.value;state.page=1;state.expanded=false;save(key==='q');render();});
    form.querySelector('[data-list-reset]').addEventListener('click',()=>{Object.assign(state,{q:'',theme:'all',year:'all',type:'all',group:'all',state:'all',topic:'all',page:1,expanded:false,limit:size});for(const [k,input]of Object.entries(inputs))if(input)input.value=state[k];save();render();});
    collection.querySelectorAll('[data-group],[data-state]').forEach(el=>el.addEventListener('click',()=>{const key=el.dataset.group!==undefined?'group':'state';state[key]=el.dataset[key];state.page=1;state.expanded=false;save();render();}));
    $$('[data-library-topic]').forEach(el=>el.addEventListener('click',()=>{state.topic=el.dataset.libraryTopic;state.page=1;state.expanded=false;save();render();}));
    collection.querySelector('[data-load-more]')?.addEventListener('click',()=>{state.limit=state.expanded?state.limit+size:(state.page+1)*size;state.expanded=true;render();});
    window.addEventListener('popstate',()=>{read();render();});
    document.addEventListener('lab:languagechange',render);read();render();
  });
  $$('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const status=button.nextElementSibling;try{await navigator.clipboard.writeText(button.dataset.copy);status.textContent=txt('Copied. Citation is labeled fictional.','已复制，引用中已标明模拟性质。');}catch{status.textContent=txt('Copy unavailable. Select and copy the citation above.','无法自动复制，请选中上方引用文字复制。');}}));
  const slideDialog=$('#slide-dialog');let slideItem=null,slideIndex=0;
  function renderSlide(){if(!slideItem)return;const language=lang();$('#slide-heading').textContent=slideItem.title[language];const titles=[txt('The research question','研究问题'),txt('An illustrative study design','示例研究设计'),txt('Evidence and limitations','证据与局限')];const body=[slideItem.description[language],txt('Compare a baseline and an AI-assisted workflow. Define the outcome, human review effort, failure cases, and alternative explanations before evaluating results.','比较基准流程与 AI 辅助方案，在评估前定义结果、人工复核投入、失败场景和替代解释。'),txt('This is a fictional demonstration. No real paper, DOI, dataset, or empirical finding is associated with this entry. All details are to be revised.','这是模拟演示，不对应真实论文、DOI、数据集或实证结论，全部内容待修改。')];$('#slide-content').replaceChildren(node('span',slideItem.code,'question-code'),node('h3',titles[slideIndex]),node('p',body[slideIndex]));$('#slide-position').textContent=`${slideIndex+1} / 3`;$('[data-slide-prev]').disabled=slideIndex===0;$('[data-slide-next]').disabled=slideIndex===2;}
  $$('[data-slides]').forEach(button=>button.addEventListener('click',()=>{slideItem=window.LAB_PORTAL.library.find(x=>x.id===button.dataset.slides);slideIndex=0;renderSlide();slideDialog.showModal();}));
  $('[data-slide-close]')?.addEventListener('click',()=>slideDialog.close());
  $('[data-slide-prev]')?.addEventListener('click',()=>{slideIndex=Math.max(0,slideIndex-1);renderSlide();});
  $('[data-slide-next]')?.addEventListener('click',()=>{slideIndex=Math.min(2,slideIndex+1);renderSlide();});
  slideDialog?.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){slideIndex=Math.min(2,slideIndex+1);renderSlide();}if(e.key==='ArrowLeft'){slideIndex=Math.max(0,slideIndex-1);renderSlide();}});
  document.addEventListener('lab:languagechange',renderSlide);
  $$('[data-demo-form]').forEach(form=>{
    const feedback=form.querySelector('.form-feedback'),file=form.querySelector('input[type="file"]');
    file?.addEventListener('change',()=>{const f=file.files[0];file.setCustomValidity(f&&(!f.name.toLowerCase().endsWith('.pdf')||f.size>10*1024*1024)?txt('Choose a PDF no larger than 10 MB.','请选择不超过 10 MB 的 PDF。'):'');});
    form.addEventListener('submit',e=>{
      e.preventDefault();if(!form.reportValidity())return;
      const values={demo:true,status:'LOCAL_PREVIEW_ONLY_NOT_SENT',form:form.dataset.demoForm};
      for(const [key,value]of new FormData(form)){if(value instanceof File){if(value.name)values[key]={filename:value.name,bytes:value.size,note:'File content was not read or uploaded'};}else values[key]=value;}
      feedback.replaceChildren(node('h3',txt('Local preview ready — nothing was sent.','已生成本地预览，未发送任何内容。')),node('p',txt('No registration or submission has occurred. You can review or export this clearly labeled sample draft.','没有完成真实报名或投稿。你可以检查或导出明确标注的演示草稿。')));
      const preview=node('dl','','form-preview');for(const [key,value]of Object.entries(values)){const dt=node('dt',key),dd=node('dd',typeof value==='object'?JSON.stringify(value):String(value));preview.append(dt,dd);}feedback.append(preview);
      const download=node('button',txt('Download local demo draft (JSON)','下载本地演示草稿（JSON）'),'button outline-dark');download.type='button';download.addEventListener('click',()=>{const blob=new Blob([JSON.stringify(values,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='BAI-DEMO-NOT-SENT.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});feedback.append(download);feedback.hidden=false;feedback.scrollIntoView({block:'nearest'});
    });
    form.addEventListener('reset',()=>{feedback.hidden=true;feedback.replaceChildren();file?.setCustomValidity('');});
  });
  const slides=$$('[data-carousel-slide]');let active=0;
  function carousel(){slides.forEach((slide,i)=>slide.hidden=i!==active);$('[data-carousel-count]').textContent=`0${active+1} / 0${slides.length}`;}
  $('[data-carousel-prev]')?.addEventListener('click',()=>{active=(active+slides.length-1)%slides.length;carousel();});
  $('[data-carousel-next]')?.addEventListener('click',()=>{active=(active+1)%slides.length;carousel();});
})();
