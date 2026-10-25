
document.addEventListener('DOMContentLoaded',function(){
 var b=document.querySelector('.burger'),n=document.querySelector('nav.main');
 if(b&&n){b.addEventListener('click',function(){var opened=n.classList.toggle('open');b.setAttribute('aria-expanded',opened?'true':'false');if(!opened){document.querySelectorAll('.drop.open').forEach(function(d){d.classList.remove('open');var db=d.querySelector('button');if(db){db.setAttribute('aria-expanded','false');}});}});}
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(document.activeElement&&document.activeElement.blur){document.activeElement.blur();}if(n){n.classList.remove('open');}if(b){b.setAttribute('aria-expanded','false');}document.querySelectorAll('.drop').forEach(function(d){d.classList.add('drop-off');});}});
 document.querySelectorAll('.drop').forEach(function(d){var btn=d.querySelector('button');if(btn){btn.addEventListener('focus',function(){d.classList.remove('drop-off');btn.setAttribute('aria-expanded','true');});btn.addEventListener('blur',function(){if(!d.classList.contains('open')){btn.setAttribute('aria-expanded','false');}});}d.addEventListener('mouseleave',function(){d.classList.remove('drop-off');});});
 document.querySelectorAll('.drop>button').forEach(function(btn){btn.addEventListener('click',function(){if(window.matchMedia('(max-width:820px)').matches){var opened=btn.parentElement.classList.toggle('open');btn.setAttribute('aria-expanded',opened?'true':'false');}});});
 var q=document.querySelector('select[name="service"]');
 if(q){var s=new URLSearchParams(location.search).get('service');if(s){for(var i=0;i<q.options.length;i++){if(q.options[i].value===s){q.selectedIndex=i;}}}}
 document.querySelectorAll('form.lead.multi').forEach(function(f){
  var steps=f.querySelectorAll('.step'),prog=f.querySelectorAll('.steps li'),cur=0;
  function show(i){cur=i;steps.forEach(function(s,j){s.classList.toggle('on',j===i);});prog.forEach(function(p,j){p.classList.toggle('cur',j===i);if(j===i){p.setAttribute('aria-current','step');}else{p.removeAttribute('aria-current');}});}
  f.querySelectorAll('.next').forEach(function(b){b.addEventListener('click',function(){var req=steps[cur].querySelectorAll('[required]'),ok=true;for(var k=0;k<req.length;k++){if(!req[k].checkValidity()){req[k].reportValidity();ok=false;break;}}if(ok&&cur<steps.length-1){show(cur+1);}});});
  f.querySelectorAll('.back').forEach(function(b){b.addEventListener('click',function(){if(cur>0){show(cur-1);}});});
  show(0);
 });
 document.querySelectorAll('form.lead').forEach(function(f){
  f.addEventListener('submit',function(e){e.preventDefault();
   var btn=f.querySelector('button[type="submit"]');if(btn){btn.disabled=true;btn.textContent=(document.documentElement.lang.indexOf('fr')===0)?'Envoi en cours…':'Sending…';}
   var msg=f.getAttribute('data-thanks')||'Thank you. Your request has been received.';
   var endpoint='https://formsubmit.app/f/pwqxpqjxgm';
   if(endpoint){
     fetch(endpoint,{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)}).then(function(r){if(r.ok){window.location.href='thank-you.html';}else{throw new Error('bad');}}).catch(function(){var lang=document.documentElement.lang||'en';var err=(lang.indexOf('fr')===0)?'Désolé, un problème est survenu lors de la transmission. Veuillez appeler le 438-221-5661 ou écrire à chilvarymoving@yahoo.com directement.':'Sorry, something went wrong sending this. Please call 438-221-5661 or email chilvarymoving@yahoo.com directly.';f.outerHTML='<div class="thanks"><strong>'+err+'</strong></div>';});
   } else {
     var lines=[];
     var els=f.querySelectorAll('input,select,textarea');
     for(var i=0;i<els.length;i++){var el=els[i];if(el.name&&el.value){lines.push(el.name+': '+el.value);}}
     var lang=document.documentElement.lang||'en';
     var subj=(lang.indexOf('fr')===0)?'Demande du site web DCT Transportation':'DCT Transportation website inquiry';
     window.location.href='mailto:chilvarymoving@yahoo.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join(String.fromCharCode(10)));
     f.outerHTML='<div class="thanks"><strong>'+msg+'</strong></div>';
   }});
 });
});
