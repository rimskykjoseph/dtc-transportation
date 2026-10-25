
document.addEventListener('DOMContentLoaded',function(){
 var b=document.querySelector('.burger'),n=document.querySelector('nav.main');
 if(b&&n){b.addEventListener('click',function(){n.classList.toggle('open');});}
 var q=document.querySelector('select[name="service"]');
 if(q){var s=new URLSearchParams(location.search).get('service');if(s){for(var i=0;i<q.options.length;i++){if(q.options[i].value===s){q.selectedIndex=i;}}}}
 document.querySelectorAll('form.lead').forEach(function(f){
  f.addEventListener('submit',function(e){e.preventDefault();
   var msg=f.getAttribute('data-thanks')||'Thank you. Your request has been received.';
   var endpoint='https://formsubmit.app/f/pwqxpqjxgm';
   if(endpoint){
     fetch(endpoint,{method:'POST',headers:{Accept:'application/json'},body:new FormData(f)}).then(function(r){if(r.ok){f.outerHTML='<div class="thanks"><strong>'+msg+'</strong></div>';}else{throw new Error('bad');}}).catch(function(){f.outerHTML='<div class="thanks"><strong>Sorry, something went wrong sending this. Please call 438-221-5661 or email chilvarymoving@yahoo.com directly.</strong></div>';});
   } else {
     var lines=[];
     var els=f.querySelectorAll('input,select,textarea');
     for(var i=0;i<els.length;i++){var el=els[i];if(el.name&&el.value){lines.push(el.name+': '+el.value);}}
     var lang=document.documentElement.lang||'en';
     var subj=(lang==='fr')?'Demande du site web DCT Transportation':'DCT Transportation website inquiry';
     window.location.href='mailto:chilvarymoving@yahoo.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(lines.join(String.fromCharCode(10)));
     f.outerHTML='<div class="thanks"><strong>'+msg+'</strong></div>';
   }});
 });
});
