
document.addEventListener('DOMContentLoaded',function(){
 var panel0=document.querySelector('.quote-panel');
 var heroWrap=document.querySelector('.home .hero .wrap');
 var servicesSec=document.getElementById('services');
 var mqMobile=window.matchMedia('(max-width:820px)');
 function placePanel(){
   if(!panel0||!heroWrap||!servicesSec){return;}
   if(mqMobile.matches){servicesSec.after(panel0);document.body.classList.add('panel-below');}
   else{heroWrap.appendChild(panel0);document.body.classList.remove('panel-below');}
 }
 placePanel();
 if(mqMobile.addEventListener){mqMobile.addEventListener('change',placePanel);}
 else if(mqMobile.addListener){mqMobile.addListener(placePanel);}
 var lang=document.documentElement.lang||'en';
 var isFr=lang.indexOf('fr')===0;
 function markErr(el,msg){
   el.classList.add('invalid');
   var next=el.nextElementSibling;
   if(!(next&&next.classList.contains('err'))){
     var s=document.createElement('span');s.className='err';s.textContent=msg;el.parentNode.insertBefore(s,el.nextSibling);
   }
 }
 function clearErr(el){
   el.classList.remove('invalid');
   var next=el.nextElementSibling;
   if(next&&next.classList.contains('err')){next.remove();}
 }
 function validateScope(scope){
   var ok=true;
   scope.querySelectorAll('[required]').forEach(function(el){
     clearErr(el);
     var bad=false;
     if(el.type==='checkbox'){bad=!el.checked;}
     else if(!el.value||!el.value.trim()){bad=true;}
     if(bad){
       var msg;
       if(el.type==='checkbox'){msg=isFr?'Veuillez accepter les conditions.':'Please accept the terms.';}
       else{
         var lab=scope.querySelector('label[for="'+el.id+'"]');
         var nm=lab?lab.textContent.replace('*','').trim():'';
         if(isFr){nm=nm.charAt(0).toLowerCase()+nm.slice(1);msg='Le '+nm+' est requis.';}
         else{msg=nm+' is required.';}
       }
       markErr(el,msg);ok=false;
     }
   });
   return ok;
 }
 document.querySelectorAll('form.lead input,form.lead select,form.lead textarea').forEach(function(el){
   el.addEventListener('input',function(){clearErr(el);});
   el.addEventListener('change',function(){clearErr(el);});
 });
 var burger=document.querySelector('.burger'),drawer=document.querySelector('.drawer'),overlay=document.querySelector('.drawer-overlay');
 function openDrawer(){if(!drawer)return;drawer.classList.add('open');if(overlay)overlay.classList.add('open');if(burger)burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
 function closeDrawer(){if(!drawer)return;drawer.classList.remove('open');if(overlay)overlay.classList.remove('open');if(burger)burger.setAttribute('aria-expanded','false');document.body.style.overflow='';}
 if(burger){burger.addEventListener('click',function(){if(drawer&&drawer.classList.contains('open')){closeDrawer();}else{openDrawer();}});}
 if(overlay){overlay.addEventListener('click',closeDrawer);}
 var dclose=document.querySelector('.drawer-close');if(dclose){dclose.addEventListener('click',closeDrawer);}
 document.querySelectorAll('.drawer .drow').forEach(function(btn){
   btn.addEventListener('click',function(){
     var sub=btn.parentElement.querySelector('.dsub');
     var opened=btn.classList.toggle('open');
     btn.setAttribute('aria-expanded',opened?'true':'false');
     if(sub){sub.classList.toggle('open',opened);}
   });
 });
 var panel=document.querySelector('.quote-panel');
 var stickyQuote=document.querySelector('.stickybar a.quote');
 if(stickyQuote&&panel){stickyQuote.addEventListener('click',function(e){if(window.matchMedia('(max-width:820px)').matches){e.preventDefault();panel.scrollIntoView({behavior:'smooth',block:'start'});}});}
 document.querySelectorAll('.count').forEach(function(el){
   var target=parseInt(el.getAttribute('data-count'),10)||0;
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=target;return;}
   var io=new IntersectionObserver(function(entries){
     entries.forEach(function(en){
       if(en.isIntersecting){
         io.disconnect();
         var start=null;
         function tick(ts){if(!start)start=ts;var p=Math.min((ts-start)/1200,1);el.textContent=Math.round(p*target);if(p<1){requestAnimationFrame(tick);}}
         requestAnimationFrame(tick);
       }
     });
   },{threshold:0.4});
   io.observe(el);
 });
 document.querySelectorAll('.drop').forEach(function(d){var btn=d.querySelector('button');if(btn){btn.addEventListener('focus',function(){d.classList.remove('drop-off');btn.setAttribute('aria-expanded','true');});btn.addEventListener('blur',function(){if(!d.classList.contains('open')){btn.setAttribute('aria-expanded','false');}});}d.addEventListener('mouseleave',function(){d.classList.remove('drop-off');});});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDrawer();}});
 var q=document.querySelector('select[name="service"]');
 if(q){var s=new URLSearchParams(location.search).get('service');if(s){for(var i=0;i<q.options.length;i++){if(q.options[i].value===s){q.selectedIndex=i;}}}}
 document.querySelectorAll('form.lead.multi').forEach(function(f){
  var steps=f.querySelectorAll('.step'),counts=f.querySelectorAll('.stepcount'),cur=0;
  function show(i){cur=i;steps.forEach(function(s,j){s.classList.toggle('on',j===i);});var label=(isFr?(i+1)+' sur '+steps.length:(i+1)+' of '+steps.length);counts.forEach(function(c){c.textContent=label;});}
  f.querySelectorAll('.next').forEach(function(b){b.addEventListener('click',function(){if(validateScope(steps[cur])&&cur<steps.length-1){show(cur+1);}});});
  f.querySelectorAll('.back').forEach(function(b){b.addEventListener('click',function(){if(cur>0){show(cur-1);}});});
  show(0);
 });
 document.querySelectorAll('form.lead').forEach(function(f){
  f.addEventListener('submit',function(e){
   if(!validateScope(f)){e.preventDefault();return;}
   e.preventDefault();
   var btn=f.querySelector('button[type="submit"]');if(btn){btn.disabled=true;btn.textContent=isFr?'Envoi en cours…':'Sending…';}
   var endpoint='https://formsubmit.app/f/pwqxpqjxgm';
   if(endpoint){
     fetch(endpoint,{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)}).then(function(r){if(r.ok){window.location.href='thank-you.html';}else{throw new Error('bad');}}).catch(function(){var err=isFr?'Désolé, un problème est survenu lors de la transmission. Veuillez appeler le 438-221-5661 ou écrire à chilvarymoving@yahoo.com directement.':'Sorry, something went wrong sending this. Please call 438-221-5661 or email chilvarymoving@yahoo.com directly.';f.outerHTML='<div class="thanks"><strong>'+err+'</strong></div>';});
   } else {
     var lines=[];
     var els=f.querySelectorAll('input,select,textarea');
     for(var i=0;i<els.length;i++){var el=els[i];if(el.name&&el.value){lines.push(el.name+': '+el.value);}}
     var subj=isFr?'Demande du site web DCT Transportation':'DCT Transportation website inquiry';
     window.location.href='mailto:chilvarymoving@yahoo.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join(String.fromCharCode(10)));
     var msg=f.getAttribute('data-thanks')||'Thank you. Your request has been received.';
     f.outerHTML='<div class="thanks"><strong>'+msg+'</strong></div>';
   }});
 });
});
