/* Shared, accessible transient notifications and theme for all three modules. */
(()=>{
 const root=document.documentElement;
 try{root.dataset.theme=localStorage.getItem('smartcrop-theme')||'light';}catch{root.dataset.theme='light';}
 document.getElementById('th')?.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('smartcrop-theme',root.dataset.theme);}catch{}});
 const toast=document.createElement('div');toast.className='sc-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');toast.setAttribute('aria-atomic','true');toast.hidden=true;
 const text=document.createElement('span'),close=document.createElement('button');close.textContent='×';close.setAttribute('aria-label','Dismiss notification');toast.append(text,close);document.body.appendChild(toast);
 let timer,fade,remaining,started;
 function dismiss(){clearTimeout(timer);clearTimeout(fade);toast.classList.remove('visible');fade=setTimeout(()=>{toast.hidden=true;},200);}
 function pause(){clearTimeout(timer);remaining=Math.max(0,remaining-(Date.now()-started));}
 function resume(){started=Date.now();timer=setTimeout(dismiss,remaining);}
 function show(message,error=false){clearTimeout(timer);clearTimeout(fade);text.textContent=message;toast.dataset.tone=error?'error':'info';toast.hidden=false;toast.classList.add('visible');remaining=error?8000:5000;started=Date.now();timer=setTimeout(dismiss,remaining);}
 close.addEventListener('click',dismiss);toast.addEventListener('mouseenter',pause);toast.addEventListener('mouseleave',resume);toast.addEventListener('focusin',pause);toast.addEventListener('focusout',resume);document.addEventListener('keydown',e=>{if(e.key==='Escape')dismiss();});
 // Only ephemeral action notices are intercepted. Calculation errors, forecast age,
 // GPS accuracy, medical-style screening results and agronomic caveats stay inline.
 const ids=['message','desk-message','save-status','case-status','service-status'];
 for(const id of ids){const node=document.getElementById(id);if(!node)continue;node.classList.add('sc-notice-source');const notify=()=>{const message=node.textContent.trim();if(message)show(message,node.classList.contains('error')||/failed|error|unavailable|could not|invalid|choose|enter|required/i.test(message));};new MutationObserver(notify).observe(node,{childList:true,characterData:true,subtree:true});notify();}
 window.SmartCropUI={notify:show,dismiss};
})();
